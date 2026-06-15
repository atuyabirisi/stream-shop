import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import AdminCard from "../../components/admin/AdminCard";

type Property = {
  _id: string;
  title: string;
  location: string;
  pricePerNight: number;
  image: string[];
  status: "available" | "booked" | "maintenance";
  bedrooms: number;
  bathrooms: number;
};

export default function ViewProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/properties",
        );

        setProperties(response.data.data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch =
        property.title.toLowerCase().includes(search.toLowerCase()) ||
        property.location.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || property.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [properties, search, statusFilter]);

  if (loading) {
    return (
      <div className="w-full flex justify-center py-10">
        <p>Loading properties...</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* SEARCH + FILTER */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <input
          type="text"
          placeholder="Search by title or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            sm:flex-1
            px-4 py-2
            border border-gray-200
            rounded-xl
            focus:outline-none
            focus:ring-2 focus:ring-black/10
          "
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="
            w-full sm:w-48
            px-3 py-2
            border border-gray-200
            rounded-xl
            bg-white
            focus:outline-none
          "
        >
          <option value="all">All Status</option>
          <option value="available">Available</option>
          <option value="booked">Booked</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>

      {/* EMPTY STATE */}
      {filteredProperties.length === 0 ? (
        <AdminCard>
          <div className="py-10 text-center text-gray-500">
            No properties found.
          </div>
        </AdminCard>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProperties.map((property) => (
            <AdminCard key={property._id} className="p-0 overflow-hidden">
              <div className="w-full h-44 bg-gray-100">
                <img
                  src={
                    property.image?.[0] ||
                    "https://placehold.co/600x400?text=No+Image"
                  }
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-gray-900">
                  {property.title}
                </h3>

                <p className="text-sm text-gray-500">{property.location}</p>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>{property.bedrooms} Beds</span>
                  <span>{property.bathrooms} Baths</span>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <span className="font-semibold text-gray-900">
                    KES {property.pricePerNight.toLocaleString()}
                  </span>

                  <span
                    className={`
                      text-xs px-2 py-1 rounded-full capitalize
                      ${
                        property.status === "available"
                          ? "bg-green-100 text-green-600"
                          : property.status === "booked"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-700"
                      }
                    `}
                  >
                    {property.status}
                  </span>
                </div>

                <div className="flex gap-2 pt-3">
                  <button className="flex-1 text-sm py-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                    Edit
                  </button>

                  <button className="flex-1 text-sm py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100">
                    Delete
                  </button>
                </div>
              </div>
            </AdminCard>
          ))}
        </div>
      )}
    </div>
  );
}
