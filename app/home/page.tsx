"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, ArrowRight } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import ProjectCard from "@/components/ProjectCard";
import { getProjects, getFavorites, toggleFavorite, generateId } from "@/lib/store";
import { KamerOntwerp, FURNITURE } from "@/lib/data";

const inspiratie = [
  { stijl: "Japandi", emoji: "🌿", img: "1555041469-a586c61ea9bc", kleur: "#eaf1eb" },
  { stijl: "Scandinavisch", emoji: "🪵", img: "1493663284031-b7e3aefcae8e", kleur: "#f0ebe3" },
  { stijl: "Hotel Chic", emoji: "✨", img: "1567016432779-094069958ea5", kleur: "#f5f0e8" },
];

export default function HomePage() {
  const router = useRouter();
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

  function nieuwOntwerp() {
    router.push(`/new-room?id=${generateId()}`);
  }

  const recente = projecten.slice(0, 3);

  return (
    <div className="mobile-container">
      <div className="page-content">
        {/* Header */}
        <div style={{ padding: "60px 24px 20px", background: "#fff", borderBottom: "1px solid #ece8e2" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ fontSize: 13, color: "#9b9189", fontWeight: 500, marginBottom: 4 }}>Welkom terug 👋</p>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1c1917", letterSpacing: -0.5, lineHeight: 1.15 }}>
                Jouw design<br />
                <span style={{ color: "#5c7d63" }}>studio</span>
              </h1>
            </div>
            <button
              onClick={nieuwOntwerp}
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "#1c1917",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                flexShrink: 0,
              }}
            >
              <Plus size={22} color="#fff" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Nieuw ontwerp CTA */}
        <div style={{ padding: "20px 24px 0" }}>
          <button
            onClick={nieuwOntwerp}
            style={{
              width: "100%",
              borderRadius: 22,
              background: "linear-gradient(135deg, #1c1917 0%, #2d2926 100%)",
              border: "none",
              padding: "22px 22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decoration circles */}
            <div style={{ position: "absolute", top: -24, right: 72, width: 100, height: 100, borderRadius: "50%", background: "rgba(92,125,99,0.2)" }} />
            <div style={{ position: "absolute", bottom: -16, right: 30, width: 60, height: 60, borderRadius: "50%", background: "rgba(92,125,99,0.12)" }} />
            <div style={{ textAlign: "left", position: "relative" }}>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 600, marginBottom: 4, letterSpacing: 0.5, textTransform: "uppercase" }}>
                Nieuwe kamer
              </p>
              <p style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: -0.3 }}>Maak een ontwerp</p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 4 }}>Voeg meubels toe en zie het resultaat</p>
            </div>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "#5c7d63",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                position: "relative",
              }}
            >
              <ArrowRight size={22} color="#fff" />
            </div>
          </button>
        </div>

        {/* Inspiratie */}
        <div style={{ padding: "28px 0 0" }}>
          <div style={{ padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1c1917" }}>Inspiratie</h2>
          </div>
          <div style={{ paddingLeft: 24, overflowX: "auto", display: "flex", gap: 12, paddingRight: 24 }} className="no-scrollbar">
            {inspiratie.map((item) => (
              <button
                key={item.stijl}
                onClick={() => router.push(`/new-room?id=${generateId()}`)}
                style={{
                  flexShrink: 0,
                  width: 140,
                  height: 180,
                  borderRadius: 20,
                  overflow: "hidden",
                  position: "relative",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <img
                  src={`https://images.unsplash.com/photo-${item.img}?w=300&auto=format&fit=crop&q=70`}
                  alt={item.stijl}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)" }} />
                <div style={{ position: "absolute", bottom: 12, left: 12, textAlign: "left" }}>
                  <div style={{ fontSize: 16 }}>{item.emoji}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginTop: 2 }}>{item.stijl}</div>
                </div>
              </button>
            ))}
            {/* Meer stijlen kaartje */}
            <button
              onClick={() => router.push(`/new-room?id=${generateId()}`)}
              style={{
                flexShrink: 0,
                width: 140,
                height: 180,
                borderRadius: 20,
                background: "#ece8e2",
                border: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <Plus size={18} color="#1c1917" />
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#1c1917" }}>Meer stijlen</span>
            </button>
          </div>
        </div>

        {/* Recente ontwerpen */}
        <div style={{ padding: "28px 24px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1c1917" }}>Recente ontwerpen</h2>
            <button
              onClick={() => router.push("/projects")}
              style={{ background: "none", border: "none", fontSize: 13, color: "#5c7d63", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}
            >
              Alles <ArrowRight size={13} />
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {recente.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                isFavorite={favorieten.includes(p.id)}
                onFavorite={() => handleFavoriet(p.id)}
              />
            ))}
          </div>
        </div>

        {/* Statistieken */}
        <div style={{ padding: "28px 24px 0" }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1c1917", marginBottom: 14 }}>Jouw voortgang</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { label: "Ontwerpen gemaakt", waarde: projecten.length, icoon: "🎨" },
              { label: "Meubels toegevoegd", waarde: projecten.reduce((s, p) => s + (p.meubels ?? p.furniture ?? []).length, 0), icoon: "🛋️" },
              { label: "Favorieten opgeslagen", waarde: favorieten.length, icoon: "❤️" },
              { label: "Stijlen verkend", waarde: new Set(projecten.map((p) => p.stijl ?? p.style)).size, icoon: "✨" },
            ].map((stat) => (
              <div key={stat.label} style={{ background: "#fff", borderRadius: 18, padding: "18px 16px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                <div style={{ fontSize: 26, marginBottom: 8 }}>{stat.icoon}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#1c1917", marginBottom: 2 }}>{stat.waarde}</div>
                <div style={{ fontSize: 11, color: "#9b9189", fontWeight: 600, lineHeight: 1.3 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
