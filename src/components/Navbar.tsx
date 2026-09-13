import { useEffect, useRef, useState } from 'react';
import type { InfoTopic } from '../types';

export default function Navbar({ onInfo }: { onInfo: (topic: InfoTopic) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(window.location.hash || '#home');
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateHash = () => setActive(window.location.hash || '#home');
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        menuRef.current?.focus();
      }
    };
    window.addEventListener('hashchange', updateHash);
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeWithEscape);
    return () => {
      window.removeEventListener('hashchange', updateHash);
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', closeWithEscape);
    };
  }, [menuOpen]);

  function showInfo(topic: InfoTopic) {
    if (menuOpen) menuRef.current?.focus();
    setMenuOpen(false);
    onInfo(topic);
  }

  const links = (
    <>
      <a href="#home" aria-current={active === '#home' ? 'page' : undefined} onClick={() => setMenuOpen(false)}>Home</a>
      <a href="#technologies" aria-current={active === '#technologies' ? 'page' : undefined} onClick={() => setMenuOpen(false)}>Technologies</a>
      <button type="button" onClick={() => showInfo('projects')}>Projects</button>
      <button type="button" onClick={() => showInfo('about')}>About</button>
      <button type="button" onClick={() => showInfo('contact')}>Contact</button>
    </>
  );

  return (
    <header className="site-header" ref={headerRef}>
      <div className="navbar container">
        <button ref={menuRef} className="icon-button mobile-toggle" type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen} aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(!menuOpen)}>
          <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
        </button>
        <a href="#home" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark" aria-hidden="true">DS</span>
          <span>Dev <span className="gradient-text">Stack</span></span>
        </a>
        <nav className="desktop-navigation" aria-label="Main navigation">{links}</nav>
        <div className="auth-actions">
          {/* Replace these buttons with real account links when you add authentication. */}
          <button className="sign-in" type="button" onClick={() => showInfo('signin')}>Sign In</button>
          <button className="button button-primary sign-up" type="button" onClick={() => showInfo('signup')}>Sign Up</button>
        </div>
      </div>
      <nav id="mobile-navigation" className="mobile-navigation container" aria-label="Mobile navigation" hidden={!menuOpen}>
        {links}
      </nav>
    </header>
  );
}
