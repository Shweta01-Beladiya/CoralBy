import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { sendErrorResponse, sendNotFoundResponse, sendSuccessResponse, sendBadRequestResponse } from "../utils/Response.utils.js";
import orderModel from "../model/order.model.js";
import paymentModel from "../model/payment.model.js";
import PDFDocument from "pdfkit";
import productModel from "../model/product.model.js";

export const makeNewPaymentController = async (req, res) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const userId = req?.user?.id;
        const {
            orderId,
            paymentMethod,
            transactionId,
            cardDetails,
            upiDetails,
            paypalDetails,
            bankTransferDetails,
        } = req.body;

        // Basic validation
        if (!userId || !orderId || !paymentMethod) {
            return sendBadRequestResponse(res, "Missing required fields: userId, orderId, paymentMethod");
        }

        const validMethods = ["COD", "Card", "UPI", "PayPal", "Bank"];
        if (!validMethods.includes(paymentMethod)) {
            return sendBadRequestResponse(res, "Invalid payment method");
        }

        // Method-specific validation
        if (paymentMethod === "COD" && (cardDetails || upiDetails || paypalDetails || bankTransferDetails || transactionId)) {
            return sendBadRequestResponse(res, "COD should not include card/UPI/PayPal/bank details or transactionId");
        }
        if (paymentMethod === "Card" && !cardDetails) return sendBadRequestResponse(res, "Card details required");
        if (paymentMethod === "UPI" && !upiDetails) return sendBadRequestResponse(res, "UPI details required");
        if (paymentMethod === "PayPal" && !paypalDetails) return sendBadRequestResponse(res, "PayPal details required");
        if (paymentMethod === "Bank" && !bankTransferDetails) return sendBadRequestResponse(res, "Bank transfer details required");

        // Fetch order
        const order = await orderModel.findOne({ _id: orderId, userId })
            .populate("products.productId", "sellerId")
            .session(session);

        if (!order) return sendNotFoundResponse(res, "Order not found or does not belong to user");

        // Prevent duplicate payment
        const existingPayment = await paymentModel.findOne({ orderId }).session(session);
        if (existingPayment) return sendBadRequestResponse(res, "Payment already exists for this order");

        // Payment amount
        const amount = order.totalAmount;

        // Payment status
        let paymentStatus = "Pending";
        let finalTransactionId = null;
        let paymentDate = null;

        if (paymentMethod !== "COD") {
            paymentStatus = "Paid";
            finalTransactionId = transactionId || `TXN-${Date.now()}-${nanoid(8)}`;
            paymentDate = new Date();
        }

        // Extract unique sellerIds
        const sellerIds = [...new Set(order.products.map(p => p.productId.sellerId).filter(Boolean))];

        // Create payment
        const paymentData = {
            userId,
            orderId,
            amount,
            paymentMethod,
            paymentStatus,
            transactionId: finalTransactionId,
            paymentDate,
            sellerIds,
        };

        if (paymentMethod !== "COD") {
            if (cardDetails) paymentData.cardDetails = cardDetails;
            if (upiDetails) paymentData.upiDetails = upiDetails;
            if (paypalDetails) paymentData.paypalDetails = paypalDetails;
            if (bankTransferDetails) paymentData.bankTransferDetails = bankTransferDetails;
        }

        const payment = new paymentModel(paymentData);
        await payment.save({ session });

        // Update order and product sold count
        if (paymentStatus === "Paid") {
            order.orderStatus = "Order Confirmed";
            order.timeline.confirmedAt = new Date();
            await order.save({ session });

            for (const item of order.products) {
                await productModel.findByIdAndUpdate(
                    item.productId,
                    { $inc: { sold: item.quantity } },
                    { session }
                );
            }
        }

        await session.commitTransaction();

        // Populate final response
        const populatedPayment = await paymentModel.findById(payment._id)
            .populate("userId", "firstName lastName email mobileNo")
            .populate("sellerIds", "email mobileNo businessName") // ✅ populate sellerIds
            .populate({
                path: "orderId",
                select: "-__v -updatedAt",
                populate: [
                    {
                        path: "products.productId",
                        model: "Product",
                        select: "title mainCategory subCategory brand",
                        populate: {
                            path: "brand",
                            model: "Brand",
                            select: "brandName brandImage"
                        }
                    },
                    {
                        path: "products.variantId",
                        model: "ProductVariant",
                        select: "color size price stock"
                    }
                ]
            });

        return sendSuccessResponse(res, "Payment processed successfully", populatedPayment);

    } catch (error) {
        await session.abortTransaction();
        console.error("Payment Error:", error);
        return sendErrorResponse(res, 500, "Payment processing failed", error.message);
    } finally {
        session.endSession();
    }
};

export const myPaymentController = async (req, res) => {
    try {
        const userId = req?.user?.id;
        if (!userId) {
            return sendBadRequestResponse(res, "User ID is required");
        }

        // Fetch all payments for this user
        const payments = await paymentModel.find({ userId })
            .populate("userId", "firstName lastName email mobileNo address billingaddress") // user info with addresses
            .populate({
                path: "orderId",
                select: "-__v -updatedAt",
                populate: [
                    {
                        path: "sellerId",
                        model: "seller",
                        select: "email mobileNo avatar businessName"
                    },
                    {
                        path: "products.productId",
                        model: "Product",
                        select: "title mainCategory subCategory sellerId",
                        populate: {
                            path: "brand",
                            model: "Brand",
                            select: "brandName brandImage"
                        }
                    },
                    {
                        path: "products.variantId",
                        model: "ProductVariant",
                        select: "color size price stock"
                    }
                ]
            })
            .populate({
                path: "sellerIds",
                model: "seller",
                select: "firstName lastName email mobileNo avatar businessName"
            })
            .sort({ createdAt: -1 });

        return sendSuccessResponse(res, "User payments fetched successfully", payments);
    } catch (error) {
        console.error("My Payment Controller Error:", error.message);
        return sendErrorResponse(res, 500, "Server error", error.message);
    }
};

export const getSellerPaymentsController = async (req, res) => {
    try {
        const sellerId = req.user._id;
        if (!sellerId) {
            return res.status(400).json({ success: false, message: "Seller ID is required" });
        }

        // Fetch payments with nested order and items
        const payments = await paymentModel.find()
            .populate("userId", "name email mobileNo")
            .populate({ path: "orderId", select: "-payment" })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: payments.length,
            data: payments
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


export const downloadInvoiceController = async (req, res) => {
    let doc;
    try {
        const { paymentId } = req.params;

        if (!paymentId || !mongoose.Types.ObjectId.isValid(paymentId)) {
            return res.status(400).json({ success: false, message: "Valid payment ID is required" });
        }

        const payment = await paymentModel.findById(paymentId)
            .populate({
                path: "userId",
                select: "firstName lastName email billingaddress"
            })
            .populate({
                path: "orderId",
                populate: [
                    { path: "products.productId", select: "title brand mainCategory subCategory" },
                    { path: "products.variantId" }
                ]
            });

        if (!payment) {
            return res.status(404).json({ success: false, message: "Payment not found" });
        }

        // --- PDF Setup ---
        doc = new PDFDocument({ size: "A4", margin: 50 });
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=INVOICE_${paymentId}.pdf`);
        doc.pipe(res);

        // ===== Logo & Title =====
        doc
            .fillColor("#2E86C1")
            .fontSize(26)
            .text("CORALBY CHOICE", { align: "left" })
            .moveUp()
            .fontSize(24)
            .text("INVOICE", { align: "right", underline: true });
        doc.moveDown(1.5);

        // ===== Invoice & Customer Info Table =====
        const tableStartX = 50;
        let y = doc.y;
        const rowHeight = 20;
        const user = payment.userId;
        const addr = user.billingaddress?.[0];

        const invoiceData = [
            ["Invoice ID", payment._id.toString()],
            ["Payment Method", payment.paymentMethod],
            ["Payment Status", payment.paymentStatus],
            ["Payment Date", new Date(payment.paymentDate).toLocaleDateString()],
            ["Customer Name", `${user.firstName} ${user.lastName}`],
            ["Email", user.email],
        ];

        if (addr) {
            invoiceData.push(
                ["Address", `${addr.firstName} ${addr.lastName}, ${addr.address}, ${addr.city}, ${addr.state} - ${addr.zipcode}`],
                ["Phone", addr.phone]
            );
        }

        const invoiceTableWidth = 500;
        doc.fillColor("#1E90FF");
        invoiceData.forEach(row => {
            doc.rect(tableStartX, y, invoiceTableWidth, rowHeight).fillOpacity(0.1).fill("#1E90FF").fillOpacity(1);
            doc.fillColor("#000").fontSize(12).font("Helvetica-Bold")
                .text(row[0], tableStartX + 5, y + 5, { width: 150, align: "left" });
            doc.font("Helvetica").text(row[1], tableStartX + 160, y + 5, { width: 335, align: "left" });
            doc.rect(tableStartX, y, invoiceTableWidth, rowHeight).stroke();
            y += rowHeight;
        });

        y += 20;

        // ===== Products Table =====
        const products = payment.orderId.products;
        const tableColWidths = { no: 50, product: 220, qty: 60, price: 80, subtotal: 90 };
        const tableWidth = Object.values(tableColWidths).reduce((a, b) => a + b, 0);

        // Table header
        const headers = ["No", "Product", "Qty", "Price", "Subtotal"];
        let x = tableStartX;
        doc.fillColor("#1E90FF").font("Helvetica-Bold").fontSize(12);
        headers.forEach((header, index) => {
            const w = Object.values(tableColWidths)[index];
            doc.rect(x, y, w, rowHeight).fillOpacity(0.2).fill("#1E90FF").fillOpacity(1);
            doc.fillColor("#000").text(header, x + 5, y + 5, { width: w - 10, align: "left" });
            x += w;
        });
        // Header border
        x = tableStartX;
        Object.values(tableColWidths).forEach(w => { doc.rect(x, y, w, rowHeight).stroke(); x += w; });
        y += rowHeight;

        // Table rows
        products.forEach((item, index) => {
            const product = item.productId;
            const variant = item.variantId || {};
            const price = variant.price?.original || 0;
            const currency = variant.price?.currency || "AUD";

            if (index % 2 === 0) {
                doc.rect(tableStartX, y, tableWidth, rowHeight).fillOpacity(0.05).fill("#1E90FF").fillOpacity(1);
            }

            x = tableStartX;
            const rowValues = [
                index + 1,
                `${product.title} (${variant.color || "N/A"}, Size: ${variant.size || "N/A"})`,
                item.quantity,
                `${price} ${currency}`,
                `${item.subtotal || 0} ${currency}`
            ];

            rowValues.forEach((val, i) => {
                const w = Object.values(tableColWidths)[i];
                doc.fillColor("#000").font("Helvetica").fontSize(12).text(val.toString(), x + 5, y + 5, { width: w - 10, align: "left" });
                doc.rect(x, y, w, rowHeight).stroke();
                x += w;
            });

            y += rowHeight;
        });

        y += 20;

        // ===== Totals Table =====
        const totalsData = [
            ["Billing Amount", `${payment.orderId.billingAmount || 0} AUD`],
            ["Discount", `${payment.orderId.discountAmount || 0} AUD`],
            ["Coupon", payment.orderId.appliedCoupon?.code || "N/A"],
            ["Total Amount", `${payment.amount || 0} AUD`]
        ];

        totalsData.forEach(row => {
            const isTotal = row[0] === "Total Amount";
            const rowHeightTotal = 20;
            if (isTotal) doc.rect(tableStartX + 300, y, 200, rowHeightTotal).fillOpacity(0.1).fill("#228B22").fillOpacity(1);

            doc.fillColor("#000").font(isTotal ? "Helvetica-Bold" : "Helvetica").fontSize(12)
                .text(row[0], tableStartX + 300 + 5, y + 5, { width: 100, align: "left" })
                .text(row[1], tableStartX + 400 + 5, y + 5, { width: 100, align: "left" });

            doc.rect(tableStartX + 300, y, 200, rowHeightTotal).stroke();
            y += rowHeightTotal;
        });

        doc.end();

    } catch (error) {
        if (doc) doc.end();
        console.error("Invoice error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const paymentStatusChangeController = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { paymentId } = req.params;
        let { paymentStatus } = req.body;

        if (!paymentId || !mongoose.Types.ObjectId.isValid(paymentId)) {
            return res.status(400).json({ success: false, message: "Valid payment ID required" });
        }

        paymentStatus = paymentStatus?.toLowerCase();
        const allowedStatuses = ["pending", "completed", "failed", "refunded"];
        if (!paymentStatus || !allowedStatuses.includes(paymentStatus)) {
            return res.status(400).json({
                success: false,
                message: `Payment status must be one of: ${allowedStatuses.join(", ")}`
            });
        }

        const payment = await paymentModel.findById(paymentId).session(session);
        if (!payment) return res.status(404).json({ success: false, message: "Payment not found" });

        const order = await orderModel.findById(payment.orderId).session(session);
        if (!order) return res.status(404).json({ success: false, message: "Order not found" });

        // Increment/decrement sold counts only when needed
        const updateSoldCount = async (multiplier = 1) => {
            for (const item of order.products || []) {
                if (!item.productId) continue;
                await productModel.findByIdAndUpdate(
                    item.productId,
                    {
                        $inc: { sold: (item.quantity || 1) * multiplier },
                        $set: multiplier > 0 ? { lastSoldAt: new Date() } : {}
                    },
                    { session }
                );
            }
        };

        switch (paymentStatus) {
            case "completed":
                if (payment.paymentStatus !== "completed") await updateSoldCount(1);
                order.orderStatus = "Delivered";
                order.payment = { ...order.payment, status: "Paid" };
                break;
            case "failed":
                order.orderStatus = "Cancelled";
                order.payment = { ...order.payment, status: "Failed" };
                break;
            case "refunded":
                if (payment.paymentStatus === "completed") await updateSoldCount(-1);
                order.orderStatus = "Returned";
                order.payment = { ...order.payment, status: "Refunded" };
                break;
            default:
                order.orderStatus = "Pending";
                order.payment = { ...order.payment, status: "Pending" };
        }

        payment.paymentStatus = paymentStatus;

        await payment.save({ session });
        await order.save({ session });

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            success: true,
            message: `Payment status updated to ${paymentStatus}`,
            payment,
            order
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error("Payment Status Change Error:", error);
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};