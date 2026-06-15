import {
  useState,
  useMemo,
  useEffect,
  type ChangeEvent,
  type FormEvent,
} from "react";
import axios from "axios";
import AdminCard from "../../components/admin/AdminCard";
import Stepper from "../../components/admin/Stepper";
import AmenitiesSelector from "../../components/admin/AmenitiesSelector";

export default function CreatePropertyForm() {
  const [loading, setLoading] = useState(false);

  const [files, setFiles] = useState<File[]>([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    pricePerNight: "",
    location: "",
    address: "",
    bedrooms: 0,
    bathrooms: 0,
    maxGuests: "",
    status: "available",
    amenities: [] as string[],
  });

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ---------------- FILE HANDLER (APPEND MODE) ---------------- */

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);

    setFiles((prev) => [...prev, ...newFiles]);
  };

  /* ---------------- PREVIEWS (DERIVED STATE) ---------------- */

  const previews = useMemo(() => {
    return files.map((file) => URL.createObjectURL(file));
  }, [files]);

  /* ---------------- CLEANUP ---------------- */

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (loading) return;

    const data = new FormData();

    data.append("title", form.title);
    data.append("description", form.description);
    data.append("pricePerNight", form.pricePerNight);
    data.append("location", form.location);
    data.append("address", form.address);
    data.append("bedrooms", form.bedrooms.toString());
    data.append("bathrooms", form.bathrooms.toString());
    data.append("maxGuests", form.maxGuests);
    data.append("status", form.status);

    form.amenities.forEach((amenity) => data.append("amenities[]", amenity));

    if (files.length > 0) {
      files.forEach((file) => data.append("images", file));
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3001/api/properties",
        data,
      );

      console.log(res.data);
      alert("Property created successfully!");

      setForm({
        title: "",
        description: "",
        pricePerNight: "",
        location: "",
        address: "",
        bedrooms: 0,
        bathrooms: 0,
        maxGuests: "",
        status: "available",
        amenities: [],
      });

      setFiles([]);
    } catch (err) {
      console.error(err);
      alert("Failed to create property");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      {/* PROPERTY DETAILS */}
      <AdminCard title="Property Details">
        <div className="flex flex-col gap-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Property title"
            style={inputStyle}
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Property description"
            style={{
              ...inputStyle,
              minHeight: "120px",
              resize: "vertical",
            }}
          />
        </div>
      </AdminCard>

      {/* LOCATION */}
      <AdminCard title="Location">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            style={inputStyle}
          />

          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Full address"
            style={inputStyle}
          />
        </div>
      </AdminCard>

      {/* IMAGE UPLOAD */}
      <AdminCard title="Image Upload">
        <div className="flex flex-col gap-4">
          <input
            type="file"
            name="image"
            multiple
            accept="image/*"
            style={inputStyle}
            onChange={handleFileChange}
          />

          {/* PREVIEWS */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {previews.map((url, index) => (
              <img
                key={index}
                src={url}
                alt="preview"
                className="w-full h-24 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      </AdminCard>

      {/* PRICING & CAPACITY */}
      <AdminCard title="Pricing & Capacity">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="pricePerNight"
            value={form.pricePerNight}
            onChange={handleChange}
            placeholder="Price per night"
            style={inputStyle}
          />

          <input
            name="maxGuests"
            value={form.maxGuests}
            onChange={handleChange}
            placeholder="Max guests"
            style={inputStyle}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <Stepper
            value={form.bedrooms}
            onChange={(val) => setForm((prev) => ({ ...prev, bedrooms: val }))}
          />

          <Stepper
            value={form.bathrooms}
            onChange={(val) => setForm((prev) => ({ ...prev, bathrooms: val }))}
          />
        </div>
      </AdminCard>

      {/* STATUS */}
      <AdminCard title="Property Status">
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="available">Available</option>
          <option value="booked">Booked</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </AdminCard>

      {/* AMENITIES */}
      <AdminCard title="Amenities">
        <AmenitiesSelector
          value={form.amenities}
          onChange={(val) => setForm((prev) => ({ ...prev, amenities: val }))}
        />
      </AdminCard>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-black text-white font-medium hover:bg-gray-900 transition"
      >
        {loading ? "Creating Property..." : "Create Property"}
      </button>
    </form>
  );
}

/* ---------------- STYLES ---------------- */

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  outline: "none",
  fontSize: "14px",
};
