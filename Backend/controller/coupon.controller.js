import mongoose from "mongoose";
import CouponModel from "../model/coupon.model.js";
import { ThrowError } from "../utils/Error.utils.js";
import { sendBadRequestResponse, sendNotFoundResponse, sendSuccessResponse, sendErrorResponse } from "../utils/Response.utils.js";
import cartModel from "../model/cart.model.js";
// import OrderModel from "../model/order.model.js";

export const createCoupon = async (req, res) => {
    try {
        const { code, description, discountType, flatValue, percentageValue, minOrderValue, expiryDate, isActive } = req.body;

        // Required fields validation
        if (!code || !description || !discountType || !expiryDate) {
            return sendBadRequestResponse(res, "All required fields must be provided");
        }

        // Validate discountType
        if (!["flat", "percentage"].includes(discountType)) {
            return sendBadRequestResponse(res, "Discount type must be either 'flat' or 'percentage'");
        }

        let finalFlatValue = flatValue || 0;
        let finalPercentageValue = percentageValue || 0;

        // Validate values based on discount type
        if (discountType === "flat") {
            if (!flatValue || flatValue <= 0) {
                return sendBadRequestResponse(res, "Flat value must be provided and greater than 0 for flat discount type");
            }
            // Set percentageValue to 0 for flat coupons
            finalPercentageValue = 0;
        } else if (discountType === "percentage") {
            if (!percentageValue || percentageValue <= 0 || percentageValue > 100) {
                return sendBadRequestResponse(res, "Percentage value must be between 1 and 100 for percentage discount type");
            }
            // Set flatValue to 0 for percentage coupons
            finalFlatValue = 0;
        }

        // Check if coupon code already exists
        const existCoupon = await CouponModel.findOne({ code: code.toUpperCase() });
        if (existCoupon) {
            return sendBadRequestResponse(res, "Coupon code already exists");
        }

        // Parse expiry date (assuming format: "DD/MM/YYYY")
        const [day, month, year] = expiryDate.split("/").map(Number);
        const expiry = new Date(year, month - 1, day, 23, 59, 59, 999);

        // Validate expiry date
        if (expiry < new Date()) {
            return sendBadRequestResponse(res, "Expiry date cannot be in the past");
        }

        const newCoupon = await CouponModel.create({
            code: code.toUpperCase(),
            description,
            discountType,
            flatValue: finalFlatValue,
            percentageValue: finalPercentageValue,
            minOrderValue: minOrderValue || 0,
            expiryDate: expiry,
            isActive: isActive ?? true // Default to true if not provided
        });

        return sendSuccessResponse(res, "Coupon created successfully", newCoupon);
    } catch (error) {
        return ThrowError(res, 500, error.message);
    }
};

export const getAllCoupon = async (req, res) => {
    try {
        const { activeOnly } = req.query;

        let filter = {};
        if (activeOnly === "true") {
            filter = {
                isActive: true,
                expiryDate: { $gt: new Date() }
            };
        }

        const coupons = await CouponModel.find(filter).sort({ createdAt: -1 });

        if (!coupons || coupons.length === 0) {
            return sendNotFoundResponse(res, "No coupons found!");
        }

        return sendSuccessResponse(res, "Coupons fetched successfully", coupons);
    } catch (error) {
        return ThrowError(res, 500, error.message);
    }
};

export const getCouponById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid Coupon ID");
        }

        const coupon = await CouponModel.findById(id);
        if (!coupon) {
            return sendNotFoundResponse(res, "Coupon not found!");
        }

        return sendSuccessResponse(res, "Coupon fetched successfully", coupon);
    } catch (error) {
        return ThrowError(res, 500, error.message);
    }
};

export const updateCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const { code, description, discountType, flatValue, percentageValue, minOrderValue, expiryDate, isActive } = req.body;

        // Validate coupon id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid Coupon ID!");
        }

        // Check if coupon exists
        const existingCoupon = await CouponModel.findById(id);
        if (!existingCoupon) {
            return sendNotFoundResponse(res, "Coupon not found!");
        }

        // Check if code is being updated and if it already exists
        if (code && code !== existingCoupon.code) {
            const existCoupon = await CouponModel.findOne({
                code: code.toUpperCase(),
                _id: { $ne: id } // Exclude current coupon from check
            });
            if (existCoupon) {
                return sendBadRequestResponse(res, "Coupon code already exists");
            }
        }

        // Allowed fields for update
        const allowedUpdates = [
            "code",
            "description",
            "discountType",
            "flatValue",
            "percentageValue",
            "minOrderValue",
            "expiryDate",
            "isActive"
        ];

        const updates = {};
        Object.keys(req.body).forEach((key) => {
            if (allowedUpdates.includes(key)) {
                updates[key] = req.body[key];
            }
        });

        let finalFlatValue = updates.flatValue !== undefined ? updates.flatValue : existingCoupon.flatValue;
        let finalPercentageValue = updates.percentageValue !== undefined ? updates.percentageValue : existingCoupon.percentageValue;

        // Handle discount type validation and value resetting
        if (updates.discountType || updates.flatValue !== undefined || updates.percentageValue !== undefined) {
            const discountType = updates.discountType || existingCoupon.discountType;

            if (discountType === "flat") {
                // For flat discount, ensure flatValue is provided and greater than 0
                if (updates.flatValue !== undefined && updates.flatValue <= 0) {
                    return sendBadRequestResponse(res, "Flat value must be greater than 0");
                }
                // Set percentageValue to 0 for flat coupons
                finalPercentageValue = 0;
                updates.percentageValue = 0;
            } else if (discountType === "percentage") {
                // For percentage discount, ensure percentageValue is valid
                if (updates.percentageValue !== undefined && (updates.percentageValue <= 0 || updates.percentageValue > 100)) {
                    return sendBadRequestResponse(res, "Percentage value must be between 1 and 100");
                }
                // Set flatValue to 0 for percentage coupons
                finalFlatValue = 0;
                updates.flatValue = 0;
            }

            // Update the final values in updates object
            updates.flatValue = finalFlatValue;
            updates.percentageValue = finalPercentageValue;
        }

        // Handle expiry date parsing if provided
        if (updates.expiryDate) {
            const [day, month, year] = updates.expiryDate.split("/").map(Number);
            updates.expiryDate = new Date(year, month - 1, day, 23, 59, 59, 999);

            if (updates.expiryDate < new Date()) {
                return sendBadRequestResponse(res, "Expiry date cannot be in the past");
            }
        }

        // Update code to uppercase if provided
        if (updates.code) {
            updates.code = updates.code.toUpperCase();
        }

        // Update coupon
        const updatedCoupon = await CouponModel.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        );

        return sendSuccessResponse(res, "Coupon updated successfully!", updatedCoupon);

    } catch (error) {
        return ThrowError(res, 500, error.message);
    }
};

export const deleteCoupon = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid Coupon ID!");
        }

        const coupon = await CouponModel.findById(id);
        if (!coupon) {
            return sendNotFoundResponse(res, "Coupon not found!");
        }

        await CouponModel.findByIdAndDelete(id);

        return sendSuccessResponse(res, "Coupon deleted successfully!", { deletedId: id });

    } catch (error) {
        return ThrowError(res, 500, error.message);
    }
};

export const applyCouponController = async (req, res) => {
    try {
        const { code } = req.body;
        const { id: userId } = req.user;

        if (!code) {
            return sendBadRequestResponse(res, "Coupon code is required");
        }

        // Find user's cart
        const cart = await cartModel.findOne({ userId })
            .populate({
                path: "items.productId",
                model: "Product",
                select: "productName title description isActive productDetails shippingReturn rating brand mainCategory category subCategory",
                populate: [
                    {
                        path: "brand",
                        model: "Brand",
                        select: "brandName brandImage",
                    },
                    {
                        path: "mainCategory",
                        model: "MainCategory",
                        select: "mainCategoryName mainCategoryImage",
                    },
                    {
                        path: "category",
                        model: "Category",
                        select: "categoryName categoryImage",
                    },
                    {
                        path: "subCategory",
                        model: "SubCategory",
                        select: "subCategoryName subCategoryImage",
                    },
                ],
            })
            .populate({
                path: "items.productVarientId",
                model: "ProductVariant",
                select: "size color price stock images sku",
            });

        if (!cart) {
            return sendNotFoundResponse(res, "Cart not found");
        }

        if (cart.items.length === 0) {
            return sendBadRequestResponse(res, "Cart is empty. Add products to apply coupon.");
        }

        // Calculate cart total
        let cartTotal = 0;
        cart.items.forEach((item) => {
            if (item.productVarientId?.price) {
                const { original, discounted } = item.productVarientId.price;
                const effectivePrice = discounted && discounted > 0 ? discounted : original;
                cartTotal += effectivePrice * item.quantity;
            }
        });

        // Find and validate coupon
        const coupon = await CouponModel.findOne({
            code: code.toUpperCase(),
            isActive: true
        });

        if (!coupon) {
            return sendNotFoundResponse(res, "Invalid or inactive coupon");
        }

        // Check if coupon is expired
        if (coupon.expiryDate < new Date()) {
            return sendBadRequestResponse(res, "Coupon has expired");
        }

        // Check minimum order value
        if (cartTotal < coupon.minOrderValue) {
            return sendBadRequestResponse(res, `Minimum order value for this coupon is $${coupon.minOrderValue}`);
        }

        // Calculate discount based on discount type
        let discount = 0;
        let finalAmount = cartTotal;

        if (coupon.discountType === "percentage") {
            discount = (cartTotal * coupon.percentageValue) / 100;
        } else if (coupon.discountType === "flat") {
            discount = coupon.flatValue;
        }

        // Ensure discount doesn't exceed cart total
        if (discount > cartTotal) {
            discount = cartTotal;
        }

        finalAmount = cartTotal - discount;

        // Save coupon details to cart
        cart.appliedCoupon = {
            code: coupon.code,
            couponId: coupon._id,
            discount: discount,
            discountType: coupon.discountType,
            percentageValue: coupon.percentageValue, // Store percentageValue
            flatValue: coupon.flatValue, // Store flatValue
            originalAmount: cartTotal,
            finalAmount: finalAmount
        };

        await cart.save();

        // Return updated cart with applied coupon
        return sendSuccessResponse(res, "Coupon applied successfully", {
            cartId: cart._id,
            items: cart.items,
            appliedCoupon: cart.appliedCoupon,
            originalAmount: cartTotal,
            discount,
            finalAmount,
            discountType: coupon.discountType,
            percentageValue: coupon.percentageValue,
            flatValue: coupon.flatValue,
            minOrderValue: coupon.minOrderValue,
            expiryDate: coupon.expiryDate
        });

    } catch (error) {
        console.error("🛒 applyCouponController error:", error);
        return sendErrorResponse(res, 500, "Error applying coupon", error.message);
    }
};

export const removeCouponController = async (req, res) => {
    try {
        const { id: userId } = req.user;

        // Find user's cart
        const cart = await cartModel.findOne({ userId })
            .populate({
                path: "items.productId",
                model: "Product",
                select: "productName title description isActive productDetails shippingReturn rating brand mainCategory category subCategory",
                populate: [
                    {
                        path: "brand",
                        model: "Brand",
                        select: "brandName brandImage",
                    },
                    {
                        path: "mainCategory",
                        model: "MainCategory",
                        select: "mainCategoryName mainCategoryImage",
                    },
                    {
                        path: "category",
                        model: "Category",
                        select: "categoryName categoryImage",
                    },
                    {
                        path: "subCategory",
                        model: "SubCategory",
                        select: "subCategoryName subCategoryImage",
                    },
                ],
            })
            .populate({
                path: "items.productVarientId",
                model: "ProductVariant",
                select: "size color price stock images sku",
            });

        if (!cart) {
            return sendNotFoundResponse(res, "Cart not found");
        }

        // Calculate cart total without coupon
        let cartTotal = 0;
        cart.items.forEach((item) => {
            if (item.productVarientId?.price) {
                const { original, discounted } = item.productVarientId.price;
                const effectivePrice = discounted && discounted > 0 ? discounted : original;
                cartTotal += effectivePrice * item.quantity;
            }
        });

        // Remove applied coupon
        const removedCoupon = cart.appliedCoupon;
        cart.appliedCoupon = undefined;
        await cart.save();

        return sendSuccessResponse(res, "Coupon removed successfully", {
            cartId: cart._id,
            items: cart.items,
            originalAmount: cartTotal,
            finalAmount: cartTotal,
            discount: 0,
            removedCoupon: removedCoupon
        });

    } catch (error) {
        console.error("🛒 removeCouponController error:", error);
        return sendErrorResponse(res, 500, "Error removing coupon", error.message);
    }
};