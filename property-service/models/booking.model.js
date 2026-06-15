import { model, Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    propertyId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Property",
    },

    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },

    phone: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    // =========================
    // PAYMENT TRACKING (NEW)
    // =========================

    status: {
      type: String,
      enum: ["PENDING_PAYMENT", "PAID", "FAILED", "CONFIRMED"],
      default: "PENDING_PAYMENT",
    },

    mpesaCheckoutRequestId: {
      type: String,
    },

    mpesaReceiptNumber: {
      type: String,
    },

    mpesaTransactionDate: {
      type: String,
    },

    paymentStatus: {
      type: String,
      enum: ["INITIATED", "SUCCESS", "FAILED"],
      default: "INITIATED",
    },

    paymentMethod: {
      type: String,
      default: "MPESA",
    },
  },
  { timestamps: true },
);

// Helpful indexes for fast callback matching
bookingSchema.index({ mpesaCheckoutRequestId: 1 });
bookingSchema.index({ mpesaReceiptNumber: 1 });

const Booking = model("Booking", bookingSchema);

export default Booking;
