import AuthHeader from "@/components/AuthHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="flex h-screen flex-col">
      <AuthHeader />
      <main className="flex-1">{children}</main>
    </article>
  );
}
