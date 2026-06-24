"use client";

interface ColorOption {
  name: string;
  value: string;
}

interface Props {
  label: string;
  colors: ColorOption[];
  selected: string;
  onSelect: (value: string) => void;
}

export default function ColorPicker({ label, colors, selected, onSelect }: Props) {
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#9e9189", letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 10 }}>
        {label}
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {colors.map((c) => (
          <button
            key={c.value}
            onClick={() => onSelect(c.value)}
            title={c.name}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: c.value,
              border: selected === c.value ? "3px solid #1a1a1a" : "2px solid #e8e4de",
              cursor: "pointer",
              transition: "transform 0.15s",
              transform: selected === c.value ? "scale(1.15)" : "scale(1)",
              boxShadow: selected === c.value ? "0 0 0 2px #fff, 0 0 0 4px #1a1a1a" : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}
