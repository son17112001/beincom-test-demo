// App Context
import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [ activeRole, setActiveRole ] = useState(null);
    const [ user, setUser ] = useState(null);

    const value = {
        activeRole,
        setActiveRole,
        user,
        setUser,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
