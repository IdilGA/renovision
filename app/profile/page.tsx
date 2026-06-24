"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Trash2, RefreshCw } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { getProjects, getFavorites } from "@/lib/store";

export default function ProfilePage() {
  const router = useRouter();
  const [stats, setStats] = useState({ projects: 0, favorites: 0, furniture: 0 });

  useEffect(() => {
    const p = getProjects();
    setStats({
      projects: p.length,
      favorites: getFavorites().length,
      furniture: p.reduce((s, proj) => s + proj.furniture.length, 0),
    });
  }, []);

  function resetOnboarding() {
    localStorage.removeItem("renovision_onboarded");
    router.push("/onboarding");
  }

  const menuItems = [
    { label: "Style preferences", icon: "🎨", action: () => {} },
    { label: "Budget settings", icon: "💰", action: () => {} },
    { label: "Notification settings", icon: "🔔", action: () => {} },
    { label: "Share feedback", icon: "💬", action: () => {} },
    { label: "Watch intro again", icon: "▶️", action: resetOnboarding },
  ];

  return (
    <div className="mobile-container">
      <div className="page-content">
        {/* Profile header */}
        <div
          style={{
            background: "linear-gradient(160deg, #1a1a1a 0%, #2d2d2d 100%)",
            padding: "60px 24px 32px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #6b8f71, #8fb89a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                flexShrink: 0,
              }}
            >
              🏡
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>My Profile</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>Renovision designer</div>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 0, marginTop: 28, background: "rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden" }}>
            {[
              { label: "Designs", value: stats.projects },
              { label: "Favorites", value: stats.favorites },
              { label: "Furniture", value: stats.furniture },
            ].map((s, i) => (
              <div key={s.label} style={{ flex: 1, padding: "14px 0", textAlign: "center", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu */}
        <div style={{ padding: "24px 24px 0" }}>
          <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
            {menuItems.map((item, i) => (
              <button
                key={item.label}
                onClick={item.action}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "16px 18px",
                  background: "none",
                  border: "none",
                  borderBottom: i < menuItems.length - 1 ? "1px solid #f0ece4" : "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <span style={{ flex: 1, fontSize: 15, fontWeight: 500, color: "#1a1a1a" }}>{item.label}</span>
                <ChevronRight size={16} color="#c8c0b8" />
              </button>
            ))}
          </div>
        </div>

        {/* App info */}
        <div style={{ padding: "24px 24px 0", textAlign: "center" }}>
          <div style={{ fontSize: 24, marginBottom: 6 }}>🏠</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>Renovision</div>
          <div style={{ fontSize: 12, color: "#9e9189", marginTop: 2 }}>Visualize your future home · v1.0</div>
          <div style={{ fontSize: 11, color: "#c0b8b0", marginTop: 12 }}>Human-Centered Design project · 2024</div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}
