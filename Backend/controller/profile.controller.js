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
        const { id } = req?.user;

        // ✅ Validate user id
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid User Id in Token!");
        }

        const { firstName, lastName, phone, zipcode, address, city, state, saveAs } = req?.body;

        // ✅ Check required fields
        if (!firstName || !lastName || !phone || !zipcode || !address) {
            return sendBadRequestResponse(
                res,
                "All required fields (firstName, lastName, phone, zipcode, address) must be provided!"
            );
        }

        // ✅ Verify zipcode (only if Indian zip code, else skip API check)
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

        // ✅ Address object
        const addressData = {
            firstName,
            lastName,
            phone,
            zipcode,
            address,
            city: autoCity,
            state: autoState,
            saveAs: saveAs || "Home"
        };

        // ✅ Save address to user
        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            { $push: { address: addressData } },
            { new: true }
        );

        return sendSuccessResponse(res, "User Address inserted successfully", updatedUser);
    } catch (error) {
        console.error("Error in userAddressAddController:", error.message);
        return sendErrorResponse(res, 500, "Something went wrong while adding address!", error.message);
    }
};

export const userAddressUpdatecontroller = async (req, res) => {
    try {
        const { id } = req?.user; // userId from auth token
        const { addressId } = req?.params;
        // ✅ Validate user id
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid User Id in Token!");
        }

        const {
            firstName,
            lastName,
            phone,
            email,
            houseNo,
            landmark,
            pincode,
            city,
            state,
            country,
            saveAs,
        } = req?.body;

        // ✅ Validate addressId
        if (!addressId || !mongoose.Types.ObjectId.isValid(addressId)) {
            return sendBadRequestResponse(res, "Valid addressId must be provided!");
        }

        // ✅ Build update object dynamically (only fields that are provided)
        const updateFields = {};
        if (firstName) updateFields["address.$.firstName"] = firstName;
        if (lastName) updateFields["address.$.lastName"] = lastName;
        if (phone) updateFields["address.$.phone"] = phone;
        if (email) updateFields["address.$.email"] = String(email).toLowerCase();
        if (houseNo) updateFields["address.$.houseNo"] = houseNo;
        if (landmark) updateFields["address.$.landmark"] = landmark;
        if (pincode) updateFields["address.$.pincode"] = pincode;
        if (city) updateFields["address.$.city"] = city;
        if (state) updateFields["address.$.state"] = state;
        if (country) updateFields["address.$.country"] = country;
        if (saveAs) updateFields["address.$.saveAs"] = saveAs;

        // ✅ Update address using positional operator $
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: id, "address._id": addressId },
            { $set: updateFields },
            { new: true }
        );

        if (!updatedUser) {
            return sendBadRequestResponse(res, "Address not found or update failed!");
        }

        return sendSuccessResponse(
            res,
            "User address updated successfully!",
            updatedUser
        );
    } catch (error) {
        console.error("Error in userAddressUpdateController:", error.message);
        return sendErrorResponse(
            res,
            500,
            "Something went wrong while updating address!",
            error.message
        );
    }
};

export const userAddressDeleteController = async (req, res) => {
    try {
        const { id } = req?.user;
        const { addressId } = req?.params;

        // Validate user id
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid or missing User ID from token!");
        }

        // Validate address id
        if (!addressId || !mongoose.Types.ObjectId.isValid(addressId)) {
            return sendBadRequestResponse(res, "Invalid or missing Address ID!");
        }

        // First, check if user exists and has that address
        const user = await UserModel.findById(id);
        if (!user) {
            return sendNotFoundResponse(res, "User not found!");
        }

        const addressExists = user.address?.some(addr => addr._id.toString() === addressId);
        if (!addressExists) {
            return sendNotFoundResponse(res, "Address not found!");
        }

        // Delete address from user's address array
        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            { $pull: { address: { _id: addressId } } },
            { new: true }
        );

        return sendSuccessResponse(res, "Address deleted successfully", updatedUser);
    } catch (error) {
        console.error("Error while deleting user address:", error.message);
        return sendErrorResponse(res, 500, "Error during address deletion!", error);
    }
};

export const getUserAddressController = async (req, res) => {
    try {
        const { id } = req?.user;

        // Validate user id
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid or missing User ID from token!");
        }

        // Get user and only select address field
        const user = await UserModel.findById(id).select("address");

        if (!user) {
            return sendNotFoundResponse(res, "User not found!");
        }

        if (!user.address || user.address.length === 0) {
            return sendNotFoundResponse(res, "No addresses found for this user!");
        }

        return sendSuccessResponse(res, "User addresses fetched successfully", {
            total: user.address.length,
            address: user.address
        });
    } catch (error) {
        console.error("Error while getting user addresses:", error.message);
        return sendErrorResponse(res, 500, "Error while getting user addresses!", error);
    }
};



export const userBillingAddressAddController = async (req, res) => {
    try {
        const { id } = req?.user;

        // ✅ Validate user id
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid User Id in Token!");
        }

        const { firstName, lastName, phone, zipcode, address, city, state, saveAs } = req?.body;

        // ✅ Check required fields
        if (!firstName || !lastName || !phone || !zipcode || !address) {
            return sendBadRequestResponse(
                res,
                "All required fields (firstName, lastName, phone, zipcode, address) must be provided!"
            );
        }

        // ✅ Verify zipcode (only if Indian zip code, else skip API check)
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

        // ✅ Address object
        const billingaddressData = {
            firstName,
            lastName,
            phone,
            zipcode,
            address,
            city: autoCity,
            state: autoState,
            saveAs: saveAs || "Home"
        };

        // ✅ Save address to user
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
            email,
            houseNo,
            landmark,
            pincode,
            city,
            state,
            country,
            saveAs,
        } = req?.body;

        // Validate billingaddressId
        if (!billingaddressId || !mongoose.Types.ObjectId.isValid(billingaddressId)) {
            return sendBadRequestResponse(res, "Valid billingaddressId must be provided!");
        }

        // Build update object dynamically (only fields that are provided)
        const updateFields = {};
        if (firstName) updateFields["billingaddress.$.firstName"] = firstName;
        if (lastName) updateFields["billingaddress.$.lastName"] = lastName;
        if (phone) updateFields["billingaddress.$.phone"] = phone;
        if (email) updateFields["billingaddress.$.email"] = String(email).toLowerCase();
        if (houseNo) updateFields["billingaddress.$.houseNo"] = houseNo;
        if (landmark) updateFields["billingaddress.$.landmark"] = landmark;
        if (pincode) updateFields["billingaddress.$.pincode"] = pincode;
        if (city) updateFields["billingaddress.$.city"] = city;
        if (state) updateFields["billingaddress.$.state"] = state;
        if (country) updateFields["billingaddress.$.country"] = country;
        if (saveAs) updateFields["billingaddress.$.saveAs"] = saveAs;

        // Update billingaddress using positional operator $
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: id, "billingaddress._id": billingaddressId },
            { $set: updateFields },
            { new: true }
        );

        if (!updatedUser) {
            return sendBadRequestResponse(res, "Billingaddress not found or update failed!");
        }

        return sendSuccessResponse(
            res,
            "User Billingaddress updated successfully!",
            updatedUser
        );
    } catch (error) {
        console.error("Error in userAddressUpdateController:", error.message);
        return sendErrorResponse(
            res,
            500,
            "Something went wrong while updating Billingaddress!",
            error.message
        );
    }
};

export const userBillingAddressDeleteController = async (req, res) => {
    try {
        const { id } = req?.user;
        const { billingaddressId } = req?.params;

        // Validate user id
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "Invalid or missing User ID from token!");
        }

        // Validate billing address id
        if (!billingaddressId || !mongoose.Types.ObjectId.isValid(billingaddressId)) {
            return sendBadRequestResponse(res, "Invalid or missing billing address ID!");
        }

        // Check if user exists
        const user = await UserModel.findById(id);
        if (!user) {
            return sendNotFoundResponse(res, "User not found!");
        }

        // Check if billing address exists in user
        const billingExists = user.billingaddress?.some(
            addr => addr._id.toString() === billingaddressId
        );
        if (!billingExists) {
            return sendNotFoundResponse(res, "Billing address not found!");
        }

        // Delete billing address
        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            { $pull: { billingaddress: { _id: billingaddressId } } },
            { new: true }
        );

        return sendSuccessResponse(res, "Billing address deleted successfully", updatedUser);
    } catch (error) {
        console.error("Error while deleting user billing address:", error.message);
        return sendErrorResponse(res, 500, "Error during billing address deletion!", error);
    }
};

export const getUserBillingAddressController = async (req, res) => {
    try {
        const { id } = req?.user;
        if (!id && !mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequestResponse(res, "user _id not found! by Token");
        }

        const Billingaddress = await UserModel.find({ _id: id }).select("billingaddress");

        if (!Billingaddress && Billingaddress.length === 0) {
            return sendNotFoundResponse(res, "No Billingaddress Found For you!!");
        }

        return sendSuccessResponse(res, "User Billingaddress Fetch Successfully", {
            total: Billingaddress.length,
            Billingaddress: Billingaddress
        })

    } catch (error) {
        console.log("Error While Get user Billingaddress" + error.message);
        return sendErrorResponse(res, 500, "Error while Get User Billingaddress", error);
    }
}



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
