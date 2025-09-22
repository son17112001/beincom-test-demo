import React, { useState } from 'react';
import Link from 'next/link';

import { useUser } from '../../../hooks/useInfinitePosts';

import styles from './PostCard.module.scss';

const PostCard = ({ post }) => {
    const [ isExpanded, setIsExpanded ] = useState(false);
    const { data: user, isLoading: userLoading } = useUser(post.userId);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };


    const getExcerpt = (text, maxLength = 150) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <div className={styles.postCard}>
            <div className={styles.postHeader}>
                <div className={styles.userInfo}>
                    <div className={styles.avatar}>
                        {userLoading ? (
                            <div className={styles.avatarSkeleton} />
                        ) : (
                            <span className={styles.avatarText}>
                                {user?.name?.charAt(0) || 'U'}
                            </span>
                        )}
                    </div>
                    <div className={styles.userDetails}>
                        <h4 className={styles.authorName}>
                            {userLoading ? (
                                <div className={styles.nameSkeleton} />
                            ) : (
                                user?.name || 'Unknown User'
                            )}
                        </h4>
                        <p className={styles.postId}>Post #{post.id}</p>
                    </div>
                </div>
            </div>

            <div className={styles.postContent}>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <div className={styles.postBody}>
                    {isExpanded ? (
                        <p className={styles.postText}>{post.body}</p>
                    ) : (
                        <p className={styles.postText}>{getExcerpt(post.body)}</p>
                    )}
                    {post.body.length > 150 && (
                        <button
                            className={styles.readMoreBtn}
                            onClick={toggleExpanded}
                        >
                            {isExpanded ? 'Read Less' : 'Read More'}
                        </button>
                    )}
                </div>
            </div>

            <div className={styles.postFooter}>
                <div className={styles.postActions}>
                    <Link
                        href={`/posts/${post.id}`}
                        className={styles.viewBtn}
                    >
                        View Details
                    </Link>
                    <span className={styles.commentCount}>
                        💬 Comments
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
