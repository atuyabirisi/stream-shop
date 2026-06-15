type StepperProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function Stepper({ value, onChange }: StepperProps) {
  const increment = () => onChange(value + 1);

  const decrement = () => onChange(Math.max(0, value - 1));

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <button type="button" onClick={decrement} style={btnStyle}>
        −
      </button>

      <div style={valueStyle}>{value}</div>

      <button type="button" onClick={increment} style={btnStyle}>
        +
      </button>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  width: "36px",
  height: "36px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
  fontSize: "18px",
  fontWeight: 600,
};

const valueStyle: React.CSSProperties = {
  minWidth: "40px",
  textAlign: "center",
  fontSize: "16px",
  fontWeight: 500,
};
