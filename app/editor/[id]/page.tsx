"use client";
import { useEffect, useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { ChevronLeft, Save, GitCompare, Plus, Palette, Layers, Camera, ImagePlus } from "lucide-react";
import FurnitureCard from "@/components/FurnitureCard";
import ColorPicker from "@/components/ColorPicker";
import RoomPreview from "@/components/RoomPreview";
import StyleSelector from "@/components/StyleSelector";
import { FURNITURE, WALL_COLORS, FLOOR_COLORS, Category, Style } from "@/lib/data";
import { getProjects, saveProject, getRoomPhoto, saveRoomPhoto, deleteRoomPhoto, resizeImage } from "@/lib/store";

const CATEGORIES: Category[] = ["Sofas", "Tables", "Chairs", "Lighting", "Decoration", "Plants"];

type Panel = "furniture" | "colors" | "style";

function EditorContent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;

  const [name, setName] = useState("My Room");
  const [style, setStyle] = useState<Style>("Japandi");
  const [wallColor, setWallColor] = useState("#f8f6f2");
  const [floorColor, setFloorColor] = useState("#c8a96e");
  const [furnitureIds, setFurnitureIds] = useState<string[]>([]);
  const [activePanel, setActivePanel] = useState<Panel>("furniture");
  const [activeCategory, setActiveCategory] = useState<Category>("Sofas");
  const [saved, setSaved] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);

  const cameraRef = useRef<HTMLInputElement>(null);
  const uploadRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const isFresh = searchParams.get("fresh") === "1";
    if (isFresh) {
      const urlStyle = searchParams.get("style") as Style | null;
      const urlName = searchParams.get("name");
      if (urlStyle) setStyle(urlStyle);
      if (urlName) setName(decodeURIComponent(urlName));
    } else {
      const projects = getProjects();
      const project = projects.find((p) => p.id === id);
      if (project) {
        setName(project.name);
        setStyle(project.style);
        setWallColor(project.wallColor);
        setFloorColor(project.floorColor);
        setFurnitureIds(project.furniture);
      }
    }
    // Load photo regardless
    setPhoto(getRoomPhoto(id));
  }, [id, searchParams]);

  async function handlePhotoFile(file: File | undefined) {
    if (!file) return;
    const dataUrl = await resizeImage(file);
    saveRoomPhoto(id, dataUrl);
    setPhoto(dataUrl);
  }

  function removePhoto() {
    deleteRoomPhoto(id);
    setPhoto(null);
  }

  function toggleFurniture(fid: string) {
    setFurnitureIds((prev) =>
      prev.includes(fid) ? prev.filter((x) => x !== fid) : [...prev, fid]
    );
  }

  function removeFurniture(fid: string) {
    setFurnitureIds((prev) => prev.filter((x) => x !== fid));
  }

  function handleSave() {
    saveProject({
      id,
      name,
      style,
      wallColor,
      floorColor,
      furniture: furnitureIds,
      createdAt: new Date().toISOString().split("T")[0],
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function goCompare() {
    handleSave();
    router.push(`/compare?focus=${id}`);
  }

  const filteredFurniture = FURNITURE.filter((f) => f.category === activeCategory);
  const totalPrice = furnitureIds
    .map((fid) => FURNITURE.find((f) => f.id === fid)?.price ?? 0)
    .reduce((a, b) => a + b, 0);

  return (
    <div className="mobile-container" style={{ minHeight: "100dvh", background: "#faf9f7", display: "flex", flexDirection: "column" }}>
      {/* Hidden file inputs */}
      <input ref={cameraRef} type="file" accept="image/*" capture="environment" style={{ display: "none" }} onChange={(e) => handlePhotoFile(e.target.files?.[0])} />
      <input ref={uploadRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handlePhotoFile(e.target.files?.[0])} />

      {/* Header */}
      <div style={{ padding: "56px 20px 14px", background: "#fff", borderBottom: "1px solid #e8e4de", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={() => router.back()} style={{ background: "#f5f3ef", border: "none", borderRadius: "50%", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
          <ChevronLeft size={18} color="#1a1a1a" />
        </button>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ flex: 1, fontSize: 17, fontWeight: 700, color: "#1a1a1a", border: "none", background: "none", outline: "none" }}
        />
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <button onClick={goCompare} style={{ background: "#f5f3ef", border: "none", borderRadius: 12, padding: "8px 12px", display: "flex", alignItems: "center", gap: 5, cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#1a1a1a" }}>
            <GitCompare size={14} /> Compare
          </button>
          <button onClick={handleSave} style={{ background: saved ? "#6b8f71" : "#1a1a1a", border: "none", borderRadius: 12, padding: "8px 14px", display: "flex", alignItems: "center", gap: 5, cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#fff", transition: "background 0.2s" }}>
            <Save size={14} /> {saved ? "Saved!" : "Save"}
          </button>
        </div>
      </div>

      {/* Room Preview */}
      <div style={{ padding: "16px 20px", flexShrink: 0 }}>
        <RoomPreview
          wallColor={wallColor}
          floorColor={floorColor}
          style={style}
          furnitureIds={furnitureIds}
          onRemove={removeFurniture}
          photo={photo}
        />

        {/* Photo action row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
          <div style={{ fontSize: 12, color: "#9e9189" }}>{furnitureIds.length} items · €{totalPrice.toLocaleString()}</div>
          <div style={{ display: "flex", gap: 8 }}>
            {photo ? (
              <>
                <button
                  onClick={() => cameraRef.current?.click()}
                  style={{ background: "#fff", border: "1.5px solid #e8e4de", borderRadius: 10, padding: "6px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: "#1a1a1a" }}
                >
                  <Camera size={12} /> Retake
                </button>
                <button
                  onClick={removePhoto}
                  style={{ background: "#fff", border: "1.5px solid #e8e4de", borderRadius: 10, padding: "6px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer", color: "#c0504d" }}
                >
                  Remove photo
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => cameraRef.current?.click()}
                  style={{ background: "#fff", border: "1.5px solid #e8e4de", borderRadius: 10, padding: "6px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: "#1a1a1a" }}
                >
                  <Camera size={12} /> Camera
                </button>
                <button
                  onClick={() => uploadRef.current?.click()}
                  style={{ background: "#fff", border: "1.5px solid #e8e4de", borderRadius: 10, padding: "6px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: "#1a1a1a" }}
                >
                  <ImagePlus size={12} /> Upload
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Panel switcher */}
      <div style={{ padding: "0 20px 12px", flexShrink: 0 }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: 4, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
          {(["furniture", "colors", "style"] as Panel[]).map((p) => (
            <button
              key={p}
              onClick={() => setActivePanel(p)}
              style={{
                padding: "9px 0",
                border: "none",
                borderRadius: 12,
                background: activePanel === p ? "#1a1a1a" : "none",
                color: activePanel === p ? "#fff" : "#9e9189",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                transition: "all 0.2s",
                textTransform: "capitalize",
              }}
            >
              {p === "furniture" && <Plus size={13} />}
              {p === "colors" && <Palette size={13} />}
              {p === "style" && <Layers size={13} />}
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable panel */}
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 24px" }} className="no-scrollbar">
        {activePanel === "furniture" && (
          <>
            <div style={{ overflowX: "auto", marginBottom: 14 }} className="no-scrollbar">
              <div style={{ display: "flex", gap: 8, width: "max-content" }}>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: "7px 14px",
                      borderRadius: 20,
                      border: "none",
                      background: activeCategory === cat ? "#6b8f71" : "#fff",
                      color: activeCategory === cat ? "#fff" : "#6b6460",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {filteredFurniture.map((item) => (
                <FurnitureCard
                  key={item.id}
                  item={item}
                  added={furnitureIds.includes(item.id)}
                  onAdd={() => toggleFurniture(item.id)}
                />
              ))}
            </div>
          </>
        )}

        {activePanel === "colors" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {photo && (
              <div style={{ padding: "12px 14px", background: "#e8f0e9", borderRadius: 14, fontSize: 13, color: "#4a7a52", fontWeight: 500 }}>
                🎨 Colors are used when no room photo is set. Remove your photo to see wall & floor colors.
              </div>
            )}
            <ColorPicker label="Wall color" colors={WALL_COLORS} selected={wallColor} onSelect={setWallColor} />
            <ColorPicker label="Floor color" colors={FLOOR_COLORS} selected={floorColor} onSelect={setFloorColor} />
          </div>
        )}

        {activePanel === "style" && (
          <StyleSelector selected={style} onSelect={setStyle} />
        )}
      </div>
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense>
      <EditorContent />
    </Suspense>
  );
}
