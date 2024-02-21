import Load from "@/components/Load";
import { useMyUserQuery } from "@/graphql/hooks";
import { useRouter } from "next/router";

const globalRoutes = ["/", "/signin", "/signup"];

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [{ data, fetching }] = useMyUserQuery();

  const authenticated = data?.myUser;
  const globalRoute = globalRoutes.includes(router.pathname);

  if (fetching || data === undefined) {
    return <Load />;
  }

  if (!authenticated && !globalRoute) {
    router.push(`/signin?next=${router.pathname}`);
    return;
  }

  if (authenticated && globalRoute) {
    router.push("/dashboard");
    return;
  }

  return children;
}
