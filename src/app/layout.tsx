import "./globals.css";

export const metadata = {
  title: "Hack Nasa",
  description:
    "Hack Nasa now, the world needs you!",
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
