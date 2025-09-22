import { useState } from "react";

import { useIsMounted } from "./useIsMounted";


function useMountedState(initialState) {
    const [ state, _setState ] = useState(initialState);
    const isMounted = useIsMounted();

    const setState = (newState) => {
        if (isMounted()) {
            _setState(newState);
        }
    };

    return [ state, setState ];
}

export default useMountedState;
