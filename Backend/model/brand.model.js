import mongoose from "mongoose";

const brandSchema = mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "seller"
    },
    mainCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MainCategory"
    },
    brandImage: {
        type: String
    },
    brandName: {
        type: String
    },
<<<<<<< HEAD
    isTrustable: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
=======
    brandColor: {
        type: String
    },
}, { timestamps: true })
>>>>>>> 800d51281c7ba20753755b556ba6d05cf6e9cbaa

export default mongoose.model("Brand", brandSchema)