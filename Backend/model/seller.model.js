import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
    mobileNo: { type: String, required: [true, "mobileNo iS Required to insert"], default: null },
    email: { type: String, required: [true, "email iS Required to insert"], default: null },
    password: { type: String, required: [true, "password iS Required to insert"], default: null },
    avatar: { type: String, default: null },
    otp: { type: String, default: null },
    GSTIN: { type: String, default: null },
    verified: { type: Boolean, default: false },
    businessName: { type: String, default: null },
    panNumber: { type: String, default: null },
    brandId: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Brand" }
    ],
    businessType: { type: String, default: null },
    businessAddr: { type: String, default: null },
    BankAcNumber: { type: String, default: null },
    ifsc: { type: String, default: null },
    pickUpAddr: [
        {
            houseNo: { type: String, default: null },
            street: { type: String, default: null },
            landmark: { type: String, default: null },
            pincode: { type: String, default: null },
            city: { type: String, default: null },
            state: { type: String, default: null }
        }
    ],
    isSellerAgreementAccept: { type: Boolean, default: false },
    total_product: {
        type: Number
    },
    products: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Product" }
    ],
    orders:[
        {type: mongoose.Schema.Types.ObjectId, ref: "Order"}
    ]
});

const sellerModel = mongoose.model("seller", sellerSchema);

export default sellerModel