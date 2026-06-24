"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MeubelItem } from "@/lib/data";
import { Plus, Check } from "lucide-react";

interface Props {
  item: MeubelItem;
  added?: boolean;
  onAdd: () => void;
  index?: number;
}

const winkelKleuren: Record<string, { bg: string; text: string }> = {
  IKEA: { bg: "#0058a3", text: "#fff" },
  JYSK: { bg: "#c8102e", text: "#fff" },
  "Leen Bakker": { bg: "#e87722", text: "#fff" },
  Kwantum: { bg: "#5a1e8c", text: "#fff" },
  "H&M Home": { bg: "#1c1917", text: "#fff" },
};

export default function FurnitureCard({ item, added, onAdd, index = 0 }: Props) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const wk = winkelKleuren[item.winkel] ?? { bg: "#333", text: "#fff" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileTap={{ scale: 0.97 }}
      style={{
        background: "#fff",
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: added
          ? "0 0 0 2px #5c7d63, 0 4px 20px rgba(92,125,99,0.15)"
          : "0 2px 16px rgba(0,0,0,0.07)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.25s",
      }}
    >
      {/* Product image */}
      <div style={{ position: "relative", height: 140, overflow: "hidden", background: "#f5f3ef", flexShrink: 0 }}>
        {/* Skeleton */}
        {!imgLoaded && !imgError && (
          <div className="skeleton" style={{ position: "absolute", inset: 0, borderRadius: 0 }} />
        )}
        {imgError ? (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>
            🛋️
          </div>
        ) : (
          <img
            src={item.afbeelding}
            alt={item.naam}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            style={{
              width: "100%", height: "100%", objectFit: "cover", display: "block",
              opacity: imgLoaded ? 1 : 0,
              transition: "opacity 0.3s, transform 0.4s",
              transform: imgLoaded ? "scale(1)" : "scale(1.06)",
            }}
            loading="lazy"
          />
        )}
        {/* Store badge */}
        <div
          style={{
            position: "absolute", bottom: 8, left: 8,
            background: wk.bg, color: wk.text,
            fontSize: 9, fontWeight: 700, padding: "3px 8px",
            borderRadius: 20, letterSpacing: 0.5,
          }}
        >
          {item.winkel}
        </div>
        {/* Added overlay */}
        {added && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: "absolute", inset: 0,
              background: "rgba(92,125,99,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              style={{
                width: 38, height: 38, borderRadius: "50%", background: "#5c7d63",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <Check size={18} color="#fff" strokeWidth={3} />
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "10px 12px 12px", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: "#1c1917", lineHeight: 1.3 }}>
          {item.naam}
        </div>
        <div style={{ fontSize: 11, color: "#9b9189", lineHeight: 1.4, flex: 1 }}>
          {item.beschrijving.length > 60 ? item.beschrijving.slice(0, 58) + "…" : item.beschrijving}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 2 }}>
          <span style={{ fontWeight: 800, fontSize: 16, color: "#1c1917" }}>€{item.prijs}</span>
          <motion.button
            onClick={onAdd}
            whileTap={{ scale: 0.9 }}
            style={{
              background: added ? "#5c7d63" : "#1c1917",
              color: "#fff", border: "none", borderRadius: 12,
              padding: "8px 14px", minHeight: 36,
              display: "flex", alignItems: "center", gap: 4,
              fontSize: 12, fontWeight: 700, cursor: "pointer",
              flexShrink: 0, fontFamily: "inherit",
              transition: "background 0.25s",
            }}
          >
            {added ? <Check size={12} strokeWidth={3} /> : <Plus size={12} strokeWidth={3} />}
            {added ? "Weg" : "Voeg toe"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
