"use client";
import { STYLES, Stijl } from "@/lib/data";

interface Props {
  selected: Stijl | null;
  onSelect: (stijl: Stijl) => void;
}

export default function StyleSelector({ selected, onSelect }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {STYLES.map((stijl) => {
        const isSelected = selected === stijl.id;
        return (
          <button
            key={stijl.id}
            onClick={() => onSelect(stijl.id)}
            style={{
              background: isSelected ? "#1c1917" : "#fff",
              border: "2px solid",
              borderColor: isSelected ? "#1c1917" : "#ece8e2",
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
            <div style={{ display: "flex", flexShrink: 0 }}>
              {stijl.kleuren.map((c, i) => (
                <div
                  key={i}
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: c,
                    border: "2px solid rgba(255,255,255,0.6)",
                    marginLeft: i > 0 ? -8 : 0,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                  }}
                />
              ))}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: isSelected ? "#fff" : "#1c1917", display: "flex", alignItems: "center", gap: 6 }}>
                {stijl.emoji} {stijl.id}
              </div>
              <div style={{ fontSize: 12, color: isSelected ? "rgba(255,255,255,0.65)" : "#9b9189", marginTop: 2, lineHeight: 1.4 }}>
                {stijl.beschrijving}
              </div>
            </div>
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                border: isSelected ? "none" : "2px solid #ddd8d2",
                background: isSelected ? "#5c7d63" : "transparent",
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
