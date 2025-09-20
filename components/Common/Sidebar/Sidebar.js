import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import Button from '../Button';

import styles from './Sidebar.module.scss';

const Sidebar = () => {
    const { user, isAuthenticated } = useAuth();

    const quickActions = [
        { icon: '📝', label: 'Create Post', action: '/create-post' },
        { icon: '👥', label: 'Find Friends', action: '/friends' },
        { icon: '🎯', label: 'Events', action: '/events' },
        { icon: '📊', label: 'Analytics', action: '/analytics' },
    ];

    const trendingTopics = [
        '#technology',
        '#programming',
        '#webdev',
        '#react',
        '#nextjs',
        '#javascript',
    ];

    const suggestedUsers = [
        { name: 'John Doe', avatar: '/images/avatar1.jpg', followers: '1.2k' },
        { name: 'Jane Smith', avatar: '/images/avatar2.jpg', followers: '856' },
        { name: 'Mike Johnson', avatar: '/images/avatar3.jpg', followers: '2.1k' },
    ];

    return (
        <aside className={styles.sidebar}>
            {isAuthenticated && (
                <div className={styles.userCard}>
                    <div className={styles.userInfo}>
                        <div className={styles.avatar}>
                            <img src={user?.avatar || '/images/default-avatar.png'} alt={user?.name} />
                        </div>
                        <div className={styles.userDetails}>
                            <h4 className={styles.userName}>{user?.name}</h4>
                            <p className={styles.userEmail}>{user?.email}</p>
                        </div>
                    </div>
                    <Button type="primary" size="small">View Profile</Button>
                </div>
            )}

            <div className={styles.quickActions}>
                <h3 className={styles.sectionTitle}>Quick Actions</h3>
                <div className={styles.actionsList}>
                    {quickActions.map((action, index) => (
                        <button key={index} className={styles.actionItem}>
                            <span className={styles.actionIcon}>{action.icon}</span>
                            <span className={styles.actionLabel}>{action.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.trendingTopics}>
                <h3 className={styles.sectionTitle}>Trending Topics</h3>
                <div className={styles.topicsList}>
                    {trendingTopics.map((topic, index) => (
                        <a key={index} href={`/topic/${topic.slice(1)}`} className={styles.topicItem}>
                            {topic}
                        </a>
                    ))}
                </div>
            </div>

            <div className={styles.suggestedUsers}>
                <h3 className={styles.sectionTitle}>Suggested for You</h3>
                <div className={styles.usersList}>
                    {suggestedUsers.map((suggestedUser, index) => (
                        <div key={index} className={styles.userItem}>
                            <div className={styles.userAvatar}>
                                <img src={suggestedUser.avatar} alt={suggestedUser.name} />
                            </div>
                            <div className={styles.userInfo}>
                                <h5 className={styles.suggestedUserName}>{suggestedUser.name}</h5>
                                <p className={styles.followerCount}>{suggestedUser.followers} followers</p>
                            </div>
                            <Button type="secondary" size="small">Follow</Button>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.footer}>
                <p className={styles.footerText}>
                    © 2024 Social Community Platform
                </p>
                <div className={styles.footerLinks}>
                    <a href="/privacy">Privacy</a>
                    <a href="/terms">Terms</a>
                    <a href="/help">Help</a>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
