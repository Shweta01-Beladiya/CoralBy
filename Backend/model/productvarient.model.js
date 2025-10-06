import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "seller", required: true },

    sku: { type: String, unique: true },

    images: [String],

    color: { type: String, default: null },
    size: { type: String, default: null },
    Occasion: { type: String, default: null },
    Artical_Number: { type: String, unique: true },
    Outer_material: { type: String, default: null },
    Model_name: { type: String, default: null },
    Ideal_for: { type: String, default: null },
    Type_For_Casual: { type: String, default: null },
    Euro_Size: { type: String, default: null },
    Heel_Height: { type: String, default: null },

    price: {
        original: { type: Number, required: true },
        discounted: { type: Number },
        currency: { type: String, default: "AUD" }
    },

    stock: { type: Number, default: 0 },

    weight: { type: String },

}, { timestamps: true });

export default mongoose.model("ProductVariant", productVariantSchema);
