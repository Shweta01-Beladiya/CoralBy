import mongoose from "mongoose";
import mainFaqCategoryModel from "../model/mainFaqCategory.model.js";
import { ThrowError } from "../utils/Error.utils.js"
import { sendBadRequestResponse, sendNotFoundResponse, sendSuccessResponse } from "../utils/Response.utils.js"

export const createMainFaqCategory = async (req, res) => {
    try {
        const { mainFaqCategoryName, mainFaqCategoryDescription } = req.body;

        if (!mainFaqCategoryName || !mainFaqCategoryDescription) {
            return sendBadRequestResponse(res, "faqCategoryName & mainFaqCategoryDescription are required!!!")
        }

        const checkMainFaqCategory = await mainFaqCategoryModel.findOne({ mainFaqCategoryName })
        if (checkMainFaqCategory) {
            return sendBadRequestResponse(res, "This Category already added...")
        }

        const newMainFaqCategory = await mainFaqCategoryModel.create({ mainFaqCategoryName,mainFaqCategoryDescription })

        return sendSuccessResponse(res, "mainFaqCategory add successfully...", newMainFaqCategory)

    } catch (error) {
        return ThrowError(res, 500, error.message)
    }
}

export const getAllMainFaqCategory = async (req, res) => {
    try {
        const mainFaqCategory = await mainFaqCategoryModel.find({})

        if (!mainFaqCategory || mainFaqCategory.length === 0) {
            return sendNotFoundResponse(res, "No any mainFaqCategory found!!!")
        }

        return sendSuccessResponse(res, "mainFaqCategory fetched Successfully...", mainFaqCategory)

    } catch (error) {
        return ThrowError(res, 500, error.message)
    }
}

export const getMainFaqCategoryById = async (req, res) => {
    try {

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid mainFaqCategoryId!!!")
        }

        const mainFaqCategory = await mainFaqCategoryModel.findById(id)
        if (!mainFaqCategory) {
            return sendNotFoundResponse(res, "mainFaqCategory Not found...")
        }

        return sendSuccessResponse(res, "mainFaqCategory fetched Successfully...", mainFaqCategory)

    } catch (error) {
        return ThrowError(res, 500, error.message)
    }
}

export const updateMainFaqCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid mainFaqCategoryId!!!");
        }

        const mainFaqCategory = await mainFaqCategoryModel.findById(id);
        if (!mainFaqCategory) {
            return sendNotFoundResponse(res, "mainFaqCategory Not found...");
        }

        const { mainFaqCategoryName, mainFaqCategoryDescription } = req.body;

        if (mainFaqCategoryName) {
            const checkMainFaqCategory = await mainFaqCategoryModel.findOne({
                mainFaqCategoryName,
                _id: { $ne: id }
            });
            if (checkMainFaqCategory) {
                return sendBadRequestResponse(res, "This Category already added...");
            }
        }

        const updatedata = req.body;
        const newMainFaqCategory = await mainFaqCategoryModel.findByIdAndUpdate(
            id,
            updatedata,
            { new: true }
        );

        return sendSuccessResponse(
            res,
            "mainFaqCategory updated Successfully...",
            newMainFaqCategory
        );

    } catch (error) {
        return ThrowError(res, 500, error.message);
    }
};

export const deleteMainFaqCategoryById = async (req, res) => {
    try {

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid mainFaqCategoryId!!!")
        }

        const mainFaqCategory = await mainFaqCategoryModel.findById(id)
        if (!mainFaqCategory) {
            return sendNotFoundResponse(res, "mainFaqCategory Not found...")
        }

        const newMainFaqCategory = await mainFaqCategoryModel.findByIdAndDelete(id)

        return sendSuccessResponse(res, "faqCategory deleted Successfully...", newMainFaqCategory)

    } catch (error) {
        return ThrowError(res, 500, error.message)
    }
}