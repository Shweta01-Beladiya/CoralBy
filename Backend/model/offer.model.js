import mongoose from "mongoose";


const countdownSchema = new mongoose.Schema({
    days: { type: Number, default: 0 },
    hours: { type: Number, default: 0 },
    minutes: { type: Number, default: 0 },
    seconds: { type: Number, default: 0 },
}, { _id: true });

const offerSchema = new mongoose.Schema(
    {
        section: {
            type: Number,
            default: null
        },
        offerTitle: {
            type: String,
            required: [true, "Offer title is required"],
            trim: true,
        },
        offerDesc: {
            type: String,
            trim: true,
        },
        offerMidText: {
            type: String,
            default: null
        },
        offerImage: {
            type: String,
            required: [true, "Offer image is required"],
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },

        isSpecialOffer: {
            type: Boolean,
            default: false,
        },
        discountPercent: {
            type: Number,
            default: 0,
        },
        headline: {
            type: String,
            trim: true,
        },
        subText: {
            type: String,
            trim: true,
        },
        countdown: countdownSchema,
    },
    {
        timestamps: true,
    }
);

const offerModel = mongoose.model("offer", offerSchema);

export default offerModel;
