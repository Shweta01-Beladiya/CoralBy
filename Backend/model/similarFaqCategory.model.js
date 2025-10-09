import mongoose from "mongoose";

const similatFaqCategorySchema = mongoose.Schema({
    similarFaqCategoryName: {
        type: String
    }
}, { timestamps: true })

export default mongoose.model("similarFaqCategory", similatFaqCategorySchema)