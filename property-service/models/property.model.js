import { Schema, model } from "mongoose";

const propertySchema = new Schema(
  {
    title: String,

    description: String,

    pricePerNight: Number,

    location: String,

    address: String,

    bedrooms: Number,

    bathrooms: Number,

    maxGuests: Number,

    image: [String],

    amenities: {
      type: [String],
      default: [],
      set: (v) => {
        if (!v) return [];
        if (typeof v === "string") {
          try {
            return JSON.parse(v);
          } catch {
            return [];
          }
        }
        return v;
      },
    },

    status: {
      type: String,
      enum: ["available", "booked", "maintenance"],
      default: "available",
    },
  },
  {
    timestamps: true,
  },
);

const Property = model("Property", propertySchema);

export default Property;
