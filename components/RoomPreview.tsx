"use client";
import { MEUBELS, STYLES } from "@/lib/data";

interface Props {
  wallColor: string;
  floorColor: string;
  style: string;
  furnitureIds: string[];
  onRemove?: (id: string) => void;
  compact?: boolean;
  photo?: string | null;
}

export default function RoomPreview({
  wallColor,
  floorColor,
  style,
  furnitureIds,
  onRemove,
  compact,
  photo,
}: Props) {
  const meubels = furnitureIds
    .map((id) => MEUBELS.find((m) => m.id === id))
    .filter(Boolean) as typeof MEUBELS;

  const stijlInfo = STYLES.find((s) => s.id === style);
  const h = compact ? 200 : 290;

  // Layout positions for up to 6 furniture items
  const posities = [
    { left: "12%", bottom: "18%", w: 90, rotate: -2 },
    { left: "52%", bottom: "22%", w: 70, rotate: 1 },
    { left: "30%", bottom: "14%", w: 60, rotate: -1 },
    { left: "68%", bottom: "12%", w: 55, rotate: 2 },
    { left: "6%",  bottom: "10%", w: 50, rotate: -3 },
    { left: "78%", bottom: "20%", w: 52, rotate: 1 },
  ];

  return (
    <div
      style={{
        borderRadius: compact ? 16 : 24,
        overflow: "hidden",
        position: "relative",
        height: h,
        boxShadow: compact ? "none" : "0 8px 32px rgba(0,0,0,0.12)",
      }}
    >
      {/* Achtergrond: foto of gegenereerde kamer */}
      {photo ? (
        <>
          <img
            src={photo}
            alt="Jouw kamer"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.22)" }} />
        </>
      ) : (
        <>
          {/* Muur */}
          <div style={{ position: "absolute", inset: 0, background: wallColor }} />
          {/* Subtiele muurlijn */}
          <div
            style={{
              position: "absolute",
              top: "55%",
              left: 0,
              right: 0,
              height: 1,
              background: `${floorColor}80`,
            }}
          />
          {/* Vloer met perspectief */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "46%",
              background: `linear-gradient(180deg, ${floorColor}cc 0%, ${floorColor} 100%)`,
              clipPath: "polygon(0 28%, 100% 0, 100% 100%, 0 100%)",
            }}
          />
          {/* Plinten */}
          <div
            style={{
              position: "absolute",
              bottom: "45.5%",
              left: 0,
              right: 0,
              height: 2,
              background: `${floorColor}aa`,
            }}
          />
        </>
      )}

      {/* Meubels als echte foto's */}
      {meubels.length > 0 ? (
        meubels.slice(0, 6).map((m, i) => {
          const pos = posities[i] ?? posities[0];
          const schaal = compact ? 0.75 : 1;
          const breedte = Math.round(pos.w * schaal);
          return (
            <button
              key={m.id}
              onClick={() => onRemove?.(m.id)}
              title={onRemove ? `Verwijder ${m.naam}` : m.naam}
              style={{
                position: "absolute",
                left: pos.left,
                bottom: pos.bottom,
                width: breedte,
                cursor: onRemove ? "pointer" : "default",
                background: "none",
                border: "none",
                padding: 0,
                transform: `rotate(${pos.rotate}deg)`,
                transformOrigin: "bottom center",
                transition: "transform 0.2s, filter 0.2s",
                zIndex: 10 - i,
              }}
            >
              <div
                style={{
                  borderRadius: 10,
                  overflow: "hidden",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.28), 0 2px 6px rgba(0,0,0,0.15)",
                  border: "2px solid rgba(255,255,255,0.5)",
                  background: "#f5f3ef",
                }}
              >
                <img
                  src={m.afbeelding}
                  alt={m.naam}
                  style={{
                    width: "100%",
                    height: breedte * 0.72,
                    objectFit: "cover",
                    display: "block",
                  }}
                  loading="lazy"
                />
              </div>
              {/* Schaduw op vloer */}
              <div
                style={{
                  width: "70%",
                  height: 6,
                  background: "rgba(0,0,0,0.18)",
                  borderRadius: "50%",
                  margin: "0 auto",
                  filter: "blur(3px)",
                }}
              />
            </button>
          );
        })
      ) : (
        <div
          style={{
            position: "absolute",
            bottom: "30%",
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: 13,
            fontWeight: 600,
            color: photo ? "rgba(255,255,255,0.7)" : `${wallColor === "#3d3835" ? "#888" : "#aaa8a0"}`,
          }}
        >
          Voeg meubels toe om jouw kamer te zien
        </div>
      )}

      {/* Stijl badge */}
      {stijlInfo && (
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(8px)",
            borderRadius: 20,
            padding: "4px 11px",
            fontSize: 11,
            fontWeight: 700,
            color: "#5c7d63",
            zIndex: 20,
          }}
        >
          {stijlInfo.emoji} {style}
        </div>
      )}

      {/* Foto badge */}
      {photo && (
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(6px)",
            borderRadius: 20,
            padding: "4px 11px",
            fontSize: 11,
            fontWeight: 700,
            color: "#fff",
            zIndex: 20,
          }}
        >
          📷 Jouw kamer
        </div>
      )}

      {/* Tik om te verwijderen hint */}
      {onRemove && meubels.length > 0 && (
        <div
          style={{
            position: "absolute",
            bottom: 10,
            right: 12,
            fontSize: 10,
            fontWeight: 600,
            color: photo ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.3)",
            zIndex: 20,
          }}
        >
          Tik op meubel om te verwijderen
        </div>
      )}
    </div>
  );
}
