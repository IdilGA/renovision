"use client";
import { FURNITURE, STYLES } from "@/lib/data";

interface Props {
  wallColor: string;
  floorColor: string;
  style: string;
  furnitureIds: string[];
  onRemove?: (id: string) => void;
  compact?: boolean;
}

export default function RoomPreview({ wallColor, floorColor, style, furnitureIds, onRemove, compact }: Props) {
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
      {/* Wall */}
      <div style={{ position: "absolute", inset: 0, background: wallColor }} />
      {/* Floor perspective */}
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
      {/* Baseboard */}
      <div
        style={{
          position: "absolute",
          bottom: "44%",
          left: 0,
          right: 0,
          height: 3,
          background: `${floorColor}cc`,
        }}
      />

      {/* Furniture items */}
      <div
        style={{
          position: "absolute",
          bottom: "30%",
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
        {furniture.map((f, i) => (
          <div
            key={f!.id}
            style={{ position: "relative", textAlign: "center" }}
          >
            <button
              onClick={() => onRemove?.(f!.id)}
              style={{
                fontSize: compact ? 32 : 44,
                background: "none",
                border: "none",
                cursor: onRemove ? "pointer" : "default",
                display: "block",
                filter: `drop-shadow(0 4px 6px rgba(0,0,0,0.2))`,
                transition: "transform 0.15s",
                padding: 4,
              }}
              title={onRemove ? `Remove ${f!.name}` : f!.name}
            >
              {f!.emoji}
            </button>
          </div>
        ))}
        {furniture.length === 0 && (
          <div style={{ fontSize: 13, color: `${wallColor}99`, textAlign: "center", padding: "20px 0" }}>
            Add furniture to your room
          </div>
        )}
      </div>

      {/* Style label */}
      {styleInfo && (
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "rgba(255,255,255,0.85)",
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

      {onRemove && furniture.length > 0 && (
        <div
          style={{
            position: "absolute",
            bottom: 10,
            right: 12,
            fontSize: 10,
            color: "rgba(0,0,0,0.35)",
          }}
        >
          Tap to remove
        </div>
      )}
    </div>
  );
}
