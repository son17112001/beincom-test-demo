import React, { useState } from "react";

import { useAuth } from "../../../hooks/useAuth";
import Button from "../../Common/Button";
import Post from "../../Common/Post";
import Sidebar from "../../Common/Sidebar";

import styles from "./Homepage.module.scss";

const Homepage = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const [ posts, setPosts ] = useState([
        {
            id: 1,
            author: {
                name: "John Doe",
                avatar: "/images/avatar1.jpg",
            },
            content:
                "Just finished building an amazing React component! The new hooks API makes everything so much cleaner. #react #webdev #coding",
            image: "/images/post1.jpg",
            likes: 24,
            comments: [
                {
                    author: { name: "Jane Smith", avatar: "/images/avatar2.jpg" },
                    text: "Great work! Can you share the code?",
                    createdAt: "2 hours ago",
                },
            ],
            createdAt: "3 hours ago",
        },
        {
            id: 2,
            author: {
                name: "Sarah Wilson",
                avatar: "/images/avatar3.jpg",
            },
            content:
                "Excited to announce our new Social Community Platform! 🚀 We're building something amazing together. Join the conversation!",
            likes: 156,
            comments: [
                {
                    author: { name: "Mike Johnson", avatar: "/images/avatar4.jpg" },
                    text: "This looks incredible! When can we try it?",
                    createdAt: "1 hour ago",
                },
                {
                    author: { name: "Alex Chen", avatar: "/images/avatar5.jpg" },
                    text: "Count me in! 🎉",
                    createdAt: "45 minutes ago",
                },
            ],
            createdAt: "5 hours ago",
        },
        {
            id: 3,
            author: {
                name: "Tech Community",
                avatar: "/images/community.jpg",
            },
            content:
                "Weekly coding challenge is live! This week's theme: Build a real-time chat application. Winners get featured on our platform. Good luck everyone! 💻",
            image: "/images/challenge.jpg",
            likes: 89,
            comments: [],
            createdAt: "1 day ago",
        },
    ]);

    const handleLogout = () => {
        logout();
    };

    const handleLike = (postId, isLiked) => {
        console.log(`Post ${postId} ${isLiked ? "liked" : "unliked"}`);
    };

    const handleComment = (postId) => {
        console.log(`Commenting on post ${postId}`);
    };

    const handleShare = (postId) => {
        console.log(`Sharing post ${postId}`);
    };

    if (!isAuthenticated) {
        return (
            <div className={styles.homepage}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Chào mừng đến với Social Community Platform</h1>
                    <div className={styles.unauthenticatedContent}>
                        <p className={styles.description}>
                            Vui lòng đăng nhập để truy cập các tính năng của Social Community
                            Platform.
                        </p>
                        <div className={styles.actions}>
                            <Button
                                type="primary"
                                onClick={() => (window.location.href = "/login")}
                            >
                                Đăng nhập
                            </Button>
                            <Button
                                type="secondary"
                                onClick={() => (window.location.href = "/register")}
                            >
                                Đăng ký
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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
                        <div className={styles.welcomeCard}>
                            <div className={styles.welcomeHeader}>
                                <div className={styles.userAvatar}>
                                    {user?.name?.charAt(0) || 'U'}
                                </div>
                                <div className={styles.welcomeText}>
                                    <h3 className={styles.welcomeTitle}>Welcome back, {user?.name || 'User'}</h3>
                                    <p className={styles.welcomeSubtitle}>Share new ideas with your community!</p>
                                </div>
                            </div>
                            <div className={styles.quickActions}>
                                <button className={styles.quickActionBtn}>
                                    ✏️ Quick Post
                                </button>
                                <button className={styles.quickActionBtn}>
                                    📄 Write Article
                                </button>
                                <button className={styles.quickActionBtn}>
                                    🍃 Create Series
                                </button>
                            </div>
                            <div className={styles.logoSection}>
                                <div className={styles.logo}>beincom</div>
                            </div>
                        </div>

                        <div className={styles.contentTabs}>
                            <div className={styles.tabs}>
                                <a href="#" className={styles.tab}>Explore</a>
                                <a href="#" className={`${styles.tab} ${styles.active}`}>Following</a>
                                <a href="#" className={styles.tab}>Saved</a>
                            </div>
                            <button className={styles.filterBtn}>Filter</button>
                        </div>

                        <div className={styles.createPost}>
                            <div className={styles.createPostHeader}>
                                <div className={styles.userAvatar}>
                                    {user?.name?.charAt(0) || 'U'}
                                </div>
                                <input
                                    type="text"
                                    placeholder="What's on your mind?"
                                    className={styles.postInput}
                                />
                            </div>
                            <div className={styles.createPostActions}>
                                <Button type="ghost" size="small">
                                    📷 Photo
                                </Button>
                                <Button type="ghost" size="small">
                                    🎥 Video
                                </Button>
                                <Button type="ghost" size="small">
                                    😊 Feeling
                                </Button>
                                <Button type="primary" size="small">
                                    Post
                                </Button>
                            </div>
                        </div>

                        <div className={styles.posts}>
                            {posts.map((post) => (
                                <Post
                                    key={post.id}
                                    post={post}
                                    onLike={handleLike}
                                    onComment={handleComment}
                                    onShare={handleShare}
                                />
                            ))}
                        </div>
                    </div>

                    <div className={styles.rightSidebar}>
                        <Sidebar />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
