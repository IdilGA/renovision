"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import ProjectCard from "@/components/ProjectCard";
import { getProjects, getFavorites, toggleFavorite, generateId } from "@/lib/store";
import { RoomDesign, Style } from "@/lib/data";

const STYLE_FILTERS: (Style | "All")[] = ["All", "Japandi", "Scandinavian", "Modern", "Industrial", "Hotel Chic"];

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<RoomDesign[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filter, setFilter] = useState<Style | "All">("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setProjects(getProjects());
    setFavorites(getFavorites());
  }, []);

  function handleFavorite(id: string) {
    toggleFavorite(id);
    setFavorites(getFavorites());
  }

  const filtered = projects.filter((p) => {
    const matchStyle = filter === "All" || p.style === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchStyle && matchSearch;
  });

  return (
    <div className="mobile-container">
      <div className="page-content">
        {/* Header */}
        <div style={{ padding: "60px 24px 20px" }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1a1a1a", letterSpacing: -0.5, marginBottom: 4 }}>
            My Designs
          </h1>
          <p style={{ fontSize: 14, color: "#9e9189" }}>{projects.length} room designs</p>
        </div>

        {/* Search */}
        <div style={{ padding: "0 24px 16px" }}>
          <div style={{ position: "relative" }}>
            <Search size={16} color="#9e9189" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your designs..."
              style={{
                width: "100%",
                padding: "13px 14px 13px 40px",
                background: "#fff",
                border: "1.5px solid #e8e4de",
                borderRadius: 16,
                fontSize: 14,
                color: "#1a1a1a",
                outline: "none",
              }}
            />
          </div>
        </div>

        {/* Style filter chips */}
        <div style={{ padding: "0 24px 20px", overflowX: "auto" }} className="no-scrollbar">
          <div style={{ display: "flex", gap: 8, width: "max-content" }}>
            {STYLE_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                style={{
                  padding: "8px 16px",
                  borderRadius: 20,
                  border: "none",
                  background: filter === s ? "#1a1a1a" : "#fff",
                  color: filter === s ? "#fff" : "#6b6460",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Projects list */}
        <div style={{ padding: "0 24px", display: "flex", flexDirection: "column", gap: 14 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#9e9189" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🏠</div>
              <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>No designs yet</div>
              <div style={{ fontSize: 13 }}>Create your first room design</div>
            </div>
          ) : (
            filtered.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                isFavorite={favorites.includes(p.id)}
                onFavorite={() => handleFavorite(p.id)}
              />
            ))
          )}
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={() => router.push(`/new-room?id=${generateId()}`)}
        style={{
          position: "fixed",
          bottom: 96,
          right: "calc(50% - 195px + 16px)",
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "#1a1a1a",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
          zIndex: 99,
        }}
      >
        <Plus size={24} color="#fff" />
      </button>

      <BottomNavigation />
    </div>
  );
}
