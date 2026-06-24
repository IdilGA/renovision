"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Sparkles, TrendingUp } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import ProjectCard from "@/components/ProjectCard";
import { getProjects, getFavorites, toggleFavorite, generateId } from "@/lib/store";
import { RoomDesign } from "@/lib/data";

export default function HomePage() {
  const router = useRouter();
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

  function createNew() {
    const id = generateId();
    router.push(`/new-room?id=${id}`);
  }

  const recent = projects.slice(0, 3);

  return (
    <div className="mobile-container">
      <div className="page-content">
        {/* Header */}
        <div style={{ padding: "60px 24px 24px" }}>
          <div style={{ fontSize: 13, color: "#9e9189", fontWeight: 500, marginBottom: 4 }}>Good morning 👋</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1a1a1a", letterSpacing: -0.5, lineHeight: 1.2, marginBottom: 4 }}>
            Your design
          </h1>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#6b8f71", letterSpacing: -0.5, lineHeight: 1.2 }}>
            studio
          </h1>
        </div>

        {/* New project CTA */}
        <div style={{ padding: "0 24px 24px" }}>
          <button
            onClick={createNew}
            style={{
              width: "100%",
              padding: "20px 24px",
              background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
              border: "none",
              borderRadius: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 4 }}>New Room Design</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Start visualizing your space</div>
            </div>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "#6b8f71",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Plus size={24} color="#fff" />
            </div>
            {/* Decoration */}
            <div style={{ position: "absolute", top: -20, right: 80, width: 80, height: 80, borderRadius: "50%", background: "rgba(107,143,113,0.15)" }} />
          </button>
        </div>

        {/* Inspirations banner */}
        <div style={{ padding: "0 24px 28px" }}>
          <div
            style={{
              borderRadius: 18,
              background: "linear-gradient(135deg, #e8f0e9, #f0ebe3)",
              padding: "16px 18px",
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 32 }}>🌿</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a1a", marginBottom: 2 }}>
                Trending: Japandi style
              </div>
              <div style={{ fontSize: 12, color: "#6b6460" }}>Natural materials · Calm palette · Minimal forms</div>
            </div>
            <Sparkles size={18} color="#6b8f71" style={{ marginLeft: "auto", flexShrink: 0 }} />
          </div>
        </div>

        {/* Recent projects */}
        <div style={{ padding: "0 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a" }}>Recent Designs</h2>
            <button
              onClick={() => router.push("/projects")}
              style={{ background: "none", border: "none", fontSize: 13, color: "#6b8f71", fontWeight: 600, cursor: "pointer" }}
            >
              See all
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {recent.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                isFavorite={favorites.includes(p.id)}
                onFavorite={() => handleFavorite(p.id)}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={{ padding: "28px 24px 0" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a", marginBottom: 16 }}>Your progress</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { label: "Designs created", value: projects.length, icon: "🎨" },
              { label: "Furniture added", value: projects.reduce((s, p) => s + p.furniture.length, 0), icon: "🛋️" },
              { label: "Favorites saved", value: favorites.length, icon: "❤️" },
              { label: "Styles explored", value: new Set(projects.map((p) => p.style)).size, icon: "✨" },
            ].map((stat) => (
              <div key={stat.label} style={{ background: "#fff", borderRadius: 18, padding: "16px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{stat.icon}</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: "#1a1a1a", marginBottom: 2 }}>{stat.value}</div>
                <div style={{ fontSize: 11, color: "#9e9189", fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
