import "./globals.css";

export const metadata = {
  title: "Mathler Clone",
  description:
    "A Mathler clone built with Next.js 14, TypeScript, and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
