import { model, Schema } from "mongoose";

export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
    },
    gender: {
      type: String,
      required: [true, "Gender is required."],
      trim: true,
    },
    dob: {
      type: Date,
      required: [true, "Date of birth is required."],
    },
    country_code: {
      type: String,
      required: [true, "Country code is required."],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      unique: true,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

userSchema.index({ country_code: 1, phone: 1 }, { unique: true });

export default model("User", userSchema);
