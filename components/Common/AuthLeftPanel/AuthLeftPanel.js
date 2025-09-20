import React from 'react';
import styles from './AuthLeftPanel.module.scss';

const AuthLeftPanel = () => {
    return (
        <div className={styles.leftPanel}>
            <div className={styles.logo}>beincom</div>
            <div className={styles.features}>
                <div className={styles.feature}>
                    <div className={styles.featureIcon}>✓</div>
                    <div className={styles.featureContent}>
                        <h3 className={styles.featureTitle}>Social Community Platform</h3>
                        <p className={styles.featureDescription}>
                            Beincom is the platform for building and engaging with communities.
                        </p>
                    </div>
                </div>
                <div className={styles.feature}>
                    <div className={styles.featureIcon}>✓</div>
                    <div className={styles.featureContent}>
                        <h3 className={styles.featureTitle}>Always Reach</h3>
                        <p className={styles.featureDescription}>
                            Contents created by communities are always distributed to all members' newsfeeds.
                        </p>
                    </div>
                </div>
                <div className={styles.feature}>
                    <div className={styles.featureIcon}>✓</div>
                    <div className={styles.featureContent}>
                        <h3 className={styles.featureTitle}>Quality Content</h3>
                        <p className={styles.featureDescription}>
                            Read & Write with quality and earn rewards for each post.
                        </p>
                    </div>
                </div>
                <div className={styles.feature}>
                    <div className={styles.featureIcon}>✓</div>
                    <div className={styles.featureContent}>
                        <h3 className={styles.featureTitle}>Security</h3>
                        <p className={styles.featureDescription}>
                            Rigorous account verification and security mechanisms using Web3 (Blockchain) technology.
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.bicIcon}>BIC</div>
        </div>
    );
};

export default AuthLeftPanel;
