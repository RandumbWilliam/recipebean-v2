import Header from "@/components/Header";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 container pt-[120px]">{children}</main>
    </article>
  );
}
