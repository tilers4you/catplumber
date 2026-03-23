import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "#1B5E8A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: "-2px",
            fontFamily: "sans-serif",
          }}
        >
          CP
        </span>
      </div>
    ),
    { ...size }
  );
}
