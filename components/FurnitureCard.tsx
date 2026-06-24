"use client";
import { MeubelItem } from "@/lib/data";
import { Plus, Check } from "lucide-react";

interface Props {
  item: MeubelItem;
  added?: boolean;
  onAdd: () => void;
}

const winkelKleuren: Record<string, { bg: string; text: string }> = {
  IKEA: { bg: "#0058a3", text: "#fff" },
  JYSK: { bg: "#c8102e", text: "#fff" },
  "Leen Bakker": { bg: "#e87722", text: "#fff" },
  Kwantum: { bg: "#5a1e8c", text: "#fff" },
  "H&M Home": { bg: "#1c1917", text: "#fff" },
};

export default function FurnitureCard({ item, added, onAdd }: Props) {
  const wk = winkelKleuren[item.winkel] ?? { bg: "#333", text: "#fff" };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Product image */}
      <div style={{ position: "relative", height: 140, overflow: "hidden", background: "#f5f3ef" }}>
        <img
          src={item.afbeelding}
          alt={item.naam}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease",
          }}
          loading="lazy"
          onError={(e) => {
            // Fallback to emoji if image fails
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Store badge */}
        <div
          style={{
            position: "absolute",
            bottom: 8,
            left: 8,
            background: wk.bg,
            color: wk.text,
            fontSize: 9,
            fontWeight: 700,
            padding: "3px 8px",
            borderRadius: 20,
            letterSpacing: 0.5,
          }}
        >
          {item.winkel}
        </div>
        {/* Added overlay */}
        {added && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(92, 125, 99, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "#5c7d63",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Check size={18} color="#fff" strokeWidth={3} />
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "10px 12px 12px", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: "#1c1917", lineHeight: 1.3 }}>
          {item.naam}
        </div>
        <div style={{ fontSize: 11, color: "#9b9189", lineHeight: 1.4, flex: 1 }}>
          {item.beschrijving.slice(0, 60)}…
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 2 }}>
          <span style={{ fontWeight: 800, fontSize: 16, color: "#1c1917" }}>€{item.prijs}</span>
          <button
            onClick={onAdd}
            style={{
              background: added ? "#5c7d63" : "#1c1917",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "8px 14px",
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s",
              flexShrink: 0,
            }}
          >
            {added ? <Check size={12} strokeWidth={3} /> : <Plus size={12} strokeWidth={3} />}
            {added ? "Toegevoegd" : "Toevoegen"}
          </button>
        </div>
      </div>
    </div>
  );
}
