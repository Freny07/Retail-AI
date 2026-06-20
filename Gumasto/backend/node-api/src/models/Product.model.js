import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    stock: {
      type: Number,
      default: 0
    },
    sales: {
      type: Number,
      default: 0
    },
    category: {
      type: String
    },
    brand: {
      type: String
    },
    cost: {
      type: Number
    },
    expiryDate: {
      type: Date
    }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
