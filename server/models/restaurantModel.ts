import { model, Schema } from "mongoose";

export const restaurantSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    trim: true,
    unique: true,
  },
});

export default model("Restaurant", restaurantSchema);
