import mongoose from "mongoose";
import BrandModel from "../model/brand.model.js";
import sellerModel from "../model/seller.model.js";
import { ThrowError } from "../utils/Error.utils.js";
import { sendBadRequestResponse, sendErrorResponse, sendNotFoundResponse, sendSuccessResponse } from "../utils/Response.utils.js";
import { uploadFile } from "../middleware/imageupload.js";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../utils/aws.config.js";
import mainCategoryModel from "../model/mainCategory.model.js";

export const createBrand = async (req, res) => {
    try {
        const sellerId = req.user?._id;

        if (!sellerId || !mongoose.Types.ObjectId.isValid(sellerId)) {
            return sendBadRequestResponse(res, "Invalid sellerId in token!");
        }

        const { brandName, brandColor, mainCategoryId } = req.body;

        if (!brandName || !mainCategoryId || !brandColor) {
            return sendBadRequestResponse(res, "brandName & mainCategoryId & brandColor are required!");
        }

        if (!mongoose.Types.ObjectId.isValid(mainCategoryId)) {
            return sendBadRequestResponse(res, "Invalid mainCategoryId!");
        }

        const checkMainCategory = await mainCategoryModel.findById(mainCategoryId);
        if (!checkMainCategory) {
            return sendBadRequestResponse(res, "MainCategory does not exist!");
        }

        const existingBrand = await BrandModel.findOne({
            sellerId,
            mainCategoryId,
            brandName: { $regex: new RegExp(`^${brandName}$`, "i") },
            brandColor
        });

        if (existingBrand) {
            return sendBadRequestResponse(res, "You already have this brand under this main category!");
        }

        let brandImage = "";
        const mainFile = req.file || req.files?.brandImage?.[0];
        if (mainFile) {
            const result = await uploadFile(mainFile);
            brandImage = result.url;
        }

        const newBrand = await BrandModel.create({
            sellerId,
            mainCategoryId,
            brandName,
            brandColor,
            brandImage
        });

        // Add brand reference to seller
        await sellerModel.findByIdAndUpdate(
            sellerId,
            { $push: { brandId: newBrand._id } },
            { new: true }
        );

        return sendSuccessResponse(res, "Brand created successfully!", newBrand);
    } catch (error) {
        return ThrowError(res, 500, error.message);
    }
};

export const getAllBrand = async (req, res) => {
    try {
        const brand = await BrandModel.find({})

        if (!brand || brand.length === 0) {
            return sendNotFoundResponse(res, "No any Brand found...")
        }

        return sendSuccessResponse(res, "Brand fetched Successfully...", brand)

    } catch (error) {
        return ThrowError(res, 500, error.message)
    }
}

export const getBrandById = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid BrandId")
        }

        const checkBrand = await BrandModel.findById(id)
        if (!checkBrand) {
            return sendNotFoundResponse(res, "Brand not found!!!")
        }

        return sendSuccessResponse(res, "Brand fetched Successfully...", checkBrand)

    } catch (error) {
        return ThrowError(res, 500, error.message)
    }
}

export const updateBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const sellerId = req.user?._id;

        // === Validate seller ===
        if (!sellerId || !mongoose.Types.ObjectId.isValid(sellerId)) {
            return sendBadRequestResponse(res, "Invalid sellerId in token!");
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid brandId!");
        }

        const checkBrand = await BrandModel.findOne({ _id: id, sellerId });
        if (!checkBrand) {
            return sendNotFoundResponse(res, "Brand not found or unauthorized!");
        }

        const { brandName,brandColor, mainCategoryId } = req.body;

        // === validate mainCategoryId if provided ===
        if (mainCategoryId && !mongoose.Types.ObjectId.isValid(mainCategoryId)) {
            return sendBadRequestResponse(res, "Invalid mainCategoryId!");
        }

        if (mainCategoryId) {
            const checkMainCategory = await mainCategoryModel.findById(mainCategoryId);
            if (!checkMainCategory) {
                return sendBadRequestResponse(res, "MainCategory does not exist!");
            }
        }

        // === Unique brand name validation ===
        if (brandName) {
            const existingBrand = await BrandModel.findOne({
                sellerId,
                brandName: { $regex: new RegExp(`^${brandName}$`, "i") },
                _id: { $ne: id } // exclude current brand
            });

            if (existingBrand) {
                return sendBadRequestResponse(res, "You already have this brand with the same name!");
            }
        }

        // === Handle brand image update ===
        let brandImage = checkBrand.brandImage;
        const mainFile = req.file || req.files?.brandImage?.[0];

        if (mainFile) {
            // delete old image if exists
            if (brandImage) {
                const oldKey = brandImage.split("/").pop();
                try {
                    await s3.send(
                        new DeleteObjectCommand({
                            Bucket: process.env.S3_BUCKET_NAME,
                            Key: `uploads/${oldKey}`,
                        })
                    );
                    console.log("🗑️ Deleted old brand image:", oldKey);
                } catch (err) {
                    console.error("Failed to delete old brand image:", err.message);
                }
            }

            // upload new image
            const result = await uploadFile(mainFile);
            brandImage = result.url;
        }

        // === Update brand ===
        const updatedBrand = await BrandModel.findByIdAndUpdate(
            id,
            {
                brandName: brandName || checkBrand.brandName,
                brandColor: brandColor || checkBrand.brandColor,
                mainCategoryId: mainCategoryId || checkBrand.mainCategoryId,
                brandImage
            },
            { new: true, runValidators: true }
        );

        return sendSuccessResponse(res, " Brand updated successfully!", updatedBrand);

    } catch (error) {
        return ThrowError(res, 500, error.message);
    }
};

export const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const sellerId = req.user?._id;

        // === Validate IDs ===
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid BrandId!");
        }
        if (!sellerId || !mongoose.Types.ObjectId.isValid(sellerId)) {
            return sendBadRequestResponse(res, "Invalid sellerId in token!");
        }

        // === Find brand ===
        const brand = await BrandModel.findById(id);
        if (!brand) {
            return sendNotFoundResponse(res, "Brand not found!");
        }

        // === Delete brand image from S3 if exists ===
        if (brand.brandImage) {
            const key = brand.brandImage.split("/").pop();
            try {
                await s3.send(
                    new DeleteObjectCommand({
                        Bucket: process.env.S3_BUCKET_NAME,
                        Key: `uploads/${key}`,
                    })
                );
                console.log(" Deleted brand image:", key);
            } catch (err) {
                console.error("Failed to delete brand image from S3:", err.message);
            }
        }

        // === Delete brand from DB ===
        await BrandModel.findByIdAndDelete(id);

        // === Remove brand reference from seller ===
        await sellerModel.findByIdAndUpdate(
            sellerId,
            { $pull: { brandId: id } },
            { new: true }
        );

        return sendSuccessResponse(res, " Brand deleted successfully!", null);

    } catch (error) {
        return ThrowError(res, 500, error.message);
    }
};

export const getSellerBrands = async (req, res) => {
    const sellerId = req.user?._id;

    const seller = await sellerModel.findById(sellerId).populate("brandId");
    if (!seller) return sendNotFoundResponse(res, "Seller not found!");

    return sendSuccessResponse(res, "Seller brands fetched successfully", seller.brandId);
};

export const getBrandByMainCategory = async (req, res) => {
    try {
        const { mainCategoryId } = req.params;

        // Validate MainCategoryId
        if (!mongoose.Types.ObjectId.isValid(mainCategoryId)) {
            return sendBadRequestResponse(res, "Invalid mainCategoryId");
        }

        // Check if MainCategory exists
        const mainCategory = await mainCategoryModel.findById(mainCategoryId).lean();
        if (!mainCategory) {
            return sendNotFoundResponse(res, "MainCategory not found");
        }

        // Fetch brand for this mainCategory
        const brand = await BrandModel.find({ mainCategoryId })
            .select("brandName brandColor brandImage ")
            .lean();

        return sendSuccessResponse(res, `Brand for MainCategory fetched successfully`, {
            mainCategoryId: mainCategory._id,
            mainCategoryName: mainCategory.mainCategoryName,
            brand
        });

    } catch (error) {
        return sendErrorResponse(res, 500, error.message);
    }
};


export const brandFilterController = async (req, res) => {
    try {
        const { filter, search } = req.query;
        let sortOption = {};
        let query = {};

        // Apply search by brand name
        if (search) {
            query.brandName = { $regex: search, $options: "i" }; // case-insensitive
        }

        // Filter logic
        if (filter) {
            if (filter === "featured") query.isFeatured = true;
            else if (filter === "trustable") query.isTrustable = true;
            else if (filter === "az") sortOption = { brandName: 1 };
            else if (filter === "za") sortOption = { brandName: -1 };
            else if (filter === "newest") sortOption = { createdAt: -1 };
            else if (filter === "oldest") sortOption = { createdAt: 1 };
        } else {
            // default sort
            sortOption = { createdAt: -1 };
        }

        const brands = await brandModel.find(query).sort(sortOption);

        return res.status(200).json({
            success: true,
            message: "Brands fetched successfully",
            data: brands,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error fetching brands",
            error: error.message,
        });
    }

}


