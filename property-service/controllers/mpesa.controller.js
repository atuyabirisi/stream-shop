import Booking from "../models/booking.model.js";
import { stkPush } from "../services/mpesa.service.js";

/**
 * STEP 1: INITIATE STK PUSH + CREATE PENDING BOOKING
 */
async function initiateSTKPush(req, res) {
  try {
    const { phone, amount, propertyId, checkIn, checkOut } = req.body;

    if (!phone || !amount || !propertyId || !checkIn || !checkOut) {
      return res.status(400).json({
        success: false,
        message: "phone, amount, propertyId, checkIn, checkOut are required",
      });
    }

    // 1. Create booking first (PENDING PAYMENT)
    const booking = await Booking.create({
      phone,
      amount,
      propertyId,
      checkIn,
      checkOut,

      status: "PENDING_PAYMENT",
      paymentStatus: "INITIATED",
    });

    // 2. Trigger STK push
    const result = await stkPush({ phone, amount });

    // 3. Save CheckoutRequestID
    booking.mpesaCheckoutRequestId = result.CheckoutRequestID;
    await booking.save();

    return res.status(200).json({
      success: true,
      message: "STK push initiated successfully",
      bookingId: booking._id,
      checkoutRequestId: result.CheckoutRequestID,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.response?.data || error.message,
    });
  }
}

/**
 * STEP 2: MPESA CALLBACK HANDLER
 */
async function mpesaCallback(req, res) {
  try {
    console.log("📩 M-PESA CALLBACK RECEIVED");

    const callbackData = req.body;
    console.log(JSON.stringify(callbackData, null, 2));

    const stkCallback = callbackData?.Body?.stkCallback;

    if (!stkCallback) {
      console.log("⚠️ Invalid callback payload");
      return res.status(200).json({ message: "Invalid callback" });
    }

    const resultCode = stkCallback.ResultCode;
    const checkoutRequestID = stkCallback.CheckoutRequestID;

    // =========================
    // SUCCESS CASE
    // =========================
    if (resultCode === 0) {
      console.log("✅ PAYMENT SUCCESS");

      const metadata = stkCallback.CallbackMetadata?.Item || [];

      // Extract values safely (NO INDEX RELIANCE)
      const getValue = (name) =>
        metadata.find((item) => item.Name === name)?.Value;

      const mpesaReceipt = getValue("MpesaReceiptNumber");
      const amount = getValue("Amount");
      const phone = getValue("PhoneNumber");
      const transactionDate = getValue("TransactionDate");

      console.log("💰 TRANSACTION DETAILS:", {
        mpesaReceipt,
        amount,
        phone,
        transactionDate,
      });

      // 1. Update booking in DB
      const booking = await Booking.findOne({
        mpesaCheckoutRequestId: checkoutRequestID,
      });

      if (booking) {
        booking.status = "PAID";
        booking.paymentStatus = "SUCCESS";
        booking.mpesaReceiptNumber = mpesaReceipt;
        booking.mpesaTransactionDate = transactionDate;

        await booking.save();

        console.log("🎯 Booking updated to PAID");
      } else {
        console.log("⚠️ Booking not found for checkoutRequestID");
      }
    }

    // =========================
    // FAILED CASE
    // =========================
    else {
      console.log("❌ PAYMENT FAILED");

      await Booking.findOneAndUpdate(
        { mpesaCheckoutRequestId: checkoutRequestID },
        {
          status: "FAILED",
          paymentStatus: "FAILED",
        },
      );
    }

    return res.status(200).json({
      message: "Callback received successfully",
    });
  } catch (error) {
    console.error("Callback Error:", error.message);

    return res.status(500).json({
      message: "Callback processing failed",
    });
  }
}

export { initiateSTKPush, mpesaCallback };
