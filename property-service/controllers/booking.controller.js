import Booking from "../models/booking.model.js";

async function createBooking(req, res) {
  try {
    const { checkIn, checkOut, phone, amount, propertyId } = req.body;

    if (!checkIn || !checkOut || !phone || !amount || !propertyId) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const newCheckIn = new Date(checkIn);
    const newCheckOut = new Date(checkOut);

    // 🔥 AVAILABILITY CHECK (CRITICAL)
    const conflictingBooking = await Booking.findOne({
      propertyId,
      status: "CONFIRMED",
      $or: [
        {
          checkIn: { $lt: newCheckOut },
          checkOut: { $gt: newCheckIn },
        },
      ],
    });

    if (conflictingBooking) {
      return res.status(409).json({
        message: "Property is already booked for selected dates",
      });
    }

    // Create booking (still pending payment)
    const booking = await Booking.create({
      propertyId,
      checkIn: newCheckIn,
      checkOut: newCheckOut,
      phone,
      amount,
      status: "CONFIRMED",
    });

    return res.status(201).json({
      message: "Booking created (pending payment)",
      booking,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

export { createBooking };
