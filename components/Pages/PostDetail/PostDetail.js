import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { usePost, usePostComments, useUser } from "../../../hooks/useInfinitePosts";
import Button from "../../Common/Button";
import CommentForm from "../../Common/CommentForm";
import Container from "../../Common/Container";

import styles from "./PostDetail.module.scss";

const PostDetailContent = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data: post, isLoading: postLoading, isError: postError } = usePost(id);
    const {
        data: comments,
        isLoading: commentsLoading,
        refetch: refetchComments,
    } = usePostComments(id);
    const { data: user, isLoading: userLoading } = useUser(post?.userId);

    if (postLoading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner} />
                <p>Loading post...</p>
            </div>
        );
    }

    if (postError || !post) {
        return (
            <div className={styles.errorContainer}>
                <h2>Post not found</h2>
                <p>The post you&apos;re looking for doesn&apos;t exist.</p>
                <Link href="/posts">
                    <Button>Back to Posts</Button>
                </Link>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>{post.title} - Post Details</title>
                <meta name="description" content={post.body.substring(0, 160)} />
            </Head>

            <Container>
                <div className={styles.postDetail}>
                    <div className={styles.backButton}>
                        <Link href="/">
                            <Button type="ghost">← Back to Posts</Button>
                        </Link>
                    </div>

                    <article className={styles.post}>
                        <header className={styles.postHeader}>
                            <div className={styles.userInfo}>
                                <div className={styles.avatar}>
                                    {userLoading ? (
                                        <div className={styles.avatarSkeleton} />
                                    ) : (
                                        <span className={styles.avatarText}>
                                            {user?.name?.charAt(0) || "U"}
                                        </span>
                                    )}
                                </div>
                                <div className={styles.userDetails}>
                                    <h3 className={styles.authorName}>
                                        {userLoading ? (
                                            <div className={styles.nameSkeleton} />
                                        ) : (
                                            user?.name || "Unknown User"
                                        )}
                                    </h3>
                                    <p className={styles.postMeta}>
                                        Post #{post.id} • User ID: {post.userId}
                                    </p>
                                </div>
                            </div>
                        </header>

                        <div className={styles.postContent}>
                            <h1 className={styles.postTitle}>{post.title}</h1>
                            <div className={styles.postBody}>
                                <p>{post.body}</p>
                            </div>
                        </div>
                    </article>

                    <CommentForm postId={id} onCommentAdded={refetchComments} />

                    <section className={styles.commentsSection}>
                        <h2 className={styles.commentsTitle}>Comments ({comments?.length || 0})</h2>

                        {commentsLoading ? (
                            <div className={styles.commentsLoading}>
                                <div className={styles.loadingSpinner} />
                                <p>Loading comments...</p>
                            </div>
                        ) : (
                            <div className={styles.commentsList}>
                                {comments?.length === 0 ? (
                                    <div className={styles.noComments}>
                                        <p>No comments yet. Be the first to comment!</p>
                                    </div>
                                ) : (
                                    comments?.map((comment) => (
                                        <div key={comment.id} className={styles.comment}>
                                            <div className={styles.commentHeader}>
                                                <h4 className={styles.commentAuthor}>
                                                    {comment.name}
                                                </h4>
                                                <span className={styles.commentEmail}>
                                                    {comment.email}
                                                </span>
                                            </div>
                                            <p className={styles.commentBody}>{comment.body}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </section>
                </div>
            </Container>
        </>
    );
};

export default PostDetailContent;
