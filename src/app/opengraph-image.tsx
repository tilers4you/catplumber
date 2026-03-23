import { ImageResponse } from "next/og";

export const alt = "CatPlumber — Expert Plumbing Services in Denver, CO";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#1B5E8A",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          padding: "0 80px",
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            border: "3px solid rgba(255,255,255,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 8,
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: 28,
              fontWeight: 700,
              fontFamily: "sans-serif",
              letterSpacing: "-1px",
            }}
          >
            CP
          </span>
        </div>
        <div
          style={{
            color: "white",
            fontSize: 96,
            fontWeight: 700,
            fontFamily: "sans-serif",
            letterSpacing: "-3px",
            lineHeight: 1,
            textAlign: "center",
          }}
        >
          CatPlumber
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: 36,
            fontFamily: "sans-serif",
            fontWeight: 400,
            textAlign: "center",
            letterSpacing: "0.5px",
          }}
        >
          Expert Plumbing Services • Denver, CO
        </div>
        <div
          style={{
            color: "white",
            fontSize: 42,
            fontWeight: 600,
            fontFamily: "sans-serif",
            marginTop: 8,
            background: "rgba(255,255,255,0.15)",
            borderRadius: 12,
            padding: "12px 32px",
          }}
        >
          (720) 717-3990
        </div>
      </div>
    ),
    { ...size }
  );
}
