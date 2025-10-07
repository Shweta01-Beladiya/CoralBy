import mongoose from "mongoose";
import Order from "../model/order.model.js";
import Product from "../model/product.model.js";
import ProductVariant from "../model/productvarient.model.js";
import { sendBadRequestResponse, sendErrorResponse, sendNotFoundResponse, sendSuccessResponse } from "../utils/Response.utils.js";
import { nanoid } from "nanoid";
import orderModel from "../model/order.model.js";
import UserModel from "../model/user.model.js";
import sellerModel from "../model/seller.model.js";
import couponModel from "../model/coupon.model.js";
import axios from "axios";
import cartModel from "../model/cart.model.js";

const roundToTwo = (num) => Math.round(num * 100) / 100;

export const selectUserAddressController = async (req, res) => {
    try {
        const userId = req?.user?.id;
        const { addressId } = req?.params;

        // Validate IDs
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return sendBadRequestResponse(res, "Invalid or missing userId");
        }
        if (!addressId || !mongoose.Types.ObjectId.isValid(addressId)) {
            return sendBadRequestResponse(res, "Invalid or missing addressId");
        }

        // Find user
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find address inside user
        const address = user.address.id(addressId);
        if (!address) {
            return res.status(404).json({ message: "Address not found for this user" });
        }

        // If already selected, skip unnecessary save
        if (user.selectedAddress?.toString() === addressId) {
            return sendSuccessResponse(res, "Address already selected", {
                selectedAddress: user.selectedAddress
            });
        }

        // Update selected address
        user.selectedAddress = addressId;
        await user.save();

        return sendSuccessResponse(res, "Address selected successfully", {
            selectedAddress: user.selectedAddress
        });

    } catch (error) {
        console.error("Error while selecting address:", error.message);
        return sendErrorResponse(res, 500, "Error while selecting address", error);
    }
};

export const selectUserBillingAddressController = async (req, res) => {
    try {
        const userId = req?.user?.id;
        const { addressId } = req?.params;

        // Validate IDs
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return sendBadRequestResponse(res, "Invalid or missing userId");
        }
        if (!addressId || !mongoose.Types.ObjectId.isValid(addressId)) {
            return sendBadRequestResponse(res, "Invalid or missing addressId");
        }

        // Find user
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find billing address inside user
        const billingAddress = user.billingaddress.id(addressId);
        if (!billingAddress) {
            return res.status(404).json({ message: "Billing address not found for this user" });
        }

        // If already selected, skip unnecessary save
        if (user.selectedBillingAddress?.toString() === addressId) {
            return sendSuccessResponse(res, "Billing address already selected", {
                selectedBillingAddress: user.selectedBillingAddress
            });
        }

        // Update selected billing address
        user.selectedBillingAddress = addressId;
        await user.save();

        return sendSuccessResponse(res, "Billing address selected successfully", {
            selectedBillingAddress: user.selectedBillingAddress
        });

    } catch (error) {
        console.error("Error while selecting billing address:", error.message);
        return sendErrorResponse(res, 500, "Error while selecting billing address", error);
    }
};

export const newOrderController = async (req, res) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const giftWrapCharge = 20;

        const { id: userId } = req.user;
        const { billingAddressId, orderInstruction, isGiftWrap, paymentMethod, couponCode, isCouponApplied } = req.body;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return sendBadRequestResponse(res, "Invalid user ID");
        }

        if (!["COD", "Card", "UPI", "PayPal", "Bank"].includes(paymentMethod)) {
            return sendBadRequestResponse(res, "Invalid payment method");
        }

        // --- Fetch cart ---
        const cart = await cartModel.findOne({ userId })
            .populate([
                { path: "items.productId", select: "name sellerId" },
                { path: "items.productVarientId", select: "price stock sku" }
            ])
            .session(session);

        if (!cart || cart.items.length === 0) {
            return sendBadRequestResponse(res, "Cart is empty");
        }

        let billingAmount = 0;
        let discountAmount = 0;
        let giftWrapAmount = 0;
        const orderProducts = [];
        let sellerId = null;

        // --- Validate stock & prepare product snapshots ---
        for (const item of cart.items) {
            const product = item.productId;
            const variant = item.productVarientId;

            if (!variant || variant.stock < item.quantity) {
                return sendBadRequestResponse(res, `Product ${product.name} insufficient stock`);
            }

            const unitPrice = variant.price.discounted && variant.price.discounted > 0 ? variant.price.discounted : variant.price.original;
            const subtotal = roundToTwo(unitPrice * item.quantity);
            billingAmount += subtotal;

            // Set sellerId (assuming all products are from same seller)
            if (product.sellerId && !sellerId) {
                sellerId = product.sellerId;
            }

            orderProducts.push({
                productId: product._id,
                variantId: variant._id,
                sku: variant.sku,
                name: product.name,
                quantity: item.quantity,
                price: unitPrice,
                subtotal
            });
        }

        // Check if we have valid seller ID
        if (!sellerId) {
            return sendBadRequestResponse(res, "No valid seller found for products");
        }

        // --- Apply gift wrap charge if selected ---
        if (isGiftWrap === true) {
            giftWrapAmount = giftWrapCharge;
        }

        // --- Apply coupon if any ---
        if (isCouponApplied && couponCode) {
            const coupon = await couponModel.findOne({ code: couponCode.toUpperCase() }).session(session);
            if (!coupon) return sendBadRequestResponse(res, "Invalid coupon code");
            if (!coupon.isActive) return sendBadRequestResponse(res, "Coupon inactive");
            if (coupon.expiryDate < new Date()) return sendBadRequestResponse(res, "Coupon expired");

            if (coupon.discountType === "percentage") {
                discountAmount = roundToTwo((coupon.discountValue / 100) * billingAmount);
                if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) discountAmount = coupon.maxDiscount;
            } else if (coupon.discountType === "fixed") {
                discountAmount = Math.min(coupon.discountValue, billingAmount);
            }

            await couponModel.findByIdAndUpdate(coupon._id, { $addToSet: { usedBy: userId } }, { session });
        }

        // Calculate final total amount (billing - discount + gift wrap)
        const totalAmount = roundToTwo(billingAmount - discountAmount + giftWrapAmount);

        // --- Prepare delivery ---
        const deliveryExpected = new Date();
        deliveryExpected.setDate(deliveryExpected.getDate() + 7);

        // --- Create Order ---
        const newOrder = new Order({
            userId,
            sellerId: sellerId,
            products: orderProducts,
            billingAmount,
            discountAmount,
            giftWrapAmount, // Add gift wrap amount to order
            isGiftWrap: !!isGiftWrap, // Store gift wrap preference
            totalAmount,
            orderInstruction: orderInstruction,
            couponCode: couponCode || null,
            isCouponApplied: !!(isCouponApplied && couponCode),
            deliveryExpected,
            payment: {
                method: paymentMethod,
                status: paymentMethod === "COD" ? "Pending" : "Paid",
                transactionId: paymentMethod !== "COD" ? `TXN-${Date.now()}-${nanoid(8)}` : null
            }
        });

        const savedOrder = await newOrder.save({ session });

        // --- Update stock for all variants ---
        for (const item of cart.items) {
            const stockUpdate = await ProductVariant.updateOne(
                { _id: item.productVarientId._id, stock: { $gte: item.quantity } },
                { $inc: { stock: -item.quantity } },
                { session }
            );
            if (stockUpdate.modifiedCount === 0) throw new Error(`Stock update failed for variant ${item.variantId}`);
        }

        // --- Add order to seller ---
        await sellerModel.findByIdAndUpdate(sellerId, { $push: { orders: savedOrder._id } }, { session });

        // --- Clear user cart ---
        cart.items = [];
        await cart.save({ session });

        await session.commitTransaction();

        return sendSuccessResponse(res, "Order placed successfully", {
            orderId: savedOrder._id,
            billingAmount,
            discountAmount,
            giftWrapAmount,
            totalAmount,
            products: orderProducts,
            deliveryExpected,
            sellerId: sellerId,
            isGiftWrap: !!isGiftWrap
        });

    } catch (error) {
        await session.abortTransaction();
        console.error("Order creation error:", error);
        return sendErrorResponse(res, 500, "Error placing order", error.message);
    } finally {
        session.endSession();
    }
};
// ======================================================================================

export const myOrderController = async (req, res) => {
    try {
        const { id: userId } = req.user;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return sendErrorResponse(res, 400, "Valid UserID is required");
        }

        // Fetch active orders (excluding completed/cancelled statuses)
        const orders = await orderModel
            .find({
                userId,
                orderStatus: {
                    $in: ["Pending", "Order Confirmed", "Processing", "Shipped", "Out For Delivery"]
                }
            })
            .populate("userId", "name email billingAddress")
            .populate("sellerId", "mobileNo businessName pickUpAddr")
            .populate([
                {
                    path: "products.productId",
                    model: "Product",
                    select: "title mainCategory category subCategory brand sellerId"
                },
                {
                    path: "products.variantId",
                    model: "ProductVariant"
                }
            ])
            .sort({ createdAt: -1 });

        if (!orders || orders.length === 0) {
            return sendSuccessResponse(res, "No active orders found", { orders: [] });
        }

        // Format orders
        // const formattedOrders = orders.map((order) => ({
        //     _id: order._id,
        //     orderId: order.orderId,
        //     products: order.products,
        //     billingAmount: order.billingAmount,
        //     discountAmount: order.discountAmount,
        //     totalAmount: order.totalAmount,
        //     couponCode: order.couponCode,
        //     isCouponApplied: order.isCouponApplied,
        //     orderStatus: order.orderStatus,
        //     deliveryExpected: order.deliveryExpected,
        //     deliveredAt: order.deliveredAt,
        //     createdAt: order.createdAt,
        //     orderInstruction: order.orderInstruction,
        //     payment: order.payment,
        //     seller: order.sellerId, // Include seller info
        //     timeline: order.timeline, // Include timeline
        //     userAddress: order.userAddress, // From order model
        //     userBillingAddress: order.userBillingAddress // From order model
        // }));

        return sendSuccessResponse(res, "Active orders fetched successfully", {
            orders: orders,
            count: orders.length
        });

    } catch (error) {
        console.error("Error fetching user orders:", error);
        return sendErrorResponse(res, 500, "Error fetching user orders", error.message);
    }
};

export const myHistoryOrderController = async (req, res) => {
    try {
        const { id: userId } = req.user;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return sendErrorResponse(res, 400, "Valid UserID is required");
        }

        // Fetch completed/cancelled orders
        const orders = await orderModel
            .find({
                userId,
                orderStatus: {
                    $in: ["Delivered", "Cancelled", "Returned"]
                }
            })
            .populate("userId", "name email")
            .populate("sellerId", "businessName")
            .sort({ createdAt: -1 });

        if (!orders || orders.length === 0) {
            return sendSuccessResponse(res, "No order history found", { orders: [] });
        }

        // Format response
        const formattedOrders = orders.map((order) => ({
            _id: order._id,
            orderId: order.orderId,
            products: order.products,
            billingAmount: order.billingAmount,
            discountAmount: order.discountAmount,
            totalAmount: order.totalAmount,
            couponCode: order.couponCode,
            isCouponApplied: order.isCouponApplied,
            orderStatus: order.orderStatus,
            deliveryExpected: order.deliveryExpected,
            deliveredAt: order.deliveredAt,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            orderInstruction: order.orderInstruction,
            payment: order.payment,
            seller: order.sellerId,
            timeline: order.timeline,
            reasonForCancel: order.reasonForCancel,
            userAddress: order.userAddress,
            userBillingAddress: order.userBillingAddress
        }));

        return sendSuccessResponse(res, "Order history fetched successfully", {
            orders: formattedOrders,
            count: formattedOrders.length
        });

    } catch (error) {
        console.error("Error fetching order history:", error);
        return sendErrorResponse(res, 500, "Error fetching order history", error.message);
    }
};



export const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().populate("userId").populate("sellerId").sort({ createdAt: -1 });
        if (!orders || orders.length === 0) {
            return sendErrorResponse(res, 404, "No orders found");
        }
        return sendSuccessResponse(res, "All orders fetched successfully", orders);
    } catch (err) {
        console.log(err);
        return sendErrorResponse(res, 500, "Error during getAllOrders", err);
    }
}

export const getSellerAllOrdersController = async (req, res) => {
    try {
        const { _id: sellerId } = req?.user;
        if (!sellerId && !mongoose.Types.ObjectId.isValid(sellerId)) {
            return sendErrorResponse(res, 400, "SellerID is required");
        }
        const orders = await orderModel.find({ sellerId }).populate("userId");
        const populatedOrders = orders.map(order => {
            const user = order.userId;
            const deliveryAddress = user.billingaddress.find(addr =>
                addr._id.toString() === order.deliveryAddress.toString()
            );
            return {
                ...order.toObject(),
                deliveryAddress
            };
        });

        if (!orders || orders.length === 0) {
            return sendErrorResponse(res, 404, "No orders found for this seller");
        }
        return sendSuccessResponse(res, "Seller orders fetched successfully", orders);
    } catch (error) {
        console.log(error);
        return sendErrorResponse(res, 500, "Error during getSellerAllOrdersController", error);
    }
}

export const updateOrderStatusController = async (req, res) => {
    try {
        const { orderId } = req?.params;
        const { status } = req?.body;
        if (!orderId && !mongoose.Types.ObjectId.isValid(orderId)) {
            return sendErrorResponse(res, 400, "OrderID is required");
        }
        if (!status) {
            return sendErrorResponse(res, 400, "Status is required");
        }
        const order = await orderModel.findById(orderId);
        if (!order) {
            return sendErrorResponse(res, 404, "Order not found");
        }
        order.orderStatus = status;
        await order.save();
        return sendSuccessResponse(res, "Order status updated successfully", order);

    } catch (error) {
        console.log(error.message);
        return sendErrorResponse(res, 500, "Error during updateOrderStatusController", error.message);
    }
}

export const cancelMyOrderController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { id: userId } = req.user;
        const { reasonForCancel, comment } = req.body;

        if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
            return sendErrorResponse(res, 400, "Valid OrderID is required");
        }

        const order = await orderModel.findById(orderId);
        if (!order) {
            return sendErrorResponse(res, 404, "Order not found");
        }

        if (order.userId.toString() !== userId) {
            return sendErrorResponse(res, 403, "You are not authorized to cancel this order");
        }

        if (order.orderStatus === "Cancelled") {
            return sendErrorResponse(res, 400, "Order is already cancelled");
        }

        order.orderStatus = "Cancelled";
        order.reasonForCancel = reasonForCancel;
        order.comment = comment;

        await order.save();

        return sendSuccessResponse(res, "Order cancelled successfully", order);
    } catch (error) {
        console.error(error.message);
        return sendErrorResponse(res, 500, "Error during cancelMyOrderController", error.message);
    }
};


export const orderSummeryController = async (req, res) => {
    try {
        const { id: userId } = req?.user;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return sendErrorResponse(res, 400, "Valid UserID is required");
        }

        // Fetch user's orders
        const orders = await orderModel
            .find({ userId })
            .populate({ path: "products.productId", model: "Product" })
            .populate({ path: "products.variantId", model: "ProductVariant" });

        if (!orders || orders.length === 0) {
            return sendErrorResponse(res, 404, "No orders found for this user");
        }

        // Flatten all products across orders
        const allProducts = orders.flatMap(order => order.products);

        // Calculate totals
        const totalItems = allProducts.reduce((sum, p) => sum + (p.quantity || 0), 0);

        const subtotal = allProducts.reduce(
            (sum, p) => sum + ((p.price || 0) * (p.quantity || 0)),
            0
        );

        // Example fees
        const estimatedDelivery = 100; // AU$
        const platformFee = 13;        // AU$
        const total = subtotal + estimatedDelivery + platformFee;

        const summary = {
            items: totalItems,
            subtotal,
            estimatedDelivery,
            platformFee,
            total
        };

        return sendSuccessResponse(res, "Order summary fetched successfully", summary);

    } catch (error) {
        console.error(error.message);
        return sendErrorResponse(res, 500, "Error during orderSummeryController", error.message);
    }
};

export const addOrderInstructionsController = async (req, res) => {
    try {
        const { orderId } = req?.params
        const { order_notes } = req?.body;
        if (!order_notes && !req.body && !id) {
            return sendBadRequestResponse(res, "order_notes or userId iS require to Request");
        }

        const orderNotes = await orderModel.findByIdAndUpdate({ _id: orderId }, {
            orderInstruction: order_notes
        }, { new: true });

        if (!orderNotes) {
            return sendNotFoundResponse(res, "Order Not Found");
        }

        return sendSuccessResponse(res, "Order instruction (notes) add successfull", orderNotes);

    } catch (error) {
        console.log(error);
        return sendErrorResponse(res, 500, "Error during Add order instruction", error)
    }
}


//verify post code

export const verifyAUPostCodeController = async (req, res) => {
    try {
        const { postcode } = req?.query;

        if (!postcode || typeof postcode !== 'string') {
            return sendBadRequestResponse(res, "Please provide a valid 'postcode' as a query parameter.");
        }


        const cleanedPostcode = postcode.trim();
        if (!/^\d{4}$/.test(cleanedPostcode)) {
            return sendBadRequestResponse(res, "Postcode must be a 4-digit number (e.g., 0800, 3000).");
        }

        const apiUrl = `https://australiansuburbs.au/api/lookup_postcode?postcode=${cleanedPostcode}`;
        const response = await axios.get(apiUrl);

        if (!response || !response.data) {
            return sendNotFoundResponse(res, "No response received from postcode lookup service.");
        }

        const data = response.data;

        if (data.postcode && Array.isArray(data.suburbs)) {
            return sendSuccessResponse(res, "Postcode verified successfully", {
                postcode: data.postcode,
                suburbs: data.suburbs,
                state: data.state
            });
        }

        if (data.error) {
            return sendNotFoundResponse(res, "This postcode does not exist in Australia.", {
                input: cleanedPostcode,
                apiError: data.error
            });
        }

        return sendErrorResponse(res, 500, "Unexpected response structure from API", data);

    } catch (error) {
        console.error("Error verifying postcode:", error.message);
        return sendErrorResponse(res, 500, "Internal error verifying postcode", error);
    }
};

export const getShippingEstimates = async (req, res) => {
    try {
        const { postcode } = req.body;

        // Validate postcode
        if (!postcode || typeof postcode !== "string" || !/^\d{4}$/.test(postcode.trim())) {
            return sendBadRequestResponse(res, "Please provide a valid 4-digit 'postcode' in the request body.");
        }

        const cleanedPostcode = postcode.trim();
        const API_KEY = "92944ac9-842b-46e1-b527-766ddaa48d20";

        const fromPostcode = "2000";
        const toPostcode = cleanedPostcode;
        const length = 22;
        const width = 16;
        const height = 7.7;
        const weight = 1.5;
        const serviceCode = "AUS_PARCEL_REGULAR";

        // STEP 1: Verify postcode
        const lookupUrl = `https://australiansuburbs.au/api/lookup_postcode?postcode=${cleanedPostcode}`;
        const apiRES = await axios.get(lookupUrl);

        if (!apiRES?.data) {
            return sendNotFoundResponse(res, "No response received from postcode lookup service.");
        }

        const data = apiRES.data;

        if (!(data.postcode && Array.isArray(data.suburbs))) {
            return sendNotFoundResponse(res, "This postcode does not exist in Australia.");
        }

        // STEP 2: Fetch shipping estimate
        const queryParams = new URLSearchParams({
            from_postcode: fromPostcode,
            to_postcode: toPostcode,
            length: length.toString(),
            width: width.toString(),
            height: height.toString(),
            weight: weight.toString(),
            service_code: serviceCode,
        }).toString();

        const ausPostUrl = `https://digitalapi.auspost.com.au/postage/parcel/domestic/calculate.json?${queryParams}`;

        const response = await axios.get(ausPostUrl, {
            headers: { "AUTH-KEY": API_KEY },
        });

        if (response?.data?.postage_result) {
            return sendSuccessResponse(res, "Shipping estimate retrieved successfully.", {
                postcode: data.postcode,
                suburbs: data.suburbs,
                state: data.state,
                estimate: response.data.postage_result,
            });
        } else {
            return sendErrorResponse(res, 502, "Unexpected response from Australia Post API", response.data);
        }
    } catch (error) {
        console.error("Shipping Estimate Error:", error.message);
        return sendErrorResponse(res, 500, "Error retrieving shipping estimates", {
            message: error.message,
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
        });
    }
};


