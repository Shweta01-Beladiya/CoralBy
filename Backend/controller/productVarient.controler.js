import mongoose from "mongoose";
import ProductVariant from "../model/productvarient.model.js";
import Product from "../model/product.model.js";
import { sendBadRequestResponse, sendNotFoundResponse, sendSuccessResponse } from "../utils/Response.utils.js";
import { ThrowError } from "../utils/Error.utils.js";
import { uploadFile } from "../middleware/imageupload.js";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../utils/aws.config.js";

const generateSKU = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const prefix = letters.charAt(Math.floor(Math.random() * letters.length)) +
        letters.charAt(Math.floor(Math.random() * letters.length));
    const number = Math.floor(100000 + Math.random() * 900000); // 6-digit
    return `${prefix}-${number}`;
};

// === Artical Number generator (CD5010-401) ===
const generateArticalNumber = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const prefix = letters.charAt(Math.floor(Math.random() * letters.length)) +
        letters.charAt(Math.floor(Math.random() * letters.length));
    const mainDigits = Math.floor(1000 + Math.random() * 9000); // 4-digit
    const subDigits = Math.floor(100 + Math.random() * 900);    // 3-digit
    return `${prefix}${mainDigits}-${subDigits}`;
};

// === Create Product Variant ===
export const createProductVariant = async (req, res) => {
    try {
        const { 
            productId, 
            sku, 
            Artical_Number, 
            color, 
            size, 
            Occasion,
            Outer_material,
            Model_name,
            Ideal_for,
            Type_For_Casual,
            Euro_Size,
            Heel_Height,
            price, 
            stock, 
            weight 
        } = req.body;
        const sellerId = req.user?._id;

        if (!sellerId || !mongoose.Types.ObjectId.isValid(sellerId)) {
            return sendBadRequestResponse(res, "Invalid or missing seller ID. Please login first!");
        }

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return sendBadRequestResponse(res, "Invalid product ID!");
        }

        const product = await Product.findOne({ _id: productId, sellerId });
        if (!product) {
            return sendNotFoundResponse(res, "Product not found or unauthorized!");
        }

        if (!price || !price.original) {
            return sendBadRequestResponse(res, "productId, color, size and price.original are required!");
        }

        const originalPrice = Number(price.original);
        const discountedPrice = price.discounted ? Number(price.discounted) : undefined;

        if (isNaN(originalPrice) || (discountedPrice !== undefined && isNaN(discountedPrice))) {
            return sendBadRequestResponse(res, "Price values must be numbers.");
        }
        if (discountedPrice && discountedPrice > originalPrice) {
            return sendBadRequestResponse(res, "Discounted price cannot be greater than original price.");
        }

        let finalSKU = sku;
        if (!finalSKU) {
            let isUnique = false;
            while (!isUnique) {
                finalSKU = generateSKU();
                const existingSKU = await ProductVariant.findOne({ sku: finalSKU });
                if (!existingSKU) isUnique = true;
            }
        } else {
            const existingSKU = await ProductVariant.findOne({ sku: finalSKU });
            if (existingSKU) {
                return sendBadRequestResponse(res, "SKU already exists! Please use a unique SKU.");
            }
        }

        let finalArticalNumber = Artical_Number;
        if (!finalArticalNumber) {
            let isUnique = false;
            while (!isUnique) {
                finalArticalNumber = generateArticalNumber();
                const existingArtical = await ProductVariant.findOne({ Artical_Number: finalArticalNumber });
                if (!existingArtical) isUnique = true;
            }
        } else {
            const existingArtical = await ProductVariant.findOne({ Artical_Number: finalArticalNumber });
            if (existingArtical) {
                return sendBadRequestResponse(res, "Artical Number already exists! Please use a unique one.");
            }
        }

        const stockNumber = stock ? Number(stock) : 0;
        if (stock && isNaN(stockNumber)) {
            return sendBadRequestResponse(res, "Stock must be a number.");
        }

        const images = [];
        const mainFile = req.file || req.files?.mainImage?.[0];
        if (mainFile) {
            const result = await uploadFile(mainFile);
            images.push(result.url);
        }
        if (req.files?.images) {
            for (const file of req.files.images) {
                const result = await uploadFile(file);
                images.push(result.url);
            }
        }

        const newVariant = await ProductVariant.create({
            productId,
            sellerId,
            sku: finalSKU,
            Artical_Number: finalArticalNumber,
            images,
            color,
            size,
            Occasion,
            Outer_material,
            Model_name,
            Ideal_for,
            Type_For_Casual,
            Euro_Size,
            Heel_Height,
            price: { original: originalPrice, discounted: discountedPrice },
            stock: stockNumber,
            weight
        });

        await Product.findByIdAndUpdate(productId, { $push: { varientId: newVariant._id } });

        return sendSuccessResponse(res, "✅ Product variant created successfully!", newVariant);

    } catch (error) {
        return ThrowError(res, 500, error.message);
    }
};

export const getAllProductVariant = async (req, res) => {
    try {
        const productVarient = await ProductVariant.find({})

        if (!productVarient || productVarient.length == 0) {
            return sendNotFoundResponse(res, "No any ProductVarient found...")
        }

        return sendSuccessResponse(res, "ProductVarient fetched Successfully...", productVarient)

    } catch (error) {
        return ThrowError(res, 500, error.message)
    }
}

export const getProductVarientById = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid ProductVarientId")
        }

        const exitsProductVarient = await ProductVariant.findById(id)
        if (!exitsProductVarient) {
            return sendNotFoundResponse(res, "ProductVarient Not Found...")
        }

        return sendSuccessResponse(res, "ProductVarient fetched Successfully...", exitsProductVarient)

    } catch (error) {
        return ThrowError(res, 500, error.message)
    }
}

export const updateProductVariant = async (req, res) => {
    try {
        const { variantId } = req.params;
        const sellerId = req.user?._id;

        if (!mongoose.Types.ObjectId.isValid(variantId)) {
            return sendBadRequestResponse(res, "Invalid product variant ID!");
        }

        const variant = await ProductVariant.findById(variantId);
        if (!variant) {
            return sendNotFoundResponse(res, "Product variant not found!");
        }

        if (variant.sellerId.toString() !== sellerId.toString()) {
            return sendBadRequestResponse(res, "Unauthorized: Not your product variant!");
        }

        const {
            color,
            size,
            Occasion,
            Outer_material,
            Model_name,
            Ideal_for,
            Type_For_Casual,
            Euro_Size,
            Heel_Height,
            price,
            stock,
            weight,
            sku,
            productId,
        } = req.body;

        if (productId) {
            if (!mongoose.Types.ObjectId.isValid(productId)) {
                return sendBadRequestResponse(res, "Invalid product ID!");
            }
            const product = await Product.findOne({ _id: productId, sellerId });
            if (!product) {
                return sendNotFoundResponse(res, "Product not found or unauthorized!");
            }
            variant.productId = productId;
        }

        if (sku && sku !== variant.sku) {
            const existingSKU = await ProductVariant.findOne({ sku });
            if (existingSKU) {
                return sendBadRequestResponse(res, "SKU already exists! Please use a unique SKU.");
            }
            variant.sku = sku;
        }

        if (price) {
            if (!price.original) {
                return sendBadRequestResponse(res, "price.original is required!");
            }
            const originalPrice = Number(price.original);
            const discountedPrice = price.discounted ? Number(price.discounted) : undefined;

            if (isNaN(originalPrice) || (discountedPrice !== undefined && isNaN(discountedPrice))) {
                return sendBadRequestResponse(res, "Price values must be numbers.");
            }
            if (discountedPrice && discountedPrice > originalPrice) {
                return sendBadRequestResponse(res, "Discounted price cannot be greater than original price.");
            }
            variant.price = { original: originalPrice, discounted: discountedPrice };
        }

        if (color) variant.color = color;
        if (size) variant.size = size;
        if (Occasion) variant.Occasion = Occasion;
        if (Outer_material) variant.Outer_material = Outer_material;
        if (Model_name) variant.Model_name = Model_name;
        if (Ideal_for) variant.Ideal_for = Ideal_for;
        if (Type_For_Casual) variant.Type_For_Casual = Type_For_Casual;
        if (Euro_Size) variant.Euro_Size = Euro_Size;
        if (Heel_Height) variant.Heel_Height = Heel_Height;
        if (weight) variant.weight = weight;

        if (stock !== undefined) {
            const stockNumber = Number(stock);
            if (isNaN(stockNumber)) {
                return sendBadRequestResponse(res, "Stock must be a number.");
            }
            variant.stock = stockNumber;
        }

        if ((req.file || (req.files?.mainImage && req.files.mainImage.length > 0) || (req.files?.images && req.files.images.length > 0))) {
            if (variant.images && variant.images.length > 0) {
                for (const imageUrl of variant.images) {
                    const key = imageUrl.split("/").pop();
                    try {
                        await s3.send(
                            new DeleteObjectCommand({
                                Bucket: process.env.S3_BUCKET_NAME,
                                Key: `uploads/${key}`,
                            })
                        );
                    } catch (err) {
                        console.error("Failed to delete old image:", err.message);
                    }
                }
            }

            // Upload new images
            const newImages = [];
            const mainFile = req.file || req.files?.mainImage?.[0];
            if (mainFile) {
                const result = await uploadFile(mainFile);
                newImages.push(result.url);
            }

            if (req.files?.images) {
                for (const file of req.files.images) {
                    const result = await uploadFile(file);
                    newImages.push(result.url);
                }
            }

            if (newImages.length > 0) {
                variant.images = newImages;
            }
        }

        await variant.save();

        return sendSuccessResponse(res, "✅ Product variant updated successfully!", variant);
    } catch (error) {
        return ThrowError(res, 500, error.message);
    }
};

export const deleteProductVariant = async (req, res) => {
    try {
        const { variantId } = req.params;
        const sellerId = req.user?._id;

        if (!mongoose.Types.ObjectId.isValid(variantId)) {
            return sendBadRequestResponse(res, "Invalid product variant ID!");
        }

        const variant = await ProductVariant.findById(variantId);
        if (!variant) {
            return sendNotFoundResponse(res, "Product variant not found!");
        }

        if (variant.sellerId.toString() !== sellerId.toString()) {
            return sendBadRequestResponse(res, "Unauthorized: Not your product variant!");
        }

        if (variant.images && variant.images.length > 0) {
            for (const img of variant.images) {
                const key = img.split("/").pop();
                try {
                    await s3.send(
                        new DeleteObjectCommand({
                            Bucket: process.env.S3_BUCKET_NAME,
                            Key: `uploads/${key}`,
                        })
                    );
                } catch (err) {
                    console.error("Failed to delete image from S3:", err.message);
                }
            }
        }

        await ProductVariant.findByIdAndDelete(variantId);

        return sendSuccessResponse(res, "✅ Product variant deleted successfully!");
    } catch (error) {
        return ThrowError(res, 500, error.message);
    }
};

export const getProductWiseProductVarientdata = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
            return sendBadRequestResponse(res, "Valid productId is required!");
        }

        // Find product
        const product = await Product.findById(productId)
            .select("brand title mainCategory category subCategory description");

        if (!product) {
            return sendNotFoundResponse(res, "Product not found!");
        }

        // Find variants of that product
        const variants = await ProductVariant.find({ productId })
            .select("color size Occasion Outer_material Model_name Ideal_for Type_For_Casual Euro_Size Heel_Height price stock weight sku images Artical_Number");

        return sendSuccessResponse(res, "✅ Product with variants fetched successfully!", {
            product,
            variants
        });

    } catch (error) {
        return sendErrorResponse(res, 500, error.message);
    }
};