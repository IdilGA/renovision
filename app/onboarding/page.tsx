"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const slides = [
  {
    emoji: "🏠",
    title: "Visualize your future home",
    desc: "See exactly how your renovated room will look before spending a single euro.",
  },
  {
    emoji: "🛋️",
    title: "Mix furniture from any store",
    desc: "Combine pieces from IKEA, JYSK, H&M Home and more in one single room view.",
  },
  {
    emoji: "🎨",
    title: "Find your perfect style",
    desc: "Explore Japandi, Scandinavian, Modern and more with real color palettes.",
  },
  {
    emoji: "✨",
    title: "Compare and decide with confidence",
    desc: "Save multiple designs, compare them side by side, and pick what you love.",
  },
];

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  function next() {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.setItem("renovision_onboarded", "1");
      router.push("/home");
    }
  }

  function skip() {
    localStorage.setItem("renovision_onboarded", "1");
    router.push("/home");
  }

  const slide = slides[step];
  const isLast = step === slides.length - 1;

  return (
    <div
      className="mobile-container"
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        background: "#faf9f7",
      }}
    >
      {/* Skip */}
      <div style={{ padding: "20px 24px 0", display: "flex", justifyContent: "flex-end" }}>
        {!isLast && (
          <button
            onClick={skip}
            style={{
              background: "none",
              border: "none",
              fontSize: 14,
              color: "#9e9189",
              cursor: "pointer",
              padding: "8px 0",
              fontWeight: 500,
            }}
          >
            Skip
          </button>
        )}
      </div>

      {/* Illustration */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 32px" }}>
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #e8f0e9, #f0ebe3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 80,
            marginBottom: 48,
            boxShadow: "0 20px 60px rgba(107,143,113,0.15)",
          }}
        >
          {slide.emoji}
        </div>

        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#1a1a1a",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: 16,
            letterSpacing: -0.5,
          }}
        >
          {slide.title}
        </h1>
        <p style={{ fontSize: 16, color: "#6b6460", textAlign: "center", lineHeight: 1.6, maxWidth: 300 }}>
          {slide.desc}
        </p>
      </div>

      {/* Bottom */}
      <div style={{ padding: "0 24px 48px" }}>
        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 32 }}>
          {slides.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === step ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: i === step ? "#6b8f71" : "#d8d0c8",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          style={{
            width: "100%",
            padding: "18px",
            background: "#1a1a1a",
            color: "#fff",
            border: "none",
            borderRadius: 18,
            fontSize: 17,
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: -0.3,
          }}
        >
          {isLast ? "Start designing ✨" : "Continue"}
        </button>
      </div>
    </div>
  );
}
