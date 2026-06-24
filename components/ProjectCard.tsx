"use client";
import { RoomDesign, STYLES, FURNITURE } from "@/lib/data";
import { Heart, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Props {
  project: RoomDesign;
  isFavorite?: boolean;
  onFavorite?: () => void;
}

export default function ProjectCard({ project, isFavorite, onFavorite }: Props) {
  const style = STYLES.find((s) => s.id === project.style);
  const furnitureItems = project.furniture.map((id) => FURNITURE.find((f) => f.id === id)).filter(Boolean);
  const total = furnitureItems.reduce((sum, f) => sum + (f?.price ?? 0), 0);

  return (
    <Link href={`/editor/${project.id}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
          position: "relative",
        }}
      >
        {/* Room Preview */}
        <div
          style={{
            height: 160,
            background: `linear-gradient(135deg, ${project.wallColor}dd, ${project.floorColor}88)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 48,
            position: "relative",
          }}
        >
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            {furnitureItems.slice(0, 4).map((f, i) => (
              <span key={i} style={{ fontSize: 36 }}>{f?.emoji}</span>
            ))}
          </div>
          {/* Style badge */}
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              background: "rgba(255,255,255,0.9)",
              borderRadius: 20,
              padding: "4px 10px",
              fontSize: 11,
              fontWeight: 600,
              color: "#6b8f71",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            {style?.emoji} {project.style}
          </div>
          {/* Favorite */}
          <button
            onClick={(e) => { e.preventDefault(); onFavorite?.(); }}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              background: "rgba(255,255,255,0.9)",
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
            <Heart size={16} fill={isFavorite ? "#e85d5d" : "none"} color={isFavorite ? "#e85d5d" : "#9e9189"} />
          </button>
        </div>

        {/* Info */}
        <div style={{ padding: "14px 16px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15, color: "#1a1a1a", marginBottom: 2 }}>{project.name}</div>
            <div style={{ fontSize: 12, color: "#9e9189" }}>{furnitureItems.length} items · €{total.toLocaleString()}</div>
          </div>
          <ChevronRight size={18} color="#c8c0b8" />
        </div>
      </div>
    </Link>
  );
}
