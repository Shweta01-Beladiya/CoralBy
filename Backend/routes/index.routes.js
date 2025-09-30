import express from 'express';
import { AuthController } from '../controller/auth.controller.js';
import { newSellerController, verifySellerMobileOtpController, sellerLoginController, sellerForgetPasswordController, sellerVerifyForgetOtpController, sellerPasswordResetController, sellerGstVerifyAndInsertController, setSellerBusinessAddressController, sellerGstResetOtpController, sellerBankInfoSetController, sellerPickUpAddressSetController, trueSellerAgreementController, getAllSeller, getSeller, verifySellerOtpController } from '../controller/seller.controller.js';
import { createCategory, deleteCategoryById, getAllCategory, getCategoryById, updateCategoryById } from '../controller/category.controller.js';
import { isAdmin, isUser, sellerAuth, UserAuth } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/imageupload.js';
import { getProfileController, getSellerProfileController, getUserAddressController, getUserBillingAddressController, userAddressAddController, userAddressDeleteController, userAddressUpdatecontroller, userBillingAddressAddController, userBillingAddressDeleteController, userBillingAddressUpdatecontroller, userPasswordChangeController, userProfileUpdateController, userRemoveAccountController } from '../controller/profile.controller.js';
import { createProduct, deleteProduct, discoverProductController, getAllProduct, getCategoryHierarchy, getMostWishlistedProducts, getProductAll, getProductById, getProductBySubCategory, getProductsByBrand, getSalesAnalytics, getSimilarProducts, getTrendingProducts, updateLoveAboutPoints, updateProduct } from '../controller/product.controller.js';
import { getMyCartController, toggleCartItemController } from '../controller/cart.controller.js';
import { ListObjectsV2Command, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { S3Client } from "@aws-sdk/client-s3";
import { createMainCategory, deleteMainCategoryById, getAllMainCategory, getMainCategoryById, updateMainCategoryById } from '../controller/mainCategory.controller.js';
import { createSubCategory, deleteSubCategoryById, getAllSubCategory, getSubCategoryById, updateSubCategoryById } from '../controller/subCategory.controller.js';
import { brandFilterController, createBrand, deleteBrand, getAllBrand, getBrandById, getBrandByMainCategory, getSellerBrands, updateBrand } from '../controller/brand.controller.js';
import { addToWishlist, getWishlist, removeFromWishlist } from '../controller/wishlist.controller.js';
import { createCoupon, deleteCoupon, getAllCoupon, getCouponById, updateCoupon } from '../controller/coupon.controller.js';
import { addOrderInstructionsController, cancelMyOrderController, getSellerAllOrdersController, myOrderController, newOrderController, orderSummeryController, updateOrderStatusController } from '../controller/order.controller.js';
import { createReview, deleteReview, dislikeReview, getProductReviews, likeReview, updateReview } from '../controller/review.controller.js';
import { addProductBannerController, deleteProductBannerController, getProductBannerController, updateProductBannerController } from '../controller/product.banner.controller.js';
import { applyJobController, currentJobController, deleteJobApplicationController, getCurrentJobByIdController, getMyJobapplicationsController } from '../controller/job.application.controller.js';
import { adminJobsController, createJobController, deleteJobController, updateJobController } from '../controller/jobs.controller.js';
import { createOfferController, deleteOfferController } from '../controller/offer.controller.js';
import { downloadInvoiceController, getSellerPaymentsController, makeNewPaymentController, myPaymentController, paymentStatusChangeController } from '../controller/payment.controller.js';
import { createProductVariant, deleteProductVariant, getAllProductVariant, getProductVarientById, getProductWiseProductVarientdata, updateProductVariant } from '../controller/productVarient.controler.js';
import { createfaqCategory, deletefaqCategoryById, getAllfaqCategory, getfaqCategoryById, updatefaqCategoryById } from '../controller/faqCategory.controller.js';
import { createFAQQuestion, deleteFAQQuestion, getAllFAQQuestions, getFAQQuestionById, getFAQQuestionsByCategory, updateFAQQuestion } from '../controller/faqQuestion.controller.js';
import { addRecentlyView, getRecentlyView } from '../controller/recentlyView.controller.js';
import { addNewBlogCategoryController, deleteBlogCategoryController, getAllBlogCategoryController, getBlogCategoryByIdController, updateBlogCategoryController } from '../controller/blog.category.controller.js';
import { addNewBlogController, deleteBlogController, getAllBlogsController, getBlogByIdController, updateBlogController } from '../controller/blog.controller.js';
import { createContactUs, deleteContactUs, getAllContactUs, getContactUsById, updateContactUs } from '../controller/contactUs.controller.js';
import { createorderfaqCategory, deleteorderfaqCategoryById, getAllorderfaqCategory, getorderfaqCategoryById, updateorderfaqCategoryById } from '../controller/orderfaqCategory.controller.js';
import { createorderFAQQuestion, deleteorderFAQQuestion, getAllorderFAQQuestions, getorderFAQQuestionById, getorderFAQQuestionsByCategory, updateorderFAQQuestion } from '../controller/orderfaqQuestion.controller.js';
import { createSubcribe, deleteSubcribeById, getAllSubcribe, getSubcribeById, updateSubcribeById } from '../controller/subcribe.controller.js';


const indexRouter = express.Router();

//register
indexRouter.post("/new/user", AuthController.newUserRegisterController);

//User login
indexRouter.post("/login", AuthController.userLoginController);
indexRouter.post("/forget/password", AuthController.sendForgotMailOtpController);
indexRouter.post("/verify/forget/password", AuthController.verifyForgetOtpController)
indexRouter.post("/reset/password", AuthController.resetPasswordController);

//seller.router.js
indexRouter.post("/new/seller", newSellerController)
indexRouter.post("/verify/seller/otp", verifySellerMobileOtpController)
indexRouter.post("/seller/login", sellerLoginController)
indexRouter.post("/seller/forget/password", sellerForgetPasswordController);
indexRouter.post("/seller/verify/forget/password", sellerVerifyForgetOtpController);
indexRouter.post("/seller/reset/password", sellerPasswordResetController);


// MainCategory
indexRouter.post("/createMainCategory", UserAuth, isAdmin, upload.fields([{ name: "mainCategoryImage", maxCount: 1 }]), createMainCategory)
indexRouter.get("/getAllMainCategory", getAllMainCategory)
indexRouter.get("/getMainCategoryById/:id", getMainCategoryById)
indexRouter.patch("/updateMainCategoryById/:id", UserAuth, isAdmin, upload.fields([{ name: "mainCategoryImage", maxCount: 1 }]), updateMainCategoryById)
indexRouter.delete("/deleteMainCategoryById/:id", UserAuth, isAdmin, deleteMainCategoryById)

// Category
indexRouter.post("/createCategory", UserAuth, isAdmin, createCategory)
indexRouter.get("/getAllCategory", getAllCategory)
indexRouter.get("/getCategoryById/:id", getCategoryById)
indexRouter.patch("/updateCategoryById/:id", UserAuth, isAdmin, updateCategoryById)
indexRouter.delete("/deleteCategoryById/:id", UserAuth, isAdmin, deleteCategoryById)

// SubCategory
indexRouter.post("/createSubCategory", UserAuth, isAdmin, createSubCategory)
indexRouter.get("/getAllSubCategory", getAllSubCategory)
indexRouter.get("/getSubCategoryById/:id", getSubCategoryById)
indexRouter.patch("/updateSubCategoryById/:id", UserAuth, isAdmin, updateSubCategoryById)
indexRouter.delete("/deleteSubCategoryById/:id", UserAuth, isAdmin, deleteSubCategoryById)

// Brand
indexRouter.post("/createBrand", sellerAuth, upload.fields([{ name: "brandImage", maxCount: 1 }]), createBrand);
indexRouter.get("/getAllBrand", getAllBrand)
indexRouter.get("/getBrandById/:id", getBrandById)
indexRouter.patch("/updateBrand/:id", sellerAuth, upload.fields([{ name: "brandImage", maxCount: 1 }]), updateBrand)
indexRouter.delete("/deleteBrand/:id", sellerAuth, deleteBrand)
indexRouter.get("/getSellerBrands", sellerAuth, getSellerBrands)
indexRouter.get("/getBrandByMainCategory/:mainCategoryId", getBrandByMainCategory)

// brand.filter.route.js
indexRouter.get("/filter/brand/sort", UserAuth, brandFilterController);



// Product
indexRouter.post("/createProduct", sellerAuth, createProduct);
indexRouter.get("/getAllProduct", getAllProduct);
indexRouter.get("/getProductById/:id", getProductById);
indexRouter.patch("/updateProduct/:id/love_about", sellerAuth, updateProduct);
indexRouter.patch("/updateLoveAboutPoints/:id", sellerAuth, updateLoveAboutPoints);
indexRouter.delete("/deleteProduct/:id", sellerAuth, deleteProduct);
indexRouter.get("/getProductBySubCategory/:subCategoryId", getProductBySubCategory);
indexRouter.get("/getCategoryHierarchy", getCategoryHierarchy);
indexRouter.get("/getProductsByBrand/:brandId", getProductsByBrand);
indexRouter.get("/getProductAll", getProductAll);
indexRouter.get("/getSimilarProducts/:productId", getSimilarProducts);
indexRouter.get("/getMostWishlistedProducts", getMostWishlistedProducts);
indexRouter.get("/getTrendingProducts", getTrendingProducts);
indexRouter.get("/getSalesAnalytics", getSalesAnalytics);

// discover new product
indexRouter.get("/discover/product", UserAuth, discoverProductController)


// Product
indexRouter.post("/createProductVariant", sellerAuth, upload.fields([{ name: "images", maxCount: 1 }]), createProductVariant);
indexRouter.get("/getAllProductVariant", getAllProductVariant);
indexRouter.get("/getProductVarientById/:id", getProductVarientById);
indexRouter.patch("/updateProductVariant/:variantId", sellerAuth, upload.fields([{ name: "images", maxCount: 1 }]), updateProductVariant);
indexRouter.delete("/deleteProductVariant/:variantId", sellerAuth, deleteProductVariant);
indexRouter.get("/getProductWiseProductVarientdata/:productId", getProductWiseProductVarientdata);


//product.banner.routes.js
indexRouter.post("/seller/product/banner/:productId", sellerAuth, upload.array("bannerImages", 10), addProductBannerController);
indexRouter.get("/seller/product/banner/:productId", sellerAuth, getProductBannerController);
indexRouter.put("/seller/update/product/banner/:productId", sellerAuth, upload.array("bannerImages", 10), updateProductBannerController);
indexRouter.delete("/seller/delete/product/banner/:productId", sellerAuth, deleteProductBannerController);

//offer.routes.js
indexRouter.post("/create/offer", UserAuth, isAdmin, upload.single("offerImage"), createOfferController);
indexRouter.delete("/delete/offer/:offerId", UserAuth, isAdmin, deleteOfferController)

// Coupon
indexRouter.post("/seller/createCoupon", sellerAuth, createCoupon);
indexRouter.get("/getAllCoupon", UserAuth, getAllCoupon);
indexRouter.get("/getCouponById/:id", UserAuth, getCouponById);
indexRouter.patch("/seller/updateCoupon/:id", sellerAuth, updateCoupon);
indexRouter.delete("/seller/deleteCoupon/:id", sellerAuth, deleteCoupon);
// indexRouter.post("/apply-coupon", applyCouponController);


//seller.kyc.router.js
indexRouter.post("/seller/gst/verify", sellerAuth, sellerGstVerifyAndInsertController);
indexRouter.post("/seller/business/address", sellerAuth, setSellerBusinessAddressController);
indexRouter.post("/seller/verify/otp", sellerAuth, verifySellerOtpController)
indexRouter.post("/seller/gst/reset/otp", sellerAuth, sellerGstResetOtpController);

//seller bank detail verify & insert record
indexRouter.post("/seller/bank/insert", sellerAuth, sellerBankInfoSetController);
//seller.pickup.address.js
indexRouter.post("/seller/pickup/address", sellerAuth, sellerPickUpAddressSetController)
//seller agreement accept or not
indexRouter.post('/seller/agreement', sellerAuth, trueSellerAgreementController);

//profile.route.js
indexRouter.get("/user/profile", UserAuth, getProfileController);
//update email,firstname,lastnmae,mobile No;
indexRouter.patch("/user/profile/update", UserAuth, userProfileUpdateController);

//user address
indexRouter.post("/user/address", UserAuth, userAddressAddController);
indexRouter.patch("/user/address/update/:addressId", UserAuth, userAddressUpdatecontroller);
indexRouter.delete("/user/address/delete/:addressId", UserAuth, userAddressDeleteController);
indexRouter.get("/user/address", UserAuth, getUserAddressController);

//user Billingaddress
indexRouter.post("/user/billingaddress", UserAuth, userBillingAddressAddController);
indexRouter.patch("/user/billingaddress/update/:billingaddressId", UserAuth, userBillingAddressUpdatecontroller);
indexRouter.delete("/user/billingaddress/delete/:billingaddressId", UserAuth, userBillingAddressDeleteController);
indexRouter.get("/user/billingaddress", UserAuth, getUserBillingAddressController);

//cart.route.js
indexRouter.post("/add/cart/:productId", UserAuth, toggleCartItemController);
indexRouter.get("/my/cart", UserAuth, getMyCartController)

//wishlist.route.js
indexRouter.post("/addToWishlist/:productId", UserAuth, addToWishlist)
indexRouter.get("/getWishlist", UserAuth, getWishlist)
indexRouter.delete("/removeFromWishlist/:productId", UserAuth, removeFromWishlist)


//change password
indexRouter.post("/user/change/password", UserAuth, userPasswordChangeController);
//delete Account
indexRouter.delete("/user/remove/account", UserAuth, userRemoveAccountController);
//seller.profile
indexRouter.get("/seller/profile", sellerAuth, getSellerProfileController);

//admin api
indexRouter.get("/getAllnewUser", AuthController.getAllnewUser)
indexRouter.get("/getUser", UserAuth, AuthController.getUser)
indexRouter.get("/getAllSeller", getAllSeller)
indexRouter.get("/getSeller", sellerAuth, getSeller)

//order.routes.js
indexRouter.post("/new/order", UserAuth, newOrderController);
indexRouter.get("/my/order", UserAuth, myOrderController);
indexRouter.get("/seller/orders", sellerAuth, getSellerAllOrdersController);
indexRouter.patch("/order/status/:orderId", sellerAuth, updateOrderStatusController);
indexRouter.post("/cancel/my/order/:orderId", UserAuth, cancelMyOrderController);
indexRouter.get("/order/summery", UserAuth, orderSummeryController)
//Order special instructions
indexRouter.post("/order/instructions/:orderId", UserAuth, addOrderInstructionsController);

//payment.routes.js
indexRouter.post("/new/payment", UserAuth, makeNewPaymentController);
indexRouter.get("/my/payments", UserAuth, myPaymentController);
indexRouter.get("/all/payments", sellerAuth, getSellerPaymentsController);
indexRouter.get("/download/invoice/:paymentId", UserAuth, downloadInvoiceController);
indexRouter.patch("/payment/status/:paymentId", sellerAuth, paymentStatusChangeController);


//reviw.model.js
indexRouter.post('/createReview', UserAuth, upload.fields([{ name: 'images', maxCount: 5 }, { name: 'videos', maxCount: 2 }]), createReview);
indexRouter.patch('/updateReview/:reviewId', UserAuth, upload.fields([{ name: 'images', maxCount: 5 }, { name: 'videos', maxCount: 2 }]), updateReview);
indexRouter.delete('/deleteReview/:reviewId', UserAuth, deleteReview);
indexRouter.get('/getProductReviews/:productId', getProductReviews);
indexRouter.post('/likeReview/:reviewId', UserAuth, likeReview);
indexRouter.post('/dislikeReview/:reviewId', UserAuth, dislikeReview);

//career  routes beginning

// Admin jobs handle +
indexRouter.get("/jobs/admin", UserAuth, isAdmin, adminJobsController);
indexRouter.post("/create/job", UserAuth, isAdmin, createJobController);
indexRouter.patch("/update/job/:jobId", UserAuth, isAdmin, updateJobController);
indexRouter.delete("/delete/job/:jobId", UserAuth, isAdmin, deleteJobController);

//job application route
indexRouter.get("/current/jobs", currentJobController);
indexRouter.get("/current/job/:jobId", UserAuth, getCurrentJobByIdController);
indexRouter.post("/apply/job/:jobId", UserAuth, upload.single("resume"), applyJobController);
indexRouter.get("/my/applications", UserAuth, getMyJobapplicationsController);
indexRouter.delete("/delete/job/application/:applicationId", UserAuth, isAdmin, deleteJobApplicationController);

//faqCategory route
indexRouter.post("/createfaqCategory", UserAuth, isAdmin, createfaqCategory);
indexRouter.get("/getAllfaqCategory", getAllfaqCategory);
indexRouter.get("/getfaqCategoryById/:id", getfaqCategoryById);
indexRouter.patch("/updatefaqCategoryById/:id", UserAuth, isAdmin, updatefaqCategoryById);
indexRouter.delete("/deletefaqCategoryById/:id", UserAuth, isAdmin, deletefaqCategoryById);

//faqQuestion route
indexRouter.post("/createFAQQuestion", UserAuth, isAdmin, createFAQQuestion);
indexRouter.get("/getAllFAQQuestions", getAllFAQQuestions);
indexRouter.get("/getFAQQuestionById/:id", getFAQQuestionById);
indexRouter.patch("/updateFAQQuestion/:id", UserAuth, isAdmin, updateFAQQuestion);
indexRouter.delete("/deleteFAQQuestion/:id", UserAuth, isAdmin, deleteFAQQuestion);
indexRouter.get("/getFAQQuestionsByCategory/:categoryId", getFAQQuestionsByCategory);

indexRouter.post("/addRecentlyView/:productId", UserAuth, addRecentlyView);
indexRouter.get("/getRecentlyView", UserAuth, getRecentlyView);

//blog section api's
// blog.category.routes.js
indexRouter.post("/new/blogCategory", UserAuth, isAdmin, addNewBlogCategoryController);
indexRouter.get("/all/category", getAllBlogCategoryController);
indexRouter.get("/categoryById/:categoryId", getBlogCategoryByIdController);
indexRouter.patch("/update/blogCategory/:categoryId", UserAuth, isAdmin, updateBlogCategoryController);
indexRouter.delete("/delete/blogCategory/:categoryId", UserAuth, isAdmin, deleteBlogCategoryController);

//blog.content*.route.js

indexRouter.post("/new/blog", UserAuth, isAdmin, upload.any(), addNewBlogController);
indexRouter.get("/all/blogs", getAllBlogsController);
indexRouter.get("/blog/:blogId", getBlogByIdController);
indexRouter.patch("/update/blog/:blogId", UserAuth, isAdmin, upload.any(), updateBlogController);
indexRouter.delete("/delete/blog/:blogId", deleteBlogController);
//ContactUs
indexRouter.post("/createContactUs", createContactUs);
indexRouter.get("/getAllContactUs", getAllContactUs);
indexRouter.get("/getContactUsById/:id", getContactUsById);
indexRouter.patch("/updateContactUs/:id", updateContactUs);
indexRouter.delete("/deleteContactUs/:id", deleteContactUs);

//orderfaqCategory route
indexRouter.post("/createorderfaqCategory", UserAuth, isAdmin, createorderfaqCategory);
indexRouter.get("/getAllorderfaqCategory", getAllorderfaqCategory);
indexRouter.get("/getorderfaqCategoryById/:id", getorderfaqCategoryById);
indexRouter.patch("/updateorderfaqCategoryById/:id", UserAuth, isAdmin, updateorderfaqCategoryById);
indexRouter.delete("/deleteorderfaqCategoryById/:id", UserAuth, isAdmin, deleteorderfaqCategoryById);

//orderfaqQuestion route
indexRouter.post("/createorderFAQQuestion", UserAuth, isAdmin, createorderFAQQuestion);
indexRouter.get("/getAllorderFAQQuestions", getAllorderFAQQuestions);
indexRouter.get("/getorderFAQQuestionById/:id", getorderFAQQuestionById);
indexRouter.patch("/updateorderFAQQuestion/:id", UserAuth, isAdmin, updateorderFAQQuestion);
indexRouter.delete("/deleteorderFAQQuestion/:id", UserAuth, isAdmin, deleteorderFAQQuestion);
indexRouter.get("/getorderFAQQuestionsByCategory/:ordercategoryId", getorderFAQQuestionsByCategory);


indexRouter.post("/createSubcribe", createSubcribe);
indexRouter.get("/getAllSubcribe", getAllSubcribe);
indexRouter.get("/getSubcribeById/:id", getSubcribeById);
indexRouter.patch("/updateSubcribeById/:id", updateSubcribeById);
indexRouter.delete("/deleteSubcribeById/:id", deleteSubcribeById);


const s3Client = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
    },
});

// List all files in bucket
indexRouter.get("/listBucket", async (req, res) => {
    try {
        const command = new ListObjectsV2Command({ Bucket: process.env.S3_BUCKET_NAME });
        const response = await s3Client.send(command);

        const files = (response.Contents || []).map(file => ({
            Key: file.Key,
            Size: file.Size,
            LastModified: file.LastModified,
            ETag: file.ETag,
            StorageClass: file.StorageClass,
        }));

        return res.json({ success: true, files });
    } catch (err) {
        console.error("Error listing bucket:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
});

// Delete a file from bucket
indexRouter.delete("/deleteBucketFile", async (req, res) => {
    try {
        const { key } = req.body; // example: "images/1757483363902-9.jfif"
        if (!key) return res.status(400).json({ success: false, message: "File key is required" });

        await s3Client.send(new DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
        }));

        return res.json({ success: true, message: `File deleted successfully: ${key}` });
    } catch (err) {
        console.error("Error deleting file:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
});

export default indexRouter;