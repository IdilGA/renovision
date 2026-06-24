"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, Heart, Edit2 } from "lucide-react";
import RoomPreview from "@/components/RoomPreview";
import { getProjects, getFavorites, toggleFavorite } from "@/lib/store";
import { KamerOntwerp, MEUBELS, STYLES } from "@/lib/data";

function VergelijkInhoud() {
  const router = useRouter();
  const params = useSearchParams();
  const focusId = params.get("focus");
  const [projecten, setProjecten] = useState<KamerOntwerp[]>([]);
  const [favorieten, setFavorieten] = useState<string[]>([]);
  const [geselecteerd, setGeselecteerd] = useState<string[]>([]);

  useEffect(() => {
    const p = getProjects();
    setProjecten(p);
    setFavorieten(getFavorites());
    if (focusId) {
      const anderen = p.filter((x) => x.id !== focusId).slice(0, 2).map((x) => x.id);
      setGeselecteerd([focusId, ...anderen].slice(0, 3));
    } else {
      setGeselecteerd(p.slice(0, 3).map((x) => x.id));
    }
  }, [focusId]);

  function handleFavoriet(id: string) {
    toggleFavorite(id);
    setFavorieten(getFavorites());
  }

  function wisselSelectie(id: string) {
    setGeselecteerd((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  }

  const vergelijkProjecten = geselecteerd
    .map((id) => projecten.find((p) => p.id === id))
    .filter(Boolean) as KamerOntwerp[];

  function getTotaal(p: KamerOntwerp) {
    return (p.meubels ?? p.furniture ?? []).reduce(
      (s, id) => s + (MEUBELS.find((m) => m.id === id)?.prijs ?? 0),
      0
    );
  }

  return (
    <div className="mobile-container" style={{ minHeight: "100dvh", background: "#f7f5f2" }}>
      {/* Header */}
      <div style={{ padding: "56px 24px 14px", background: "#fff", borderBottom: "1px solid #ece8e2" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <button onClick={() => router.back()} style={{ background: "#f5f3ef", border: "none", borderRadius: "50%", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <ChevronLeft size={18} color="#1c1917" />
          </button>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#1c1917", letterSpacing: -0.3 }}>Ontwerpen vergelijken</h1>
        </div>
        <p style={{ fontSize: 13, color: "#9b9189", paddingLeft: 50, fontWeight: 500 }}>Selecteer maximaal 3 ontwerpen</p>
      </div>

      {/* Ontwerp selectie chips */}
      <div style={{ paddingLeft: 24, paddingTop: 14, paddingBottom: 14, overflowX: "auto" }} className="no-scrollbar">
        <div style={{ display: "flex", gap: 8, width: "max-content", paddingRight: 24 }}>
          {projecten.map((p) => {
            const isSel = geselecteerd.includes(p.id);
            const stijl = STYLES.find((s) => s.id === (p.stijl ?? p.style));
            return (
              <button
                key={p.id}
                onClick={() => wisselSelectie(p.id)}
                style={{
                  padding: "8px 14px",
                  borderRadius: 20,
                  border: "2px solid",
                  borderColor: isSel ? "#1c1917" : "#ece8e2",
                  background: isSel ? "#1c1917" : "#fff",
                  color: isSel ? "#fff" : "#1c1917",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontFamily: "inherit",
                  transition: "all 0.2s",
                }}
              >
                {stijl?.emoji} {p.naam ?? p.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Vergelijkingskaarten */}
      <div style={{ padding: "0 24px 32px", display: "flex", flexDirection: "column", gap: 20 }}>
        {vergelijkProjecten.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#9b9189" }}>
            <div style={{ fontSize: 44, marginBottom: 14 }}>🔍</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#1c1917", marginBottom: 6 }}>Selecteer ontwerpen</div>
            <div style={{ fontSize: 13 }}>Kies hierboven welke ontwerpen<br />je wil vergelijken</div>
          </div>
        )}

        {vergelijkProjecten.map((p, index) => {
          const stijlInfo = STYLES.find((s) => s.id === (p.stijl ?? p.style));
          const totaal = getTotaal(p);
          const meubels = (p.meubels ?? p.furniture ?? [])
            .map((id) => MEUBELS.find((m) => m.id === id))
            .filter(Boolean);
          const isFav = favorieten.includes(p.id);
          const isHuidig = focusId === p.id;
          const muurKleur = p.muurKleur ?? p.wallColor ?? "#f8f6f2";
          const vloerKleur = p.vloerKleur ?? p.floorColor ?? "#c8a96e";

          return (
            <div
              key={p.id}
              style={{
                background: "#fff",
                borderRadius: 24,
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                border: isHuidig ? "2px solid #5c7d63" : "2px solid transparent",
              }}
            >
              {/* Label balk */}
              <div style={{ padding: "12px 16px", background: isHuidig ? "#eaf1eb" : "#f7f5f2", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: isHuidig ? "#5c7d63" : "#9b9189", letterSpacing: 0.8 }}>
                  {isHuidig ? "★ HUIDIG ONTWERP" : `ONTWERP ${String.fromCharCode(65 + index)}`}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => handleFavoriet(p.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
                    <Heart size={18} fill={isFav ? "#e85d5d" : "none"} color={isFav ? "#e85d5d" : "#9b9189"} />
                  </button>
                  <button onClick={() => router.push(`/editor/${p.id}`)} style={{ background: "#1c1917", border: "none", borderRadius: 10, padding: "6px 12px", fontSize: 11, fontWeight: 700, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontFamily: "inherit" }}>
                    <Edit2 size={10} /> Bewerken
                  </button>
                </div>
              </div>

              {/* Kamerpreview */}
              <div style={{ padding: 16 }}>
                <RoomPreview
                  wallColor={muurKleur}
                  floorColor={vloerKleur}
                  style={(p.stijl ?? p.style) as string}
                  furnitureIds={p.meubels ?? p.furniture ?? []}
                  compact
                />
              </div>

              {/* Details */}
              <div style={{ padding: "0 16px 16px" }}>
                <div style={{ fontSize: 17, fontWeight: 800, color: "#1c1917", marginBottom: 10, letterSpacing: -0.3 }}>
                  {p.naam ?? p.name}
                </div>

                {/* Stijl + kleuren */}
                <div style={{ display: "flex", gap: 8, marginBottom: 14, alignItems: "center" }}>
                  <div style={{ padding: "5px 12px", background: "#f5f3ef", borderRadius: 20, fontSize: 12, fontWeight: 700, color: "#6b6460" }}>
                    {stijlInfo?.emoji} {p.stijl ?? p.style}
                  </div>
                  <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: muurKleur, border: "1.5px solid #ece8e2" }} title="Muurkleur" />
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: vloerKleur, border: "1.5px solid #ece8e2" }} title="Vloerkleur" />
                  </div>
                </div>

                {/* Meubels */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#9b9189", letterSpacing: 0.6, textTransform: "uppercase", marginBottom: 8 }}>
                    Meubels ({meubels.length})
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {meubels.map((m) => (
                      <div key={m!.id} style={{ padding: "4px 10px", background: "#f5f3ef", borderRadius: 10, fontSize: 11, color: "#6b6460", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                        {m!.emoji} {m!.naam}
                      </div>
                    ))}
                    {meubels.length === 0 && <div style={{ fontSize: 12, color: "#c0b8b0" }}>Geen meubels toegevoegd</div>}
                  </div>
                </div>

                {/* Totaalprijs */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "#f5f3ef", borderRadius: 14 }}>
                  <span style={{ fontSize: 13, color: "#6b6460", fontWeight: 600 }}>Totale schatting</span>
                  <span style={{ fontSize: 20, fontWeight: 800, color: "#1c1917" }}>€{totaal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function VergelijkPagina() {
  return <Suspense><VergelijkInhoud /></Suspense>;
}
