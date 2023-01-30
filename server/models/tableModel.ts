import { model, Schema } from "mongoose";

export const tableSchema = new Schema({
  number: {
    type: String,
    required: [true, "Number is required."],
    trim: true,
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
});

tableSchema.index({ number: 1, restaurant: 1 }, { unique: true });

export default model("Table", tableSchema);
