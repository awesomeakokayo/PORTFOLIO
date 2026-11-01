import { ImageResponse } from "next/og";

export const alt = "Awesome Akokayo — Product Engineer & AI Builder";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          background: "#0A0A0A",
          padding: "0 96px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              color: "#8A8A85",
              fontFamily: "monospace",
              fontSize: 26,
              letterSpacing: "0.18em",
            }}
          >
            PRODUCT ENGINEER / AI BUILDER
          </div>
          <div
            style={{
              display: "flex",
              color: "#F5F5F0",
              fontSize: 104,
              fontWeight: 700,
              letterSpacing: "-0.045em",
              lineHeight: 1,
            }}
          >
            Awesome Akokayo
            <span style={{ color: "#FF5A1F" }}>.</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
