"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, Heart, Star } from "lucide-react";
import RoomPreview from "@/components/RoomPreview";
import { getProjects, getFavorites, toggleFavorite } from "@/lib/store";
import { RoomDesign, FURNITURE, STYLES } from "@/lib/data";

function CompareContent() {
  const router = useRouter();
  const params = useSearchParams();
  const focusId = params.get("focus");
  const [projects, setProjects] = useState<RoomDesign[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const p = getProjects();
    setProjects(p);
    setFavorites(getFavorites());
    // Pre-select focus project + up to 2 others
    if (focusId) {
      const others = p.filter((x) => x.id !== focusId).slice(0, 2).map((x) => x.id);
      setSelected([focusId, ...others].slice(0, 3));
    } else {
      setSelected(p.slice(0, 3).map((x) => x.id));
    }
  }, [focusId]);

  function handleFav(id: string) {
    toggleFavorite(id);
    setFavorites(getFavorites());
  }

  function toggleSelect(id: string) {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < 3
        ? [...prev, id]
        : prev
    );
  }

  const compareProjects = selected.map((id) => projects.find((p) => p.id === id)).filter(Boolean) as RoomDesign[];

  function getTotal(p: RoomDesign) {
    return p.furniture.reduce((s, id) => s + (FURNITURE.find((f) => f.id === id)?.price ?? 0), 0);
  }

  return (
    <div className="mobile-container" style={{ minHeight: "100dvh", background: "#faf9f7" }}>
      {/* Header */}
      <div style={{ padding: "56px 24px 16px", background: "#fff", borderBottom: "1px solid #e8e4de" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <button
            onClick={() => router.back()}
            style={{ background: "#f5f3ef", border: "none", borderRadius: "50%", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          >
            <ChevronLeft size={18} color="#1a1a1a" />
          </button>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#1a1a1a", letterSpacing: -0.3 }}>Compare Designs</h1>
        </div>
        <p style={{ fontSize: 13, color: "#9e9189", paddingLeft: 50 }}>Select up to 3 designs to compare</p>
      </div>

      {/* Design selector */}
      <div style={{ padding: "16px 24px", overflowX: "auto" }} className="no-scrollbar">
        <div style={{ display: "flex", gap: 10, width: "max-content" }}>
          {projects.map((p) => {
            const isSelected = selected.includes(p.id);
            const style = STYLES.find((s) => s.id === p.style);
            return (
              <button
                key={p.id}
                onClick={() => toggleSelect(p.id)}
                style={{
                  padding: "8px 14px",
                  borderRadius: 20,
                  border: "2px solid",
                  borderColor: isSelected ? "#1a1a1a" : "#e8e4de",
                  background: isSelected ? "#1a1a1a" : "#fff",
                  color: isSelected ? "#fff" : "#1a1a1a",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                {style?.emoji} {p.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison cards */}
      <div style={{ padding: "0 24px 32px", display: "flex", flexDirection: "column", gap: 20 }}>
        {compareProjects.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#9e9189" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div style={{ fontWeight: 600 }}>Select designs above to compare</div>
          </div>
        )}

        {compareProjects.map((p, index) => {
          const styleInfo = STYLES.find((s) => s.id === p.style);
          const total = getTotal(p);
          const furnitureItems = p.furniture.map((id) => FURNITURE.find((f) => f.id === id)).filter(Boolean);
          const isFav = favorites.includes(p.id);

          return (
            <div
              key={p.id}
              style={{
                background: "#fff",
                borderRadius: 24,
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                border: focusId === p.id ? "2px solid #6b8f71" : "2px solid transparent",
              }}
            >
              {/* Label */}
              <div
                style={{
                  padding: "12px 16px",
                  background: focusId === p.id ? "#e8f0e9" : "#f5f3ef",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, color: focusId === p.id ? "#6b8f71" : "#9e9189", letterSpacing: 0.5 }}>
                  {focusId === p.id ? "★ CURRENT DESIGN" : `DESIGN ${String.fromCharCode(65 + index)}`}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => handleFav(p.id)}
                    style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
                  >
                    <Heart size={18} fill={isFav ? "#e85d5d" : "none"} color={isFav ? "#e85d5d" : "#9e9189"} />
                  </button>
                  <button
                    onClick={() => router.push(`/editor/${p.id}`)}
                    style={{ background: "#1a1a1a", border: "none", borderRadius: 10, padding: "5px 10px", fontSize: 11, fontWeight: 600, color: "#fff", cursor: "pointer" }}
                  >
                    Edit
                  </button>
                </div>
              </div>

              {/* Room preview */}
              <div style={{ padding: 16 }}>
                <RoomPreview
                  wallColor={p.wallColor}
                  floorColor={p.floorColor}
                  style={p.style}
                  furnitureIds={p.furniture}
                  compact
                />
              </div>

              {/* Details */}
              <div style={{ padding: "0 16px 16px" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a", marginBottom: 8 }}>{p.name}</div>

                {/* Style + Colors */}
                <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                  <div style={{ padding: "4px 10px", background: "#f5f3ef", borderRadius: 20, fontSize: 12, fontWeight: 600, color: "#6b6460" }}>
                    {styleInfo?.emoji} {p.style}
                  </div>
                  <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: p.wallColor, border: "1.5px solid #e8e4de" }} title="Wall" />
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: p.floorColor, border: "1.5px solid #e8e4de" }} title="Floor" />
                  </div>
                </div>

                {/* Furniture list */}
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#9e9189", letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 6 }}>
                    Furniture ({furnitureItems.length})
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {furnitureItems.map((f) => (
                      <div
                        key={f!.id}
                        style={{ padding: "3px 8px", background: "#f5f3ef", borderRadius: 10, fontSize: 11, color: "#6b6460", display: "flex", alignItems: "center", gap: 4 }}
                      >
                        {f!.emoji} {f!.name}
                      </div>
                    ))}
                    {furnitureItems.length === 0 && <div style={{ fontSize: 12, color: "#c0b8b0" }}>No furniture added</div>}
                  </div>
                </div>

                {/* Total */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: "#f5f3ef", borderRadius: 14 }}>
                  <span style={{ fontSize: 13, color: "#6b6460", fontWeight: 500 }}>Total estimate</span>
                  <span style={{ fontSize: 18, fontWeight: 800, color: "#1a1a1a" }}>€{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense>
      <CompareContent />
    </Suspense>
  );
}
