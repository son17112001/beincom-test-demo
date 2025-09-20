import { useCallback, useEffect, useRef, useState } from "react";

export function useIsMounted(withLifecycle = false) {
    const [ isMountedState, setIsMountedState ] = useState(false);
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;
        if (withLifecycle) {
            setIsMountedState(true);
        }

        return () => {
            isMounted.current = false;

            if (withLifecycle) {
                setIsMountedState(false);
            }
        };
    }, [ withLifecycle ]);

    return useCallback(
        () => (withLifecycle ? isMountedState : isMounted.current),
        [ withLifecycle, isMountedState ],
    );
}
