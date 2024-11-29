import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import styles from '../styles/dashboard.module.css';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events'); 
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    
      <div className={styles.fitMakerWebsite}>
        <header className={styles.header}>
          <div className={styles.logoContainer}>
            <div className={styles.logoWrapper}>
              <div className={styles.logoBox}>
                <div className={styles.redBox} />
                <div className={styles.logoText}>
                  Fit<span className={styles.redText}>Maker</span>
                </div>
              </div>
              <div className={styles.tagline}>Transform Your Body</div>
            </div>
          </div>
  
          <div className={styles.searchContainer} role="search">
            <label htmlFor="searchInput" className="visually-hidden">Search</label>
            <input
              type="search"
              id="searchInput"
              className={styles.searchInput}
              placeholder="Search"
              aria-label="Search"
            />
            <img src="/images/search-icon.svg" alt="" className={styles.searchIcon} />
          </div>
  
          <nav className={styles.navigation} role="navigation">
            <ul className={styles.navList}>
              {['Home', 'Programs', 'Coaching', 'Membership', 'About Us'].map((item, index) => (
                <li key={index} className={styles.navItem}>
                  {item}
                  {index < 3 && (
                    <img 
                      src={`/images/dropdown-${index + 1}.svg`}
                      alt=""
                      className={styles.dropdownIcon}
                    />
                  )}
                </li>
              ))}
            </ul>
          </nav>
  
          <div className={styles.authContainer}>
            <button className={styles.loginButton}>Login</button>
            <button className={styles.signupButton}>Sign Up</button>
          </div>
        </header>
  
        <main>
          <section className={styles.heroSection}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                Achieve Your 
                <span className={styles.highlight}>Fitness Goals</span>
                With FitMaker
              </h1>
              <p className={styles.heroDescription}>
                Join the Fitmaker community and transform your fitness journey. 
                Our expert coaches and personalized programs are designed to help 
                you achieve your goals and exceed your expectations. Ready to make a change?
              </p>
              <div className={styles.buttonGroup}>
                <button className={styles.primaryButton}>Start Your Journey</button>
                <button className={styles.secondaryButton}>Explore Programs</button>
              </div>
            </div>
            <img 
            src="/assets/sport.jpeg" 
            alt="Fitness trainer demonstrating exercise" 
            className={styles.heroImage} 
          />
          </section>
  
          <section className={styles.statsSection}>
            {[
              {
                number: '96%',
                title: 'Client Satisfaction',
                description: 'Our members love their results and experience',
                color: 'red'
              },
              {
                number: '+5',
                title: 'years of Experience',
                description: 'Trust in our proven track record of transforming',
                color: 'orange'
              },
              {
                number: '+800',
                title: 'Active Members',
                description: 'Join our thriving fitness community',
                color: 'red'
              },
              {
                number: '24/7',
                title: 'Support Available',
                description: 'Expert assistance whenever you need it',
                color: 'orange'
              }
            ].map((stat, index) => (
              <div key={index} className={styles.statContainer}>
                <div className={styles.statTitle}>
                  <span className={`${styles.statNumber} ${styles[stat.color]}`}>
                    {stat.number}
                  </span>
                  {stat.title}
                </div>
                <div className={styles.statDescription}>{stat.description}</div>
              </div>
            ))}
          </section>
  
          <section className={styles.servicesSection}>
          <div className={styles.servicesHeader}>
            <h2 className={styles.servicesTitle}>
              Our <span className={styles.highlight}>Services</span>
            </h2>
            <p className={styles.servicesDescription}>
              At this part, you can easily access all of our services. Take a look at them and choose whichever you want.
            </p>
          </div>
          <div className={styles.servicesGrid}>
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
        </main>
  
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerLogo}>
              <div className={styles.logoBox}>
                <div className={styles.redBox} />
                <div className={styles.logoText}>
                  Fit<span className={styles.redText}>Maker</span>
                </div>
              </div>
              <p className={styles.footerDescription}>
                Transform Your Body with FitMaker, Your Trusted Partner in Fitness
              </p>
            </div>
  
            <div className={styles.footerLinks}>
              <div className={styles.linkColumn}>
                <h3>Company</h3>
                <ul>
                  <li>About us</li>
                  <li>Our Services</li>
                  <li>Careers</li>
                  <li>Blog</li>
                  <li>Contact Us</li>
                </ul>
              </div>
  
              <div className={styles.linkColumn}>
                <h3>Resources</h3>
                <ul>
                  <li>Fitness tools</li>
                  <li>Workout Videos</li>
                  <li>Nutrition Guides</li>
                  <li>FAQ</li>
                  <li>Success Stories</li>
                </ul>
              </div>
  
              <div className={styles.linkColumn}>
                <h3>Programs</h3>
                <ul>
                  <li>Weight Loss</li>
                  <li>Building muscles</li>
                  <li>Home Workout</li>
                  <li>Gym Plan</li>
                  <li>Fitness group</li>
                </ul>
              </div>
  
              <div className={styles.contactInfo}>
                <h3>Contact Us</h3>
                <div className={styles.contactDetails}>
                  <div className={styles.contactItem}>
                    <img src="/images/location.svg" alt="" />
                    <span>USA - Washington DC</span>
                  </div>
                  <div className={styles.contactItem}>
                    <img src="/images/phone.svg" alt="" />
                    <span>1234-56789</span>
                  </div>
                  <div className={styles.contactItem}>
                    <img src="/images/email.svg" alt="" />
                    <span>Fitmakerrr@Gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
};

export default Dashboard;
