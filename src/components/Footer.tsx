import type { InfoTopic } from '../types';

export default function Footer({ onInfo }: { onInfo: (topic: InfoTopic) => void }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="brand" href="#home">
              <span className="brand-mark" aria-hidden="true">DS</span>
              <span>Dev <span className="gradient-text">Stack</span></span>
            </a>
            <p>Curated tools, technologies, and resources for developers building modern software.</p>
            <div className="social-links">
              {/* Replace a button with <a href="YOUR_PROFILE_URL"> when you have a real URL. */}
              {['GitHub', 'Twitter', 'LinkedIn'].map((name) => (
                <button key={name} type="button" onClick={() => onInfo('social')}>{name}</button>
              ))}
            </div>
          </div>
          <nav className="footer-group" aria-label="Product links">
            <h2>Product</h2><a href="#home">Home</a><a href="#technologies">Technologies</a>
            <button type="button" onClick={() => onInfo('projects')}>Projects</button>
          </nav>
          <nav className="footer-group" aria-label="Company links">
            <h2>Company</h2>
            <button type="button" onClick={() => onInfo('about')}>About</button>
            <button type="button" onClick={() => onInfo('contact')}>Contact</button>
            <button type="button" onClick={() => onInfo('careers')}>Careers</button>
          </nav>
          <nav className="footer-group" aria-label="Legal links">
            <h2>Legal</h2>
            <button type="button" onClick={() => onInfo('privacy')}>Privacy Policy</button>
            <button type="button" onClick={() => onInfo('terms')}>Terms of Service</button>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Dev Stack. All rights reserved.</p>
          <div><button type="button" onClick={() => onInfo('privacy')}>Privacy</button>
            <button type="button" onClick={() => onInfo('terms')}>Terms</button></div>
        </div>
      </div>
    </footer>
  );
}
