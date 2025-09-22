const paths = {
    HOME: "/",
    LOGIN: "/login",
    DASHBOARD: "/dashboard",
    PROFILE: "/profile",

    API: {
        AUTH: "/api/auth",
        USERS: "/api/users",
        UPLOAD: "/api/upload",
    },

    FILES: {
        ICONS: "/icons",
        IMAGES: "/images",
    },

    buildPath: (path, params = {}) => {
        let result = path;
        Object.keys(params).forEach((key) => {
            result = result.replace(`[${key}]`, params[key]);
        });
        return result;
    },

    isActive: (currentPath, targetPath) => {
        return currentPath === targetPath || currentPath.startsWith(targetPath + "/");
    },

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
