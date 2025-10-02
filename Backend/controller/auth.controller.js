import { config } from 'dotenv'; config()
import UserModel from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import transporter from '../utils/Email.config.js'
import { sendNotFoundResponse, sendSuccessResponse } from '../utils/Response.utils.js';


export class AuthController {
    //salt rounds
    static saltRounds = 10

    //JWT_SECRET define
    static JWT_SECRET = process.env.JWT_SECRET

    //OTP MAp
    static otpMap = new Map()

    //new Register user Controller [core register]
    static async newUserRegisterController(req, res) {
        try {
            const { firstName, lastName, email, password, role } = req.body;

            // Validate request
            if (!firstName || !lastName || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "firstName, lastName, email & password are required!"
                });
            }

            // Check if email already exists
            const isEmail = await UserModel.findOne({ email });
            if (isEmail) {
                return res.status(409).json({
                    success: false,
                    message: "You're already registered with this email. Please login."
                });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, AuthController.saltRounds);

            // Generate random avatar image
            function Ravatar(name) {
                try {
                    const formattedName = name.trim().replace(/\s+/g, "+");
                    return `https://ui-avatars.com/api/?name=${formattedName}&background=random`;
                } catch (error) {
                    console.error("Error generating avatar:", error);
                    return "";
                }
            }
            const fullName = `${firstName} ${lastName}`;
            const profileAvatar = Ravatar(fullName);

            // Create new user
            const newUser = await UserModel.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                avatar: profileAvatar,
                role: role || 'user',
            });

            const payload = {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                role: newUser.role || "user"
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

            return res.status(201).json({
                success: true,
                message: "User registered successfully",
                user: {
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    avatar: newUser.avatar,
                    role: newUser.role,
                    token: token
                }
            });

        } catch (error) {
            console.error("Registration Error:", error.message);
            return res.status(500).json({
                success: false,
                message: "Error registering new user",
                error: error.message
            });
        }
    }


    static async getAllnewUser(req, res) {
        try {
            const userData = await UserModel.find({ role: "user" })

            if (!userData || userData.length == 0) {
                return sendNotFoundResponse(res, "User not found!!!!")
            }

            return sendSuccessResponse(res, "User fetched Successfully...", userData)

        } catch (error) {
            console.error("Data fetch Error:", error.message);
            return res.status(500).json({
                success: false,
                message: "Error Fetching new user Data",
                error: error.message
            });
        }
    }

    static async getUser(req, res) {
        try {
            const { id } = req.user

            const checkUser = await UserModel.findById(id).select("-password -tokens");
            if (!checkUser) {
                return sendNotFoundResponse(res, "User not found")
            }

            return sendSuccessResponse(res, "User fetched successfully...", checkUser)

        } catch (error) {
            console.error("Data fetch Error:", error.message);
            return res.status(500).json({
                success: false,
                message: "Error Fetching new user Data",
                error: error.message
            });
        }
    }

    //login (core) using email & password
    static async userLoginController(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Email and password are required!"
                });
            }

            // Fetch user with password
            const user = await UserModel.findOne({ email }).select("+password");
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "You are not registered, please sign up first 🙏"
                });
            }

            // Correct bcrypt usage
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid password!"
                });
            }

            const payload = {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role || "user",
                isAdmin: user.role === 'admin',
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

            return res.status(200).json({
                success: true,
                message: "Login successful",
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role
                },
                token
            });

        } catch (error) {
            console.error("Login Error:", error.message);
            return res.status(500).json({
                success: false,
                message: "Error while logging in",
                error: error.message
            });
        }
    }

    //forget-password (send-Email OTP)
    static async sendForgotMailOtpController(req, res) {
        try {
            const { email } = req.body;

            // Validate input
            if (!email) {
                return res.status(400).json({
                    success: false,
                    message: "Email is required!"
                });
            }

            // Find user
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found, please register first!"
                });
            }

            // Generate OTP
            const OTP = Math.floor(1000 + Math.random() * 9000).toString();
            const from_email = process.env.SMTP_EMAIL || "hit.kalathiyainfotech@gmail.com";

            // Save OTP in DB with expiry
            user.otp = OTP;
            user.resetOtpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
            await user.save();

            // Also store OTP in memory (fast lookup, optional)
            AuthController.otpMap.set(email, {
                OTP,
                expiresAt: Date.now() + 10 * 60 * 1000
            });

            // Send email
            await transporter.sendMail({
                from: from_email,
                to: email,
                subject: "🔐 OTP for Password Reset - FastCart",
                html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9;">
                    <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
                        <h2 style="color: #2c3e50; text-align: center;">🔐 FastCart Password Reset</h2>
                        <p style="font-size: 15px; color: #333;">Hello ${user.name || "User"},</p>
                        <p style="font-size: 15px; color: #333;">
                            We received a request to reset your FastCart account password.<br>
                            Please use the OTP below to proceed:
                        </p>
                        <p style="font-size: 22px; font-weight: bold; text-align: center; color: #e74c3c; margin: 20px 0;">
                            ${OTP}
                        </p>
                        <p style="font-size: 14px; color: #777;">
                            ⚠️ This OTP will expire in <b>10 minutes</b>. If you didn’t request a password reset, please ignore this email.
                        </p>
                        <p style="font-size: 14px; color: #555; text-align: center; margin-top: 20px;">
                            – The FastCart Team
                        </p>
                    </div>
                </div>
            `
            });

            return res.status(200).json({
                success: true,
                message: "Forgot password OTP sent successfully!",
                toEmail: email,
                otp: OTP // ⚠️ For testing only, remove in production
            });

        } catch (error) {
            console.error("Forgot Password OTP Error:", error.message);
            return res.status(500).json({
                success: false,
                message: "Error while sending forgot password OTP!",
                error: error.message
            });
        }
    }


    //verify otp
    static async verifyForgetOtpController(req, res) {
        try {
            const { email, otp } = req.body;

            // Validate input
            if (!email || !otp) {
                return res.status(400).json({
                    success: false,
                    message: "Email & OTP are required!"
                });
            }

            // Find user
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found!"
                });
            }

            // Check OTP in DB
            if (user.resetOtp && user.resetOtpExpiry && user.resetOtpExpiry > Date.now()) {
                if (user.resetOtp === otp) {
                    user.otp = null;
                    user.resetOtpExpiry = null;
                    await user.save();

                    return res.status(200).json({
                        success: true,
                        message: "OTP verified successfully! You can now reset your password."
                    });
                } else {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid OTP!"
                    });
                }
            }

            // Check OTP in-memory (fallback for testing)
            const otpEntry = AuthController.otpMap.get(email);
            if (otpEntry && otpEntry.expiresAt > Date.now()) {
                if (otpEntry.OTP === otp) {
                    AuthController.otpMap.delete(email);

                    return res.status(200).json({
                        success: true,
                        message: "OTP verified successfully! You can now reset your password."
                    });
                } else {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid OTP!"
                    });
                }
            }

            // If OTP expired or not found
            return res.status(400).json({
                success: false,
                message: "OTP expired or not found. Please request a new one."
            });

        } catch (error) {
            console.error("Verify Forgot OTP Error:", error.message);
            return res.status(500).json({
                success: false,
                message: "Error while verifying OTP!",
                error: error.message
            });
        }
    }

    //reset password
    static async resetPasswordController(req, res) {
        try {
            const { email, newPassword } = req.body;

            //Validate input
            if (!email || !newPassword) {
                return res.status(400).json({
                    success: false,
                    message: "Email & new password are required!"
                });
            }

            //Find user
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found!"
                });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10); // 10 salt rounds

            user.password = hashedPassword;
            user.otp = null;
            user.resetOtpExpiry = null;
            await user.save();

            return res.status(200).json({
                success: true,
                message: "Password reset successfully! You can now login with your new password."
            });

        } catch (error) {
            console.error("Reset Password Error:", error.message);
            return res.status(500).json({
                success: false,
                message: "Error while resetting password!",
                error: error.message
            });
        }
    }
}

