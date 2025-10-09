import similarFAQQuestion from '../model/similarFaqQuestion.model.js';
import similarFAQCategory from '../model/similarFaqCategory.model.js';
import mongoose from 'mongoose';
import { sendBadRequestResponse, sendNotFoundResponse, sendSuccessResponse } from '../utils/Response.utils.js';
import { ThrowError } from '../utils/Error.utils.js';

export const createSimilarFAQQuestion = async (req, res) => {
    try {
        const { similarFaqCategoryId, similarFaqQuestion, similarFaqAnswer } = req.body;

        if (!similarFaqCategoryId || !similarFaqQuestion || !similarFaqAnswer) {
            return sendBadRequestResponse(res, "similarFaqCategoryId, similarFaqQuestion and similarFaqAnswer are required!");
        }

        if (!mongoose.Types.ObjectId.isValid(similarFaqCategoryId)) {
            return sendBadRequestResponse(res, "Invalid similarFaqCategory ID!");
        }

        const categoryExists = await similarFAQCategory.findById(similarFaqCategoryId);
        if (!categoryExists) {
            return sendNotFoundResponse(res, "similarFAQCategory not found!");
        }

        if (typeof similarFaqQuestion !== 'string' || similarFaqQuestion.trim().length === 0) {
            return sendBadRequestResponse(res, "similarFaqQuestion must be a non-empty string!");
        }

        if (typeof similarFaqAnswer !== 'string' || similarFaqAnswer.trim().length === 0) {
            return sendBadRequestResponse(res, "similarFaqAnswer must be a non-empty string!");
        }

        const trimmedQuestion = similarFaqQuestion.trim();

        const existingQuestion = await similarFAQQuestion.findOne({
            similarFaqCategoryId,
            similarFaqQuestion: {
                $regex: `^${trimmedQuestion.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`,
                $options: 'i'
            }
        });

        if (existingQuestion) {
            return sendBadRequestResponse(res, "This question already exists in this category!");
        }

        const newSimilarFAQQuestion = await similarFAQQuestion.create({
            similarFaqCategoryId,
            similarFaqQuestion: trimmedQuestion,
            similarFaqAnswer: similarFaqAnswer.trim(),
        });

        await newSimilarFAQQuestion.populate('similarFaqCategoryId');

        return sendSuccessResponse(res, "SimilarFaqQuestion created successfully!", newSimilarFAQQuestion);

    } catch (error) {
        console.error('Create SimilarFaqQuestion Error:', error);
        return ThrowError(res, 500, error.message);
    }
};

export const getAllSimilarFAQQuestion = async (req, res) => {
    try {
        const similarFaqQuestions = await similarFAQQuestion.find()
            .populate('similarFaqCategoryId')

        if (!similarFaqQuestions || similarFaqQuestions.length === 0) {
            return sendNotFoundResponse(res, "No SimilarFaqQuestions found...")
        }

        return sendSuccessResponse(res, "similarFaqQuestions fetched successfully!", similarFaqQuestions)

    } catch (error) {
        console.error('Get SimilarFaqQuestions Error:', error);
        return ThrowError(res, 500, "Server error while fetching SimilarFaqQuestions");
    }
};

export const getSimilarFAQQuestionById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid similarFaqQuestion ID!");
        }

        const question = await similarFAQQuestion.findById(id)
            .populate('similarFaqCategoryId')

        if (!question) {
            return sendNotFoundResponse(res, "similarFaqQuestion not found!");
        }

        return sendSuccessResponse(res, "similarFaqQuestion fetched successfully!", question);

    } catch (error) {
        console.error('Get similarFaqQuestion Error:', error);
        return ThrowError(res, 500, "Server error while fetching similarFaqQuestion");
    }
};

export const updateSimilarFAQQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const { similarFaqCategoryId, similarFaqQuestion, similarFaqAnswer } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid similarFaqQuestion ID!");
        }

        const existingsimilarFaqQuestion = await similarFAQQuestion.findById(id);
        if (!existingsimilarFaqQuestion) {
            return sendNotFoundResponse(res, "similarFaqQuestion not found!");
        }

        if (similarFaqCategoryId) {
            if (!mongoose.Types.ObjectId.isValid(similarFaqCategoryId)) {
                return sendBadRequestResponse(res, "Invalid similarFaqCategory ID!");
            }

            const categoryExists = await similarFAQCategory.findById(similarFaqCategoryId);
            if (!categoryExists) {
                return sendNotFoundResponse(res, "similarFaqCategory not found!");
            }

            existingsimilarFaqQuestion.similarFaqCategoryId = similarFaqCategoryId;
        }

        if (similarFaqQuestion !== undefined) {
            if (typeof similarFaqQuestion !== 'string' || similarFaqQuestion.trim().length === 0) {
                return sendBadRequestResponse(res, "similarFaqQuestion must be a non-empty string!");
            }
            if (similarFaqQuestion.length > 500) {
                return sendBadRequestResponse(res, "similarFaqQuestion must be less than 500 characters!");
            }

            const duplicateQuestion = await similarFAQQuestion.findOne({
                _id: { $ne: id },
                similarFaqCategoryId: existingsimilarFaqQuestion.similarFaqCategoryId,
                similarFaqQuestion: { $regex: new RegExp(`^${similarFaqQuestion.trim()}$`, 'i') }
            });

            if (duplicateQuestion) {
                return sendBadRequestResponse(res, "This question already exists in this category!");
            }

            existingsimilarFaqQuestion.similarFaqQuestion = similarFaqQuestion.trim();
        }

        if (similarFaqAnswer !== undefined) {
            if (typeof similarFaqAnswer !== 'string' || similarFaqAnswer.trim().length === 0) {
                return sendBadRequestResponse(res, "similarFaqAnswer must be a non-empty string!");
            }
            if (similarFaqAnswer.length > 2000) {
                return sendBadRequestResponse(res, "similarFaqAnswer must be less than 2000 characters!");
            }
            existingsimilarFaqQuestion.similarFaqAnswer = similarFaqAnswer.trim();
        }

        await existingsimilarFaqQuestion.save();
        await existingsimilarFaqQuestion.populate('similarFaqCategoryId');

        return sendSuccessResponse(res, "similarFaqQuesion updated successfully!", existingsimilarFaqQuestion);

    } catch (error) {
        console.error('Update similarFaqQuesion Error:', error);
        return ThrowError(res, 500, error.message);
    }
};

export const deleteSimilarFAQQuestion = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid similarFaqQuesion ID!");
        }

        const question = await similarFAQQuestion.findByIdAndDelete(id);

        if (!question) {
            return sendNotFoundResponse(res, "similarFaqQuesion not found!");
        }

        return sendSuccessResponse(res, "similarFaqQuesion deleted successfully!");

    } catch (error) {
        console.error('Delete similarFaqQuesion Error:', error);
        return ThrowError(res, 500, "Server error while deleting similarFaqQuesion");
    }
};

export const getSimilarFAQQuestionsByCategory = async (req, res) => {
    try {
        const { similarFaqCategoryId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(similarFaqCategoryId)) {
            return sendBadRequestResponse(res, "Invalid similarFaqCategory ID!");
        }

        const categoryExists = await similarFAQCategory.findById(similarFaqCategoryId);
        if (!categoryExists) {
            return sendNotFoundResponse(res, "FAQ category not found!");
        }

        const questions = await similarFAQQuestion.find({ similarFaqCategoryId: similarFaqCategoryId })
            .populate('similarFaqCategoryId')
            .sort({ createdAt: -1 });

        return sendSuccessResponse(res, "similarFaqQuesion fetched successfully!", questions);

    } catch (error) {
        console.error('Get similarFaqQuesion by Category Error:', error);
        return ThrowError(res, 500, "Server error while fetching similarFaqQuesion");
    }
};