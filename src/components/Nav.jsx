import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Nav({ darkMode = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navMode, setNavMode] = useState(darkMode ? 'dark-mode' : '');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        if (footerRect.top <= 100) {
          setNavMode('light-mode');
        } else {
          setNavMode(darkMode ? 'dark-mode' : '');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [darkMode]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={navMode}>
        <Link to="/" className="logo">iRUSH</Link>
        <div className="nav-right">
          <ul className="nav-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/work">Our Work</Link></li>
            <li><Link to="/trend">Trend Desk</Link></li>
          </ul>
          <div className="nav-buttons">
            <a href="#" className="nav-btn">Company Brochure</a>
            <a href="#footer" className="nav-btn primary" onClick={handleContactClick}>Contact Us</a>
          </div>
        </div>
      </nav>

      <div className={`hamburger ${isMenuOpen ? 'active' : ''} ${navMode}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/work">Our Work</Link></li>
          <li><Link to="/trend">Trend Desk</Link></li>
          <li><a href="#" className="mobile-btn">Company Brochure</a></li>
          <li><a href="#footer" className="mobile-btn primary" onClick={handleContactClick}>Contact Us</a></li>
        </ul>
      </div>
    </>
  );
}

export default Nav;
