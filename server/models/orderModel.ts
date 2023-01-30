import { model, Schema } from "mongoose";

export const orderSchema = new Schema(
  {
    table: {
      type: Schema.Types.ObjectId,
      ref: "Table",
    },
    dishes: [
      {
        dish: {
          type: Schema.Types.ObjectId,
          ref: "Dish",
        },
      },
    ],
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "prepared",
        "ready",
        "served",
        "cancelled",
        "paid",
      ],
      default: "pending",
    },
    total: {
      type: Number,
      required: [true, "Total is required."],
    },
    tax: {
      type: Number,
      required: [true, "Tax is required."],
    },
    tip: {
      type: Number,
      required: [true, "Tip is required."],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      modifiedAt: "modified_at",
    },
  }
);

export default model("Order", orderSchema);
