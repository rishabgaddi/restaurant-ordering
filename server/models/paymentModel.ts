import { model, Schema } from "mongoose";

import orderModel from "./orderModel";

export const paymentSchema = new Schema({
  amount: {
    type: Number,
    required: [true, "Amount is required."],
  },
  transaction_id: {
    type: String,
    required: [true, "Transaction ID is required."],
  },
  payment_type: {
    type: String,
    required: [true, "Payment type is required."],
  },
  table: {
    type: Schema.Types.ObjectId,
    ref: "Table",
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order",
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

paymentSchema.pre("save", async function (next) {
  // Validate if the order id, table id, restaurant id and user id are valid.
  const order_id = this.get("order");
  const table_id = this.get("table");
  const restaurant_id = this.get("restaurant");
  const user_id = this.get("user");

  // Find the order and check if the status is not in pending, cancelled or paid.
  const res = await orderModel.findOne({
    _id: order_id,
    table: table_id,
    restaurant: restaurant_id,
    user: user_id,
    status: { $nin: ["pending", "cancelled", "paid"] },
  });
  if (!res) {
    throw new Error("Invalid order.");
  }
  next();
});

export default model("Payment", paymentSchema);
