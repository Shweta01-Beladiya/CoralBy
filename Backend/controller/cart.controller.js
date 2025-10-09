import mongoose from "mongoose";
import cartModel from "../model/cart.model.js";
import productModel from "../model/product.model.js";
import ProductVariant from "../model/productvarient.model.js";
import { sendSuccessResponse, sendErrorResponse, sendBadRequestResponse, sendNotFoundResponse } from "../utils/Response.utils.js";


export const addToCartController = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const { productId } = req.params;
        const { productVarientId, quantity = 1 } = req.body;

        // === Validate IDs ===
        if (!mongoose.Types.ObjectId.isValid(productId))
            return sendBadRequestResponse(res, "Invalid product ID");
        if (!mongoose.Types.ObjectId.isValid(productVarientId))
            return sendBadRequestResponse(res, "Invalid product variant ID");

        // === Validate Product and Variant ===
        const product = await productModel.findById(productId);
        if (!product) return sendNotFoundResponse(res, "Product not found");

        const variant = await ProductVariant.findOne({ _id: productVarientId, productId });
        if (!variant) return sendNotFoundResponse(res, "Product variant not found");

        // === Find or Create Cart ===
        let cart = await cartModel.findOne({ userId });
        if (!cart) {
            cart = new cartModel({ userId, items: [] });
        }

        // === Check if item already exists ===
        const itemIndex = cart.items.findIndex(
            (item) =>
                item.productId.toString() === productId &&
                item.productVarientId.toString() === productVarientId
        );

        if (itemIndex > -1) {
            // Update quantity (increment or replace)
            cart.items[itemIndex].quantity += Number(quantity);
        } else {
            // Add new item
            cart.items.push({
                productId: new mongoose.Types.ObjectId(productId),
                productVarientId: new mongoose.Types.ObjectId(productVarientId),
                quantity: Number(quantity),
            });
        }

        await cart.save();

        // === Populate Cart Details ===
        await cart.populate([
            {
                path: "items.productId",
                model: "Product",
                select:
                    "productName title description isActive productDetails shippingReturn rating brand mainCategory category subCategory",
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
            },
            {
                path: "items.productVarientId",
                model: "ProductVariant",
                select: "size color price stock",
            },
        ]);

        // === Calculate Total ===
        let totalAmount = 0;
        cart.items.forEach((item) => {
            if (item.productVarientId?.price) {
                const { original, discounted } = item.productVarientId.price;
                const effectivePrice = discounted && discounted > 0 ? discounted : original;
                totalAmount += effectivePrice * item.quantity;
            }
        });

        return sendSuccessResponse(res, "Item added/updated in cart", {
            items: cart.items,
            totalAmount,
        });
    } catch (err) {
        console.error("🛒 Add to cart error:", err);
        return sendErrorResponse(res, 500, "Error adding to cart", err.message);
    }
};

export const getMyCartController = async (req, res) => {
    try {
        const { id: userId } = req?.user;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return sendBadRequestResponse(res, "User ID not found or invalid!");
        }

        const cart = await cartModel.findOne({ userId })
            .populate("userId", "-password -__v")
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

        if (!cart) return sendNotFoundResponse(res, "User cart not found");

        if (cart.items.length === 0) {
            return sendSuccessResponse(res, "Cart is empty! Please add products first.", {
                items: [],
                originalAmount: 0,
                discount: 0,
                finalAmount: 0,
                appliedCoupon: null
            });
        }

        let totalAmount = 0;
        const updatedItems = cart.items.map((item) => {
            const product = item.productId?.toObject?.() || item.productId;
            const variant = item.productVarientId?.toObject?.() || item.productVarientId;

            if (variant?.price) {
                const { original, discounted } = variant.price;
                const effectivePrice = discounted && discounted > 0 ? discounted : original;
                totalAmount += effectivePrice * item.quantity;
            }

            return {
                ...item.toObject(),
                productId: product,
                productVarientId: variant,
            };
        });

        let finalAmount = totalAmount;
        let discount = 0;

        if (cart.appliedCoupon) {
            finalAmount = cart.appliedCoupon.finalAmount || (totalAmount - cart.appliedCoupon.discount);
            discount = cart.appliedCoupon.discount;
        }

        return sendSuccessResponse(res, "My cart items fetched successfully", {
            items: updatedItems,
            originalAmount: totalAmount,
            discount: discount,
            finalAmount: finalAmount,
            appliedCoupon: cart.appliedCoupon || null
        });

    } catch (error) {
        console.error("Error during getMyCartController:", error);
        return sendErrorResponse(res, 500, "Error fetching cart", error.message);
    }
};

export const removeCartController = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const { productId } = req.params;
        const { productVarientId } = req.body;

        // === Validation ===
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return sendBadRequestResponse(res, "Invalid user ID");
        }
        if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
            return sendBadRequestResponse(res, "Invalid product ID");
        }
        if (!productVarientId || !mongoose.Types.ObjectId.isValid(productVarientId)) {
            return sendBadRequestResponse(res, "Invalid product variant ID");
        }

        // === Fetch cart ===
        const cart = await cartModel.findOne({ userId });
        if (!cart) return sendNotFoundResponse(res, "Cart not found");

        const itemIndex = cart.items.findIndex(
            (item) =>
                item.productId.toString() === productId &&
                item.productVarientId.toString() === productVarientId
        );

        if (itemIndex === -1) {
            return sendNotFoundResponse(res, "Product not found in cart");
        }

        // === Remove item ===
        cart.items.splice(itemIndex, 1);
        await cart.save();

        await cart.populate([
            {
                path: "items.productId",
                model: "Product",
                select: "productName title description brand mainCategory category subCategory",
                populate: [
                    { path: "brand", model: "Brand", select: "brandName brandImage" },
                    { path: "mainCategory", model: "MainCategory", select: "mainCategoryName mainCategoryImage" },
                    { path: "category", model: "Category", select: "categoryName categoryImage" },
                    { path: "subCategory", model: "SubCategory", select: "subCategoryName subCategoryImage" },
                ],
            },
            {
                path: "items.productVarientId",
                model: "ProductVariant",
                select: "size color price stock",
            },
        ]);

        let totalAmount = 0;
        cart.items.forEach((item) => {
            if (item.productVarientId?.price) {
                const { original, discounted } = item.productVarientId.price;
                const effectivePrice = discounted && discounted > 0 ? discounted : original;
                totalAmount += effectivePrice * item.quantity;
            }
        });

        return sendSuccessResponse(res, "Product removed from cart successfully", {
            items: cart.items,
            totalAmount,
        });

    } catch (error) {
        console.error("🛒 removeCartController error:", error);
        return sendErrorResponse(res, 500, "Error removing product from cart", error.message);
    }
}