"use client";
import { useEffect, useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { ChevronLeft, GitCompare, Plus, Palette, Layers, Camera, ImagePlus, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FurnitureCard from "@/components/FurnitureCard";
import ColorPicker from "@/components/ColorPicker";
import RoomPreview from "@/components/RoomPreview";
import StyleSelector from "@/components/StyleSelector";
import Toast, { useToast } from "@/components/Toast";
import { MEUBELS, WALL_COLORS, FLOOR_COLORS, Categorie, Stijl } from "@/lib/data";
import { getProjects, saveProject, getRoomPhoto, saveRoomPhoto, deleteRoomPhoto, resizeImage } from "@/lib/store";

const CATEGORIEEN: Categorie[] = ["Banken", "Tafels", "Stoelen", "Verlichting", "Decoratie", "Planten"];

type Paneel = "meubels" | "kleuren" | "stijl";

function EditorInhoud() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const toast = useToast();

  const [naam, setNaam] = useState("Mijn Kamer");
  const [stijl, setStijl] = useState<Stijl>("Japandi");
  const [muurKleur, setMuurKleur] = useState("#f8f6f2");
  const [vloerKleur, setVloerKleur] = useState("#c8a96e");
  const [meubelsIds, setMeubelsIds] = useState<string[]>([]);
  const [actieefPaneel, setActieefPaneel] = useState<Paneel>("meubels");
  const [actieveCategorie, setActieveCategorie] = useState<Categorie>("Banken");
  const [foto, setFoto] = useState<string | null>(null);
  const [naamFocus, setNaamFocus] = useState(false);
  const [fotoLaden, setFotoLaden] = useState(false);

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

  // Auto-save on furniture change (debounced)
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    if (meubelsIds.length === 0) return;
    clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      saveProject({ id, naam, stijl, muurKleur, vloerKleur, meubels: meubelsIds, aangemaakt: new Date().toISOString().split("T")[0], name: naam, style: stijl, wallColor: muurKleur, floorColor: vloerKleur, furniture: meubelsIds, createdAt: new Date().toISOString().split("T")[0] });
    }, 800);
    return () => clearTimeout(autoSaveTimer.current);
  }, [meubelsIds]); // eslint-disable-line

  async function handleFotoBestand(bestand: File | undefined) {
    if (!bestand) return;
    setFotoLaden(true);
    try {
      const dataUrl = await resizeImage(bestand);
      saveRoomPhoto(id, dataUrl);
      setFoto(dataUrl);
      toast.show("Foto toegevoegd aan jouw kamer!", "success");
    } finally {
      setFotoLaden(false);
    }
  }

  function verwijderFoto() {
    deleteRoomPhoto(id);
    setFoto(null);
    toast.show("Foto verwijderd", "info");
  }

  function wisselMeubel(mid: string) {
    const wordtToegevoegd = !meubelsIds.includes(mid);
    setMeubelsIds((prev) =>
      prev.includes(mid) ? prev.filter((x) => x !== mid) : [...prev, mid]
    );
    if (wordtToegevoegd) {
      const meubel = MEUBELS.find((m) => m.id === mid);
      toast.show(`${meubel?.naam ?? "Meubel"} toegevoegd!`, "success");
    }
  }

  function verwijderMeubel(mid: string) {
    setMeubelsIds((prev) => prev.filter((x) => x !== mid));
    const meubel = MEUBELS.find((m) => m.id === mid);
    toast.show(`${meubel?.naam ?? "Meubel"} verwijderd`, "info");
  }

  function opslaan() {
    saveProject({ id, naam, stijl, muurKleur, vloerKleur, meubels: meubelsIds, aangemaakt: new Date().toISOString().split("T")[0], name: naam, style: stijl, wallColor: muurKleur, floorColor: vloerKleur, furniture: meubelsIds, createdAt: new Date().toISOString().split("T")[0] });
    toast.show("Ontwerp opgeslagen! ✓", "success");
  }

  function naarVergelijken() {
    opslaan();
    router.push(`/compare?focus=${id}`);
  }

  const gefilterdeMenubels = MEUBELS.filter((m) => m.categorie === actieveCategorie);
  const totaalPrijs = meubelsIds.map((mid) => MEUBELS.find((m) => m.id === mid)?.prijs ?? 0).reduce((a, b) => a + b, 0);

  const paneelTabs = [
    { key: "meubels" as Paneel, label: "Meubels", icoon: <Plus size={13} strokeWidth={2.5} /> },
    { key: "kleuren" as Paneel, label: "Kleuren", icoon: <Palette size={13} /> },
    { key: "stijl" as Paneel, label: "Stijl", icoon: <Layers size={13} /> },
  ];

  return (
    <div
      className="mobile-container"
      style={{ minHeight: "100dvh", background: "#f7f5f2", display: "flex", flexDirection: "column" }}
    >
      {/* Hidden file inputs */}
      <input ref={cameraRef} type="file" accept="image/*" capture="environment" style={{ display: "none" }} onChange={(e) => handleFotoBestand(e.target.files?.[0])} />
      <input ref={uploadRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFotoBestand(e.target.files?.[0])} />

      {/* Header — safe area top */}
      <div
        style={{
          paddingTop: "calc(52px + env(safe-area-inset-top, 0px))",
          paddingBottom: 12,
          paddingLeft: 16,
          paddingRight: 16,
          background: "#fff",
          borderBottom: "1px solid #ece8e2",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <motion.button
            onClick={() => router.back()}
            whileTap={{ scale: 0.9 }}
            style={{ background: "#f5f3ef", border: "none", borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
          >
            <ChevronLeft size={18} color="#1c1917" />
          </motion.button>

          {/* Editable room name */}
          <div style={{ flex: 1, position: "relative" }}>
            <input
              value={naam}
              onChange={(e) => setNaam(e.target.value)}
              onFocus={() => setNaamFocus(true)}
              onBlur={() => setNaamFocus(false)}
              placeholder="Naam van jouw kamer"
              style={{
                width: "100%",
                fontSize: 17,
                fontWeight: 700,
                color: "#1c1917",
                border: "none",
                borderBottom: naamFocus ? "2px solid #5c7d63" : "2px solid transparent",
                background: "none",
                outline: "none",
                fontFamily: "inherit",
                paddingBottom: 2,
                transition: "border-color 0.2s",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <motion.button
              onClick={naarVergelijken}
              whileTap={{ scale: 0.92 }}
              style={{ background: "#f5f3ef", border: "none", borderRadius: 12, padding: "10px 12px", minHeight: 40, display: "flex", alignItems: "center", gap: 5, cursor: "pointer", fontSize: 12, fontWeight: 700, color: "#1c1917", fontFamily: "inherit" }}
            >
              <GitCompare size={14} /> Vergelijk
            </motion.button>
            <motion.button
              onClick={opslaan}
              whileTap={{ scale: 0.92 }}
              style={{ background: "#5c7d63", border: "none", borderRadius: 12, padding: "10px 14px", minHeight: 40, display: "flex", alignItems: "center", gap: 5, cursor: "pointer", fontSize: 12, fontWeight: 700, color: "#fff", fontFamily: "inherit" }}
            >
              Opslaan
            </motion.button>
          </div>
        </div>
      </div>

      {/* Room preview */}
      <div style={{ padding: "14px 16px 0", flexShrink: 0 }}>
        <div style={{ position: "relative" }}>
          <RoomPreview
            wallColor={muurKleur}
            floorColor={vloerKleur}
            style={stijl}
            furnitureIds={meubelsIds}
            onRemove={verwijderMeubel}
            photo={foto}
          />
          {/* Loading overlay */}
          {fotoLaden && (
            <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.75)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 22, zIndex: 30 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#5c7d63" }}>Foto laden…</div>
            </div>
          )}
        </div>

        {/* Stats + photo buttons */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, marginBottom: 4 }}>
          <div style={{ fontSize: 12, color: "#9b9189", fontWeight: 500 }}>
            {meubelsIds.length} meubels{meubelsIds.length > 0 && <span> · <span style={{ color: "#1c1917", fontWeight: 800 }}>€{totaalPrijs.toLocaleString("nl-NL")}</span></span>}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {foto ? (
              <>
                <motion.button whileTap={{ scale: 0.92 }} onClick={() => cameraRef.current?.click()} style={fotoBtn}>
                  <Camera size={11} /> Wissel
                </motion.button>
                <motion.button whileTap={{ scale: 0.92 }} onClick={verwijderFoto} style={{ ...fotoBtn, color: "#c0504d", borderColor: "#f5c6c5" }}>
                  <Trash2 size={11} /> Verwijder
                </motion.button>
              </>
            ) : (
              <>
                <motion.button whileTap={{ scale: 0.92 }} onClick={() => cameraRef.current?.click()} style={fotoBtn}>
                  <Camera size={11} /> Camera
                </motion.button>
                <motion.button whileTap={{ scale: 0.92 }} onClick={() => uploadRef.current?.click()} style={fotoBtn}>
                  <ImagePlus size={11} /> Upload
                </motion.button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Panel switcher */}
      <div style={{ padding: "10px 16px 10px", flexShrink: 0 }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: 4, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
          {paneelTabs.map((p) => (
            <motion.button
              key={p.key}
              onClick={() => setActieefPaneel(p.key)}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "10px 0", border: "none", borderRadius: 12, minHeight: 44,
                background: actieefPaneel === p.key ? "#1c1917" : "none",
                color: actieefPaneel === p.key ? "#fff" : "#9b9189",
                fontSize: 12, fontWeight: 700, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                transition: "background 0.2s, color 0.2s",
                fontFamily: "inherit",
              }}
            >
              {p.icoon} {p.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Scrollable panel */}
      <div style={{ flex: 1, overflow: "auto", padding: "0 16px", paddingBottom: "calc(24px + env(safe-area-inset-bottom, 0px))" }} className="no-scrollbar scroll-smooth">
        <AnimatePresence mode="wait">

          {actieefPaneel === "meubels" && (
            <motion.div key="meubels" initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 14 }} transition={{ duration: 0.2 }}>
              {/* Category tabs */}
              <div style={{ overflowX: "auto", marginBottom: 14, marginLeft: -16, paddingLeft: 16, paddingRight: 16 }} className="no-scrollbar">
                <div style={{ display: "flex", gap: 8, width: "max-content" }}>
                  {CATEGORIEEN.map((cat) => (
                    <motion.button
                      key={cat}
                      onClick={() => setActieveCategorie(cat)}
                      whileTap={{ scale: 0.92 }}
                      style={{
                        padding: "9px 16px", borderRadius: 20, border: "none", minHeight: 38,
                        background: actieveCategorie === cat ? "#5c7d63" : "#fff",
                        color: actieveCategorie === cat ? "#fff" : "#6b6460",
                        fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap",
                        boxShadow: "0 1px 6px rgba(0,0,0,0.07)", fontFamily: "inherit",
                        transition: "background 0.2s, color 0.2s",
                      }}
                    >
                      {cat}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Furniture grid */}
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={actieveCategorie}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
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
            <motion.div key="kleuren" initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 14 }} transition={{ duration: 0.2 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {foto && (
                  <div style={{ padding: "14px 16px", background: "#eaf1eb", borderRadius: 14, fontSize: 13, color: "#3d5c43", fontWeight: 600, lineHeight: 1.5, display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span>🎨</span>
                    <span>Verwijder jouw kamerfoto om muur- &amp; vloerkleuren te zien in de preview.</span>
                  </div>
                )}
                <ColorPicker label="Muurkleur" colors={WALL_COLORS} selected={muurKleur} onSelect={setMuurKleur} />
                <ColorPicker label="Vloerkleur" colors={FLOOR_COLORS} selected={vloerKleur} onSelect={setVloerKleur} />
              </div>
            </motion.div>
          )}

          {actieefPaneel === "stijl" && (
            <motion.div key="stijl" initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 14 }} transition={{ duration: 0.2 }}>
              <StyleSelector selected={stijl} onSelect={setStijl} />
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Toast */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={toast.hide} />
    </div>
  );
}

const fotoBtn: React.CSSProperties = {
  background: "#fff",
  border: "1.5px solid #ece8e2",
  borderRadius: 10,
  padding: "6px 10px",
  minHeight: 32,
  fontSize: 11,
  fontWeight: 700,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 4,
  color: "#1c1917",
  fontFamily: "inherit",
};

export default function EditorPagina() {
  return <Suspense><EditorInhoud /></Suspense>;
}
