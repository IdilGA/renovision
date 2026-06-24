"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MEUBELS, STYLES } from "@/lib/data";

interface Props {
  wallColor: string;
  floorColor: string;
  style: string;
  furnitureIds: string[];
  onRemove?: (id: string) => void;
  compact?: boolean;
  photo?: string | null;
}

// Two rows, three columns — no overlapping
const POSITIES = [
  { left: "3%",  bottom: "30%", w: 88, rotate: -1.5 },
  { left: "35%", bottom: "32%", w: 74, rotate:  1   },
  { left: "64%", bottom: "28%", w: 70, rotate: -1   },
  { left: "6%",  bottom: "10%", w: 76, rotate:  1.5 },
  { left: "38%", bottom: "9%",  w: 68, rotate: -1   },
  { left: "66%", bottom: "11%", w: 62, rotate:  2   },
];

export default function RoomPreview({ wallColor, floorColor, style, furnitureIds, onRemove, compact, photo }: Props) {
  const [removingId, setRemovingId] = useState<string | null>(null);

  const meubels = furnitureIds
    .map((id) => MEUBELS.find((m) => m.id === id))
    .filter(Boolean) as typeof MEUBELS;

  const stijlInfo = STYLES.find((s) => s.id === style);
  const h = compact ? 190 : 280;
  const schaal = compact ? 0.72 : 1;

  function handleRemove(mid: string) {
    if (!onRemove) return;
    setRemovingId(mid);
    setTimeout(() => {
      onRemove(mid);
      setRemovingId(null);
    }, 220);
  }

  return (
    <div
      style={{
        borderRadius: compact ? 16 : 22,
        overflow: "hidden",
        position: "relative",
        height: h,
        boxShadow: compact ? "none" : "0 8px 40px rgba(0,0,0,0.13)",
      }}
    >
      {/* Background */}
      {photo ? (
        <>
          <img src={photo} alt="Jouw kamer" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.18)" }} />
        </>
      ) : (
        <>
          <div style={{ position: "absolute", inset: 0, background: wallColor }} />
          <div style={{ position: "absolute", top: "55%", left: 0, right: 0, height: 1, background: `${floorColor}60` }} />
          <div
            style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "46%",
              background: `linear-gradient(180deg, ${floorColor}cc 0%, ${floorColor} 100%)`,
              clipPath: "polygon(0 28%, 100% 0, 100% 100%, 0 100%)",
            }}
          />
          <div style={{ position: "absolute", bottom: "45.5%", left: 0, right: 0, height: 2, background: `${floorColor}88` }} />
        </>
      )}

      {/* Furniture items */}
      <AnimatePresence>
        {meubels.slice(0, 6).map((m, i) => {
          const pos = POSITIES[i] ?? POSITIES[0];
          const breedte = Math.round(pos.w * schaal);
          const isRemoving = removingId === m.id;

          return (
            <motion.button
              key={m.id}
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: isRemoving ? 0 : 1, scale: isRemoving ? 0.5 : 1, y: isRemoving ? -20 : 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -20 }}
              transition={{ duration: 0.25, type: "spring", stiffness: 300, damping: 22 }}
              onClick={() => handleRemove(m.id)}
              title={onRemove ? `Verwijder ${m.naam}` : m.naam}
              style={{
                position: "absolute",
                left: pos.left,
                bottom: pos.bottom,
                width: breedte,
                cursor: onRemove ? "pointer" : "default",
                background: "none",
                border: "none",
                padding: 0,
                transform: `rotate(${pos.rotate}deg)`,
                transformOrigin: "bottom center",
                zIndex: 10 - i,
              }}
            >
              <div
                style={{
                  borderRadius: 8,
                  overflow: "hidden",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.25), 0 2px 4px rgba(0,0,0,0.12)",
                  border: "2px solid rgba(255,255,255,0.55)",
                  background: "#f5f3ef",
                }}
              >
                <img
                  src={m.afbeelding}
                  alt={m.naam}
                  style={{ width: "100%", height: breedte * 0.7, objectFit: "cover", display: "block" }}
                  loading="lazy"
                />
              </div>
              {/* Vloerschaduw */}
              <div
                style={{
                  width: "65%", height: 5,
                  background: "rgba(0,0,0,0.15)",
                  borderRadius: "50%", margin: "0 auto",
                  filter: "blur(3px)",
                }}
              />
            </motion.button>
          );
        })}
      </AnimatePresence>

      {/* Empty state */}
      {meubels.length === 0 && (
        <div
          style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 8,
          }}
        >
          <div style={{ fontSize: 32 }}>🛋️</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: photo ? "rgba(255,255,255,0.75)" : "rgba(100,90,80,0.5)", textAlign: "center", padding: "0 32px" }}>
            Voeg meubels toe om jouw kamer te zien
          </div>
        </div>
      )}

      {/* Stijl badge */}
      {stijlInfo && (
        <div
          style={{
            position: "absolute", top: 10, right: 10,
            background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)",
            borderRadius: 20, padding: "4px 11px",
            fontSize: 11, fontWeight: 700, color: "#5c7d63", zIndex: 20,
          }}
        >
          {stijlInfo.emoji} {style}
        </div>
      )}

      {/* Foto badge */}
      {photo && (
        <div
          style={{
            position: "absolute", top: 10, left: 10,
            background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)",
            borderRadius: 20, padding: "4px 11px",
            fontSize: 11, fontWeight: 700, color: "#fff", zIndex: 20,
          }}
        >
          📷 Jouw kamer
        </div>
      )}

      {/* Remove hint */}
      {onRemove && meubels.length > 0 && (
        <div
          style={{
            position: "absolute", bottom: 8, right: 10,
            fontSize: 10, fontWeight: 600, zIndex: 20,
            color: photo ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.28)",
          }}
        >
          Tik op meubel om te verwijderen
        </div>
      )}
    </div>
  );
}
