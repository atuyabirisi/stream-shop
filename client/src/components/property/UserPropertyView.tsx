import { useRef } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  MapPin,
  Star,
  BedDouble,
  Bath,
  Users,
  Heart,
  Share2,
  Wifi,
  Car,
  Tv,
  CookingPot,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { type Property } from "../../types/property.type";
import BookingCard from "../userPropertyView/BookingCard";

export default function UserPropertyView() {
  const { id } = useParams();

  const galleryRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (!galleryRef.current) return;

    const width = 300;

    galleryRef.current.scrollBy({
      left: direction === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/api/properties/${id}`,
        );
        setProperty(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Loading property...
      </div>
    );

  if (!property)
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Property not found
      </div>
    );

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* ================= HERO ================= */}
        <div className="relative rounded-[36px] overflow-hidden mb-6 shadow-md">
          <img
            src={property.image?.[0]}
            className="w-full h-[360px] md:h-[650px] object-cover"
            alt={property.title}
          />

          {/* soft gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

          {/* top actions */}
          <div className="absolute top-5 right-5 flex gap-3">
            <button className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/30">
              <Heart size={18} />
            </button>

            <button className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/30">
              <Share2 size={18} />
            </button>
          </div>

          {/* title overlay */}
          <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white max-w-3xl">
            <div className="flex items-center gap-2 mb-3 text-sm">
              <Star className="text-yellow-400 fill-yellow-400" size={18} />
              <span>4.9 · 124 reviews</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              {property.title}
            </h1>

            <div className="flex items-center gap-2 mt-3 text-slate-200">
              <MapPin size={16} />
              <span>
                {property.location} · {property.address}
              </span>
            </div>
          </div>
        </div>

        {/* ================= GALLERY CAROUSEL ================= */}
        <div className="relative mb-10">
          {/* LEFT ARROW */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur p-3 rounded-full shadow hover:bg-white"
          >
            <ChevronLeft size={18} />
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur p-3 rounded-full shadow hover:bg-white"
          >
            <ChevronRight size={18} />
          </button>

          {/* SCROLL CONTAINER */}
          <div
            ref={galleryRef}
            className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-2"
          >
            {property.image?.map((img, i) => (
              <img
                key={i}
                src={img}
                className="h-32 md:h-40 min-w-[240px] md:min-w-[280px] object-cover rounded-3xl shadow-sm hover:scale-[1.02] transition"
              />
            ))}
          </div>
        </div>

        {/* ================= CONTENT GRID ================= */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-10">
            {/* STATS (NO BORDERS - SOFTER CARDS) */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/70 backdrop-blur rounded-3xl p-6 shadow-sm">
                <Users className="text-emerald-600 mb-2" />
                <p className="text-xl font-semibold">{property.maxGuests}</p>
                <span className="text-sm text-slate-500">Guests</span>
              </div>

              <div className="bg-white/70 backdrop-blur rounded-3xl p-6 shadow-sm">
                <BedDouble className="text-emerald-600 mb-2" />
                <p className="text-xl font-semibold">{property.bedrooms}</p>
                <span className="text-sm text-slate-500">Bedrooms</span>
              </div>

              <div className="bg-white/70 backdrop-blur rounded-3xl p-6 shadow-sm">
                <Bath className="text-emerald-600 mb-2" />
                <p className="text-xl font-semibold">{property.bathrooms}</p>
                <span className="text-sm text-slate-500">Bathrooms</span>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="bg-white rounded-[28px] p-7 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">About this place</h2>
              <p className="text-slate-600 leading-8">{property.description}</p>
            </div>

            {/* AMENITIES */}
            <div className="bg-white rounded-[28px] p-7 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Amenities</h2>

              <div className="flex flex-wrap gap-3">
                {property.amenities.map((a) => (
                  <div
                    key={a}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl"
                  >
                    {a === "WiFi" && <Wifi size={16} />}
                    {a === "Parking" && <Car size={16} />}
                    {a === "TV" && <Tv size={16} />}
                    {a === "Kitchen" && <CookingPot size={16} />}
                    <span className="text-sm">{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= BOOKING CARD (UPGRADED FOCUS) ================= */}
          <BookingCard
            pricePerNight={Number(property.pricePerNight)}
            maxGuests={Number(property.maxGuests)}
            propertyId={property._id}
          />
        </div>
      </div>
    </div>
  );
}
