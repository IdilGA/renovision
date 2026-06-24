"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { ChevronLeft } from "lucide-react";
import StyleSelector from "@/components/StyleSelector";
import { Style } from "@/lib/data";

function StyleSelectContent() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id") || "new";
  const room = params.get("room") || "living";
  const name = params.get("name") || "My Room";
  const [selected, setSelected] = useState<Style | null>(null);

  function proceed() {
    if (!selected) return;
    router.push(`/editor/${id}?room=${room}&name=${encodeURIComponent(name)}&style=${selected}&fresh=1`);
  }

  return (
    <div className="mobile-container" style={{ minHeight: "100dvh", background: "#faf9f7" }}>
      {/* Header */}
      <div style={{ padding: "56px 24px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <button
          onClick={() => router.back()}
          style={{ background: "#fff", border: "none", borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
        >
          <ChevronLeft size={20} color="#1a1a1a" />
        </button>
        <div>
          <div style={{ fontSize: 11, color: "#9e9189", fontWeight: 500 }}>Step 2 of 3</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#1a1a1a", letterSpacing: -0.3 }}>Choose your style</h1>
        </div>
      </div>

      <div style={{ padding: "0 24px" }}>
        <p style={{ fontSize: 14, color: "#9e9189", marginBottom: 20, lineHeight: 1.5 }}>
          Your style guides the furniture suggestions and color palette for your room.
        </p>
        <StyleSelector selected={selected} onSelect={setSelected} />
      </div>

      <div style={{ padding: "24px 24px 48px" }}>
        <button
          onClick={proceed}
          disabled={!selected}
          style={{
            width: "100%",
            padding: "18px",
            background: selected ? "#1a1a1a" : "#e8e4de",
            color: selected ? "#fff" : "#9e9189",
            border: "none",
            borderRadius: 18,
            fontSize: 17,
            fontWeight: 700,
            cursor: selected ? "pointer" : "default",
            transition: "all 0.2s",
          }}
        >
          Start designing
        </button>
      </div>
    </div>
  );
}

export default function StyleSelectPage() {
  return (
    <Suspense>
      <StyleSelectContent />
    </Suspense>
  );
}
