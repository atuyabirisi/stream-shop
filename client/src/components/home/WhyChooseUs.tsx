import { Home, Wifi, Sparkles, Clock, MapPin, Headphones } from "lucide-react";

const features = [
  {
    icon: <Sparkles size={22} />,
    title: "Professionally Cleaned",
    desc: "Every stay is thoroughly cleaned and prepared for your comfort.",
  },
  {
    icon: <Wifi size={22} />,
    title: "Fast & Reliable WiFi",
    desc: "Stay connected with high-speed internet for work or leisure.",
  },
  {
    icon: <Clock size={22} />,
    title: "Easy Self Check-in",
    desc: "Flexible check-in experience designed for convenience.",
  },
  {
    icon: <MapPin size={22} />,
    title: "Prime Locations",
    desc: "Stay close to Kisii town, transport, and essential services.",
  },
  {
    icon: <Headphones size={22} />,
    title: "24/7 Guest Support",
    desc: "We are always available to assist you during your stay.",
  },
  {
    icon: <Home size={22} />,
    title: "Comfortable Living Spaces",
    desc: "Modern interiors designed for relaxation and comfort.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 px-6 bg-[#F5F1EB]">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-[Playfair_Display]">
            Why Choose Us
          </h2>

          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            A seamless blend of comfort, convenience, and premium hospitality.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="text-black mb-4">{item.icon}</div>

              <h3 className="text-lg font-semibold">{item.title}</h3>

              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
