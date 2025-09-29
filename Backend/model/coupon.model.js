import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    description: { type: String },
    discountType: { type: String, required: true },
    discountValue: { type: Number, required: true },
    minOrderValue: { type: Number, default: 0 },
    maxDiscount: { type: Number, default: null },
    expiryDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    sellerId: { type: mongoose.Types.ObjectId, ref: "seller", default: null }
}, { timestamps: true });

const couponModel = mongoose.model("coupon", couponSchema);

export default couponModel;