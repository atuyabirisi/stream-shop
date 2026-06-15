import { useMemo, useState } from "react";
import { CalendarDays, ShieldCheck, Phone } from "lucide-react";
import axios from "axios";

type Props = {
  pricePerNight: number;
  maxGuests?: number;
  propertyId: string;

  // trigger backend STK push
  onBook?: (data: {
    checkIn: string;
    checkOut: string;
    phone: string;
    amount: number;
  }) => void;
};

export default function BookingCard({
  pricePerNight,
  propertyId,
  onBook,
}: Props) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [phone, setPhone] = useState("");

  // 💰 total calculation
  const total = useMemo(() => {
    if (!checkIn || !checkOut) return pricePerNight;

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const nights = Math.max(
      1,
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)),
    );

    return nights * pricePerNight;
  }, [checkIn, checkOut, pricePerNight]);

  // 📲 STK push trigger
  const handleBooking = async () => {
    if (!phone || !checkIn || !checkOut) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const payload = {
        propertyId,
        checkIn,
        checkOut,
        phone,
        amount: total, // ✅ backend expects "amount"
      };

      const { data } = await axios.post(
        "http://localhost:3001/api/bookings/initiate",
        payload,
      );

      console.log("Booking response:", data);

      alert("STK push sent to your phone. Check your M-Pesa prompt.");

      // OPTIONAL (useful UX improvement later)
      setCheckIn("");
      setCheckOut("");
      setPhone("");
      // you can store checkoutRequestId or bookingId here
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.message || error.message || "Booking failed",
      );
    }
  };

  return (
    <div className="sticky top-24">
      <div className="rounded-[40px] overflow-hidden shadow-2xl bg-white border border-slate-100">
        {/* HEADER */}
        <div className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-500 p-6 text-white">
          <p className="text-xs tracking-[0.2em] uppercase opacity-80">
            Executive Stay
          </p>

          <h2 className="text-4xl font-bold mt-2">
            KES {pricePerNight.toLocaleString()}
          </h2>

          <p className="text-emerald-100 text-sm mt-1">per night</p>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-5">
          {/* DATES */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
              <CalendarDays size={16} />
              Select your dates
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 rounded-2xl p-3">
                <p className="text-xs text-slate-500">Check-in</p>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-transparent outline-none font-medium"
                />
              </div>

              <div className="bg-slate-50 rounded-2xl p-3">
                <p className="text-xs text-slate-500">Check-out</p>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-transparent outline-none font-medium"
                />
              </div>
            </div>
          </div>

          {/* PHONE (MPESA) */}
          <div className="bg-slate-50 rounded-2xl p-3 flex items-center gap-2">
            <Phone size={16} className="text-slate-500" />

            <input
              type="tel"
              placeholder="07XXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-transparent outline-none font-medium"
            />
          </div>

          {/* PAYMENT FIELD (READ ONLY) */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
            <p className="text-xs text-emerald-700">Amount to be paid</p>

            <input
              readOnly
              value={`KES ${total.toLocaleString()}`}
              className="w-full bg-transparent font-bold text-lg text-emerald-800 outline-none"
            />
          </div>

          {/* CTA */}
          <button
            onClick={handleBooking}
            className="w-full bg-emerald-600 hover:bg-emerald-700 transition text-white py-4 rounded-2xl font-semibold text-lg shadow-lg"
          >
            Pay with M-Pesa
          </button>

          <p className="text-center text-xs text-slate-500">
            STK push will be sent to your phone
          </p>

          {/* TRUST BADGE */}
          <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 p-3 rounded-2xl">
            <ShieldCheck size={14} />
            Secure M-Pesa STK Push • No card required
          </div>
        </div>
      </div>
    </div>
  );
}
