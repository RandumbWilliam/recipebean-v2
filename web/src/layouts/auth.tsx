export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <article className="flex h-screen w-full">{children}</article>;
}
