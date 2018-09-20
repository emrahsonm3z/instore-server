import mongoose, { Schema } from "mongoose";

const AddressSchema = new Schema(
  {
    street: {
      type: String
    },
    aptNum: String,
    postalCode: {
      type: String,
      minlength: 5
    },
    city: {
      type: String,
      required: true
    },
    province: {
      type: String
    },
    neighborhood: {
      type: String
    },
    district: {
      type: String
    },
    country: {
      type: String,
      required: true
    },
    instructions: String,
    geo: {
      type: { type: String },
      coords: [Number]
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Customer"
    }
  },
  {
    timestamps: true
  }
);
export default mongoose.model("Address", AddressSchema);
