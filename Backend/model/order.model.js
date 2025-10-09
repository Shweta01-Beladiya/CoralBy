import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { UserAddressSchema, UserBillingAddressSchema } from "./user.model.js";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      index: true,
    },

    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },

    sellerId: {
      type: mongoose.Types.ObjectId,
      ref: "seller",
      required: true,
    },

    products: [
      {
        productId: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
        variantId: { type: mongoose.Types.ObjectId, ref: "ProductVariant" },
        sku: { type: String, required: true },
        name: { type: String },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: String, required: true },
        subtotal: { type: Number },
      },
    ],

    billingAmount: { type: Number, required: true, default: 0 },
    discountAmount: { type: Number, default: 0 },
    giftWrapAmount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true, default: 0 },

    appliedCoupon: {
      code: String,
      couponId: { type: mongoose.Types.ObjectId, ref: "coupon" },
      discount: Number,
      discountType: String,
      percentageValue: Number,
      flatValue: Number
    },

    userAddress: UserAddressSchema,
    userBillingAddress: UserBillingAddressSchema,

    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Order Confirmed",
        "Processing",
        "Shipped",
        "Out For Delivery",
        "Delivered",
        "Cancelled",
        "Returned",
      ],
      default: "Pending",
    },

    timeline: {
      confirmedAt: { type: Date },
      processingAt: { type: Date },
      shippedAt: { type: Date },
      outForDeliveryAt: { type: Date },
      deliveredAt: { type: Date },
      cancelledAt: { type: Date },
      returnedAt: { type: Date },
    },

    deliveryExpected: { type: Date },
    deliveredAt: { type: Date },
    orderInstruction: { type: String, default: null },
    isGiftWrap: {
      type: Boolean,
      default: false,
    },

    reasonForCancel: {
      type: String,
      default: null
    },
    comment: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

orderSchema.pre("save", function (next) {
  if (this.isNew && !this.orderId) {
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    this.orderId = `ORD-${datePart}-${nanoid(6)}`;
  }

  // Calculate subtotal per product
  this.products.forEach((item) => {
    item.subtotal = item.quantity * item.price;
  });

  // Auto-calc billing & total
  this.billingAmount = this.products.reduce((sum, p) => sum + p.subtotal, 0);
  this.totalAmount = this.billingAmount - this.discountAmount + (this.giftWrapAmount || 0);

  // Update timeline based on status
  if (this.isModified("orderStatus")) {
    const now = new Date();
    switch (this.orderStatus) {
      case "Order Confirmed":
        this.timeline.confirmedAt = now;
        break;
      case "Processing":
        this.timeline.processingAt = now;
        break;
      case "Shipped":
        this.timeline.shippedAt = now;
        break;
      case "Out For Delivery":
        this.timeline.outForDeliveryAt = now;
        break;
      case "Delivered":
        this.timeline.deliveredAt = now;
        this.deliveredAt = now;
        break;
      case "Cancelled":
        this.timeline.cancelledAt = now;
        break;
      case "Returned":
        this.timeline.returnedAt = now;
        break;
    }
  }

  next();
});

export default mongoose.model("Order", orderSchema);