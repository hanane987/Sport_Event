import React, { useState } from 'react';
import styles from './index.css';
export const FitMaker = () => {
  const [activeTab, setActiveTab] = useState('monthly');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const stats = [
    { number: '96%', text: 'Client Satisfaction' },
    { number: '+5', text: 'Years Experience' },
    { number: '800+', text: 'Active Members' },
    { number: '24/7', text: 'Support Available' }
  ];

  const plans = [
    {
      title: 'Beginner Plan',
      price: { monthly: '49', annual: '470' },
      features: [
        'Basic workout plans',
        'Nutrition guidance',
        'Community access',
        'Progress tracking'
      ]
    },
    {
      title: 'Pro Plan',
      price: { monthly: '99', annual: '990' },
      features: [
        'Advanced workout plans',
        'Personalized nutrition coaching',
        'Priority support',
        'Video consultations'
      ]
    },
    {
      title: 'Custom Plan', 
      price: { monthly: '149', annual: '1490' },
      features: [
        'Fully customized workouts',
        'One-on-one coaching',
        'Exclusive resources',
        'Weekly check-ins'
      ]
    }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoBox} />
          <div className={styles.logoText}>
            Fit<span className={styles.highlight}>Maker</span>
          </div>
        </div>

        <button 
          className={styles.menuButton} 
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className={styles.menuIcon} />
        </button>

        <nav className={`${styles.navigation} ${isMenuOpen ? styles.active : ''}`}>
          <a href="#home" className={styles.active}>Home</a>
          <a href="#programs">Programs</a>
          <a href="#coaching">Coaching</a>
          <a href="#membership">Membership</a>
          <a href="#about">About Us</a>
        </nav>

        <div className={styles.authButtons}>
          <button className={styles.loginBtn}>Login</button>
          <button className={styles.signupBtn}>Sign Up</button>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>
              Achieve Your <span className={styles.highlight}>Fitness Goals</span> With FitMaker
            </h1>
            <p>
              Join the Fitmaker community and transform your fitness journey. Our expert coaches and personalized programs are designed to help you achieve your goals.
            </p>
            <div className={styles.heroButtons}>
              <button className={styles.primaryBtn}>Start Your Journey</button>
              <button className={styles.secondaryBtn}>Explore Programs</button>
            </div>
          </div>
          <img 
            src="/hero-image.jpg" 
            alt="Person exercising" 
            className={styles.heroImage}
            loading="lazy"
          />
        </section>

        <section className={styles.stats}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <span className={styles.statNumber}>{stat.number}</span>
              <p>{stat.text}</p>
            </div>
          ))}
        </section>

        <section className={styles.plans}>
          <h2>Our <span className={styles.highlight}>Plans</span></h2>
          <div className={styles.planTabs}>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'monthly' ? styles.active : ''}`}
              onClick={() => setActiveTab('monthly')}
            >
              Monthly
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'annual' ? styles.active : ''}`}
              onClick={() => setActiveTab('annual')}
            >
              Annual
            </button>
          </div>
          <div className={styles.planCards}>
            {plans.map((plan, index) => (
              <div key={index} className={styles.planCard}>
                <h3>{plan.title}</h3>
                <p className={styles.price}>
                  ${plan.price[activeTab]}
                  <span>/{activeTab === 'monthly' ? 'month' : 'year'}</span>
                </p>
                <ul>
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <button className={styles.planBtn}>Choose Plan</button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <div className={styles.logo}>
              <div className={styles.logoBox} />
              <div className={styles.logoText}>
                Fit<span className={styles.highlight}>Maker</span>
              </div>
            </div>
            <p>Transform Your Body</p>
          </div>
          <div className={styles.footerLinks}>
            <div className={styles.linkColumn}>
              <h3>Company</h3>
              <a href="#about">About Us</a>
              <a href="#services">Our Services</a>
              <a href="#careers">Careers</a>
              <a href="#contact">Contact Us</a>
            </div>
            <div className={styles.linkColumn}>
              <h3>Resources</h3>
              <a href="#tools">Fitness Tools</a>
              <a href="#videos">Workout Videos</a>
              <a href="#nutrition">Nutrition Guides</a>
              <a href="#faq">FAQ</a>
            </div>
            <div className={styles.linkColumn}>
              <h3>Programs</h3>
              <a href="#weight-loss">Weight Loss</a>
              <a href="#muscle">Building Muscles</a>
              <a href="#home">Home Workout</a>
              <a href="#gym">Gym Plan</a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2024 FitMaker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
export default FitMaker;