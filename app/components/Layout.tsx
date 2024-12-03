export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-hidden prose max-w-none dark:prose-invert">
      <main className="h-full">{children}</main>
    </div>
  );
}
