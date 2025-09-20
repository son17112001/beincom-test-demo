import { useCallback, useEffect, useRef } from "react";

import useCallbackRef from "./useCallbackRef";

export default function useDebouncedCallback(callback, timeout = 300) {
    const handleCallback = useCallbackRef(callback);
    const debounceTimerRef = useRef(null);

    useEffect(() => () => clearTimeout(debounceTimerRef.current), []);

    return useCallback(
        (...args) => {
            clearTimeout(debounceTimerRef.current);

            debounceTimerRef.current = setTimeout(() => {
                handleCallback(...args);
            }, timeout);
        },
        [ timeout, handleCallback ],
    );
}
