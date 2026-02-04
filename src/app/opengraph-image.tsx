import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "HireScript — AI Job Description Generator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ background: "#080F0C", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 80px", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "linear-gradient(90deg, #10B981, #3B82F6)", display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: "64px", fontWeight: 800, color: "#ffffff", letterSpacing: "-2px", display: "flex" }}>HireScript</div>
          <div style={{ fontSize: "32px", fontWeight: 500, color: "#10B981", display: "flex" }}>AI Job Description Generator</div>
          <div style={{ fontSize: "24px", color: "#6B7280", maxWidth: "700px", lineHeight: 1.4, display: "flex" }}>Write inclusive, bias-free job posts with interview questions and scoring rubrics.</div>
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {["Job Posts", "Interview Qs", "Scoring Rubric", "Bias-Free"].map((t) => (
            <div key={t} style={{ background: "#10B98120", border: "1px solid #10B98140", borderRadius: "12px", padding: "8px 20px", fontSize: "18px", color: "#10B981", fontWeight: 600, display: "flex" }}>{t}</div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "18px", color: "#4B5563", display: "flex" }}>hirescript-ten.vercel.app</div>
          <div style={{ fontSize: "18px", color: "#4B5563", display: "flex" }}>automatik.studio</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
