"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, Suspense } from "react";
import { ChevronLeft, Camera, Upload, Sparkles, X } from "lucide-react";
import { resizeImage, saveRoomPhoto } from "@/lib/store";

const EXAMPLE_ROOMS = [
  { id: "living", label: "Living Room", emoji: "🛋️", desc: "Sofa, coffee table, rug" },
  { id: "bedroom", label: "Bedroom", emoji: "🛏️", desc: "Bed, nightstands, wardrobe" },
  { id: "dining", label: "Dining Room", emoji: "🍽️", desc: "Table, chairs, sideboard" },
  { id: "study", label: "Study / Office", emoji: "📚", desc: "Desk, bookshelf, chair" },
  { id: "hallway", label: "Hallway", emoji: "🚪", desc: "Shoe rack, mirror, hooks" },
];

function NewRoomContent() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id") || "new";
  const [selected, setSelected] = useState<string | null>(null);
  const [roomName, setRoomName] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const cameraRef = useRef<HTMLInputElement>(null);
  const uploadRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setLoading(true);
    try {
      const dataUrl = await resizeImage(file);
      setPhoto(dataUrl);
    } finally {
      setLoading(false);
    }
  }

  function proceed(type: string) {
    const name = roomName || EXAMPLE_ROOMS.find((r) => r.id === type)?.label || "My Room";
    if (photo) saveRoomPhoto(id, photo);
    router.push(`/style-select?id=${id}&room=${type}&name=${encodeURIComponent(name)}`);
  }

  return (
    <div className="mobile-container" style={{ minHeight: "100dvh", background: "#faf9f7" }}>
      {/* Hidden file inputs */}
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: "none" }}
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <input
        ref={uploadRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {/* Header */}
      <div style={{ padding: "56px 24px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <button
          onClick={() => router.back()}
          style={{ background: "#fff", border: "none", borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
        >
          <ChevronLeft size={20} color="#1a1a1a" />
        </button>
        <div>
          <div style={{ fontSize: 11, color: "#9e9189", fontWeight: 500 }}>Step 1 of 3</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#1a1a1a", letterSpacing: -0.3 }}>Add a room</h1>
        </div>
      </div>

      <div style={{ padding: "0 24px" }}>
        {/* Room name */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#9e9189", letterSpacing: 0.5, textTransform: "uppercase", display: "block", marginBottom: 8 }}>
            Room name (optional)
          </label>
          <input
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="e.g. My living room..."
            style={{ width: "100%", padding: "14px 16px", background: "#fff", border: "1.5px solid #e8e4de", borderRadius: 16, fontSize: 15, color: "#1a1a1a", outline: "none" }}
          />
        </div>

        {/* Photo section */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#9e9189", letterSpacing: 0.5, textTransform: "uppercase", display: "block", marginBottom: 12 }}>
            Add your room photo (optional)
          </label>

          {photo ? (
            /* Photo preview */
            <div style={{ position: "relative", borderRadius: 18, overflow: "hidden" }}>
              <img
                src={photo}
                alt="Room"
                style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)",
                }}
              />
              <div style={{ position: "absolute", bottom: 12, left: 14, color: "#fff", fontSize: 13, fontWeight: 600 }}>
                ✓ Photo added
              </div>
              <button
                onClick={() => setPhoto(null)}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  background: "rgba(0,0,0,0.5)",
                  border: "none",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={16} color="#fff" />
              </button>
              {/* Retake buttons */}
              <div style={{ position: "absolute", bottom: 12, right: 12, display: "flex", gap: 8 }}>
                <button
                  onClick={() => cameraRef.current?.click()}
                  style={{ background: "rgba(255,255,255,0.9)", border: "none", borderRadius: 10, padding: "6px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
                >
                  <Camera size={12} /> Retake
                </button>
              </div>
            </div>
          ) : (
            /* Upload buttons */
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <button
                onClick={() => cameraRef.current?.click()}
                disabled={loading}
                style={{
                  background: "#fff",
                  border: "1.5px dashed #d0c8c0",
                  borderRadius: 18,
                  padding: "22px 12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
              >
                <Camera size={26} color="#6b8f71" />
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>Take photo</div>
                <div style={{ fontSize: 11, color: "#9e9189" }}>Open camera</div>
              </button>
              <button
                onClick={() => uploadRef.current?.click()}
                disabled={loading}
                style={{
                  background: "#fff",
                  border: "1.5px dashed #d0c8c0",
                  borderRadius: 18,
                  padding: "22px 12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                }}
              >
                <Upload size={26} color="#6b8f71" />
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>Upload photo</div>
                <div style={{ fontSize: 11, color: "#9e9189" }}>From gallery</div>
              </button>
            </div>
          )}

          {loading && (
            <div style={{ textAlign: "center", padding: "12px 0", fontSize: 13, color: "#9e9189" }}>
              Processing photo...
            </div>
          )}
        </div>

        {/* Room types */}
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#9e9189", letterSpacing: 0.5, textTransform: "uppercase", display: "block", marginBottom: 12 }}>
            Choose room type
          </label>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {EXAMPLE_ROOMS.map((room) => {
              const isSelected = selected === room.id;
              return (
                <button
                  key={room.id}
                  onClick={() => setSelected(room.id)}
                  style={{
                    background: isSelected ? "#1a1a1a" : "#fff",
                    border: "2px solid",
                    borderColor: isSelected ? "#1a1a1a" : "#e8e4de",
                    borderRadius: 18,
                    padding: "14px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s",
                    width: "100%",
                  }}
                >
                  <span style={{ fontSize: 28 }}>{room.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 15, color: isSelected ? "#fff" : "#1a1a1a" }}>{room.label}</div>
                    <div style={{ fontSize: 12, color: isSelected ? "rgba(255,255,255,0.6)" : "#9e9189", marginTop: 1 }}>{room.desc}</div>
                  </div>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", border: isSelected ? "none" : "2px solid #e0dbd5", background: isSelected ? "#6b8f71" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {isSelected && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Continue */}
      <div style={{ padding: "24px 24px 48px" }}>
        <button
          onClick={() => selected && proceed(selected)}
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Sparkles size={18} />
          Choose style
        </button>
      </div>
    </div>
  );
}

export default function NewRoomPage() {
  return (
    <Suspense>
      <NewRoomContent />
    </Suspense>
  );
}
