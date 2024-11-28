import React, { useState } from 'react';
import styles from './index.css';
export const FitMaker = () => {
  const [activeTab, setActiveTab] = useState('monthly');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

}