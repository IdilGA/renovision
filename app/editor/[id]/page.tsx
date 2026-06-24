"use client";
import { useEffect, useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { ChevronLeft, Save, GitCompare, Plus, Palette, Layers, Camera, ImagePlus, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FurnitureCard from "@/components/FurnitureCard";
import ColorPicker from "@/components/ColorPicker";
import RoomPreview from "@/components/RoomPreview";
import StyleSelector from "@/components/StyleSelector";
import { MEUBELS, WALL_COLORS, FLOOR_COLORS, Categorie, Stijl } from "@/lib/data";
import { getProjects, saveProject, getRoomPhoto, saveRoomPhoto, deleteRoomPhoto, resizeImage } from "@/lib/store";

const CATEGORIEEN: Categorie[] = ["Banken", "Tafels", "Stoelen", "Verlichting", "Decoratie", "Planten"];

type Paneel = "meubels" | "kleuren" | "stijl";

function EditorInhoud() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;

  const [naam, setNaam] = useState("Mijn Kamer");
  const [stijl, setStijl] = useState<Stijl>("Japandi");
  const [muurKleur, setMuurKleur] = useState("#f8f6f2");
  const [vloerKleur, setVloerKleur] = useState("#c8a96e");
  const [meubelsIds, setMeubelsIds] = useState<string[]>([]);
  const [actieefPaneel, setActieefPaneel] = useState<Paneel>("meubels");
  const [actieveCategorie, setActieveCategorie] = useState<Categorie>("Banken");
  const [opgeslagen, setOpgeslagen] = useState(false);
  const [foto, setFoto] = useState<string | null>(null);

  const cameraRef = useRef<HTMLInputElement>(null);
  const uploadRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const isFresh = searchParams.get("fresh") === "1";
    if (isFresh) {
      const urlStijl = searchParams.get("style") as Stijl | null;
      const urlNaam = searchParams.get("name");
      if (urlStijl) setStijl(urlStijl);
      if (urlNaam) setNaam(decodeURIComponent(urlNaam));
    } else {
      const projecten = getProjects();
      const project = projecten.find((p) => p.id === id);
      if (project) {
        setNaam(project.naam ?? project.name ?? "Mijn Kamer");
        setStijl((project.stijl ?? project.style) as Stijl);
        setMuurKleur(project.muurKleur ?? project.wallColor ?? "#f8f6f2");
        setVloerKleur(project.vloerKleur ?? project.floorColor ?? "#c8a96e");
        setMeubelsIds(project.meubels ?? project.furniture ?? []);
      }
    }
    setFoto(getRoomPhoto(id));
  }, [id, searchParams]);

  async function handleFotoBestand(bestand: File | undefined) {
    if (!bestand) return;
    const dataUrl = await resizeImage(bestand);
    saveRoomPhoto(id, dataUrl);
    setFoto(dataUrl);
  }

  function verwijderFoto() {
    deleteRoomPhoto(id);
    setFoto(null);
  }

  function wisselMeubel(mid: string) {
    setMeubelsIds((prev) =>
      prev.includes(mid) ? prev.filter((x) => x !== mid) : [...prev, mid]
    );
  }

  function verwijderMeubel(mid: string) {
    setMeubelsIds((prev) => prev.filter((x) => x !== mid));
  }

  function opslaan() {
    saveProject({
      id,
      naam,
      stijl,
      muurKleur,
      vloerKleur,
      meubels: meubelsIds,
      aangemaakt: new Date().toISOString().split("T")[0],
      name: naam,
      style: stijl,
      wallColor: muurKleur,
      floorColor: vloerKleur,
      furniture: meubelsIds,
      createdAt: new Date().toISOString().split("T")[0],
    });
    setOpgeslagen(true);
    setTimeout(() => setOpgeslagen(false), 2500);
  }

  function naarVergelijken() {
    opslaan();
    router.push(`/compare?focus=${id}`);
  }

  const gefilterdeMenubels = MEUBELS.filter((m) => m.categorie === actieveCategorie);
  const totaalPrijs = meubelsIds
    .map((mid) => MEUBELS.find((m) => m.id === mid)?.prijs ?? 0)
    .reduce((a, b) => a + b, 0);

  return (
    <div className="mobile-container" style={{ minHeight: "100dvh", background: "#f7f5f2", display: "flex", flexDirection: "column" }}>
      {/* Verborgen bestandsinputs */}
      <input ref={cameraRef} type="file" accept="image/*" capture="environment" style={{ display: "none" }} onChange={(e) => handleFotoBestand(e.target.files?.[0])} />
      <input ref={uploadRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFotoBestand(e.target.files?.[0])} />

      {/* Header */}
      <div style={{ padding: "56px 20px 14px", background: "#fff", borderBottom: "1px solid #ece8e2", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <button onClick={() => router.back()} style={{ background: "#f5f3ef", border: "none", borderRadius: "50%", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
          <ChevronLeft size={18} color="#1c1917" />
        </button>
        <input
          value={naam}
          onChange={(e) => setNaam(e.target.value)}
          style={{ flex: 1, fontSize: 17, fontWeight: 700, color: "#1c1917", border: "none", background: "none", outline: "none", fontFamily: "inherit" }}
        />
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <button onClick={naarVergelijken} style={{ background: "#f5f3ef", border: "none", borderRadius: 12, padding: "8px 12px", display: "flex", alignItems: "center", gap: 5, cursor: "pointer", fontSize: 12, fontWeight: 700, color: "#1c1917", fontFamily: "inherit" }}>
            <GitCompare size={14} /> Vergelijk
          </button>
          <button onClick={opslaan} style={{ background: opgeslagen ? "#5c7d63" : "#1c1917", border: "none", borderRadius: 12, padding: "8px 14px", display: "flex", alignItems: "center", gap: 5, cursor: "pointer", fontSize: 12, fontWeight: 700, color: "#fff", transition: "background 0.3s", fontFamily: "inherit" }}>
            {opgeslagen ? <Check size={14} strokeWidth={3} /> : <Save size={14} />}
            {opgeslagen ? "Opgeslagen!" : "Opslaan"}
          </button>
        </div>
      </div>

      {/* Kamerpreview */}
      <div style={{ padding: "16px 20px", flexShrink: 0 }}>
        <RoomPreview
          wallColor={muurKleur}
          floorColor={vloerKleur}
          style={stijl}
          furnitureIds={meubelsIds}
          onRemove={verwijderMeubel}
          photo={foto}
        />
        {/* Foto + prijs balk */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
          <div style={{ fontSize: 12, color: "#9b9189", fontWeight: 500 }}>
            {meubelsIds.length} meubels · <span style={{ color: "#1c1917", fontWeight: 700 }}>€{totaalPrijs.toLocaleString()}</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {foto ? (
              <>
                <button onClick={() => cameraRef.current?.click()} style={{ background: "#fff", border: "1.5px solid #ece8e2", borderRadius: 10, padding: "6px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: "#1c1917", fontFamily: "inherit" }}>
                  <Camera size={11} /> Opnieuw
                </button>
                <button onClick={verwijderFoto} style={{ background: "#fff", border: "1.5px solid #ece8e2", borderRadius: 10, padding: "6px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", color: "#c0504d", fontFamily: "inherit" }}>
                  Foto verwijderen
                </button>
              </>
            ) : (
              <>
                <button onClick={() => cameraRef.current?.click()} style={{ background: "#fff", border: "1.5px solid #ece8e2", borderRadius: 10, padding: "6px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: "#1c1917", fontFamily: "inherit" }}>
                  <Camera size={11} /> Camera
                </button>
                <button onClick={() => uploadRef.current?.click()} style={{ background: "#fff", border: "1.5px solid #ece8e2", borderRadius: 10, padding: "6px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: "#1c1917", fontFamily: "inherit" }}>
                  <ImagePlus size={11} /> Upload
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Paneelwisselaar */}
      <div style={{ padding: "0 20px 12px", flexShrink: 0 }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: 4, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
          {([
            { key: "meubels", label: "Meubels", icoon: <Plus size={13} strokeWidth={2.5} /> },
            { key: "kleuren", label: "Kleuren", icoon: <Palette size={13} /> },
            { key: "stijl", label: "Stijl", icoon: <Layers size={13} /> },
          ] as { key: Paneel; label: string; icoon: React.ReactNode }[]).map((p) => (
            <button
              key={p.key}
              onClick={() => setActieefPaneel(p.key)}
              style={{
                padding: "10px 0",
                border: "none",
                borderRadius: 12,
                background: actieefPaneel === p.key ? "#1c1917" : "none",
                color: actieefPaneel === p.key ? "#fff" : "#9b9189",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                transition: "all 0.2s",
                fontFamily: "inherit",
              }}
            >
              {p.icoon} {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollbaar paneel */}
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 24px" }} className="no-scrollbar">
        <AnimatePresence mode="wait">

          {actieefPaneel === "meubels" && (
            <motion.div key="meubels" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} transition={{ duration: 0.22 }}>
              <div style={{ overflowX: "auto", marginBottom: 14 }} className="no-scrollbar">
                <div style={{ display: "flex", gap: 8, width: "max-content" }}>
                  {CATEGORIEEN.map((cat) => (
                    <motion.button
                      key={cat}
                      onClick={() => setActieveCategorie(cat)}
                      whileTap={{ scale: 0.93 }}
                      style={{
                        padding: "8px 16px", borderRadius: 20, border: "none",
                        background: actieveCategorie === cat ? "#5c7d63" : "#fff",
                        color: actieveCategorie === cat ? "#fff" : "#6b6460",
                        fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap",
                        boxShadow: "0 1px 6px rgba(0,0,0,0.06)", fontFamily: "inherit",
                        transition: "background 0.2s, color 0.2s",
                      }}
                    >
                      {cat}
                    </motion.button>
                  ))}
                </div>
              </div>
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={actieveCategorie}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
                >
                  {gefilterdeMenubels.map((item, i) => (
                    <FurnitureCard
                      key={item.id}
                      item={item}
                      index={i}
                      added={meubelsIds.includes(item.id)}
                      onAdd={() => wisselMeubel(item.id)}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}

          {actieefPaneel === "kleuren" && (
            <motion.div key="kleuren" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} transition={{ duration: 0.22 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {foto && (
                  <div style={{ padding: "14px 16px", background: "#eaf1eb", borderRadius: 14, fontSize: 13, color: "#3d5c43", fontWeight: 600, lineHeight: 1.5 }}>
                    🎨 Kleuren zijn zichtbaar zonder roomfoto. Verwijder jouw foto om muur- & vloerkleuren te zien.
                  </div>
                )}
                <ColorPicker label="Muurkleur" colors={WALL_COLORS} selected={muurKleur} onSelect={setMuurKleur} />
                <ColorPicker label="Vloerkleur" colors={FLOOR_COLORS} selected={vloerKleur} onSelect={setVloerKleur} />
              </div>
            </motion.div>
          )}

          {actieefPaneel === "stijl" && (
            <motion.div key="stijl" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} transition={{ duration: 0.22 }}>
              <StyleSelector selected={stijl} onSelect={setStijl} />
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

export default function EditorPagina() {
  return <Suspense><EditorInhoud /></Suspense>;
}
