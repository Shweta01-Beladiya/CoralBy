import mongoose from "mongoose";
import similarFaqCategoryModel from "../model/similarFaqCategory.model.js";
import { ThrowError } from "../utils/Error.utils.js"
import { sendBadRequestResponse, sendNotFoundResponse, sendSuccessResponse } from "../utils/Response.utils.js"

export const createSimilarFaqCategory = async (req, res) => {
    try {
        const { similarFaqCategoryName } = req.body;

        if (!similarFaqCategoryName) {
            return sendBadRequestResponse(res, "similarFaqCategoryName are required!!!")
        }

        const checkSimilarFaqCategory = await similarFaqCategoryModel.findOne({ similarFaqCategoryName })
        if (checkSimilarFaqCategory) {
            return sendBadRequestResponse(res, "This Category already added...")
        }

        const newSimilarFaqCategory = await similarFaqCategoryModel.create({
            similarFaqCategoryName,
        })

        return sendSuccessResponse(res, "SimilarFaqCategory add successfully...", newSimilarFaqCategory)

    } catch (error) {
        return ThrowError(res, 500, error.message)
    }
}

export const getAllSimilarFaqCategory = async (req, res) => {
    try {
        const similarFaqCategory = await similarFaqCategoryModel.find({})

        if (!similarFaqCategory || similarFaqCategory.length === 0) {
            return sendNotFoundResponse(res, "No any similarFaqCategory found!!!")
        }

        return sendSuccessResponse(res, "similarFaqCategory fetched Successfully...", similarFaqCategory)

    } catch (error) {
        return ThrowError(res, 500, error.message)
    }
}

export const getSimilarFaqCategoryById = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid similarFaqCategoryId!!!")
        }

        const similarFaqCategory = await similarFaqCategoryModel.findById(id)

        if (!similarFaqCategory) {
            return sendNotFoundResponse(res, "similarFaqCategory Not found...")
        }

        return sendSuccessResponse(res, "similarFaqCategory fetched Successfully...", similarFaqCategory)

    } catch (error) {
        return ThrowError(res, 500, error.message)
    }
}

export const updateSimilarFaqCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid similarFaqCategoryId!!!");
        }

        const similarFaqCategory = await similarFaqCategoryModel.findById(id);
        if (!similarFaqCategory) {
            return sendNotFoundResponse(res, "similarFaqCategory Not found...");
        }

        const { similarFaqCategoryName } = req.body;

        if (similarFaqCategoryName) {
            const checksimilarFaqCategory = await similarFaqCategoryModel.findOne({
                similarFaqCategoryName,
                _id: { $ne: id }
            });
            if (checksimilarFaqCategory) {
                return sendBadRequestResponse(res, "This Category already added...");
            }
        }

        const updatedata = req.body;
        const newsimilarFaqCategory = await similarFaqCategoryModel.findByIdAndUpdate(
            id,
            updatedata,
            { new: true }
        )

        return sendSuccessResponse(
            res,
            "similarFaqCategory updated Successfully...",
            newsimilarFaqCategory
        );

    } catch (error) {
        return ThrowError(res, 500, error.message);
    }
};

export const deleteSimilarFaqCategoryById = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid similarFaqCategoryId!!!")
        }

        const similarFaqCategory = await similarFaqCategoryModel.findById(id)
        if (!similarFaqCategory) {
            return sendNotFoundResponse(res, "similarFaqCategory Not found...")
        }

        const newSimilarFaqCategory = await similarFaqCategoryModel.findByIdAndDelete(id)

        return sendSuccessResponse(res, "SimilarFaqCategory deleted Successfully...", newSimilarFaqCategory)

    } catch (error) {
        return ThrowError(res, 500, error.message)
    }
}