import { MessageCircle, CalendarCheck } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-24 px-6 bg-[#111111] text-white">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-[Playfair_Display]">
          Ready for a Better Stay?
        </h2>

        <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
          Book your stay with Bethany Cushy Homes and experience comfort, style,
          and convenience in the heart of Kisii.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4">
          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/2547XXXXXXXXX"
            className="flex items-center gap-2 bg-[#C8A24A] text-black px-8 py-4 rounded-full font-medium hover:opacity-90 transition"
          >
            <MessageCircle size={18} />
            Book via WhatsApp
          </a>

          {/* Secondary CTA */}
          <button className="flex items-center gap-2 border border-white px-8 py-4 rounded-full hover:bg-white hover:text-black transition">
            <CalendarCheck size={18} />
            Check Availability
          </button>
        </div>

        {/* Small note */}
        <p className="mt-8 text-xs text-gray-500">
          Fast responses • Easy booking • Secure stays
        </p>
      </div>
    </section>
  );
}
