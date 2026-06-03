import { ImageResponse } from "next/og";

// Code-generated favicon: copper "P" on deep olive, rounded. Legible on light/dark tabs.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#20291f",
          color: "#c67a3d",
          fontSize: 44,
          fontWeight: 700,
          borderRadius: 14,
        }}
      >
        P
      </div>
    ),
    size,
  );
}
