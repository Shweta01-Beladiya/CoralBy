import mongoose from "mongoose";

const mainFaqCategorySchema = mongoose.Schema({
    mainFaqCategoryName: {
        type: String
    },
    mainFaqCategoryDescription: {
        type: String
    }
}, { timestamps: true })

export default mongoose.model("mainFaqCategory", mainFaqCategorySchema)