// Basic application paths
const paths = {
    // Main pages
    HOME: "/",
    LOGIN: "/login",
    DASHBOARD: "/dashboard",
    PROFILE: "/profile",

    // API endpoints
    API: {
        AUTH: "/api/auth",
        USERS: "/api/users",
        UPLOAD: "/api/upload",
    },

    // File paths
    FILES: {
        ICONS: "/icons",
        IMAGES: "/images",
    },

    // Utility functions
    buildPath: (path, params = {}) => {
        let result = path;
        Object.keys(params).forEach((key) => {
            result = result.replace(`[${key}]`, params[key]);
        });
        return result;
    },

    // Navigation helpers
    isActive: (currentPath, targetPath) => {
        return currentPath === targetPath || currentPath.startsWith(targetPath + "/");
    },

    // Breadcrumb helpers
    getBreadcrumbs: (path) => {
        const segments = path.split("/").filter(Boolean);
        const breadcrumbs = [ { name: "Home", path: "/" } ];

        let currentPath = "";
        segments.forEach((segment, index) => {
            currentPath += `/${segment}`;
            const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
            breadcrumbs.push({
                name,
                path: currentPath,
                isLast: index === segments.length - 1,
            });
        });

        return breadcrumbs;
    },
};

export default paths;
