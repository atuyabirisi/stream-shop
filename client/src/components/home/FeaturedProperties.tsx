import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Property = {
  _id: string;
  title: string;
  description: string;
  location: string;
  address: string;
  pricePerNight: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  image: string[];
  amenities: string[];
  status: string;
};

export default function FeaturedProperties() {
  const navigate = useNavigate();

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3001/api/properties",
        );

        setProperties(data.data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <section id="stays" className="py-24 px-6 max-w-7xl mx-auto">
        <p className="text-center text-gray-500">Loading properties...</p>
      </section>
    );
  }

  return (
    <section id="stays" className="py-24 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-[Playfair_Display]">
          Featured Stays
        </h2>

        <p className="mt-4 text-gray-600">
          A curated selection of our finest stays, chosen for comfort, style,
          and exceptional guest experience.
        </p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-10">
        {properties.map((property) => (
          <div
            key={property._id}
            className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition"
          >
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={
                  property.image?.[0] ||
                  "https://placehold.co/600x400?text=Property"
                }
                alt={property.title}
                className="h-72 w-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold">{property.title}</h3>

              <p className="text-gray-500 mt-2">{property.location}</p>

              <div className="mt-3 flex gap-3 text-sm text-gray-600">
                <span>{property.bedrooms} Beds</span>
                <span>•</span>
                <span>{property.bathrooms} Baths</span>
                <span>•</span>
                <span>{property.maxGuests} Guests</span>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="font-bold text-lg">
                  KES {property.pricePerNight.toLocaleString()} / night
                </span>

                <button
                  onClick={() => navigate(`/properties/${property._id}`)}
                  className="bg-black text-white px-5 py-2 rounded-full text-sm hover:bg-gray-800 transition"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
