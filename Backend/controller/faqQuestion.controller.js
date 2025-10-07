import FAQQuestion from '../model/faqQuestion.model.js';
import FAQCategory from '../model/faqCategory.model.js';
import mainFaqCategoryModel from '../model/mainFaqCategory.model.js';
import mongoose from 'mongoose';
import { sendBadRequestResponse, sendNotFoundResponse, sendSuccessResponse } from '../utils/Response.utils.js';
import { ThrowError } from '../utils/Error.utils.js';

export const createFAQQuestion = async (req, res) => {
    try {
        const { mainFaqCategoryId, faqCategoryId, faqQuestion, faqAnswer } = req.body;

        if (!mainFaqCategoryId || !faqCategoryId || !faqQuestion || !faqAnswer) {
            return sendBadRequestResponse(res, "mainFaqCategoryId, faqCategoryId, faqQuestion and faqAnswer are required!");
        }

        if (!mongoose.Types.ObjectId.isValid(mainFaqCategoryId)) {
            return sendBadRequestResponse(res, "Invalid main FAQ category ID!");
        }

        if (!mongoose.Types.ObjectId.isValid(faqCategoryId)) {
            return sendBadRequestResponse(res, "Invalid FAQ category ID!");
        }

        const mainCategoryExists = await mainFaqCategoryModel.findById(mainFaqCategoryId);
        if (!mainCategoryExists) {
            return sendNotFoundResponse(res, "Main FAQ category not found!");
        }

        const categoryExists = await FAQCategory.findById(faqCategoryId);
        if (!categoryExists) {
            return sendNotFoundResponse(res, "FAQ category not found!");
        }

        if (typeof faqQuestion !== 'string' || faqQuestion.trim().length === 0) {
            return sendBadRequestResponse(res, "FAQ question must be a non-empty string!");
        }

        if (typeof faqAnswer !== 'string' || faqAnswer.trim().length === 0) {
            return sendBadRequestResponse(res, "FAQ answer must be a non-empty string!");
        }

        const trimmedQuestion = faqQuestion.trim();

        const existingQuestion = await FAQQuestion.findOne({
            faqCategoryId,
            faqQuestion: {
                $regex: `^${trimmedQuestion.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`,
                $options: 'i'
            }
        });

        if (existingQuestion) {
            return sendBadRequestResponse(res, "This question already exists in this category!");
        }

        const newFAQQuestion = await FAQQuestion.create({
            mainFaqCategoryId,
            faqCategoryId,
            faqQuestion: trimmedQuestion,
            faqAnswer: faqAnswer.trim(),
        });

        await newFAQQuestion.populate('faqCategoryId');
        await newFAQQuestion.populate('mainFaqCategoryId');

        return sendSuccessResponse(res, "FAQ question created successfully!", newFAQQuestion);

    } catch (error) {
        console.error('Create FAQ Question Error:', error);
        return ThrowError(res, 500, error.message);
    }
};

export const getAllFAQQuestions = async (req, res) => {
    try {
        const faqQuestions = await FAQQuestion.find()
            .populate('faqCategoryId')
            .populate('mainFaqCategoryId')

        if (!faqQuestions || faqQuestions.length === 0) {
            return sendNotFoundResponse(res, "No FAQ questions found...")
        }

        return sendSuccessResponse(res, "FAQ questions fetched successfully!", faqQuestions)

    } catch (error) {
        console.error('Get FAQ Questions Error:', error);
        return ThrowError(res, 500, "Server error while fetching FAQ questions");
    }
};

export const getFAQQuestionById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid FAQ question ID!");
        }

        const question = await FAQQuestion.findById(id)
            .populate('faqCategoryId')
            .populate('mainFaqCategoryId');

        if (!question) {
            return sendNotFoundResponse(res, "FAQ question not found!");
        }

        return sendSuccessResponse(res, "FAQ question fetched successfully!", question);

    } catch (error) {
        console.error('Get FAQ Question Error:', error);
        return ThrowError(res, 500, "Server error while fetching FAQ question");
    }
};

export const updateFAQQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const { mainFaqCategoryId, faqCategoryId, faqQuestion, faqAnswer } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid FAQ question ID!");
        }

        const existingQuestion = await FAQQuestion.findById(id);
        if (!existingQuestion) {
            return sendNotFoundResponse(res, "FAQ question not found!");
        }

        if (mainFaqCategoryId) {
            if (!mongoose.Types.ObjectId.isValid(mainFaqCategoryId)) {
                return sendBadRequestResponse(res, "Invalid main FAQ category ID!");
            }

            const mainCategoryExists = await mainFaqCategoryModel.findById(mainFaqCategoryId);
            if (!mainCategoryExists) {
                return sendNotFoundResponse(res, "Main FAQ category not found!");
            }
            existingQuestion.mainFaqCategoryId = mainFaqCategoryId;
        }

        if (faqCategoryId) {
            if (!mongoose.Types.ObjectId.isValid(faqCategoryId)) {
                return sendBadRequestResponse(res, "Invalid FAQ category ID!");
            }

            const categoryExists = await FAQCategory.findById(faqCategoryId);
            if (!categoryExists) {
                return sendNotFoundResponse(res, "FAQ category not found!");
            }

            if (mainFaqCategoryId && categoryExists.mainFaqCategoryById.toString() !== mainFaqCategoryId) {
                return sendBadRequestResponse(res, "This FAQ category does not belong to the specified main category!");
            }

            existingQuestion.faqCategoryId = faqCategoryId;
        }

        if (faqQuestion !== undefined) {
            if (typeof faqQuestion !== 'string' || faqQuestion.trim().length === 0) {
                return sendBadRequestResponse(res, "FAQ question must be a non-empty string!");
            }
            if (faqQuestion.length > 500) {
                return sendBadRequestResponse(res, "FAQ question must be less than 500 characters!");
            }

            const duplicateQuestion = await FAQQuestion.findOne({
                _id: { $ne: id },
                faqCategoryId: existingQuestion.faqCategoryId,
                faqQuestion: { $regex: new RegExp(`^${faqQuestion.trim()}$`, 'i') }
            });

            if (duplicateQuestion) {
                return sendBadRequestResponse(res, "This question already exists in this category!");
            }

            existingQuestion.faqQuestion = faqQuestion.trim();
            existingQuestion.faqQuestionLower = faqQuestion.trim().toLowerCase();
        }

        if (faqAnswer !== undefined) {
            if (typeof faqAnswer !== 'string' || faqAnswer.trim().length === 0) {
                return sendBadRequestResponse(res, "FAQ answer must be a non-empty string!");
            }
            if (faqAnswer.length > 2000) {
                return sendBadRequestResponse(res, "FAQ answer must be less than 2000 characters!");
            }
            existingQuestion.faqAnswer = faqAnswer.trim();
        }

        await existingQuestion.save();
        await existingQuestion.populate('faqCategoryId');
        await existingQuestion.populate('mainFaqCategoryId');

        return sendSuccessResponse(res, "FAQ question updated successfully!", existingQuestion);

    } catch (error) {
        console.error('Update FAQ Question Error:', error);
        return ThrowError(res, 500, error.message);
    }
};

export const deleteFAQQuestion = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid FAQ question ID!");
        }

        const question = await FAQQuestion.findByIdAndDelete(id);

        if (!question) {
            return sendNotFoundResponse(res, "FAQ question not found!");
        }

        return sendSuccessResponse(res, "FAQ question deleted successfully!");

    } catch (error) {
        console.error('Delete FAQ Question Error:', error);
        return ThrowError(res, 500, "Server error while deleting FAQ question");
    }
};

export const getFAQQuestionsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return sendBadRequestResponse(res, "Invalid FAQ category ID!");
        }

        const categoryExists = await FAQCategory.findById(categoryId);
        if (!categoryExists) {
            return sendNotFoundResponse(res, "FAQ category not found!");
        }

        const questions = await FAQQuestion.find({ faqCategoryId: categoryId })
            .populate('faqCategoryId')
            .populate('mainFaqCategoryId')
            .sort({ createdAt: -1 });

        return sendSuccessResponse(res, "FAQ questions fetched successfully!", questions);

    } catch (error) {
        console.error('Get FAQ Questions by Category Error:', error);
        return ThrowError(res, 500, "Server error while fetching FAQ questions");
    }
};

export const getFAQQuestionsByMainCategory = async (req, res) => {
    try {
        const { mainCategoryId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(mainCategoryId)) {
            return sendBadRequestResponse(res, "Invalid main FAQ category ID!");
        }

        const mainCategoryExists = await mainFaqCategoryModel.findById(mainCategoryId);
        if (!mainCategoryExists) {
            return sendNotFoundResponse(res, "Main FAQ category not found!");
        }

        const questions = await FAQQuestion.find({ mainFaqCategoryId: mainCategoryId })
            .populate('faqCategoryId')
            .populate('mainFaqCategoryId')
            .sort({ createdAt: -1 });

        return sendSuccessResponse(res, "FAQ questions fetched successfully!", questions);

    } catch (error) {
        console.error('Get FAQ Questions by Main Category Error:', error);
        return ThrowError(res, 500, "Server error while fetching FAQ questions");
    }
};

export const getFAQQuestionsByMainAndSubCategory = async (req, res) => {
    try {
        const { mainCategoryId, categoryId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(mainCategoryId)) {
            return sendBadRequestResponse(res, "Invalid main FAQ category ID!");
        }

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return sendBadRequestResponse(res, "Invalid FAQ category ID!");
        }

        const mainCategoryExists = await mainFaqCategoryModel.findById(mainCategoryId);
        if (!mainCategoryExists) {
            return sendNotFoundResponse(res, "Main FAQ category not found!");
        }

        const categoryExists = await FAQCategory.findById(categoryId);
        if (!categoryExists) {
            return sendNotFoundResponse(res, "FAQ category not found!");
        }

        if (categoryExists.mainFaqCategoryById.toString() !== mainCategoryId) {
            return sendBadRequestResponse(res, "This FAQ category does not belong to the specified main category!");
        }

        const questions = await FAQQuestion.find({
            mainFaqCategoryId: mainCategoryId,
            faqCategoryId: categoryId
        })
            .populate('faqCategoryId')
            .populate('mainFaqCategoryId')
            .sort({ createdAt: -1 });

        return sendSuccessResponse(res, "FAQ questions fetched successfully!", questions);

    } catch (error) {
        console.error('Get FAQ Questions by Main and Sub Category Error:', error);
        return ThrowError(res, 500, "Server error while fetching FAQ questions");
    }
};