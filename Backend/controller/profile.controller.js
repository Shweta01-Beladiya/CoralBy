import mongoose from "mongoose";
import { sendBadRequestResponse, sendErrorResponse, sendNotFoundResponse, sendSuccessResponse } from "../utils/Response.utils.js";
import UserModel from "../model/user.model.js";
import { uploadFile } from "../middleware/imageupload.js";
import axios from "axios";
import bcrypt from 'bcryptjs';
import sellerModel from "../model/seller.model.js";

export const getProfileController = async (req, res) => {
    try {
        const userId = req?.user?.id || req?.user?._id;

        // Validate user id
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return sendBadRequestResponse(res, "Invalid or missing User ID from token!");
        }

        // Fetch user profile
        const userProfile = await UserModel.findById(userId).select("-password");

        if (!userProfile) {
            return sendNotFoundResponse(res, "User profile not found!");
        }

        return sendSuccessResponse(res, "User profile fetched successfully", { userProfile });
    } catch (error) {
        console.error("Error while fetching user profile:", error.message);
        return sendErrorResponse(res, 500, "Error while fetching user profile!", error);
    }
};

export const userProfileUpdateController = async (req, res) => {
    try {
        const { id } = req?.user;

        // Validate user id
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid or missing user ID from token");
        }

        const { firstName, lastName, email, mobileNo } = req.body || {};

        // Build update object dynamically (only include provided fields)
        const updateData = {};
        if (firstName) updateData.firstName = firstName;
        if (lastName) updateData.lastName = lastName;
        if (email) updateData.email = email;
        if (mobileNo) updateData.mobileNo = mobileNo;

        // Update user profile
        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true } // return updated document
        );

        if (!updatedUser) {
            return sendBadRequestResponse(res, "User not found!");
        }

        return sendSuccessResponse(res, "Profile updated successfully", { updatedUser });

    } catch (error) {
        console.error("Profile Update Error:", error.message);
        return sendErrorResponse(res, 500, "Error while updating user profile!", error);
    }
};


export const userAddressAddController = async (req, res) => {
    try {
        const { id } = req.user;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid User Id in Token!");
        }

        const {
            firstName,
            lastName,
            phone,
            zipcode,
            address,
            city,
            state,
            saveAs,
            officeOpenOnSaturday,
            officeOpenOnSunday,
            setMyDefultUserAddress,
        } = req.body;

        if (!firstName || !lastName || !phone || !zipcode || !address) {
            return sendBadRequestResponse(res, "All required fields must be provided!");
        }

        // Auto-fill city/state if missing
        let autoCity = city;
        let autoState = state;
        if (/^\d{6}$/.test(zipcode)) {
            const pinResp = await axios.get(`https://api.postalpincode.in/pincode/${zipcode}`);
            const pinData = pinResp.data[0];
            if (pinData.Status === "Success" && pinData.PostOffice?.length > 0) {
                autoCity = city || pinData.PostOffice[0].District;
                autoState = state || pinData.PostOffice[0].State;
            } else {
                return sendBadRequestResponse(res, "Invalid or inactive zipcode!");
            }
        }

        // Build address as Mongoose subdocument
        const newAddress = {
            firstName,
            lastName,
            phone,
            zipcode,
            address,
            city: autoCity,
            state: autoState,
            saveAs: saveAs || "Home",
            officeOpenOnSaturday: officeOpenOnSaturday || false,
            officeOpenOnSunday: officeOpenOnSunday || false,
            setMyDefultUserAddress
        };

        const user = await UserModel.findById(id);
        if (!user) return sendBadRequestResponse(res, "User not found!");

        // Push the new address and get its subdocument reference
        const addedAddress = user.address.create(newAddress); // create subdocument
        user.address.push(addedAddress);

        // If default, set selectedAddress **before saving**
        if (setMyDefultUserAddress === true) {
            user.selectedAddress = addedAddress._id;
            user.setMyDefultUserAddress = true;
        }

        await user.save(); // Save once

        return sendSuccessResponse(res, "User Address inserted successfully", user);
    } catch (error) {
        console.error("Error in userAddressAddController:", error);
        return sendErrorResponse(res, 500, "Something went wrong while adding address!", error.message);
    }
};

export const userAddressUpdateController = async (req, res) => {
    try {
        const { id } = req?.user;
        const { addressId } = req?.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid User Id in Token!");
        }

        if (!addressId || !mongoose.Types.ObjectId.isValid(addressId)) {
            return sendBadRequestResponse(res, "Valid addressId must be provided!");
        }

        const {
            firstName,
            lastName,
            phone,
            zipcode,
            address,
            city,
            state,
            saveAs,
            officeOpenOnSaturday,
            officeOpenOnSunday
        } = req?.body;

        const updateFields = {};
        if (firstName) updateFields["address.$.firstName"] = firstName;
        if (lastName) updateFields["address.$.lastName"] = lastName;
        if (phone) updateFields["address.$.phone"] = phone;
        if (zipcode) updateFields["address.$.zipcode"] = zipcode;
        if (address) updateFields["address.$.address"] = address;
        if (city) updateFields["address.$.city"] = city;
        if (state) updateFields["address.$.state"] = state;
        if (saveAs) updateFields["address.$.saveAs"] = saveAs;

        if (saveAs === "Office") {
            if (typeof officeOpenOnSaturday !== "undefined") {
                updateFields["address.$.officeOpenOnSaturday"] = !!officeOpenOnSaturday;
            }
            if (typeof officeOpenOnSunday !== "undefined") {
                updateFields["address.$.officeOpenOnSunday"] = !!officeOpenOnSunday;
            }
        } else {
            updateFields["address.$.officeOpenOnSaturday"] = false;
            updateFields["address.$.officeOpenOnSunday"] = false;
        }

        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: id, "address._id": addressId },
            { $set: updateFields },
            { new: true }
        );

        if (!updatedUser) {
            return sendBadRequestResponse(res, "Address not found or update failed!");
        }

        return sendSuccessResponse(res, "User address updated successfully!", updatedUser);
    } catch (error) {
        console.error("Error in userAddressUpdateController:", error.message);
        return sendErrorResponse(res, 500, "Something went wrong while updating address!", error.message);
    }
};

export const userAddressDeleteController = async (req, res) => {
    try {
        const { id } = req?.user;
        const { addressId } = req?.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid or missing User ID from token!");
        }

        if (!addressId || !mongoose.Types.ObjectId.isValid(addressId)) {
            return sendBadRequestResponse(res, "Invalid or missing Address ID!");
        }

        const user = await UserModel.findById(id);
        if (!user) {
            return sendNotFoundResponse(res, "User not found!");
        }

        const addressExists = user.address?.some(addr => addr._id.toString() === addressId);
        if (!addressExists) {
            return sendNotFoundResponse(res, "Address not found!");
        }

        let updateQuery = { $pull: { address: { _id: addressId } } };
        if (user.selectedAddress?.toString() === addressId) {
            updateQuery.$set = { selectedAddress: null };
        }

        const updatedUser = await UserModel.findByIdAndUpdate(id, updateQuery, { new: true });

        return sendSuccessResponse(res, "Address deleted successfully", updatedUser);
    } catch (error) {
        console.error("Error while deleting user address:", error.message);
        return sendErrorResponse(res, 500, "Error during address deletion!", error.message);
    }
};

export const getUserAddressController = async (req, res) => {
    try {
        const { id } = req?.user;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid or missing User ID from token!");
        }

        const user = await UserModel.findById(id).select("address selectedAddress");
        if (!user) {
            return sendNotFoundResponse(res, "User not found!");
        }

        if (!user.address || user.address.length === 0) {
            return sendNotFoundResponse(res, "No addresses found for this user!");
        }

        return sendSuccessResponse(res, "User addresses fetched successfully", {
            total: user.address.length,
            selectedAddress: user.selectedAddress,
            address: user.address
        });
    } catch (error) {
        console.error("Error while getting user addresses:", error.message);
        return sendErrorResponse(res, 500, "Error while getting user addresses!", error.message);
    }
};


export const userBillingAddressAddController = async (req, res) => {
    try {
        const { id } = req?.user;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid User Id in Token!");
        }

        const {
            firstName,
            lastName,
            phone,
            zipcode,
            address,
            city,
            state,
            saveAs,
            officeOpenOnSaturday,
            officeOpenOnSunday
        } = req?.body;

        if (!firstName || !lastName || !phone || !zipcode || !address) {
            return sendBadRequestResponse(
                res,
                "All required fields (firstName, lastName, phone, zipcode, address) must be provided!"
            );
        }

        let autoCity = city;
        let autoState = state;

        if (/^\d{6}$/.test(zipcode)) {
            // If zipcode is 6-digit (India) -> validate via Postal API
            const pincodeResp = await axios.get(`https://api.postalpincode.in/pincode/${zipcode}`);
            const pinData = pincodeResp.data[0];

            if (pinData.Status === "Success" && pinData.PostOffice?.length > 0) {
                autoCity = city || pinData.PostOffice[0].District;
                autoState = state || pinData.PostOffice[0].State;
            } else {
                return sendBadRequestResponse(res, "Invalid or inactive zipcode!");
            }
        }

        const billingaddressData = {
            firstName,
            lastName,
            phone,
            zipcode,
            address,
            city: autoCity,
            state: autoState,
            saveAs: saveAs || "Home",
            officeOpenOnSaturday: !!officeOpenOnSaturday,
            officeOpenOnSunday: !!officeOpenOnSunday
        };

        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            { $push: { billingaddress: billingaddressData } },
            { new: true }
        );

        return sendSuccessResponse(res, "User Address inserted successfully", updatedUser);
    } catch (error) {
        console.error("Error in userAddressAddController:", error.message);
        return sendErrorResponse(res, 500, "Something went wrong while adding address!", error.message);
    }
};

export const userBillingAddressUpdatecontroller = async (req, res) => {
    try {
        const { id } = req?.user;
        const { billingaddressId } = req?.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid User Id in Token!");
        }

        const {
            firstName,
            lastName,
            phone,
            zipcode,
            address,
            city,
            state,
            saveAs,
            officeOpenOnSaturday,
            officeOpenOnSunday
        } = req?.body;

        if (!billingaddressId || !mongoose.Types.ObjectId.isValid(billingaddressId)) {
            return sendBadRequestResponse(res, "Valid billingaddressId must be provided!");
        }

        const updateFields = {};
        if (firstName) updateFields["billingaddress.$.firstName"] = firstName;
        if (lastName) updateFields["billingaddress.$.lastName"] = lastName;
        if (phone) updateFields["billingaddress.$.phone"] = phone;
        if (zipcode) updateFields["billingaddress.$.zipcode"] = zipcode;
        if (address) updateFields["billingaddress.$.address"] = address;
        if (city) updateFields["billingaddress.$.city"] = city;
        if (state) updateFields["billingaddress.$.state"] = state;
        if (saveAs) updateFields["billingaddress.$.saveAs"] = saveAs;

        if (typeof officeOpenOnSaturday !== "undefined") {
            updateFields["billingaddress.$.officeOpenOnSaturday"] = !!officeOpenOnSaturday;
        }
        if (typeof officeOpenOnSunday !== "undefined") {
            updateFields["billingaddress.$.officeOpenOnSunday"] = !!officeOpenOnSunday;
        }

        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: id, "billingaddress._id": billingaddressId },
            { $set: updateFields },
            { new: true }
        );

        if (!updatedUser) {
            return sendBadRequestResponse(res, "Billing address not found or update failed!");
        }

        return sendSuccessResponse(
            res,
            "User Billing Address updated successfully!",
            updatedUser
        );
    } catch (error) {
        console.error("Error in userBillingAddressUpdatecontroller:", error.message);
        return sendErrorResponse(
            res,
            500,
            "Something went wrong while updating Billing Address!",
            error.message
        );
    }
};

export const userBillingAddressDeleteController = async (req, res) => {
    try {
        const { id } = req?.user;
        const { billingaddressId } = req?.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid or missing User ID from token!");
        }

        if (!billingaddressId || !mongoose.Types.ObjectId.isValid(billingaddressId)) {
            return sendBadRequestResponse(res, "Invalid or missing billing address ID!");
        }

        const user = await UserModel.findById(id);
        if (!user) {
            return sendNotFoundResponse(res, "User not found!");
        }

        const billingExists = user.billingaddress?.some(
            addr => addr._id.toString() === billingaddressId
        );
        if (!billingExists) {
            return sendNotFoundResponse(res, "Billing address not found!");
        }

        let updateQuery = {
            $pull: { billingaddress: { _id: billingaddressId } }
        };

        if (user.selectedBillingAddress?.toString() === billingaddressId) {
            updateQuery.$set = { selectedBillingAddress: null };
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            updateQuery,
            { new: true }
        ).select("-password");

        return sendSuccessResponse(res, "Billing address deleted successfully", updatedUser);
    } catch (error) {
        console.error("Error while deleting user billing address:", error.message);
        return sendErrorResponse(res, 500, "Error during billing address deletion!", error.message);
    }
};

export const getUserBillingAddressController = async (req, res) => {
    try {
        const { id } = req?.user;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid or missing User ID from token!");
        }

        const user = await UserModel.findById(id).select("billingaddress");

        if (!user) {
            return sendNotFoundResponse(res, "User not found!");
        }

        if (!user.billingaddress || user.billingaddress.length === 0) {
            return sendNotFoundResponse(res, "No billing addresses found for this user!");
        }

        return sendSuccessResponse(res, "User billing addresses fetched successfully", {
            total: user.billingaddress.length,
            billingaddress: user.billingaddress
        });
    } catch (error) {
        console.error("Error while getting user billing addresses:", error.message);
        return sendErrorResponse(res, 500, "Error while getting user billing addresses!", error);
    }
};


export const userPasswordChangeController = async (req, res) => {
    try {
        const { id } = req?.user;
        const { oldPassword, newPassword } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid userId");
        }

        if (!oldPassword || !newPassword) {
            return sendBadRequestResponse(res, "Old password and new password required");
        }

        const user = await UserModel.findById(id).select("password");

        if (!user) {
            return sendBadRequestResponse(res, "User not found");
        }

        // Compare old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return sendBadRequestResponse(res, "Old password is incorrect");
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        return sendSuccessResponse(res, "Password changed successfully");
    } catch (error) {
        console.error("Change Password Error:", error);
        return sendErrorResponse(res, 500, "Something went wrong while changing password", error);
    }
}

export const userRemoveAccountController = async (req, res) => {
    try {
        const { id } = req?.user;
        if (!id && !mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "User Id And token Id Not FOUND!!");
        }

        const removeUser = await UserModel.findByIdAndDelete({ _id: id });

        if (!removeUser) {
            return sendNotFoundResponse(res, "User Account Not Found");
        }

        return sendSuccessResponse(res, "User Account Delete SuccessFullY! ", removeUser);


    } catch (error) {
        console.log("Erro while User Accounr Remove" + error.message);
        return sendErrorResponse(res, 500, "Error while Delete User Account!", error)
    }
}

// Seller profile
export const getSellerProfileController = async (req, res) => {
    try {
        // support both id and _id from token payload
        const sellerId = req?.user?.id || req?.user?._id;

        // Validate seller id
        if (!sellerId || !mongoose.Types.ObjectId.isValid(sellerId)) {
            return sendBadRequestResponse(res, "Invalid or missing Seller ID from token!");
        }

        // Fetch seller and exclude password
        const seller = await sellerModel.findById(sellerId).select("-password");

        if (!seller) {
            return sendNotFoundResponse(res, "Seller not found!");
        }

        return sendSuccessResponse(res, "Seller profile fetched successfully", seller);
    } catch (error) {
        console.error("Error fetching seller profile:", error.message);
        return sendErrorResponse(res, 500, "Error fetching seller profile", error);
    }
};