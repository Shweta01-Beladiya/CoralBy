import cron from "node-cron";
import mongoose from "mongoose";
import Product from "../model/product.model.js";
import Order from "../model/order.model.js";
import ProductVariant from "../model/productvarient.model.js";

/**
 * 🔁 Function to automatically determine and update a product's badge
 * Logic priority:
 * 1️⃣ BEST SELLER  (most sold in last 12 hours)
 * 2️⃣ TOP RATED    (rating >= 4.5 and >= 5 reviews)
 * 3️⃣ TRENDING     (10+ paid orders in last 7 days)
 * 4️⃣ BEST DEAL    (≥ 30% discount)
 * 5️⃣ NEW (default)
 */
const updateProductBadge = async (productId) => {
  try {
    const now = new Date();
    const twelveHoursAgo = new Date(now - 12 * 60 * 60 * 1000); // last 12 hours
    const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000); // last 7 days

    // Fetch product as full document
    const product = await Product.findById(productId);
    if (!product) return;

    let badge = "NEW"; // default

    // 🥇 1️⃣ BEST SELLER
    const bestSeller = await Order.aggregate([
      { $match: { paymentStatus: "paid", createdAt: { $gte: twelveHoursAgo } } },
      { $unwind: "$products" },
      { $group: { _id: "$products.productId", totalSold: { $sum: "$products.quantity" } } },
      { $sort: { totalSold: -1 } },
      { $limit: 1 },
    ]);

    if (bestSeller.length && bestSeller[0]._id.toString() === product._id.toString()) {
      badge = "BEST SELLER";
    }

    // ⭐ 2️⃣ TOP RATED
    else if (product.rating?.average >= 4.5 && product.rating?.totalReviews >= 5) {
      badge = "TOP RATED";
    }

    // ⚡ 3️⃣ TRENDING
    else {
      const trendingOrders = await Order.countDocuments({
        "products.productId": product._id,
        createdAt: { $gte: sevenDaysAgo },
        paymentStatus: "paid",
      });

      if (trendingOrders >= 10) badge = "TRENDING";
    }

    // 💸 4️⃣ BEST DEAL
    if (badge === "NEW") {
      const variants = await ProductVariant.find({ productId: product._id });
      const hasBigDiscount = variants.some((v) => {
        if (v.price?.original && v.price?.discounted) {
          const discountPercent = ((v.price.original - v.price.discounted) / v.price.original) * 100;
          return discountPercent >= 30;
        }
        return false;
      });

      if (hasBigDiscount) badge = "BEST DEAL";
    }

    // ✅ Update only if badge has changed
    if (product.badge !== badge) {
      await Product.updateOne({ _id: product._id }, { $set: { badge } });
      console.log(`🏷️ Badge updated → ${product.title}: ${badge}`);
    }
  } catch (err) {
    console.error("❌ Error updating badge:", err);
  }
};

// ⏱️ Run cron every 10 seconds
cron.schedule("*/10 * * * *", async () => {
  console.log("🔁 Running automatic product badge updater...");
  try {
    const products = await Product.find({ isActive: true }).select("_id"); // only fetch IDs
    for (const product of products) {
      await updateProductBadge(product._id);
    }
    console.log("✅ Product badges updated successfully!\n");
  } catch (err) {
    console.error("❌ Error in badge updater cron:", err);
  }
});

export default updateProductBadge;