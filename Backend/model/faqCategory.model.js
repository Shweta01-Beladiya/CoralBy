import mongoose from "mongoose";

const faqCategorySchema = mongoose.Schema({
    mainFaqCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "mainFaqCategory"
    },
    faqCategoryName: {
        type: String
    }
}, { timestamps: true })

export default mongoose.model("faqCategory", faqCategorySchema)