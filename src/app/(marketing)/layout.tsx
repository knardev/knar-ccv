export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // setting layout
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
