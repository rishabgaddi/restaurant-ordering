import { model, Schema } from "mongoose";

export const cuisineSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    trim: true,
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
});

cuisineSchema.index({ name: 1, restaurant: 1 }, { unique: true });

export default model("Cuisine", cuisineSchema);
