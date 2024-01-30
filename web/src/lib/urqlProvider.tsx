"use client";

import {
  UrqlProvider as UrqlNextProvider,
  cacheExchange,
  createClient,
  fetchExchange,
  ssrExchange,
} from "@urql/next";
import { useMemo } from "react";

type ProviderProps = {
  children: React.ReactNode;
};

const UrqlProvider = ({ children }: ProviderProps) => {
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange();
    const client = createClient({
      url: "http://localhost:4000/graphql",
      exchanges: [cacheExchange, ssr, fetchExchange],
      suspense: true,
    });
    return [client, ssr];
  }, []);

  return (
    <UrqlNextProvider client={client} ssr={ssr}>
      {children}
    </UrqlNextProvider>
  );
};

export default UrqlProvider;
