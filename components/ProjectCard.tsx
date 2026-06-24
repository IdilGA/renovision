"use client";
import { KamerOntwerp, STYLES, FURNITURE } from "@/lib/data";
import { Heart, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Props {
  project: KamerOntwerp;
  isFavorite?: boolean;
  onFavorite?: () => void;
}

export default function ProjectCard({ project, isFavorite, onFavorite }: Props) {
  const stijl = STYLES.find((s) => s.id === (project.stijl ?? project.style));
  const meubels = (project.meubels ?? project.furniture ?? [])
    .map((id) => FURNITURE.find((f) => f.id === id))
    .filter(Boolean);
  const totaal = meubels.reduce((s, f) => s + (f?.prijs ?? f?.price ?? 0), 0);
  const wallColor = project.muurKleur ?? project.wallColor ?? "#f8f6f2";
  const floorColor = project.vloerKleur ?? project.floorColor ?? "#c8a96e";
  const naam = project.naam ?? project.name ?? "Mijn ontwerp";

  // Use first furniture item with image as hero, or fall back to gradient
  const heroItem = meubels.find((f) => f?.afbeelding ?? (f as any)?.image);

  return (
    <Link href={`/editor/${project.id}`} style={{ textDecoration: "none", display: "block" }}>
      <div
        style={{
          background: "#fff",
          borderRadius: 22,
          overflow: "hidden",
          boxShadow: "0 2px 20px rgba(0,0,0,0.07)",
          position: "relative",
          transition: "transform 0.15s, box-shadow 0.15s",
        }}
      >
        {/* Room preview */}
        <div style={{ height: 170, position: "relative", overflow: "hidden" }}>
          {/* Background: gradient of wall+floor colors */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(160deg, ${wallColor} 0%, ${wallColor} 55%, ${floorColor} 100%)`,
            }}
          />
          {/* Furniture images scattered */}
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
            {meubels.slice(0, 4).map((f, i) => {
              const img = f?.afbeelding ?? (f as any)?.image;
              return img ? (
                <div
                  key={f!.id}
                  style={{
                    flex: i === 0 ? "0 0 90px" : "0 0 56px",
                    height: i === 0 ? 90 : 56,
                    borderRadius: 14,
                    overflow: "hidden",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
                    transform: i === 1 ? "rotate(-3deg)" : i === 2 ? "rotate(2deg)" : "rotate(-1deg)",
                    border: "2px solid rgba(255,255,255,0.6)",
                  }}
                >
                  <img src={img} alt={f!.naam} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ) : (
                <span key={f!.id} style={{ fontSize: i === 0 ? 40 : 28, filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.2))" }}>
                  {f!.emoji}
                </span>
              );
            })}
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
          <button
            onClick={(e) => { e.preventDefault(); onFavorite?.(); }}
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
            <Heart size={16} fill={isFavorite ? "#e85d5d" : "none"} color={isFavorite ? "#e85d5d" : "#9b9189"} />
          </button>
        </div>

        {/* Info */}
        <div style={{ padding: "14px 16px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#1c1917", marginBottom: 3 }}>{naam}</div>
            <div style={{ fontSize: 12, color: "#9b9189", display: "flex", alignItems: "center", gap: 6 }}>
              <span>{meubels.length} meubels</span>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#d0c8c0", display: "inline-block" }} />
              <span style={{ fontWeight: 600, color: "#1c1917" }}>€{totaal.toLocaleString()}</span>
            </div>
          </div>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#f5f3ef", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ChevronRight size={16} color="#9b9189" />
          </div>
        </div>
      </div>
    </Link>
  );
}
