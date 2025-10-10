import cron from "node-cron";
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
const updateProductBadge = async (product) => {
  try {
    const now = new Date();
    const twelveHoursAgo = new Date(now - 12 * 60 * 60 * 1000); // last 12 hours
    const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000); // last 7 days

    let badge = "NEW"; // default badge

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

    // ⚡ 3️⃣ TRENDING (10+ paid orders in last 7 days)
    else {
      const trendingOrders = await Order.countDocuments({
        "products.productId": product._id,
        createdAt: { $gte: sevenDaysAgo },
        paymentStatus: "paid",
      });

      if (trendingOrders >= 10) badge = "TRENDING";
    }

    // 💸 4️⃣ BEST DEAL (≥ 30% discount)
    if (badge === "NEW") {
      const variants = await ProductVariant.find({ productId: product._id });

      const hasBigDiscount = variants.some((v) => {
        if (v.price?.original && v.price?.discounted) {
          const discountPercentage =
            ((v.price.original - v.price.discounted) / v.price.original) * 100;
          return discountPercentage >= 30;
        }
        return false;
      });

      if (hasBigDiscount) badge = "BEST DEAL";
    }

    // 🧠 5️⃣ CORALBAY CHOICE stays manual (not auto-assigned)

    // ✅ Update only if badge has changed
    if (product.badge !== badge) {
      product.badge = badge;
      await product.save();
      console.log(`🏷️ Badge updated → ${product.title}: ${badge}`);
    }

  } catch (err) {
    console.error("❌ Error updating badge:", err);
  }
};

// ⏱️ Run cron job every 10 seconds
cron.schedule("*/10 * * * * *", async () => {
  console.log("🔁 Running automatic product badge updater...");
  try {
    const products = await Product.find({ isActive: true });
    for (const product of products) {
      await updateProductBadge(product);
    }
    console.log("✅ Product badges updated successfully!\n");
  } catch (err) {
    console.error("❌ Error in badge updater cron:", err);
  }
});

export default updateProductBadge;