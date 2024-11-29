import React from 'react';
import styles from '../styles/adminHome.module.css';



export const DashboardLayout = () => {
  return (
    <main className={styles.dashboard} role="main">
      <div className={styles.contentWrapper}>
        <aside className={styles.sidebar} role="complementary">
          <div className={styles.userProfile}>
    
            <h2 className={styles.userName}>Samantha</h2>
            <p className={styles.userEmail}>samantha@email.com</p>
          </div>
          <nav className={styles.navigation} aria-label="Main navigation">
            {navigationLinks.map((link) => (
              <button
                key={link.text}
                className={`${styles.sidebarLink} ${link.isActive ? styles.active : ''}`}
                aria-current={link.isActive ? 'page' : undefined}
              >
                {link.text}
              </button>
            ))}
          </nav>
        </aside>
        <section className={styles.mainContent} aria-label="Dashboard content">
          <div className={styles.contentBackground}>
            <div className={styles.cardContainer}>
            
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
export default DashboardLayout;