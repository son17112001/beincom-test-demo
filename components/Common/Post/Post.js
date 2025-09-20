import React, { useState } from 'react';

import { useAuth } from '../../../hooks/useAuth';
import Button from '../Button';

import styles from './Post.module.scss';

const Post = ({ post, onLike, onComment, onShare }) => {
    const { user } = useAuth();
    const [ isLiked, setIsLiked ] = useState(false);
    const [ likeCount, setLikeCount ] = useState(post.likes || 0);
    const [ showComments, setShowComments ] = useState(false);

    const handleLike = () => {
        const newLiked = !isLiked;
        setIsLiked(newLiked);
        setLikeCount(prev => newLiked ? prev + 1 : prev - 1);
        if (onLike) onLike(post.id, newLiked);
    };

    const handleComment = () => {
        setShowComments(!showComments);
        if (onComment) onComment(post.id);
    };

    const handleShare = () => {
        if (onShare) onShare(post.id);
    };

    return (
        <div className={styles.post}>
            <div className={styles.postHeader}>
                <div className={styles.userInfo}>
                    <div className={styles.avatar}>
                        <img src={post.author.avatar || '/images/default-avatar.png'} alt={post.author.name} />
                    </div>
                    <div className={styles.userDetails}>
                        <h4 className={styles.authorName}>{post.author.name}</h4>
                        <p className={styles.postTime}>{post.createdAt}</p>
                    </div>
                </div>
                <div className={styles.postActions}>
                    <Button type="ghost" size="small">⋯</Button>
                </div>
            </div>

            <div className={styles.postContent}>
                <p className={styles.postText}>{post.content}</p>
                {post.image && (
                    <div className={styles.postImage}>
                        <img src={post.image} alt="Post content" />
                    </div>
                )}
            </div>

            <div className={styles.postStats}>
                <span className={styles.likeCount}>{likeCount} likes</span>
                <span className={styles.commentCount}>{post.comments?.length || 0} comments</span>
            </div>

            <div className={styles.postActions}>
                <Button
                    type="ghost"
                    onClick={handleLike}
                    className={`${styles.actionBtn} ${isLiked ? styles.liked : ''}`}
                >
                    👍 Like
                </Button>
                <Button
                    type="ghost"
                    onClick={handleComment}
                    className={styles.actionBtn}
                >
                    💬 Comment
                </Button>
                <Button
                    type="ghost"
                    onClick={handleShare}
                    className={styles.actionBtn}
                >
                    🔗 Share
                </Button>
            </div>

            {showComments && (
                <div className={styles.commentsSection}>
                    <div className={styles.commentInput}>
                        <div className={styles.commentAvatar}>
                            <img src={user?.avatar || '/images/default-avatar.png'} alt={user?.name} />
                        </div>
                        <input
                            type="text"
                            placeholder="Write a comment..."
                            className={styles.commentField}
                        />
                    </div>
                    {post.comments?.map((comment, index) => (
                        <div key={index} className={styles.comment}>
                            <div className={styles.commentAvatar}>
                                <img src={comment.author.avatar || '/images/default-avatar.png'} alt={comment.author.name} />
                            </div>
                            <div className={styles.commentContent}>
                                <h5 className={styles.commentAuthor}>{comment.author.name}</h5>
                                <p className={styles.commentText}>{comment.text}</p>
                                <span className={styles.commentTime}>{comment.createdAt}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Post;
