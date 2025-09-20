import React, { useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { useInfinitePosts } from "../../../hooks/useInfinitePosts";
import Button from "../../Common/Button";
import PostCard from "../../Common/PostCard";
import SearchAndFilter from "../../Common/SearchAndFilter";

import styles from "./Homepage.module.scss";

const Homepage = () => {
    const [ searchQuery, setSearchQuery ] = useState("");
    const [ debouncedSearchQuery, setDebouncedSearchQuery ] = useState("");
    const [ sortBy, setSortBy ] = useState("newest");
    const [ filterBy, setFilterBy ] = useState("all");

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

    // Flatten all posts from all pages and apply sorting/filtering
    const allPosts = useMemo(() => {
        let posts = data?.pages?.flatMap((page) => page.posts) || [];

        // Apply filtering
        if (filterBy !== 'all') {
            switch (filterBy) {
                case 'recent':
                    // Filter posts from last 7 days (simulated)
                    posts = posts.filter((_, index) => index < 20); // Simulate recent posts
                    break;
                case 'popular':
                    // Filter posts with many comments (simulated)
                    posts = posts.filter((_, index) => index % 3 === 0); // Simulate popular posts
                    break;
                case 'trending':
                    // Filter posts with moderate comments (simulated)
                    posts = posts.filter((_, index) => index % 2 === 0); // Simulate trending posts
                    break;
                default:
                    break;
            }
        }

        // Apply sorting
        switch (sortBy) {
            case 'newest':
                posts = [ ...posts ].sort((a, b) => b.id - a.id);
                break;
            case 'oldest':
                posts = [ ...posts ].sort((a, b) => a.id - b.id);
                break;
            case 'most_comments':
                posts = [ ...posts ].sort((a, b) => (b.commentCount || 0) - (a.commentCount || 0));
                break;
            case 'least_comments':
                posts = [ ...posts ].sort((a, b) => (a.commentCount || 0) - (b.commentCount || 0));
                break;
            case 'title_asc':
                posts = [ ...posts ].sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'title_desc':
                posts = [ ...posts ].sort((a, b) => b.title.localeCompare(a.title));
                break;
            default:
                break;
        }

        return posts;
    }, [ data, sortBy, filterBy ]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleClearSearch = () => {
        setSearchQuery("");
    };

    const handleRefresh = () => {
        refetch();
    };

    const handleSortChange = (newSortBy) => {
        setSortBy(newSortBy);
    };

    const handleFilterChange = (newFilterBy) => {
        setFilterBy(newFilterBy);
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
                        <SearchAndFilter
                            searchQuery={searchQuery}
                            onSearchChange={handleSearch}
                            onClearSearch={handleClearSearch}
                            onSortChange={handleSortChange}
                            onFilterChange={handleFilterChange}
                            sortBy={sortBy}
                            filterBy={filterBy}
                            totalResults={allPosts.length}
                        />

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
                        ) : null}

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
