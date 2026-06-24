"use client";
import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  fallbackEmoji?: string;
}

export default function ImageWithSkeleton({ src, alt, style, fallbackEmoji = "🛋️" }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f3ef",
          fontSize: 40,
        }}
      >
        {fallbackEmoji}
      </div>
    );
  }

  return (
    <div style={{ position: "relative", ...style }}>
      {!loaded && (
        <div
          className="skeleton"
          style={{ position: "absolute", inset: 0, borderRadius: 0 }}
        />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={{
          ...style,
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.3s ease",
          display: "block",
        }}
        loading="lazy"
      />
    </div>
  );
}
