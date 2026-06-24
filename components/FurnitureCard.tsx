"use client";
import { FurnitureItem } from "@/lib/data";
import { Plus, Check } from "lucide-react";

interface Props {
  item: FurnitureItem;
  added?: boolean;
  onAdd: () => void;
}

const storeColors: Record<string, string> = {
  IKEA: "#0058a3",
  JYSK: "#c8102e",
  "Leen Bakker": "#e87722",
  Kwantum: "#7b2d8b",
  "H&M Home": "#e50010",
};

export default function FurnitureCard({ item, added, onAdd }: Props) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        position: "relative",
      }}
    >
      {/* Image area */}
      <div
        style={{
          height: 120,
          background: `${item.color}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 52,
          position: "relative",
        }}
      >
        {item.emoji}
        <div
          style={{
            position: "absolute",
            bottom: 8,
            right: 8,
            background: storeColors[item.store] || "#333",
            color: "#fff",
            fontSize: 9,
            fontWeight: 700,
            padding: "2px 7px",
            borderRadius: 20,
            letterSpacing: 0.3,
          }}
        >
          {item.store}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "10px 12px 12px" }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: "#1a1a1a", marginBottom: 2, lineHeight: 1.3 }}>
          {item.name}
        </div>
        <div style={{ fontSize: 11, color: "#9e9189", marginBottom: 8, lineHeight: 1.4 }}>
          {item.description}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a" }}>€{item.price}</span>
          <button
            onClick={onAdd}
            style={{
              background: added ? "#6b8f71" : "#1a1a1a",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "7px 14px",
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {added ? <Check size={13} /> : <Plus size={13} />}
            {added ? "Added" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
