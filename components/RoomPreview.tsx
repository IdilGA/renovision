"use client";
import { FURNITURE, STYLES } from "@/lib/data";

interface Props {
  wallColor: string;
  floorColor: string;
  style: string;
  furnitureIds: string[];
  onRemove?: (id: string) => void;
  compact?: boolean;
  photo?: string | null;
}

export default function RoomPreview({ wallColor, floorColor, style, furnitureIds, onRemove, compact, photo }: Props) {
  const furniture = furnitureIds.map((id) => FURNITURE.find((f) => f.id === id)).filter(Boolean);
  const styleInfo = STYLES.find((s) => s.id === style);
  const h = compact ? 200 : 280;

  return (
    <div
      style={{
        borderRadius: compact ? 16 : 24,
        overflow: "hidden",
        position: "relative",
        height: h,
        boxShadow: compact ? "none" : "0 4px 24px rgba(0,0,0,0.1)",
      }}
    >
      {photo ? (
        /* Real room photo as background */
        <>
          <img
            src={photo}
            alt="Your room"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          {/* Dark overlay so furniture is visible */}
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)" }} />
        </>
      ) : (
        /* Generated room illustration */
        <>
          <div style={{ position: "absolute", inset: 0, background: wallColor }} />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "45%",
              background: floorColor,
              clipPath: "polygon(0 30%, 100% 0, 100% 100%, 0 100%)",
            }}
          />
          <div style={{ position: "absolute", bottom: "44%", left: 0, right: 0, height: 3, background: `${floorColor}cc` }} />
        </>
      )}

      {/* Furniture layer */}
      <div
        style={{
          position: "absolute",
          bottom: photo ? "8%" : "30%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: compact ? 6 : 10,
          alignItems: "flex-end",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: "90%",
        }}
      >
        {furniture.map((f) => (
          <button
            key={f!.id}
            onClick={() => onRemove?.(f!.id)}
            title={onRemove ? `Remove ${f!.name}` : f!.name}
            style={{
              fontSize: compact ? 32 : 44,
              background: photo ? "rgba(255,255,255,0.15)" : "none",
              border: "none",
              borderRadius: 12,
              cursor: onRemove ? "pointer" : "default",
              display: "block",
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.35))",
              padding: photo ? 6 : 4,
              backdropFilter: photo ? "blur(2px)" : "none",
            }}
          >
            {f!.emoji}
          </button>
        ))}
        {furniture.length === 0 && (
          <div style={{ fontSize: 13, color: photo ? "rgba(255,255,255,0.7)" : `${wallColor}99`, textAlign: "center", padding: "20px 0", textShadow: photo ? "0 1px 4px rgba(0,0,0,0.5)" : "none" }}>
            Add furniture to your room
          </div>
        )}
      </div>

      {/* Style badge */}
      {styleInfo && (
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "rgba(255,255,255,0.9)",
            borderRadius: 20,
            padding: "3px 10px",
            fontSize: 11,
            fontWeight: 600,
            color: "#6b8f71",
          }}
        >
          {styleInfo.emoji} {style}
        </div>
      )}

      {/* Photo badge */}
      {photo && (
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            background: "rgba(0,0,0,0.5)",
            borderRadius: 20,
            padding: "3px 10px",
            fontSize: 11,
            fontWeight: 600,
            color: "#fff",
            backdropFilter: "blur(4px)",
          }}
        >
          📷 Your room
        </div>
      )}

      {onRemove && furniture.length > 0 && (
        <div style={{ position: "absolute", bottom: 10, right: 12, fontSize: 10, color: photo ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.35)" }}>
          Tap to remove
        </div>
      )}
    </div>
  );
}
