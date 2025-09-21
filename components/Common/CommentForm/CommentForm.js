import React, { useState } from "react";
import Link from "next/link";

import { useAuth } from "../../../hooks/useAuth";
import { useCreateComment } from "../../../hooks/useComments";
import Button from "../Button";
import InputField from "../InputField";

import styles from "./CommentForm.module.scss";

const CommentForm = ({ postId, onCommentAdded }) => {
    const { user, isAuthenticated } = useAuth();
    const [ comment, setComment ] = useState("");
    const [ error, setError ] = useState("");
    const createCommentMutation = useCreateComment();

    const handleSubmit = async (e) => {
        console.log("handleSubmit", e);
        e.preventDefault();

        if (!isAuthenticated) {
            setError("You must be logged in to comment");
            return;
        }

        if (!comment.trim()) {
            setError("Please enter a comment");
            return;
        }

        setError("");

        createCommentMutation.mutate(
            {
                postId: parseInt(postId),
                body: comment.trim(),
                name: user.name,
                email: user.email,
            },
            {
                onSuccess: () => {
                    setComment("");
                    onCommentAdded?.();
                },
                onError: (error) => {
                    setError(error.message || "Failed to add comment");
                },
            },
        );
    };

    if (!isAuthenticated) {
        return (
            <div className={styles.loginPrompt}>
                <p>
                    Please <Link href="/login">login</Link> to leave a comment.
                </p>
            </div>
        );
    }

    return (
        <form className={styles.commentForm} onSubmit={handleSubmit}>
            <div className={styles.formHeader}>
                <h3>Leave a Comment</h3>
                <p>
                    Commenting as <strong>{user?.name}</strong>
                </p>
            </div>

            <div className={styles.formGroup}>
                <InputField
                    type="textarea"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your comment here..."
                    rows={4}
                    disabled={createCommentMutation.isPending}
                    error={error}
                />
            </div>

            <div className={styles.formActions}>
                <Button
                    type="submit"
                    disabled={createCommentMutation.isPending || !comment.trim()}
                    loading={createCommentMutation.isPending}
                    onClick={handleSubmit}
                >
                    {createCommentMutation.isPending ? "Posting..." : "Post Comment"}
                </Button>
            </div>
        </form>
    );
};

export default CommentForm;
