import mongoose from "mongoose";

export const UserAddressSchema = new mongoose.Schema({
    firstName: { type: String, trim: true, default: null },
    lastName: { type: String, trim: true, default: null },
    phone: {
        type: String,
        default: null,
        match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"]
    },
    zipcode: { type: String, default: null },
    address: { type: String, default: null },
    city: { type: String, default: null },
    state: { type: String, default: null },
    saveAs: {
        type: String,
        enum: ["Home", "Office", "Other"],
        default: "Home"
    },
    officeOpenOnSaturday: { type: Boolean, default: false },
    officeOpenOnSunday: { type: Boolean, default: false },
});

export const UserBillingAddressSchema = new mongoose.Schema({
    firstName: { type: String, trim: true, default: null },
    lastName: { type: String, trim: true, default: null },
    phone: {
        type: String,
        default: null,
        match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"]
    },
    zipcode: { type: String, default: null },
    address: { type: String, default: null },
    city: { type: String, default: null },
    state: { type: String, default: null },
    saveAs: {
        type: String,
        enum: ["Home", "Office", "Other"],
        default: "Home"
    },
    officeOpenOnSaturday: { type: Boolean, default: false },
    officeOpenOnSunday: { type: Boolean, default: false },
});

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    mobileNo: {
        type: String,
        default: null,
        match: [/^[0-9]{10}$/, "Please enter a valid mobile number"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: { type: String, select: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isAdmin: { type: Boolean, default: false },

    // Address arrays
    address: [UserAddressSchema],
    billingaddress: [UserBillingAddressSchema],

    // Default selected IDs
    selectedAddress: { type: mongoose.Schema.Types.ObjectId, default: null },
    selectedBillingAddress: { type: mongoose.Schema.Types.ObjectId, default: null },

    // Flags
    setMyDefultUserAddress: { type: Boolean, default: false },
    setMyDefultUserBillingAddress: { type: Boolean, default: false },

    // Misc fields
    otp: { type: Number, default: null },
    avatar: { type: String, default: null },
    resetOtpExpiry: { type: Date, default: null },
    verified: { type: Boolean, default: false },
}, { timestamps: true });

const UserModel = mongoose.model("user", UserSchema);
export default UserModel;
