import { ImageResponse } from "next/og";
import { ogCard } from "@/lib/og";

export const alt = "Christopher Xu, senior software engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    ogCard("The systems behind great products.", "CHRIS XU"),
    { ...size },
  );
}
