"use client";
import { motion } from "framer-motion";
import { KamerOntwerp, STYLES, MEUBELS } from "@/lib/data";
import { Heart, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Props {
  project: KamerOntwerp;
  isFavorite?: boolean;
  onFavorite?: () => void;
  index?: number;
}

export default function ProjectCard({ project, isFavorite, onFavorite, index = 0 }: Props) {
  const stijl = STYLES.find((s) => s.id === (project.stijl ?? project.style));
  const meubels = (project.meubels ?? project.furniture ?? [])
    .map((id) => MEUBELS.find((m) => m.id === id))
    .filter(Boolean) as typeof MEUBELS;
  const totaal = meubels.reduce((s, m) => s + m.prijs, 0);
  const wallColor = project.muurKleur ?? project.wallColor ?? "#f8f6f2";
  const floorColor = project.vloerKleur ?? project.floorColor ?? "#c8a96e";
  const naam = project.naam ?? project.name ?? "Mijn ontwerp";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      whileTap={{ scale: 0.985 }}
    >
      <Link href={`/editor/${project.id}`} style={{ textDecoration: "none", display: "block" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 22,
            overflow: "hidden",
            boxShadow: "0 2px 20px rgba(0,0,0,0.07)",
            position: "relative",
          }}
        >
          {/* Room preview */}
          <div style={{ height: 170, position: "relative", overflow: "hidden" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(160deg, ${wallColor} 0%, ${wallColor} 55%, ${floorColor} 100%)`,
              }}
            />
            {/* Furniture photo collage */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "16px 20px",
              }}
            >
              {meubels.slice(0, 4).map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.08 + i * 0.07, duration: 0.3 }}
                  style={{
                    flex: i === 0 ? "0 0 88px" : "0 0 54px",
                    height: i === 0 ? 88 : 54,
                    borderRadius: 14,
                    overflow: "hidden",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
                    transform: `rotate(${[-2, -3, 2, -1][i] ?? 0}deg)`,
                    border: "2.5px solid rgba(255,255,255,0.65)",
                    flexShrink: 0,
                  }}
                >
                  <img src={m.afbeelding} alt={m.naam} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </motion.div>
              ))}
              {meubels.length === 0 && (
                <div style={{ fontSize: 13, color: "#aaa8a0", fontWeight: 600 }}>Geen meubels</div>
              )}
            </div>

            {/* Style badge */}
            <div
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(8px)",
                borderRadius: 20,
                padding: "4px 12px",
                fontSize: 11,
                fontWeight: 700,
                color: "#5c7d63",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              {stijl?.emoji} {project.stijl ?? project.style}
            </div>

            {/* Favorite button */}
            <motion.button
              onClick={(e) => { e.preventDefault(); onFavorite?.(); }}
              whileTap={{ scale: 0.85 }}
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(8px)",
                border: "none",
                borderRadius: "50%",
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <motion.div
                animate={{ scale: isFavorite ? [1, 1.3, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Heart size={16} fill={isFavorite ? "#e85d5d" : "none"} color={isFavorite ? "#e85d5d" : "#9b9189"} />
              </motion.div>
            </motion.button>
          </div>

          {/* Info */}
          <div style={{ padding: "14px 16px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#1c1917", marginBottom: 3 }}>{naam}</div>
              <div style={{ fontSize: 12, color: "#9b9189", display: "flex", alignItems: "center", gap: 6 }}>
                <span>{meubels.length} meubels</span>
                <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#d0c8c0", display: "inline-block" }} />
                <span style={{ fontWeight: 700, color: "#1c1917" }}>€{totaal.toLocaleString()}</span>
              </div>
            </div>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#f5f3ef", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ChevronRight size={16} color="#9b9189" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
