"use client";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import ProjectCard from "@/components/ProjectCard";
import { getProjects, getFavorites, toggleFavorite } from "@/lib/store";
import { KamerOntwerp } from "@/lib/data";

export default function FavorietenPagina() {
  const [projecten, setProjecten] = useState<KamerOntwerp[]>([]);
  const [favorieten, setFavorieten] = useState<string[]>([]);

  useEffect(() => {
    setProjecten(getProjects());
    setFavorieten(getFavorites());
  }, []);

  function handleFavoriet(id: string) {
    toggleFavorite(id);
    setFavorieten(getFavorites());
  }

  const favProjecten = projecten.filter((p) => favorieten.includes(p.id));

  return (
    <div className="mobile-container">
      <div className="page-content">
        <div style={{ padding: "60px 24px 20px", background: "#fff", borderBottom: "1px solid #ece8e2" }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1c1917", letterSpacing: -0.5, marginBottom: 2 }}>
            Favorieten
          </h1>
          <p style={{ fontSize: 13, color: "#9b9189", fontWeight: 500 }}>{favProjecten.length} opgeslagen ontwerpen</p>
        </div>

        <div style={{ padding: "20px 24px 0", display: "flex", flexDirection: "column", gap: 14 }}>
          {favProjecten.length === 0 ? (
            <div style={{ textAlign: "center", padding: "100px 0", color: "#9b9189" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#f5f3ef", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
                <Heart size={32} color="#d8d0c8" />
              </div>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6, color: "#1c1917" }}>Nog geen favorieten</div>
              <div style={{ fontSize: 13, lineHeight: 1.6 }}>Tik op ❤️ bij een ontwerp<br />om het hier op te slaan</div>
            </div>
          ) : (
            favProjecten.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                isFavorite={true}
                onFavorite={() => handleFavoriet(p.id)}
              />
            ))
          )}
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}
