"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const slides = [
  {
    emoji: "🏠",
    titel: "Visualiseer jouw toekomstige woning",
    beschrijving: "Zie precies hoe jouw gerenoveerde kamer eruitziet voordat je ook maar één euro uitgeeft.",
    kleur: "linear-gradient(135deg, #eaf1eb, #f0ebe3)",
  },
  {
    emoji: "🛋️",
    titel: "Combineer meubels van elke winkel",
    beschrijving: "Meng producten van IKEA, JYSK, H&M Home en meer in één ruimteoverzicht.",
    kleur: "linear-gradient(135deg, #ede8df, #f7f5f2)",
  },
  {
    emoji: "🎨",
    titel: "Vind jouw perfecte stijl",
    beschrijving: "Verken Japandi, Scandinavisch, Modern en meer met echte kleurpaletten.",
    kleur: "linear-gradient(135deg, #e8eef5, #f0ebe3)",
  },
  {
    emoji: "✨",
    titel: "Vergelijk en beslis met vertrouwen",
    beschrijving: "Sla meerdere ontwerpen op, vergelijk ze naast elkaar en kies wat jij mooi vindt.",
    kleur: "linear-gradient(135deg, #f5f0e8, #eaf1eb)",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [stap, setStap] = useState(0);

  function volgende() {
    if (stap < slides.length - 1) setStap(stap + 1);
    else {
      localStorage.setItem("renovision_onboarded", "1");
      router.push("/home");
    }
  }

  function overslaan() {
    localStorage.setItem("renovision_onboarded", "1");
    router.push("/home");
  }

  const slide = slides[stap];
  const isLaatste = stap === slides.length - 1;

  return (
    <div
      className="mobile-container"
      style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", background: "#f7f5f2" }}
    >
      {/* Overslaan */}
      <div style={{ padding: "20px 24px 0", display: "flex", justifyContent: "flex-end" }}>
        {!isLaatste && (
          <button
            onClick={overslaan}
            style={{ background: "none", border: "none", fontSize: 14, color: "#9b9189", cursor: "pointer", padding: "8px 4px", fontWeight: 600 }}
          >
            Overslaan
          </button>
        )}
      </div>

      {/* Illustratie */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 32px" }}>
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: 40,
            background: slide.kleur,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 88,
            marginBottom: 48,
            boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
            transition: "all 0.4s ease",
          }}
        >
          {slide.emoji}
        </div>

        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#1c1917",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: 16,
            letterSpacing: -0.5,
          }}
        >
          {slide.titel}
        </h1>
        <p style={{ fontSize: 16, color: "#6b6460", textAlign: "center", lineHeight: 1.65, maxWidth: 300 }}>
          {slide.beschrijving}
        </p>
      </div>

      {/* Onderaan */}
      <div style={{ padding: "0 24px 48px" }}>
        {/* Voortgangsdots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 28 }}>
          {slides.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === stap ? 28 : 8,
                height: 8,
                borderRadius: 4,
                background: i === stap ? "#5c7d63" : "#d8d0c8",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        <button
          onClick={volgende}
          style={{
            width: "100%",
            padding: "19px",
            background: "#1c1917",
            color: "#fff",
            border: "none",
            borderRadius: 18,
            fontSize: 17,
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: -0.2,
          }}
        >
          {isLaatste ? "Begin met ontwerpen ✨" : "Volgende"}
        </button>

        {stap === 0 && (
          <p style={{ textAlign: "center", fontSize: 12, color: "#c0b8b0", marginTop: 16 }}>
            Geen account nodig · Gratis te gebruiken
          </p>
        )}
      </div>
    </div>
  );
}
