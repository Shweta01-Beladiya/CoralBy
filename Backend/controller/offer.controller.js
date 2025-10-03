import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { uploadFile } from "../middleware/imageupload.js";
import offerModel from "../model/offer.model.js";
import { s3 } from "../utils/aws.config.js";
import { sendBadRequestResponse, sendErrorResponse } from "../utils/Response.utils.js";

export const createOfferController = async (req, res) => {
    try {
        const {
            section,
            offerTitle,
            offerDesc,
            category,
            offerMidText,
            isSpecialOffer,
            discountPercent,
            headline,
            subText,
            countdown,
        } = req.body;

        // Basic validation
        if (!offerTitle || !offerDesc || !category) {
            return res.status(400).json({ success: false, message: "offerTitle, offerDesc, and category are required" });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Offer image is required" });
        }

        // Upload image to S3 or cloud
        const uploadedImage = await uploadFile(req.file); // returns { url: 'full_url' }

        // Parse countdown if exists
        let countdownData;
        if (countdown) {
            try {
                countdownData = JSON.parse(countdown);
            } catch (err) {
                return res.status(400).json({ success: false, message: "Invalid countdown JSON" });
            }
        }

        // Create new offer
        const newOffer = await offerModel.create({
            section: section ? Number(section) : 0, // default 0 if not provided
            offerTitle,
            offerDesc,
            offerImage: uploadedImage.url,
            offerMidText: offerMidText,
            category,
            isSpecialOffer: isSpecialOffer === "true" || false,
            discountPercent: discountPercent ? Number(discountPercent) : 0,
            headline: headline || "",
            subText: subText || "",
            countdown: countdownData,
        });

        res.status(201).json({ success: true, message: "Offer created successfully", data: newOffer });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const getOffersBySection = async (req, res) => {
    try {
        const { section } = req.params;
        if (!section) {
            return sendBadRequestResponse(res, "section params not found")
        }
        const offers = await offerModel.find({ section: Number(section) });

        return res.status(200).json({
            success: true,
            section: Number(section),
            data: offers,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching offers",
            error: error.message,
        });
    }
};


export const deleteOfferController = async (req, res) => {
    try {
        const { offerId } = req.params;

        if (!offerId) {
            return res.status(400).json({ success: false, message: "Offer ID is required" });
        }

        // Find the offer
        const offer = await offerModel.findById(offerId);
        if (!offer) {
            return res.status(404).json({ success: false, message: "Offer not found" });
        }

        // Delete offer image from S3
        if (offer.offerImage) {
            const key = offer.offerImage.split(".amazonaws.com/").pop();
            try {
                await s3.send(
                    new DeleteObjectCommand({
                        Bucket: process.env.S3_BUCKET_NAME,
                        Key: `${key}`,
                    })
                );
                console.log("Offer image deleted from S3:", key);
                await offerModel.findByIdAndDelete(offerId);
                return res.status(200).json({
                    success: true,
                    message: "Offer deleted successfully",
                });
            } catch (err) {
                console.error("Failed to delete offer image from S3:", err.message);
                res.status(500).json({ success: false, message: err.message });
            }
        }

        // Delete offer from DB

    } catch (error) {
        console.error("Delete Offer Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

