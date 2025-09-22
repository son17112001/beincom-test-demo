export { default as AuthForm } from "./AuthForm";
export { default as Button } from "./Button";
export { default as CommentForm } from "./CommentForm";
export { default as Container } from "./Container";
export { default as ProtectedRoute } from "./ProtectedRoute";
export const Typography = ({ variant = "body1", children, textAlign, mb, ...props }) => {
    const Tag = variant === "h1" ? "h1" : variant === "h2" ? "h2" : variant === "h3" ? "h3" : "p";

    const styles = {
        textAlign,
        marginBottom: mb,
        ...props,
    };

    return <Tag style={styles}>{children}</Tag>;
};
