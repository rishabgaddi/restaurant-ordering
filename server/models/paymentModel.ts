import { model, Schema } from "mongoose";

export const paymentSchema = new Schema({
  amount: {
    type: Number,
    required: [true, "Amount is required."],
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

export default model("Payment", paymentSchema);
