import cron from "node-cron";
import mongoose from "mongoose";
import Product from "../model/product.model.js";
import ProductVariant from "../model/productvarient.model.js";
import Order from "../model/order.model.js";

// Function to update badge for a product
const updateProductBadge = async (product) => {
  try {
    await product.populate("varientId");
    let badge = "NEW"; // default

    // 1️⃣ BEST SELLER (highest priority)
    const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);
    const bestSellerOrders = await Order.aggregate([
      { $match: { paymentStatus: "paid", createdAt: { $gte: twelveHoursAgo } } },
      { $unwind: "$products" },
      { $match: { "products.sellerId": product.sellerId } },
      { $group: { _id: "$products.productId", totalSold: { $sum: "$products.quantity" } } },
      { $sort: { totalSold: -1 } },
      { $limit: 1 }
    ]);
    if (bestSellerOrders.length && bestSellerOrders[0]._id.toString() === product._id.toString()) {
      badge = "BEST SELLER";
    }

    // 2️⃣ TOP RATED
    else if (product.rating.average >= 4.5 && product.rating.totalReviews >= 5) {
      badge = "TOP RATED";
    }

    // 3️⃣ TRENDING
    else {
      const trendingOrders = await Order.countDocuments({
        "products.productId": product._id,
        paymentStatus: "paid"
      });
      if (trendingOrders >= 10) badge = "TRENDING";
    }

    // 4️⃣ BEST DEAL (lowest priority)
    if (badge === "NEW") { // only assign if no higher-priority badge
      let bestDealFound = false;
      for (let variant of product.varientId) {
        if (variant.price && variant.price.discounted) {
          const discountPercentage = ((variant.price.original - variant.price.discounted) / variant.price.original) * 100;
          if (discountPercentage >= 30) {
            bestDealFound = true;
            break;
          }
        }
      }
      if (bestDealFound) badge = "BEST DEAL";
    }

    // CORALBAY CHOICE → remains manual

    if (product.badge !== badge) {
      product.badge = badge;
      await product.save();
      console.log(`Badge updated for product: ${product.title} → ${badge}`);
    }

  } catch (err) {
    console.error("Error updating badge:", err);
  }
};

// Cron job: every hour
cron.schedule("0 * * * *", async () => {
  console.log("Running automatic product badge updater...");
  try {
    const products = await Product.find({ isActive: true });
    for (let product of products) {
      await updateProductBadge(product);
    }
    console.log("Product badges updated successfully!");
  } catch (err) {
    console.error("Error in badge updater cron:", err);
  }
}); 

export { updateProductBadge };