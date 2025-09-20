import { useEffect } from "react";
import { IntlProvider } from "react-intl";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NProgress from "nprogress";
import { Toaster } from "sonner";

import { AuthProvider } from "../hooks/useAuth";
import en from "../locales/en.json";
import vi from "../locales/vi.json";

import "nprogress/nprogress.css";
import "../styles/globals.scss";

NProgress.configure({ showSpinner: false });

const messages = {
    en,
    vi,
};

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000,
            retry: 1,
        },
    },
});

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const locale = router.locale || "en";

    useEffect(() => {
        const handleStart = () => NProgress.start();
        const handleStop = () => NProgress.done();

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleStop);
        router.events.on("routeChangeError", handleStop);

        return () => {
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleStop);
            router.events.off("routeChangeError", handleStop);
        };
    }, [ router ]);

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <IntlProvider messages={messages[locale]} locale={locale}>
                    <Component {...pageProps} />
                    <Toaster richColors closeButton position="top-center" />
                </IntlProvider>
            </AuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default MyApp;
