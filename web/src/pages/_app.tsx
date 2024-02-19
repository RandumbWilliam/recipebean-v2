import AuthProvider from "@/providers/auth";
import "@/styles/globals.css";
import { urqlClient } from "@/utils/urqlClient";
import { withUrqlClient } from "next-urql";
import type { AppProps } from "next/app";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <main className={outfit.className}>
        <Component {...pageProps} />
      </main>
    </AuthProvider>
  );
};

export default withUrqlClient(urqlClient)(App);
