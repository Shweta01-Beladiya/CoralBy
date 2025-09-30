import mongoose from "mongoose";
import MainCategoryModel from "../model/mainCategory.model.js";
import CategoryModel from "../model/category.model.js";
import SubCategoryModel from "../model/subCategory.model.js";
import InsideSubCategoryModel from "../model/insideSubCategory.model.js";
import { ThrowError } from "../utils/Error.utils.js"
import { sendBadRequestResponse, sendNotFoundResponse, sendSuccessResponse } from "../utils/Response.utils.js"

export const createInsideSubCategory = async (req, res) => {
    try {
        const { insideSubCategoryName, mainCategoryId, categoryId, subCategoryId } = req.body;

        if (!insideSubCategoryName || !mainCategoryId || !categoryId || !subCategoryId) {
            return sendBadRequestResponse(res, "insideSubCategoryName, mainCategoryId, categoryId & subCategoryId are required!!!")
        }

        if (mainCategoryId && !mongoose.Types.ObjectId.isValid(mainCategoryId)) {
            return sendBadRequestResponse(res, "Invalid mainCategoryId!");
        }

        if (mainCategoryId) {
            const checkMainCategory = await MainCategoryModel.findById(mainCategoryId);
            if (!checkMainCategory) {
                return sendBadRequestResponse(res, "MainCategory does not exist!");
            }
        }

        if (categoryId && !mongoose.Types.ObjectId.isValid(categoryId)) {
            return sendBadRequestResponse(res, "Invalid categoryId!");
        }

        if (categoryId) {
            const checkCategory = await CategoryModel.findById(categoryId);
            if (!checkCategory) {
                return sendBadRequestResponse(res, "Category does not exist!");
            }
        }

        if (subCategoryId && !mongoose.Types.ObjectId.isValid(subCategoryId)) {
            return sendBadRequestResponse(res, "Invalid subCategoryId!");
        }

        if (subCategoryId) {
            const checkSubCategory = await SubCategoryModel.findById(subCategoryId);
            if (!checkSubCategory) {
                return sendBadRequestResponse(res, "SubCategory does not exist!");
            }
        }

        if (insideSubCategoryName) {
            const checkInsideSubCategory = await InsideSubCategoryModel.findOne({
                insideSubCategoryName,
            });
            if (checkInsideSubCategory) {
                return sendBadRequestResponse(res, "This InsideSubCategory already exists!");
            }
        }

        const newInsideSubCategory = await InsideSubCategoryModel.create({
            mainCategoryId,
            categoryId,
            subCategoryId,
            insideSubCategoryName
        })

        return sendSuccessResponse(res, "InsideSubCategory added successfully...", newInsideSubCategory)

    } catch (error) {
        return ThrowError(res, 500, error.message)
    }
}

export const getAllInsideSubCategory = async (req, res) => {
    try {
        const insideSubCategories = await InsideSubCategoryModel.find({})
            .populate("mainCategoryId")
            .populate("categoryId")
            .populate("subCategoryId")

        if (!insideSubCategories || insideSubCategories.length === 0) {
            return sendNotFoundResponse(res, "No any insideSubCategory found!!!")
        }

        return sendSuccessResponse(res, "InsideSubCategories fetched successfully...", insideSubCategories)

    } catch (error) {
        return ThrowError(res, 500, error.message)
    }
}

export const getInsideSubCategoryById = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid InsideSubCategoryId!!!")
        }

        const insideSubCategory = await InsideSubCategoryModel.findById(id)
            .populate("mainCategoryId")
            .populate("categoryId")
            .populate("subCategoryId")

        if (!insideSubCategory) {
            return sendNotFoundResponse(res, "InsideSubCategory not found...")
        }

        return sendSuccessResponse(res, "InsideSubCategory fetched successfully...", insideSubCategory)

    } catch (error) {
        return ThrowError(res, 500, error.message)
    }
}

export const updateInsideSubCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const { insideSubCategoryName, mainCategoryId, categoryId, subCategoryId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid insideSubCategory id!");
        }

        if (mainCategoryId && !mongoose.Types.ObjectId.isValid(mainCategoryId)) {
            return sendBadRequestResponse(res, "Invalid mainCategoryId!");
        }

        if (mainCategoryId) {
            const checkMainCategory = await MainCategoryModel.findById(mainCategoryId);
            if (!checkMainCategory) {
                return sendBadRequestResponse(res, "MainCategory does not exist!");
            }
        }

        if (categoryId && !mongoose.Types.ObjectId.isValid(categoryId)) {
            return sendBadRequestResponse(res, "Invalid categoryId!");
        }

        if (categoryId) {
            const checkCategory = await CategoryModel.findById(categoryId);
            if (!checkCategory) {
                return sendBadRequestResponse(res, "Category does not exist!");
            }
        }

        if (subCategoryId && !mongoose.Types.ObjectId.isValid(subCategoryId)) {
            return sendBadRequestResponse(res, "Invalid subCategoryId!");
        }

        if (subCategoryId) {
            const checkSubCategory = await SubCategoryModel.findById(subCategoryId);
            if (!checkSubCategory) {
                return sendBadRequestResponse(res, "SubCategory does not exist!");
            }
        }

        if (insideSubCategoryName) {
            const checkInsideSubCategory = await InsideSubCategoryModel.findOne({
                insideSubCategoryName,
                _id: { $ne: id }
            });
            if (checkInsideSubCategory) {
                return sendBadRequestResponse(res, "This InsideSubCategory already exists!");
            }
        }

        const updatedInsideSubCategory = await InsideSubCategoryModel.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedInsideSubCategory) {
            return sendBadRequestResponse(res, "InsideSubCategory not found!");
        }

        return sendSuccessResponse(res, "InsideSubCategory updated successfully!", updatedInsideSubCategory);

    } catch (error) {
        return ThrowError(res, 500, error.message);
    }
};

export const deleteInsideSubCategoryById = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid InsideSubCategoryId!!!")
        }

        const insideSubCategory = await InsideSubCategoryModel.findById(id)
        if (!insideSubCategory) {
            return sendNotFoundResponse(res, "InsideSubCategory not found...")
        }

        const deletedInsideSubCategory = await InsideSubCategoryModel.findByIdAndDelete(id)

        return sendSuccessResponse(res, "InsideSubCategory deleted successfully...", deletedInsideSubCategory)

    } catch (error) {
        return ThrowError(res, 500, error.message)
    }
}

export const getInsideSubCategoriesBySubCategoryId = async (req, res) => {
    try {
        const { subCategoryId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(subCategoryId)) {
            return sendBadRequestResponse(res, "Invalid subCategoryId!!!")
        }

        const checkSubCategory = await SubCategoryModel.findById(subCategoryId);
        if (!checkSubCategory) {
            return sendNotFoundResponse(res, "SubCategory not found...")
        }

        const insideSubCategories = await InsideSubCategoryModel.find({ subCategoryId })
            .populate("mainCategoryId")
            .populate("categoryId")
            .populate("subCategoryId")

        if (!insideSubCategories || insideSubCategories.length === 0) {
            return sendNotFoundResponse(res, "No insideSubCategories found for this subCategory!!!")
        }

        return sendSuccessResponse(res, "InsideSubCategories fetched successfully...", insideSubCategories)

    } catch (error) {
        return ThrowError(res, 500, error.message)
    }
}