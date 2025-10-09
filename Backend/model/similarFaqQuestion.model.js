import mongoose from "mongoose";

const similarFaqQuestionSchema = mongoose.Schema({
    similarFaqCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "similarFaqCategory"
    },
    similarFaqQuestion: {
        type: String
    },
    similarFaqAnswer: {
        type: String
    },
}, { timestamps: true })

export default mongoose.model("similarFaqQuestion", similarFaqQuestionSchema)