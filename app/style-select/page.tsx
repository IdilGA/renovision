"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { ChevronLeft } from "lucide-react";
import StyleSelector from "@/components/StyleSelector";
import { Stijl } from "@/lib/data";

function StijlKiezen() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id") || "new";
  const room = params.get("room") || "living";
  const name = params.get("name") || "Mijn Kamer";
  const [geselecteerd, setGeselecteerd] = useState<Stijl | null>(null);

  function doorgaan() {
    if (!geselecteerd) return;
    router.push(`/editor/${id}?room=${room}&name=${encodeURIComponent(name)}&style=${geselecteerd}&fresh=1`);
  }

  return (
    <div className="mobile-container" style={{ minHeight: "100dvh", background: "#f7f5f2" }}>
      {/* Header */}
      <div style={{ padding: "56px 24px 20px", background: "#fff", borderBottom: "1px solid #ece8e2", display: "flex", alignItems: "center", gap: 12 }}>
        <button
          onClick={() => router.back()}
          style={{ background: "#f5f3ef", border: "none", borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
        >
          <ChevronLeft size={20} color="#1c1917" />
        </button>
        <div>
          <div style={{ fontSize: 11, color: "#9b9189", fontWeight: 600, letterSpacing: 0.5 }}>STAP 2 VAN 3</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#1c1917", letterSpacing: -0.3 }}>Kies jouw stijl</h1>
        </div>
      </div>

      <div style={{ padding: "20px 24px 0" }}>
        <p style={{ fontSize: 14, color: "#9b9189", marginBottom: 20, lineHeight: 1.6 }}>
          Jouw stijl bepaalt de meubelssuggesties en het kleurpalet voor jouw kamer.
        </p>
        <StyleSelector selected={geselecteerd} onSelect={setGeselecteerd} />
      </div>

      <div style={{ padding: "24px 24px 48px" }}>
        <button
          onClick={doorgaan}
          disabled={!geselecteerd}
          style={{
            width: "100%",
            padding: "19px",
            background: geselecteerd ? "#1c1917" : "#ece8e2",
            color: geselecteerd ? "#fff" : "#9b9189",
            border: "none",
            borderRadius: 18,
            fontSize: 17,
            fontWeight: 700,
            cursor: geselecteerd ? "pointer" : "default",
            transition: "all 0.2s",
            fontFamily: "inherit",
          }}
        >
          Begin met ontwerpen
        </button>
      </div>
    </div>
  );
}

export default function StijlSelectPagina() {
  return <Suspense><StijlKiezen /></Suspense>;
}
