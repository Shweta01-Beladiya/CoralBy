import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    productVarientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductVariant",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be at least 1"],
        default: 1,
    },
});

const CartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
            unique: true,
        },
        items: [CartItemSchema],
        appliedCoupon: {
            code: String,
            couponId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "coupon"
            },
            discount: Number,
            discountType: String,
            percentageValue: Number,
            flatValue: Number,
            originalAmount: Number,
            finalAmount: Number
        }
    },
    { timestamps: true }
);

export default mongoose.model("cart", CartSchema);