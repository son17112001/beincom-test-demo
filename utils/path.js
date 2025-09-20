export const generateAsPath = ({ asPath, query, pathname }) => {
    if (!asPath) return pathname;

    // Simple implementation for generating asPath
    const queryString = Object.keys(query)
        .filter(key => query[key] !== undefined && query[key] !== null && query[key] !== '')
        .map(key => `${key}=${encodeURIComponent(query[key])}`)
        .join('&');

    return queryString ? `${asPath}?${queryString}` : asPath;
};
