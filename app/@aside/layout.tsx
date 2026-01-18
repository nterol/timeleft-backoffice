export default function AsideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <aside className="col-span-1 rounded-lg border border-b-neutral-900 bg-neutral-900/50 h-fit p-4">
      {children}
    </aside>
  );
}
