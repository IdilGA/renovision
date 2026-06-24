"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { getProjects, getFavorites } from "@/lib/store";

export default function ProfielPagina() {
  const router = useRouter();
  const [stats, setStats] = useState({ projecten: 0, favorieten: 0, meubels: 0 });

  useEffect(() => {
    const p = getProjects();
    setStats({
      projecten: p.length,
      favorieten: getFavorites().length,
      meubels: p.reduce((s, proj) => s + (proj.meubels ?? proj.furniture ?? []).length, 0),
    });
  }, []);

  function herstart() {
    localStorage.removeItem("renovision_onboarded");
    router.push("/onboarding");
  }

  const menuItems = [
    { label: "Stijlvoorkeuren", icoon: "🎨", actie: () => {} },
    { label: "Budgetinstellingen", icoon: "💰", actie: () => {} },
    { label: "Meldingsinstellingen", icoon: "🔔", actie: () => {} },
    { label: "Feedback geven", icoon: "💬", actie: () => {} },
    { label: "Introductie opnieuw bekijken", icoon: "▶️", actie: herstart },
  ];

  return (
    <div className="mobile-container">
      <div className="page-content">
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(160deg, #1c1917 0%, #2d2926 100%)",
            paddingTop: "calc(52px + env(safe-area-inset-top, 0px))",
            paddingBottom: 32,
            paddingLeft: 24,
            paddingRight: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 20,
                background: "linear-gradient(135deg, #5c7d63, #7da884)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
                flexShrink: 0,
              }}
            >
              🏡
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: -0.3 }}>Mijn profiel</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>Renovision ontwerper</div>
            </div>
          </div>

          {/* Statistieken */}
          <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 18, overflow: "hidden", display: "flex" }}>
            {[
              { label: "Ontwerpen", waarde: stats.projecten },
              { label: "Favorieten", waarde: stats.favorieten },
              { label: "Meubels", waarde: stats.meubels },
            ].map((s, i) => (
              <div key={s.label} style={{ flex: 1, padding: "16px 0", textAlign: "center", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#fff" }}>{s.waarde}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 2, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu */}
        <div style={{ padding: "20px 24px 0" }}>
          <div style={{ background: "#fff", borderRadius: 22, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
            {menuItems.map((item, i) => (
              <button
                key={item.label}
                onClick={item.actie}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "17px 18px",
                  background: "none",
                  border: "none",
                  borderBottom: i < menuItems.length - 1 ? "1px solid #f5f3ef" : "none",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "inherit",
                }}
              >
                <div style={{ width: 38, height: 38, borderRadius: 12, background: "#f5f3ef", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                  {item.icoon}
                </div>
                <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: "#1c1917" }}>{item.label}</span>
                <ChevronRight size={16} color="#c8c0b8" />
              </button>
            ))}
          </div>
        </div>

        {/* App info */}
        <div style={{ padding: "28px 24px 0", textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 6 }}>🏠</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#1c1917", letterSpacing: -0.2 }}>Renovision</div>
          <div style={{ fontSize: 12, color: "#9b9189", marginTop: 4 }}>Visualiseer jouw toekomstige woning · v1.0</div>
          <div style={{ fontSize: 11, color: "#c0b8b0", marginTop: 10 }}>Human-Centered Design schoolproject · 2024</div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}
