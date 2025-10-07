import mongoose from "mongoose";
import faqCategoryModel from "../model/faqCategory.model.js";
import mainFaqCategoryModel from "../model/mainFaqCategory.model.js";
import { ThrowError } from "../utils/Error.utils.js"
import { sendBadRequestResponse, sendNotFoundResponse, sendSuccessResponse } from "../utils/Response.utils.js"

export const createfaqCategory = async (req, res) => {
    try {
        const { faqCategoryName, mainFaqCategoryId } = req.body;

        if (!faqCategoryName || !mainFaqCategoryId) {
            return sendBadRequestResponse(res, "faqCategoryName and mainFaqCategoryId are required!!!")
        }

        if (!mongoose.Types.ObjectId.isValid(mainFaqCategoryId)) {
            return sendBadRequestResponse(res, "Invalid mainFaqCategoryId!!!")
        }

        const mainCategoryExists = await mainFaqCategoryModel.findById(mainFaqCategoryId);
        if (!mainCategoryExists) {
            return sendNotFoundResponse(res, "Main FAQ Category not found!!!")
        }

        const checkfaqCategory = await faqCategoryModel.findOne({ 
            faqCategoryName,
            mainFaqCategoryId 
        })
        if (checkfaqCategory) {
            return sendBadRequestResponse(res, "This Category already added under this main category...")
        }

        const newfaqCategory = await faqCategoryModel.create({ 
            faqCategoryName, 
            mainFaqCategoryId 
        })

        await newfaqCategory.populate("mainFaqCategoryId");

        return sendSuccessResponse(res, "faqCategory add successfully...", newfaqCategory)

    } catch (error) {
        return ThrowError(res, 500, error.message)
    }
}

export const getAllfaqCategory = async (req, res) => {
    try {
        const faqCategory = await faqCategoryModel.find({})
            .populate("mainFaqCategoryId")

        if (!faqCategory || faqCategory.length === 0) {
            return sendNotFoundResponse(res, "No any faqCategory found!!!")
        }

        return sendSuccessResponse(res, "faqCategory fetched Successfully...", faqCategory)

    } catch (error) {
        return ThrowError(res, 500, error.message)
    }
}

export const getfaqCategoryById = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid faqCategoryId!!!")
        }

        const faqCategory = await faqCategoryModel.findById(id)
            .populate("mainFaqCategoryId")
            
        if (!faqCategory) {
            return sendNotFoundResponse(res, "faqCategory Not found...")
        }

        return sendSuccessResponse(res, "faqCategory fetched Successfully...", faqCategory)

    } catch (error) {
        return ThrowError(res, 500, error.message)
    }
}

export const updatefaqCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid faqCategoryId!!!");
        }

        const faqCategory = await faqCategoryModel.findById(id);
        if (!faqCategory) {
            return sendNotFoundResponse(res, "faqCategory Not found...");
        }

        const { faqCategoryName, mainFaqCategoryId } = req.body;

        // Check if mainFaqCategory exists if provided in update
        if (mainFaqCategoryId) {
            if (!mongoose.Types.ObjectId.isValid(mainFaqCategoryId)) {
                return sendBadRequestResponse(res, "Invalid mainFaqCategoryId!!!")
            }
            
            const mainCategoryExists = await mainFaqCategoryModel.findById(mainFaqCategoryId);
            if (!mainCategoryExists) {
                return sendNotFoundResponse(res, "Main FAQ Category not found!!!")
            }
        }

        if (faqCategoryName) {
            const checkfaqCategory = await faqCategoryModel.findOne({
                faqCategoryName,
                mainFaqCategoryId: mainFaqCategoryId || faqCategory.mainFaqCategoryId,
                _id: { $ne: id }
            });
            if (checkfaqCategory) {
                return sendBadRequestResponse(res, "This Category already added under this main category...");
            }
        }

        const updatedata = req.body;
        const newfaqCategory = await faqCategoryModel.findByIdAndUpdate(
            id,
            updatedata,
            { new: true }
        ).populate("mainFaqCategoryId");

        return sendSuccessResponse(
            res,
            "faqCategory updated Successfully...",
            newfaqCategory
        );

    } catch (error) {
        return ThrowError(res, 500, error.message);
    }
};

export const deletefaqCategoryById = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid faqCategoryId!!!")
        }

        const faqCategory = await faqCategoryModel.findById(id)
        if (!faqCategory) {
            return sendNotFoundResponse(res, "faqCategory Not found...")
        }

        const newfaqCategory = await faqCategoryModel.findByIdAndDelete(id)

        return sendSuccessResponse(res, "faqCategory deleted Successfully...", newfaqCategory)

    } catch (error) {
        return ThrowError(res, 500, error.message)
    }
}

export const getfaqCategoryByMainCategoryId = async (req, res) => {
    try {
        const { mainCategoryId } = req.params

        if (!mongoose.Types.ObjectId.isValid(mainCategoryId)) {
            return sendBadRequestResponse(res, "Invalid mainCategoryId!!!")
        }

        // Check if mainFaqCategory exists
        const mainCategoryExists = await mainFaqCategoryModel.findById(mainCategoryId);
        if (!mainCategoryExists) {
            return sendNotFoundResponse(res, "Main FAQ Category not found!!!")
        }

        const faqCategories = await faqCategoryModel.find({ 
            mainFaqCategoryId: mainCategoryId 
        }).populate("mainFaqCategoryId")

        if (!faqCategories || faqCategories.length === 0) {
            return sendNotFoundResponse(res, "No faq categories found for this main category!!!")
        }

        return sendSuccessResponse(res, "faqCategories fetched Successfully...", faqCategories)

    } catch (error) {
        return ThrowError(res, 500, error.message)
    }
}