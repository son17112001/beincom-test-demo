import React, { useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { useAuth } from "../../../hooks/useAuth";
import { useInfinitePosts } from "../../../hooks/useInfinitePosts";
import { useScrollRestoration } from "../../../hooks/useScrollRestoration";
import Button from "../../Common/Button";
import PostCard from "../../Common/PostCard";
import Sidebar from "../../Common/Sidebar";

import styles from "./Homepage.module.scss";

const Homepage = () => {
    const { user, isAuthenticated } = useAuth();
    const [ searchQuery, setSearchQuery ] = useState("");
    const [ debouncedSearchQuery, setDebouncedSearchQuery ] = useState("");

    // Use scroll restoration hook
    useScrollRestoration();

    // Debounce search query
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 500);

        return () => clearTimeout(timer);
    }, [ searchQuery ]);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
        refetch,
    } = useInfinitePosts({
        limit: 10,
        searchQuery: debouncedSearchQuery,
    });

    // Flatten all posts from all pages
    const allPosts = useMemo(() => {
        return data?.pages?.flatMap((page) => page.posts) || [];
    }, [ data ]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleClearSearch = () => {
        setSearchQuery("");
    };

    const handleRefresh = () => {
        refetch();
    };

    return (
        <div className={styles.homepage}>
            <div className={styles.container}>
                <div className={styles.mainContent}>
                    <div className={styles.leftSidebar}>
                        <div className={styles.communitiesCard}>
                            <div className={styles.cardHeader}>
                                <h3>Your communities</h3>
                                <div className={styles.headerActions}>
                                    <span>🔍</span>
                                    <span>➕</span>
                                </div>
                            </div>
                            <div className={styles.communityItem}>
                                <div className={styles.communityIcon}>BIC</div>
                                <div className={styles.communityInfo}>
                                    <span className={styles.communityName}>Beincom Việt Nam</span>
                                    <span className={styles.communityBadge}>✓</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.feed}>
                        {isLoading ? (
                            <div className={styles.loadingContainer}>
                                <div className={styles.loadingSpinner} />
                                <p>Loading posts...</p>
                            </div>
                        ) : isError ? (
                            <div className={styles.errorContainer}>
                                <h3>Error loading posts</h3>
                                <p>{error?.message || "Something went wrong"}</p>
                                <Button onClick={handleRefresh}>Try Again</Button>
                            </div>
                        ) : (
                            <div className={styles.postsStats}>
                                <p>
                                    Showing {allPosts.length} posts
                                    {debouncedSearchQuery &&
                                        ` for &quot;${debouncedSearchQuery}&quot;`}
                                </p>
                            </div>
                        )}

                        <InfiniteScroll
                            dataLength={allPosts.length}
                            next={fetchNextPage}
                            hasMore={hasNextPage}
                            loader={
                                <div className={styles.loadingMore}>
                                    <div className={styles.loadingSpinner} />
                                    <p>Loading more posts...</p>
                                </div>
                            }
                            endMessage={
                                <div className={styles.endMessage}>
                                    <p>🎉 You&apos;ve reached the end! No more posts to load.</p>
                                </div>
                            }
                            className={styles.infiniteScrollContainer}
                        >
                            <div className={styles.posts}>
                                {allPosts.map((post) => (
                                    <PostCard key={post.id} post={post} />
                                ))}
                            </div>
                        </InfiniteScroll>

                        {isFetchingNextPage && (
                            <div className={styles.loadingMore}>
                                <div className={styles.loadingSpinner} />
                                <p>Loading more posts...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
