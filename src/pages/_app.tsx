import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { HeroUIProvider } from "@heroui/react";
import { ToasterProvider } from "@/contexts/ToasterContext";
import AppShell from "@/components/commons/AppShell";
import { onErrorHander } from "@/libs/axios/responseHanler";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      throwOnError(error) {
        onErrorHander(error);
        return false;
      },
    },
    mutations: {
      onError: onErrorHander,
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ToasterProvider>
          <HeroUIProvider>
            <AppShell>
              <Component {...pageProps} />
            </AppShell>
          </HeroUIProvider>
        </ToasterProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
