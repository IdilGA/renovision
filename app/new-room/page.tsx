"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, Suspense } from "react";
import { ChevronLeft, Camera, Upload, ArrowRight, X } from "lucide-react";
import { resizeImage, saveRoomPhoto } from "@/lib/store";

const KAMER_TYPES = [
  { id: "woonkamer", label: "Woonkamer", emoji: "🛋️", omschrijving: "Bank, salontafel, vloerkleed" },
  { id: "slaapkamer", label: "Slaapkamer", emoji: "🛏️", omschrijving: "Bed, nachtkastjes, kledingkast" },
  { id: "eetkamer", label: "Eetkamer", emoji: "🍽️", omschrijving: "Eettafel, stoelen, dressoir" },
  { id: "werkkamer", label: "Werkkamer / Kantoor", emoji: "📚", omschrijving: "Bureau, boekenkast, stoel" },
  { id: "hal", label: "Hal / Gang", emoji: "🚪", omschrijving: "Schoenenrek, spiegel, kapstok" },
];

function KamerToevoegen() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id") || "new";
  const [geselecteerd, setGeselecteerd] = useState<string | null>(null);
  const [kamerNaam, setKamerNaam] = useState("");
  const [foto, setFoto] = useState<string | null>(null);
  const [laden, setLaden] = useState(false);

  const cameraRef = useRef<HTMLInputElement>(null);
  const uploadRef = useRef<HTMLInputElement>(null);

  async function verwerkBestand(bestand: File | undefined) {
    if (!bestand) return;
    setLaden(true);
    try {
      const dataUrl = await resizeImage(bestand);
      setFoto(dataUrl);
    } finally {
      setLaden(false);
    }
  }

  function doorgaan(type: string) {
    const naam = kamerNaam || KAMER_TYPES.find((r) => r.id === type)?.label || "Mijn Kamer";
    if (foto) saveRoomPhoto(id, foto);
    router.push(`/style-select?id=${id}&room=${type}&name=${encodeURIComponent(naam)}`);
  }

  return (
    <div className="mobile-container" style={{ minHeight: "100dvh", background: "#f7f5f2" }}>
      {/* Verborgen inputs */}
      <input ref={cameraRef} type="file" accept="image/*" capture="environment" style={{ display: "none" }} onChange={(e) => verwerkBestand(e.target.files?.[0])} />
      <input ref={uploadRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => verwerkBestand(e.target.files?.[0])} />

      {/* Header */}
      <div style={{ padding: "56px 24px 20px", background: "#fff", borderBottom: "1px solid #ece8e2", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={() => router.back()} style={{ background: "#f5f3ef", border: "none", borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
          <ChevronLeft size={20} color="#1c1917" />
        </button>
        <div>
          <div style={{ fontSize: 11, color: "#9b9189", fontWeight: 700, letterSpacing: 0.6 }}>STAP 1 VAN 3</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#1c1917", letterSpacing: -0.3 }}>Kamer toevoegen</h1>
        </div>
      </div>

      <div style={{ padding: "20px 24px" }}>
        {/* Kamernaam */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: "#9b9189", letterSpacing: 0.6, textTransform: "uppercase", display: "block", marginBottom: 10 }}>
            Naam van jouw kamer (optioneel)
          </label>
          <input
            value={kamerNaam}
            onChange={(e) => setKamerNaam(e.target.value)}
            placeholder="bijv. Mijn woonkamer..."
            style={{ width: "100%", padding: "15px 16px", background: "#fff", border: "1.5px solid #ece8e2", borderRadius: 16, fontSize: 15, color: "#1c1917", outline: "none", fontFamily: "inherit" }}
          />
        </div>

        {/* Foto sectie */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: "#9b9189", letterSpacing: 0.6, textTransform: "uppercase", display: "block", marginBottom: 12 }}>
            Voeg een foto toe van jouw kamer (optioneel)
          </label>

          {foto ? (
            <div style={{ position: "relative", borderRadius: 20, overflow: "hidden" }}>
              <img src={foto} alt="Kamer" style={{ width: "100%", height: 210, objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 45%)" }} />
              <div style={{ position: "absolute", bottom: 14, left: 16, color: "#fff", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 16 }}>✓</span> Foto toegevoegd
              </div>
              <button onClick={() => setFoto(null)} style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.55)", border: "none", borderRadius: "50%", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <X size={16} color="#fff" />
              </button>
              <button onClick={() => cameraRef.current?.click()} style={{ position: "absolute", bottom: 14, right: 14, background: "rgba(255,255,255,0.92)", border: "none", borderRadius: 12, padding: "7px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: "#1c1917", fontFamily: "inherit" }}>
                <Camera size={13} /> Opnieuw
              </button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { ref: cameraRef, icoon: Camera, label: "Foto maken", sub: "Open camera", kleur: "#eaf1eb", icoonKleur: "#5c7d63" },
                { ref: uploadRef, icoon: Upload, label: "Foto uploaden", sub: "Uit galerij", kleur: "#f0ebe3", icoonKleur: "#8b6a50" },
              ].map(({ ref, icoon: Icon, label, sub, kleur, icoonKleur }) => (
                <button
                  key={label}
                  onClick={() => ref.current?.click()}
                  disabled={laden}
                  style={{ background: "#fff", border: "1.5px dashed #d8d0c8", borderRadius: 20, padding: "24px 12px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, cursor: "pointer" }}
                >
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: kleur, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={24} color={icoonKleur} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#1c1917" }}>{label}</div>
                    <div style={{ fontSize: 11, color: "#9b9189", marginTop: 2 }}>{sub}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
          {laden && <p style={{ textAlign: "center", padding: "10px 0", fontSize: 13, color: "#9b9189", fontWeight: 500 }}>Foto verwerken...</p>}
        </div>

        {/* Kamer types */}
        <div>
          <label style={{ fontSize: 11, fontWeight: 700, color: "#9b9189", letterSpacing: 0.6, textTransform: "uppercase", display: "block", marginBottom: 12 }}>
            Kies het type kamer
          </label>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {KAMER_TYPES.map((kamer) => {
              const isSel = geselecteerd === kamer.id;
              return (
                <button
                  key={kamer.id}
                  onClick={() => setGeselecteerd(kamer.id)}
                  style={{
                    background: isSel ? "#1c1917" : "#fff",
                    border: "2px solid",
                    borderColor: isSel ? "#1c1917" : "#ece8e2",
                    borderRadius: 18,
                    padding: "15px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s",
                    width: "100%",
                    fontFamily: "inherit",
                  }}
                >
                  <span style={{ fontSize: 28 }}>{kamer.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: isSel ? "#fff" : "#1c1917" }}>{kamer.label}</div>
                    <div style={{ fontSize: 12, color: isSel ? "rgba(255,255,255,0.55)" : "#9b9189", marginTop: 2 }}>{kamer.omschrijving}</div>
                  </div>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", border: isSel ? "none" : "2px solid #ddd8d2", background: isSel ? "#5c7d63" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {isSel && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Doorgaan knop */}
      <div style={{ padding: "8px 24px 48px" }}>
        <button
          onClick={() => geselecteerd && doorgaan(geselecteerd)}
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            fontFamily: "inherit",
          }}
        >
          Kies jouw stijl <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default function KamerToevoegPagina() {
  return <Suspense><KamerToevoegen /></Suspense>;
}
