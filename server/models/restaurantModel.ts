import { model, Schema } from "mongoose";

export const restaurantSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

restaurantSchema.index({ name: 1, user: 1 }, { unique: true });

export default model("Restaurant", restaurantSchema);
