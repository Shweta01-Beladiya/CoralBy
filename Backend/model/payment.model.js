import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        index: true,
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
        index: true,
        unique: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ["COD", "Card", "UPI", "PayPal", "Bank"],
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed", "Refunded"],
        required: true,
        default: "Pending",
        index: true,
    },
    transactionId: {
        type: String,
        unique: true,
        sparse: true,
    },
    paymentDate: {
        type: Date,
        default: Date.now,
    },
    sellerIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "seller",
        }
    ],
    cardDetails: {
        cardHolderName: String,
        cardLast4Digits: String,
        cardType: String,
        expiryMonth: Number,
        expiryYear: Number,
    },
    upiDetails: {
        upiId: String,
    },
    paypalDetails: {
        paypalId: String,
        email: String,
    },
    bankTransferDetails: {
        bankName: String,
        accountNumber: String,
        transactionReference: String,
    },
}, { timestamps: true });

const paymentModel = mongoose.model("Payment", paymentSchema);

export default paymentModel;