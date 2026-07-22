import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Jayant Pratap Singh - Full Stack Developer | Backend-Focused Engineer";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#0d0d0d",
          color: "#f0f0f0",
          display: "flex",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", Arial, sans-serif',
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            borderTop: "1px solid #242424",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            maxWidth: "900px",
            paddingTop: "44px",
          }}
        >
          <div
            style={{
              color: "#8a8a8a",
              fontSize: 28,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Jayant Pratap Singh
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 76,
              fontWeight: 600,
              letterSpacing: "-0.055em",
              lineHeight: 0.96,
            }}
          >
            <span>Full Stack Developer</span>
            <span>building AI tools</span>
            <span>and products</span>
          </div>
          <div
            style={{
              color: "#b0b0b0",
              fontSize: 30,
              lineHeight: 1.35,
              maxWidth: "760px",
            }}
          >
            Node.js, TypeScript, PostgreSQL, MongoDB, secure APIs, and
            practical GenAI product infrastructure.
          </div>
          <div
            style={{
              color: "#7a7a7a",
              display: "flex",
              fontSize: 24,
              gap: "18px",
            }}
          >
            <span>github.com/Jayant9917</span>
            <span>·</span>
            <span>Full Stack Developer from India</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
