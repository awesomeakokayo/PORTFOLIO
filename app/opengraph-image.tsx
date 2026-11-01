import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Awesome Akokayo — Product-focused software engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "public/about/awesome-og.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#0A0A0A",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 620,
            height: "100%",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                color: "#8A8A85",
                fontFamily: "monospace",
                fontSize: 22,
                letterSpacing: "0.16em",
              }}
            >
              PRODUCT ENGINEER / AI BUILDER
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 38,
                color: "#F5F5F0",
                fontSize: 116,
                fontWeight: 700,
                letterSpacing: "-0.06em",
                lineHeight: 0.9,
              }}
            >
              <span>Awesome</span>
              <span style={{ display: "flex" }}>
                Akokayo<span style={{ color: "#FF5A1F" }}>.</span>
              </span>
            </div>

            <div
              style={{
                display: "flex",
                maxWidth: 470,
                marginTop: 34,
                color: "#8A8A85",
                fontSize: 29,
                lineHeight: 1.35,
              }}
            >
              Useful products, built with intent.
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                display: "flex",
                width: 10,
                height: 10,
                borderRadius: 10,
                background: "#FF5A1F",
              }}
            />
            <div
              style={{
                color: "#F5F5F0",
                fontFamily: "monospace",
                fontSize: 18,
                letterSpacing: "0.12em",
              }}
            >
              OPEN TO FULL-TIME ROLES
            </div>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            width: 400,
            height: 500,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 20,
              left: 20,
              display: "flex",
              width: 380,
              height: 475,
              background: "#FFD93D",
            }}
          />
          <img
            src={photoSrc}
            width={380}
            height={475}
            alt=""
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              display: "flex",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
