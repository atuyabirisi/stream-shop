type Props = {
  value: string[];
  onChange: (value: string[]) => void;
};

const options = [
  "WiFi",
  "Parking",
  "Kitchen",
  "TV",
  "Security",
  "Pool",
  "Hot Shower",
  "Balcony",
  "Workspace",
  "Air Conditioning",
];

export default function AmenitiesSelector({ value, onChange }: Props) {
  const toggle = (amenity: string) => {
    const exists = value.includes(amenity);

    if (exists) {
      onChange(value.filter((a) => a !== amenity));
    } else {
      onChange([...value, amenity]);
    }
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {options.map((amenity) => {
        const selected = value.includes(amenity);

        return (
          <button
            key={amenity}
            type="button"
            onClick={() => toggle(amenity)}
            style={{
              padding: "10px 14px",
              borderRadius: "999px",
              border: selected ? "1px solid #111" : "1px solid #ddd",
              background: selected ? "#111" : "#fff",
              color: selected ? "#fff" : "#111",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            {amenity}
          </button>
        );
      })}
    </div>
  );
}
