"use client";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import ProjectCard from "@/components/ProjectCard";
import { getProjects, getFavorites, toggleFavorite } from "@/lib/store";
import { RoomDesign } from "@/lib/data";

export default function FavoritesPage() {
  const [projects, setProjects] = useState<RoomDesign[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setProjects(getProjects());
    setFavorites(getFavorites());
  }, []);

  function handleFavorite(id: string) {
    toggleFavorite(id);
    setFavorites(getFavorites());
  }

  const favProjects = projects.filter((p) => favorites.includes(p.id));

  return (
    <div className="mobile-container">
      <div className="page-content">
        <div style={{ padding: "60px 24px 20px" }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1a1a1a", letterSpacing: -0.5, marginBottom: 4 }}>
            Favorites
          </h1>
          <p style={{ fontSize: 14, color: "#9e9189" }}>{favProjects.length} saved designs</p>
        </div>

        <div style={{ padding: "0 24px", display: "flex", flexDirection: "column", gap: 14 }}>
          {favProjects.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#9e9189" }}>
              <Heart size={48} color="#e8e4de" style={{ marginBottom: 16 }} />
              <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4, color: "#1a1a1a" }}>No favorites yet</div>
              <div style={{ fontSize: 13 }}>Tap ❤️ on any design to save it here</div>
            </div>
          ) : (
            favProjects.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                isFavorite={true}
                onFavorite={() => handleFavorite(p.id)}
              />
            ))
          )}
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}
