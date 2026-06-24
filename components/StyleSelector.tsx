"use client";
import { STYLES, Style } from "@/lib/data";

interface Props {
  selected: Style | null;
  onSelect: (style: Style) => void;
}

export default function StyleSelector({ selected, onSelect }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {STYLES.map((style) => {
        const isSelected = selected === style.id;
        return (
          <button
            key={style.id}
            onClick={() => onSelect(style.id)}
            style={{
              background: isSelected ? "#1a1a1a" : "#fff",
              border: isSelected ? "2px solid #1a1a1a" : "2px solid #e8e4de",
              borderRadius: 18,
              padding: "16px 18px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.2s",
              width: "100%",
            }}
          >
            {/* Color swatches */}
            <div style={{ display: "flex", gap: 3, flexShrink: 0 }}>
              {style.colors.map((c, i) => (
                <div
                  key={i}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: c,
                    border: "1.5px solid rgba(255,255,255,0.5)",
                    marginLeft: i > 0 ? -8 : 0,
                  }}
                />
              ))}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: isSelected ? "#fff" : "#1a1a1a", display: "flex", alignItems: "center", gap: 6 }}>
                {style.emoji} {style.id}
              </div>
              <div style={{ fontSize: 12, color: isSelected ? "rgba(255,255,255,0.7)" : "#9e9189", marginTop: 2, lineHeight: 1.4 }}>
                {style.description}
              </div>
            </div>
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                border: isSelected ? "none" : "2px solid #e0dbd5",
                background: isSelected ? "#6b8f71" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {isSelected && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
            </div>
          </button>
        );
      })}
    </div>
  );
}
