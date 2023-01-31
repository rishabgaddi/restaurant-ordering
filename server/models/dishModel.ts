import { model, Schema } from "mongoose";

export const dishSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required."],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Price is required."],
  },
  cuisine: {
    type: Schema.Types.ObjectId,
    ref: "Cuisine",
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
});

dishSchema.index({ name: 1, cuisine: 1, restaurant: 1 }, { unique: true });

export default model("Dish", dishSchema);
