import mongoose from "mongoose";
import Product from "../model/product.model.js";
import sellerModel from "../model/seller.model.js";
import MainCategoryModel from "../model/mainCategory.model.js";
import CategoryModel from "../model/category.model.js";
import SubCategoryModel from "../model/subCategory.model.js";
import InsideSubCategoryModel from "../model/insideSubCategory.model.js";
import ProductVariant from "../model/productvarient.model.js";
import { ThrowError } from "../utils/Error.utils.js";
import { sendBadRequestResponse, sendErrorResponse, sendNotFoundResponse, sendSuccessResponse } from "../utils/Response.utils.js";
import brandModel from "../model/brand.model.js";
import productModel from "../model/product.model.js";
import Wishlist from '../model/wishlist.model.js';
import productvarientModel from "../model/productvarient.model.js";
import paymentModel from "../model/payment.model.js";
import OrderModel from "../model/order.model.js";

// Assign badges: NEW, TRENDING, TOP RATED
export const assignBadges = async () => {
  try {

    const sellers = await Product.distinct("sellerId");

    for (let sellerId of sellers) {

      const last3 = await Product.find({ sellerId })
        .sort({ createdAt: -1 })
        .limit(3);

      for (let p of last3) {

        if (!p.badge) {
          p.badge = "NEW";
          await p.save();
        }
      }
    }


    const orders = await OrderModal.find();
    const productSalesCount = {};

    orders.forEach((order) => {
      order.items?.forEach((item) => {
        const productId = item._id.toString();
        const quantity = item.qty || 1;
        productSalesCount[productId] = (productSalesCount[productId] || 0) + quantity;
      });
    });

    const topSellingIds = Object.entries(productSalesCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([id]) => id);

    for (let id of topSellingIds) {
      const p = await Product.findById(id);

      if (p && !p.badge) {
        p.badge = "TRENDING";
        await p.save();
      }
    }


    const topRatedProducts = await Product.find({ "rating.average": { $gt: 0 } })
      .sort({ "rating.average": -1 })
      .limit(10);

    for (let p of topRatedProducts) {
      if (!p.badge) {
        p.badge = "TOP RATED";
        await p.save();
      }
    }

    console.log("Badges assigned successfully!");
  } catch (err) {
    console.error("Error assigning badges:", err.message);
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      brand,
      title,
      mainCategory,
      category,
      subCategory,
      insideSubCategory, // ✅ Optional
      description,
      productDetails,
      shippingReturn,
      warrantySupport,
      love_about
    } = req.body;

    const sellerId = req.user?._id;

    if (!sellerId || !mongoose.Types.ObjectId.isValid(sellerId)) {
      return sendBadRequestResponse(res, "Invalid or missing seller ID. Please login first!");
    }

    const seller = await sellerModel.findById(sellerId).populate("brandId");
    if (!seller) return sendNotFoundResponse(res, "Seller not found or unauthorized!");
    if (!seller.brandId || seller.brandId.length === 0) {
      return sendBadRequestResponse(res, "Please add a brand first before creating a product.");
    }

    let selectedBrand;
    if (brand) {
      const isValidBrand = seller.brandId.some(b => b._id.toString() === brand);
      if (!isValidBrand) {
        return sendBadRequestResponse(res, "This brand does not belong to you!");
      }
      selectedBrand = brand;
    } else {
      selectedBrand = seller.brandId[0]._id;
    }

    // ✅ insideSubCategory is now optional
    if (!title || !mainCategory || !category || !subCategory) {
      return sendBadRequestResponse(res, "title, mainCategory, category and subCategory are required!");
    }

    if (!mongoose.Types.ObjectId.isValid(mainCategory)) return sendBadRequestResponse(res, "Invalid mainCategory ID!");
    if (!mongoose.Types.ObjectId.isValid(category)) return sendBadRequestResponse(res, "Invalid category ID!");
    if (!mongoose.Types.ObjectId.isValid(subCategory)) return sendBadRequestResponse(res, "Invalid subCategory ID!");

    const categoryChecks = [
      MainCategoryModel.findById(mainCategory),
      CategoryModel.findById(category),
      SubCategoryModel.findById(subCategory),
    ];

    // ✅ Add insideSubCategory check only if provided
    if (insideSubCategory) {
      if (!mongoose.Types.ObjectId.isValid(insideSubCategory)) {
        return sendBadRequestResponse(res, "Invalid insideSubCategory ID!");
      }
      categoryChecks.push(InsideSubCategoryModel.findById(insideSubCategory));
    }

    const [mainCatExists, catExists, subCatExists, insideSubCatExists] = await Promise.all(categoryChecks);

    if (!mainCatExists) return sendNotFoundResponse(res, "Main category does not exist!");
    if (!catExists) return sendNotFoundResponse(res, "Category does not exist!");
    if (!subCatExists) return sendNotFoundResponse(res, "Sub category does not exist!");
    if (insideSubCategory && !insideSubCatExists) return sendNotFoundResponse(res, "Inside sub category does not exist!");

    if (productDetails) {
      const { material, fit, closure, weight } = productDetails;
      if (material && typeof material !== "string") return sendBadRequestResponse(res, "Material must be a string!");
      if (fit && typeof fit !== "string") return sendBadRequestResponse(res, "Fit must be a string!");
      if (closure && typeof closure !== "string") return sendBadRequestResponse(res, "Closure must be a string!");
      if (weight && typeof weight !== "string") return sendBadRequestResponse(res, "Weight must be a string!");
    }

    if (warrantySupport?.customerSupport) {
      const { email, phone, available } = warrantySupport.customerSupport;
      if (email && typeof email !== "string") return sendBadRequestResponse(res, "Customer support email must be a string!");
      if (phone && typeof phone !== "string") return sendBadRequestResponse(res, "Customer support phone must be a string!");
      if (available && typeof available !== "string") return sendBadRequestResponse(res, "Customer support availability must be a string!");
    }

    if (!love_about || !Array.isArray(love_about) || love_about.length === 0) {
      return sendBadRequestResponse(res, "love_about is required and must be a non-empty array!");
    }

    for (const item of love_about) {
      if (typeof item !== 'object' || item === null) {
        return sendBadRequestResponse(res, "Each love_about item must be an object!");
      }
      if (!item.point || typeof item.point !== 'string') {
        return sendBadRequestResponse(res, "Each love_about item must have a 'point' string!");
      }
    }

    const existingProduct = await Product.findOne({ title, sellerId, category });
    if (existingProduct) return sendBadRequestResponse(res, "This product is already added!");

    const productData = {
      sellerId,
      brand: selectedBrand,
      title,
      mainCategory,
      category,
      subCategory,
      description,
      productDetails,
      shippingReturn,
      warrantySupport,
      love_about
    };

    // ✅ Add insideSubCategory only if provided
    if (insideSubCategory) {
      productData.insideSubCategory = insideSubCategory;
    }

    const newProduct = await Product.create(productData);

    await sellerModel.findByIdAndUpdate(
      sellerId,
      { $push: { products: newProduct._id } },
      { new: true }
    );

    const populatedProduct = await Product.findById(newProduct._id)
      .populate("brand", "brandName")
      .populate("mainCategory", "mainCategoryName")
      .populate("category", "categoryName")
      .populate("subCategory", "subCategoryName")
      .populate("insideSubCategory", "insideSubCategoryName");

    return sendSuccessResponse(res, "✅ Product created successfully!", populatedProduct);

  } catch (error) {
    return ThrowError(res, 500, error.message);
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("brand", "name logo description")
      .populate({
        path: "sellerId",
        model: "seller",
      })
      .populate("mainCategory", "name")
      .populate("category", "name")
      .populate("subCategory", "name")
      .populate("insideSubCategory", "name")
      .populate({
        path: "varientId",
        select:
          "sku images color size price stock weight Occasion Artical_Number Outer_material Model_name Ideal_for Type_For_Casual Euro_Size Heel_Height isActive createdAt",
      });

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product fetched Successfully...",
      result: products,
    });

  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching products.",
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Product ID",
      });
    }

    // ✅ Fetch product with deep population
    let product = await Product.findById(id)
      .populate("brand", "name logo description")
      .populate({
        path: "sellerId",
        model: "seller",
      })
      .populate("mainCategory", "name")
      .populate("category", "name")
      .populate("subCategory", "name")
      .populate("insideSubCategory", "name")
      .populate({
        path: "varientId",
        select:
          "sku images color size price stock weight Occasion Artical_Number Outer_material Model_name Ideal_for Type_For_Casual Euro_Size Heel_Height isActive createdAt",
      });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (!product.category && product.mainCategory) {
      const cat = await CategoryModel.findOne({ mainCategoryId: product.mainCategory._id });
      if (cat) product.category = cat;
    }
    if (!product.subCategory && product.category) {
      const subCat = await SubCategoryModel.findOne({ categoryId: product.category._id });
      if (subCat) product.subCategory = subCat;
    }
    if (!product.insideSubCategory && product.subCategory) {
      const insideSubCat = await InsideSubCategoryModel.findOne({
        subCategoryId: product.subCategory._id,
      });
      if (insideSubCat) product.insideSubCategory = insideSubCat;
    }

    const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);
    const recentOrders = await OrderModel.find({
      "products.productId": id,
      "payment.status": "Paid",
      createdAt: { $gte: twelveHoursAgo },
    }).select("products");

    let last12HoursSold = 0;
    recentOrders.forEach((order) => {
      order.products.forEach((item) => {
        if (item.productId.toString() === id) last12HoursSold += item.quantity || 1;
      });
    });

    product.view = (product.view || 0) + 1;
    await product.save();

    const response = {
      _id: product._id,
      title: product.title,
      sellerId: product.sellerId,
      description: product.description,
      badge: product.badge,
      isActive: product.isActive,
      view: product.view,
      sold: product.sold || 0,
      last12HoursSold,
      rating: {
        average: product.rating?.average || 0,
        totalReviews: product.rating?.totalReviews || 0,
      },
      brand: product.brand || null,
      mainCategory: product.mainCategory || null,
      category: product.category || null,
      subCategory: product.subCategory || null,
      insideSubCategory: product.insideSubCategory || null,
      varients: product.varientId || [],
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      productDetails: product.productDetails || {},
      shippingReturn: product.shippingReturn || {},
      warrantySupport: product.warrantySupport || {},
      love_about: product.love_about || [],
    };

    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      result: response,
    });
  } catch (error) {
    console.error("❌ Error in getProductById:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      brand,
      title,
      mainCategory,
      category,
      subCategory,
      insideSubCategory,
      description,
      productDetails,
      shippingReturn,
      warrantySupport,
      love_about
    } = req.body;

    const sellerId = req.user?._id;

    if (!sellerId || !mongoose.Types.ObjectId.isValid(sellerId)) {
      return sendBadRequestResponse(res, "Invalid or missing seller ID. Please login first!");
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendBadRequestResponse(res, "Invalid product ID!");
    }

    if (!mongoose.Types.ObjectId.isValid(mainCategory)) return sendBadRequestResponse(res, "Invalid mainCategory ID!");
    if (!mongoose.Types.ObjectId.isValid(category)) return sendBadRequestResponse(res, "Invalid category ID!");
    if (!mongoose.Types.ObjectId.isValid(subCategory)) return sendBadRequestResponse(res, "Invalid subCategory ID!");
    if (insideSubCategory && !mongoose.Types.ObjectId.isValid(insideSubCategory)) return sendBadRequestResponse(res, "Invalid insideSubCategory ID!");

    const categoryChecks = [
      MainCategoryModel.findById(mainCategory),
      CategoryModel.findById(category),
      SubCategoryModel.findById(subCategory),
    ];

    if (insideSubCategory) {
      categoryChecks.push(InsideSubCategoryModel.findById(insideSubCategory));
    }

    const [mainCatExists, catExists, subCatExists, insideSubCatExists] = await Promise.all(categoryChecks);

    if (!mainCatExists) return sendNotFoundResponse(res, "Main category does not exist!");
    if (!catExists) return sendNotFoundResponse(res, "Category does not exist!");
    if (!subCatExists) return sendNotFoundResponse(res, "Sub category does not exist!");
    if (insideSubCategory && !insideSubCatExists) return sendNotFoundResponse(res, "Inside sub category does not exist!");

    if (productDetails) {
      const { material, fit, closure, weight } = productDetails;
      if (material && typeof material !== "string") return sendBadRequestResponse(res, "Material must be a string!");
      if (fit && typeof fit !== "string") return sendBadRequestResponse(res, "Fit must be a string!");
      if (closure && typeof closure !== "string") return sendBadRequestResponse(res, "Closure must be a string!");
      if (weight && typeof weight !== "string") return sendBadRequestResponse(res, "Weight must be a string!");
    }

    if (warrantySupport?.customerSupport) {
      const { email, phone, available } = warrantySupport.customerSupport;
      if (email && typeof email !== "string") return sendBadRequestResponse(res, "Customer support email must be a string!");
      if (phone && typeof phone !== "string") return sendBadRequestResponse(res, "Customer support phone must be a string!");
      if (available && typeof available !== "string") return sendBadRequestResponse(res, "Customer support availability must be a string!");
    }

    if (love_about) {
      if (!Array.isArray(love_about)) {
        return sendBadRequestResponse(res, "love_about must be an array!");
      }

      for (const item of love_about) {
        if (typeof item !== 'object' || item === null) {
          return sendBadRequestResponse(res, "Each love_about item must be an object!");
        }
        if (!item.point || typeof item.point !== 'string') {
          return sendBadRequestResponse(res, "Each love_about item must have a 'point' string!");
        }
      }
    }

    const seller = await sellerModel.findById(sellerId);
    if (!seller) {
      return sendNotFoundResponse(res, "Seller not found or unauthorized!");
    }

    const product = await Product.findOne({ _id: id, sellerId });
    if (!product) {
      return sendNotFoundResponse(res, "Product not found or unauthorized!");
    }

    const updateData = {
      brand,
      title,
      mainCategory,
      category,
      subCategory,
      description,
      productDetails,
      shippingReturn,
      warrantySupport,
      love_about: love_about || product.love_about
    };

    if (insideSubCategory) {
      updateData.insideSubCategory = insideSubCategory;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('brand', 'name')
      .populate('mainCategory', 'name')
      .populate('category', 'name')
      .populate('subCategory', 'name')
      .populate('insideSubCategory', 'name');

    return sendSuccessResponse(res, "✅ Product updated successfully!", updatedProduct);

  } catch (error) {
    return ThrowError(res, 500, error.message);
  }
};

export const updateLoveAboutPoints = async (req, res) => {
  try {
    const { id } = req.params;
    const { updates } = req.body;
    const sellerId = req.user?._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendBadRequestResponse(res, "Invalid product ID!");
    }
    if (!sellerId) return sendBadRequestResponse(res, "Seller ID required!");
    if (!Array.isArray(updates) || updates.length === 0) {
      return sendBadRequestResponse(res, "updates must be a non-empty array!");
    }

    // Find product
    const product = await Product.findOne({ _id: id, sellerId });
    if (!product) return sendNotFoundResponse(res, "Product not found or unauthorized!");

    const updatedItems = [];

    for (const update of updates) {
      const { love_aboutId, point } = update;
      if (!love_aboutId || !point) continue;

      const itemIndex = product.love_about.findIndex(item => item._id.toString() === love_aboutId);
      if (itemIndex === -1) continue;

      product.love_about[itemIndex].point = point;
      updatedItems.push(product.love_about[itemIndex]);
    }

    await product.save();

    return sendSuccessResponse(res, "✅ love_about points updated successfully!", updatedItems);

  } catch (error) {
    console.error('Update Love About Points Error:', error);
    return ThrowError(res, 500, error.message);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const sellerId = req.user?._id;

    if (!sellerId || !mongoose.Types.ObjectId.isValid(sellerId)) {
      return sendBadRequestResponse(res, "Invalid or missing seller ID. Please login first!");
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendBadRequestResponse(res, "Invalid ProductId")
    }

    const checkProduct = await Product.findById(id)
    if (!checkProduct) {
      return sendNotFoundResponse(res, "Product not found!!!")
    }

    await Product.findByIdAndDelete(id)

    await sellerModel.findByIdAndUpdate(
      sellerId,
      { $pull: { products: checkProduct._id } },
      { new: true }
    );

    return sendSuccessResponse(res, "Product deleted Successfully...", checkProduct)

  } catch (error) {
    return ThrowError(res, 500, error.message)
  }
}

export const getProductBySubCategory = async (req, res) => {
  try {
    const { subCategoryId } = req.params;

    if (!subCategoryId || !mongoose.Types.ObjectId.isValid(subCategoryId)) {
      return sendBadRequestResponse(res, "Valid subCategoryId is required!");
    }

    const products = await Product.find({ subCategory: subCategoryId })
      .select("brand title description mainCategory category subCategory");

    if (!products || products.length === 0) {
      return sendNotFoundResponse(res, "No products found for this subCategory!");
    }

    return sendSuccessResponse(res, "✅ Products fetched successfully!", products);

  } catch (error) {
    return sendErrorResponse(res, 500, error.message);
  }
};

export const getCategoryHierarchy = async (req, res) => {
  try {
    const mainCategories = await MainCategoryModel.find().select("_id mainCategoryName");
    const categories = await CategoryModel.find().select("_id categoryName mainCategoryId");
    const subCategories = await SubCategoryModel.find().select("_id subCategoryName categoryId");
    const insideSubCategories = await InsideSubCategoryModel.find().select("_id insideSubCategoryName subCategoryId");
    const products = await Product.find().select("_id title brand description subCategory insideSubCategory");
    const productVariants = await ProductVariant.find().select("_id productId color size price stock images");

    const data = mainCategories.map(mainCat => {
      const catList = categories
        .filter(cat => cat.mainCategoryId.toString() === mainCat._id.toString())
        .map(cat => {
          const subCatList = subCategories
            .filter(sub => sub.categoryId.toString() === cat._id.toString())
            .map(sub => {
              const insideSubCatList = insideSubCategories
                .filter(insideSub => insideSub.subCategoryId.toString() === sub._id.toString())
                .map(insideSub => {
                  const productList = products
                    .filter(p => p.insideSubCategory && p.insideSubCategory.toString() === insideSub._id.toString())
                    .map(p => {
                      const variants = productVariants.filter(
                        v => v.productId.toString() === p._id.toString()
                      );
                      return {
                        _id: p._id,
                        title: p.title,
                        brand: p.brand,
                        description: p.description,
                        subCategory: p.subCategory,
                        insideSubCategory: p.insideSubCategory,
                        variants
                      };
                    });

                  return {
                    _id: insideSub._id,
                    insideSubCategoryName: insideSub.insideSubCategoryName,
                    products: productList
                  };
                });

              return {
                _id: sub._id,
                subCategoryName: sub.subCategoryName,
                insideSubCategories: insideSubCatList
              };
            });

          return {
            _id: cat._id,
            categoryName: cat.categoryName,
            subCategories: subCatList
          };
        });

      return {
        _id: mainCat._id,
        mainCategoryName: mainCat.mainCategoryName,
        categories: catList
      };
    });

    return sendSuccessResponse(res, "✅ Categories hierarchy fetched successfully!", data);

  } catch (error) {
    return ThrowError(res, 500, error.message);
  }
};

export const getProductsByBrand = async (req, res) => {
  try {
    const { brandId } = req.params;

    // Validate brandId
    if (!mongoose.Types.ObjectId.isValid(brandId)) {
      return sendBadRequestResponse(res, "Invalid brand ID");
    }

    // Check if brand exists
    const brand = await brandModel.findById(brandId).lean();
    if (!brand) {
      return sendNotFoundResponse(res, "Brand not found");
    }

    // Fetch products for this brand
    const products = await Product.find({ brand: brandId, isActive: true })
      .select("title mainCategory category subCategory description")
      .lean();

    return sendSuccessResponse(res, `Products for brand ${brand.brandName} fetched successfully`, {
      brandId: brand._id,
      brandName: brand.brandName,
      brandImage: brand.brandImage || null,
      products
    });

  } catch (error) {
    return sendErrorResponse(res, 500, error.message);
  }
};

export const discoverProductController = async (req, res) => {
  try {
    const products = await productModel.find({ isActive: true })
      .sort({ createdAt: -1 })
      .populate([
        {
          path: "brand",
          model: "Brand",
          select: "-__v -createdAt -updatedAt",
        },
        {
          path: "mainCategory",
          model: "MainCategory",
          select: "-__v -createdAt -updatedAt"
        },
        {
          path: "category",
          model: "Category",
          select: "-__v -createdAt -updatedAt"
        },
        {
          path: "subCategory",
          model: "SubCategory",
          select: "-__v -createdAt -updatedAt"
        },
        {
          path: "varientId",
          model: "ProductVariant",
          select: "-__v -createdAt -updatedAt"
        }
      ]);

    if (!products || products.length === 0) {
      return sendNotFoundResponse(res, "No Products Found");
    }

    return res.status(200).json({
      success: true,
      message: "Trending products fetched successfully",
      total: products.length,
      result: products
    });

  } catch (error) {
    console.error("Error while fetching discover products:", error);
    return sendErrorResponse(res, 500, "Error while fetching discover products", error);
  }
};

export const getSimilarProducts = async (req, res) => {
  try {
    const { productId } = req.params;
    const { limit = 12, fields } = req.query;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return sendBadRequestResponse(res, "Invalid product ID!");
    }

    let selectFields = "";
    if (fields) {
      const parts = fields.split(",");
      parts.forEach(f => {
        if (f.startsWith("+")) {
          selectFields += " " + f.substring(1);
        } else if (f.startsWith("-")) {
          selectFields += " -" + f.substring(1);
        }
      });
    }

    const currentProduct = await productModel.findById(productId)
      .select(selectFields || "")
      .populate("brand", "brandName brandImage")
      .populate("category", "categoryName")
      .populate("subCategory", "subCategoryName")
      .populate("mainCategory", "mainCategoryName")
      .populate("insideSubCategory", "name");

    if (!currentProduct) {
      return sendNotFoundResponse(res, "Product not found!");
    }

    let similarProducts = await productModel.find({
      isActive: true,
      subCategory: currentProduct.subCategory?._id,
      _id: { $ne: currentProduct._id }
    })
      .select(selectFields || "")
      .populate("brand", "brandName brandImage")
      .populate("mainCategory", "mainCategoryName")
      .populate("category", "categoryName")
      .populate("subCategory", "subCategoryName")
      .populate("insideSubCategory", "name")
      .sort({ "rating.average": -1, createdAt: -1 })
      .limit(parseInt(limit));

    const productsWithVariants = await Promise.all(
      similarProducts.map(async (product) => {
        const variants = await ProductVariant.find({
          productId: product._id
        })
          .sort({ "price.original": 1 })
          .limit(1);

        return {
          ...product.toObject(),
          variants,
          minPrice: variants.length > 0 ? variants[0].price.original : 0,
          hasStock: variants.length > 0 && variants[0].stock > 0
        };
      })
    );

    return sendSuccessResponse(res, "Similar products fetched successfully!", {
      currentProduct: {
        ...currentProduct.toObject(),
        strategy: "Same SubCategory"
      },
      similarProducts: productsWithVariants,
      totalSimilar: productsWithVariants.length
    });

  } catch (error) {
    console.error("Get Similar Products Error:", error);
    return ThrowError(res, 500, "Server error while fetching similar products");
  }
};

export const getMostWishlistedProducts = async (req, res) => {
  try {
    const wishlistCounts = await Wishlist.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          wishlistCount: { $sum: 1 },
        },
      },
      { $sort: { wishlistCount: -1 } },
      { $limit: 50 },
    ]);

    const productIds = wishlistCounts.map((item) => item._id);

    const products = await Product.find({
      _id: { $in: productIds },
      isActive: true,
    })
      .populate({
        path: "brand",
        model: "Brand",
        select: "-__v -createdAt -updatedAt",
      })
      .populate("mainCategory", "name")
      .populate("category", "name")
      .populate("subCategory", "name")
      .populate({
        path: "varientId",
        model: "ProductVariant",
        match: { stock: { $gt: 0 } },
        select:
          "sku Artical_Number images color size Occasion Outer_material Model_name Ideal_for Type_For_Casual Euro_Size Heel_Height price stock weight",
      });

    // Step 3: Merge wishlist count data with product data
    const result = products.map((product) => {
      const wishlistData = wishlistCounts.find(
        (w) => w._id.toString() === product._id.toString()
      );
      return {
        ...product.toObject(),
        wishlistCount: wishlistData ? wishlistData.wishlistCount : 0,
      };
    });

    // Step 4: Sort final result again by wishlist count (descending)
    result.sort((a, b) => b.wishlistCount - a.wishlistCount);

    return res.status(200).json({
      success: true,
      message: "Trending products fetched successfully",
      total: products.length,
      result: products
    });
  } catch (error) {
    console.error("Error in getMostWishlistedProducts:", error);
    return ThrowError(res, 500, error.message);
  }
};

export const getTrendingProducts = async (req, res) => {
  try {
    const pipeline = [
      // Join with payments
      {
        $lookup: {
          from: "payments",
          localField: "_id",
          foreignField: "orderId",
          as: "payment"
        }
      },
      { $unwind: "$payment" },
      { $match: { "payment.paymentStatus": "Paid" } },

      // Unwind products array
      { $unwind: "$products" },

      // Group by productId
      {
        $group: {
          _id: "$products.productId",
          totalQuantity: { $sum: "$products.quantity" },
          orderCount: { $sum: 1 }
        }
      },

      // Sort by most sold
      { $sort: { totalQuantity: -1 } },

      // Lookup full product data
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },
      { $unwind: "$product" },

      // Lookup related references
      {
        $lookup: {
          from: "brands",
          localField: "product.brand",
          foreignField: "_id",
          as: "brand"
        }
      },
      { $unwind: { path: "$brand", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "maincategories",
          localField: "product.mainCategory",
          foreignField: "_id",
          as: "mainCategory"
        }
      },
      { $unwind: { path: "$mainCategory", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "categories",
          localField: "product.category",
          foreignField: "_id",
          as: "category"
        }
      },
      { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "subcategories",
          localField: "product.subCategory",
          foreignField: "_id",
          as: "subCategory"
        }
      },
      { $unwind: { path: "$subCategory", preserveNullAndEmptyArrays: true } },

      // Lookup product variants
      {
        $lookup: {
          from: "productvariants",
          localField: "product._id",
          foreignField: "productId",
          as: "varientId"
        }
      },

      // Final structure like getMostWishlistedProducts
      {
        $project: {
          _id: "$product._id",
          sellerId: "$product.sellerId",
          brand: "$brand",
          title: "$product.title",
          mainCategory: "$mainCategory",
          category: "$category",
          subCategory: "$subCategory",
          description: "$product.description",
          badge: "$product.badge",
          love_about: "$product.love_about",
          varientId: {
            $map: {
              input: "$varientId",
              as: "variant",
              in: {
                _id: "$$variant._id",
                sku: "$$variant.sku",
                Artical_Number: "$$variant.Artical_Number",
                images: "$$variant.images",
                color: "$$variant.color",
                size: "$$variant.size",
                Occasion: "$$variant.Occasion",
                Outer_material: "$$variant.Outer_material",
                Model_name: "$$variant.Model_name",
                Ideal_for: "$$variant.Ideal_for",
                Type_For_Casual: "$$variant.Type_For_Casual",
                Euro_Size: "$$variant.Euro_Size",
                Heel_Height: "$$variant.Heel_Height",
                price: "$$variant.price",
                stock: "$$variant.stock",
                weight: "$$variant.weight"
              }
            }
          },
          rating: "$product.rating",
          productDetails: "$product.productDetails",
          shippingReturn: "$product.shippingReturn",
          warrantySupport: "$product.warrantySupport",
          view: "$product.view",
          sold: "$product.sold",
          isActive: "$product.isActive",
          createdAt: "$product.createdAt",
          updatedAt: "$product.updatedAt",
          __v: "$product.__v",
          totalQuantity: 1,
          orderCount: 1
        }
      },

      { $limit: 15 }
    ];

    const results = await OrderModel.aggregate(pipeline);

    return res.status(200).json({
      success: true,
      message: "Trending products fetched successfully",
      total: results.length,
      result: results
    });
  } catch (error) {
    console.error("Error fetching trending products:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error"
    });
  }
};

export const getSalesAnalytics = async (req, res) => {
  try {
    const { period = "24" } = req.query;

    const hours = parseInt(period);
    if (![12, 24].includes(hours)) {
      return sendErrorResponse(res, 400, "Period must be 12 or 24 hours");
    }

    const timeAgo = new Date(Date.now() - hours * 60 * 60 * 1000);

    const result = await paymentModel.aggregate([
      {
        $match: {
          paymentStatus: "completed",
          paymentDate: { $gte: timeAgo }
        }
      },
      {
        $lookup: {
          from: "orders",
          localField: "orderId",
          foreignField: "_id",
          as: "order"
        }
      },
      {
        $unwind: "$order"
      },
      {
        $unwind: "$order.items"
      },
      {
        $group: {
          _id: null,
          totalProductsSold: { $sum: "$order.items.quantity" },
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: "$amount" },
          averageOrderValue: { $avg: "$amount" }
        }
      }
    ]);

    const salesData = result[0] || {
      totalProductsSold: 0,
      totalOrders: 0,
      totalRevenue: 0,
      averageOrderValue: 0
    };

    return sendSuccessResponse(res, `Sales analytics for last ${hours} hours fetched successfully`, {
      period: `${hours} hours`,
      ...salesData
    });

  } catch (error) {
    return sendErrorResponse(res, 500, error.message);
  }
};

export const addBadgeToProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid product id" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const badgeToAdd = "CORALBAY CHOICE";

    if (product.badge === badgeToAdd) {
      return res.status(200).json({
        success: true,
        message: `Product already has badge "${badgeToAdd}".`,
        result: product,
      });
    }

    product.badge = badgeToAdd;
    await product.save();

    return res.status(200).json({
      success: true,
      message: `Badge "${badgeToAdd}" added to product successfully.`,
      result: product,
    });
  } catch (err) {
    console.error("addBadgeToProduct error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getBestSellingProducts = async (req, res) => {
  try {
    // Fetch top-selling active products
    const bestSellingProducts = await Product.find({ isActive: true })
      .sort({ sold: -1 })
      .limit(15)
      .populate([
        { path: "brand" },
        { path: "mainCategory" },
        { path: "category" },
        { path: "subCategory" },
        { path: "varientId" },
      ]);

    if (!bestSellingProducts || bestSellingProducts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No best-selling products found",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Best-selling products fetched successfully",
      total: bestSellingProducts.length,
      data: bestSellingProducts,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }

};

export const youMayAlsoLike = async (req, res) => {
  try {
    const { cartId } = req?.params;

    // Get cart with items
    const cart = await cartModel.findById(cartId).select("items");

    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(404).json({
        message: "Cart not found or empty",
        products: []
      });
    }

    // Extract product IDs from cart
    const productIdsInCart = cart.items.map(item => item.productId);

    // Find related products based on cart products' categories
    const cartProducts = await productModel
      .find({ _id: { $in: productIdsInCart } })
      .select("category subCategory mainCategory");

    // Get categories from cart products
    const categories = [...new Set(cartProducts.map(p => p.category?.toString()).filter(Boolean))];
    const subCategories = [...new Set(cartProducts.map(p => p.subCategory?.toString()).filter(Boolean))];
    const mainCategories = [...new Set(cartProducts.map(p => p.mainCategory?.toString()).filter(Boolean))];

    // Find recommended products with proper population
    const recommendations = await productModel
      .find({
        $or: [
          { category: { $in: categories } },
          { subCategory: { $in: subCategories } },
          { mainCategory: { $in: mainCategories } }
        ],
        _id: { $nin: productIdsInCart },
        isActive: true
      })
      .populate('mainCategory', 'mainCategoryName mainCategoryImage') // Populate with correct field names
      .populate('category', 'categoryName') // Populate with correct field names
      .populate('subCategory', 'subCategoryName') // Populate with correct field names
      .populate('brand', 'brandName brandImage brandColor') // Populate with correct field names
      .populate({
        path: 'varientId',
        select: 'price discountPrice stock size color images isDefault'
      }) // Populate variants
      .limit(8)
      .sort({ sold: -1, 'rating.average': -1, view: -1 }) // Sort by popularity
      .select('title description rating badge mainCategory category subCategory brand varientId view sold');

    return sendSuccessResponse(res, "Recommendations fetched successfully", {
      products: recommendations,
      count: recommendations.length
    })

  } catch (error) {
    console.log("Error while fetching You May Also Like Products:", error);
    return sendErrorResponse(res, 500, "Error While Fetching Recommendations", error);
  }
};