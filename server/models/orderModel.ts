import { model, Schema } from "mongoose";

enum Status {
  pending = "pending",
  confirmed = "confirmed",
  prepared = "prepared",
  ready = "ready",
  served = "served",
  cancelled = "cancelled",
  paid = "paid",
}

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
        quantity: {
          type: Number,
          required: [true, "Quantity is required."],
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
      enum: Object.values(Status),
      default: Status.pending,
      required: [true, "Status is required."],
      set: function (value: any) {
        if (!Object.values(Status).includes(value)) {
          throw new Error("Invalid status.");
        }
        return value;
      },
    },
    amount: {
      type: Number,
      required: [true, "Amount is required."],
    },
    tax: {
      type: Number,
      required: [true, "Tax is required."],
    },
    total_amount: {
      type: Number,
      required: [true, "Total amount is required."],
    },
    tip: {
      type: Number,
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
