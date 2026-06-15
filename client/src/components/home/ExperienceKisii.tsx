const experiences = [
  {
    title: "Morning Coffee in Kisii Town",
    desc: "Start your day with fresh local coffee and warm Kenyan hospitality.",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
  },
  {
    title: "Evening Town Walks",
    desc: "Enjoy peaceful walks through Kisii as the town lights come alive.",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156",
  },
  {
    title: "Local Food & Culture",
    desc: "Experience authentic Kenyan meals and vibrant local culture.",
    image: "https://images.unsplash.com/photo-1555992336-03a23c7b20ee",
  },
];

export default function ExperienceKisii() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-[Playfair_Display]">
            Experience Kisii
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            More than a stay — discover the lifestyle, culture, and warmth of
            Kisii.
          </p>
        </div>

        {/* Mobile-first scroll cards */}
        <div className="flex flex-col md:grid md:grid-cols-3 gap-8">
          {experiences.map((item, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-3xl shadow-sm hover:shadow-lg transition"
            >
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-72 w-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold">{item.title}</h3>

                <p className="text-gray-600 mt-2 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
