import React, { useState } from 'react';

import { useAuth } from '../../../hooks/useAuth';
import Button from '../Button';
import Input from '../Input';

import styles from './CommentForm.module.scss';

const CommentForm = ({ postId, onCommentAdded }) => {
    const { user, isAuthenticated } = useAuth();
    const [ comment, setComment ] = useState('');
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ error, setError ] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            setError('Please log in to comment');
            return;
        }

        if (!comment.trim()) {
            setError('Please enter a comment');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    postId: parseInt(postId),
                    name: user.name || 'Anonymous',
                    email: user.email || 'user@example.com',
                    body: comment.trim(),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit comment');
            }

            const newComment = await response.json();
            setComment('');
            onCommentAdded?.(newComment);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className={styles.loginPrompt}>
                <p>Please log in to leave a comment</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={styles.commentForm}>
            <div className={styles.formHeader}>
                <div className={styles.userInfo}>
                    <div className={styles.avatar}>
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <span className={styles.userName}>
                        {user?.name || 'Anonymous'}
                    </span>
                </div>
            </div>

            <div className={styles.formBody}>
                <Input
                    type="textarea"
                    placeholder="Write your comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    className={styles.commentInput}
                />

                {error && (
                    <div className={styles.errorMessage}>
                        {error}
                    </div>
                )}
            </div>

            <div className={styles.formActions}>
                <Button
                    type="submit"
                    disabled={isSubmitting || !comment.trim()}
                    loading={isSubmitting}
                >
                    {isSubmitting ? 'Posting...' : 'Post Comment'}
                </Button>
            </div>
        </form>
    );
};

export default CommentForm;
