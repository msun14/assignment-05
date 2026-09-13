// YOUR IMAGE: copy it to public/images/, then change this URL to its filename.
const HERO_IMAGE = '/images/hero-stack.svg';

export default function Hero({ onLearnMore }: { onLearnMore: () => void }) {
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 id="hero-title">Build Your Ideal<br /><span className="gradient-text">Development Stack</span></h1>
        <p>Explore frontend, backend, database, and tooling options, compare them side by side, and put together the stack that fits your next project.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#technologies">Explore Technologies</a>
          <button className="button button-outline" type="button" onClick={onLearnMore}>Learn More</button>
        </div>
      </div>
      <div className="hero-art">
        <img src={HERO_IMAGE} alt="Illustration of a layered development stack" width="440" height="420" fetchPriority="high" />
      </div>
    </section>
  );
}
