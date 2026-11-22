import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Tony Nathan — Video Editor & Motion Designer",
  description: "Cinematic video editing and motion design portfolio."
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
