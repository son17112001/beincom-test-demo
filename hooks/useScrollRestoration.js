import { useEffect } from "react";
import { useRouter } from "next/router";

const SCROLL_KEY = "posts_scroll_position";

export const useScrollRestoration = () => {
    const router = useRouter();

    useEffect(() => {
        // Save scroll position when navigating to post detail
        const handleRouteChangeStart = (url) => {
            console.log("🔄 Route change start:", url);
            if (url.includes("/posts/") && url !== "/posts") {
                const scrollY = window.scrollY;
                sessionStorage.setItem(SCROLL_KEY, scrollY.toString());
                console.log("💾 Saved scroll position:", scrollY);
            }
        };

        // Restore scroll position when returning to homepage
        const handleRouteChangeComplete = (url) => {
            console.log("✅ Route change complete:", url);

            // Check for homepage with or without locale prefix
            const isHomepage = url === "/" || url === "/en" || url === "/vi" || url.endsWith("/en") || url.endsWith("/vi");

            if (isHomepage) {
                const savedPosition = sessionStorage.getItem(SCROLL_KEY);
                console.log("🔍 Checking for saved position:", savedPosition);

                if (savedPosition) {
                    const scrollY = parseInt(savedPosition, 10);
                    console.log("📍 Restoring scroll position:", scrollY);

                    // Use multiple attempts to ensure scroll works
                    const restoreScroll = () => {
                        window.scrollTo(0, scrollY);
                        console.log("🎯 Scrolled to:", scrollY);
                    };

                    // Try immediately
                    restoreScroll();

                    // Try after a short delay
                    setTimeout(restoreScroll, 50);

                    // Try after DOM is fully loaded
                    setTimeout(restoreScroll, 200);

                    // Clear saved position after restoring
                    sessionStorage.removeItem(SCROLL_KEY);
                }
            }
        };

        router.events.on("routeChangeStart", handleRouteChangeStart);
        router.events.on("routeChangeComplete", handleRouteChangeComplete);

        return () => {
            router.events.off("routeChangeStart", handleRouteChangeStart);
            router.events.off("routeChangeComplete", handleRouteChangeComplete);
        };
    }, [ router ]);
};
