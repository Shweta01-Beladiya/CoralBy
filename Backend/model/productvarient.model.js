import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "seller", required: true },

    sku: { type: String, unique: true },

    images: [String],

    color: { type: String, default: null },
    size: { type: String, default: null },

    price: {
        original: { type: Number, required: true },
        discounted: { type: Number },
        currency: { type: String, default: "AUD" }
    },

    stock: { type: Number, default: 0 },
    weight: { type: String },

}, { timestamps: true });

export default mongoose.model("ProductVariant", productVariantSchema);
