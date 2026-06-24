"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BottomNavigation from "@/components/BottomNavigation";
import ProjectCard from "@/components/ProjectCard";
import { getProjects, getFavorites, toggleFavorite, generateId } from "@/lib/store";
import { KamerOntwerp, Stijl } from "@/lib/data";

const STIJL_FILTERS: (Stijl | "Alles")[] = ["Alles", "Japandi", "Scandinavisch", "Modern", "Industrieel", "Hotel Chic"];

export default function ProjectenPagina() {
  const router = useRouter();
  const [projecten, setProjecten] = useState<KamerOntwerp[]>([]);
  const [favorieten, setFavorieten] = useState<string[]>([]);
  const [filter, setFilter] = useState<Stijl | "Alles">("Alles");
  const [zoek, setZoek] = useState("");

  useEffect(() => {
    setProjecten(getProjects());
    setFavorieten(getFavorites());
  }, []);

  function handleFavoriet(id: string) {
    toggleFavorite(id);
    setFavorieten(getFavorites());
  }

  const gefilterd = projecten.filter((p) => {
    const stijlMatch = filter === "Alles" || (p.stijl ?? p.style) === filter;
    const zoekMatch = (p.naam ?? p.name ?? "").toLowerCase().includes(zoek.toLowerCase());
    return stijlMatch && zoekMatch;
  });

  return (
    <div className="mobile-container">
      <div className="page-content">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32 }}
          style={{ paddingTop: "calc(52px + env(safe-area-inset-top, 0px))", paddingBottom: 20, paddingLeft: 24, paddingRight: 24, background: "#fff", borderBottom: "1px solid #ece8e2" } as React.CSSProperties}
        >
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1c1917", letterSpacing: -0.5, marginBottom: 2 }}>Mijn Ontwerpen</h1>
          <p style={{ fontSize: 13, color: "#9b9189", fontWeight: 500 }}>{projecten.length} kamerontwerpen opgeslagen</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          style={{ padding: "16px 24px 12px" }}
        >
          <div style={{ position: "relative" }}>
            <Search size={16} color="#9b9189" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
            <input
              value={zoek}
              onChange={(e) => setZoek(e.target.value)}
              placeholder="Zoek in jouw ontwerpen..."
              style={{ width: "100%", padding: "13px 14px 13px 42px", background: "#fff", border: "1.5px solid #ece8e2", borderRadius: 16, fontSize: 14, color: "#1c1917", outline: "none", fontFamily: "inherit" }}
            />
          </div>
        </motion.div>

        {/* Filter chips */}
        <div style={{ paddingLeft: 24, paddingBottom: 20, overflowX: "auto" }} className="no-scrollbar">
          <div style={{ display: "flex", gap: 8, width: "max-content", paddingRight: 24 }}>
            {STIJL_FILTERS.map((s) => (
              <motion.button
                key={s}
                onClick={() => setFilter(s)}
                whileTap={{ scale: 0.94 }}
                style={{
                  padding: "8px 16px", borderRadius: 20, border: "none",
                  background: filter === s ? "#1c1917" : "#fff",
                  color: filter === s ? "#fff" : "#6b6460",
                  fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.06)", fontFamily: "inherit",
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                {s}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div style={{ padding: "0 24px", display: "flex", flexDirection: "column", gap: 14 }}>
          <AnimatePresence mode="popLayout">
            {gefilterd.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ textAlign: "center", padding: "80px 0", color: "#9b9189" }}
              >
                <div style={{ fontSize: 52, marginBottom: 14 }}>🏠</div>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6, color: "#1c1917" }}>Nog geen ontwerpen</div>
                <div style={{ fontSize: 13, lineHeight: 1.5 }}>Maak jouw eerste kamerontwerp<br />en begin met visualiseren</div>
              </motion.div>
            ) : (
              gefilterd.map((p, i) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  index={i}
                  isFavorite={favorieten.includes(p.id)}
                  onFavorite={() => handleFavoriet(p.id)}
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.08 }}
        onClick={() => router.push(`/new-room?id=${generateId()}`)}
        style={{
          position: "fixed", bottom: 96, right: "calc(50% - 195px + 16px)",
          width: 56, height: 56, borderRadius: "50%", background: "#1c1917",
          border: "none", display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.28)", zIndex: 99,
        }}
      >
        <Plus size={24} color="#fff" strokeWidth={2.5} />
      </motion.button>

      <BottomNavigation />
    </div>
  );
}
