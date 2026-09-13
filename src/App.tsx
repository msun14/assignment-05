import { useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechnologyCard from './components/TechnologyCard';
import StackPanel from './components/StackPanel';
import Footer from './components/Footer';
import { categories, difficulties } from './types';
import type { InfoTopic, Technology } from './types';

// Edit the supporting page text here. Technology data stays in the JSON file.
const information: Record<InfoTopic, { title: string; text: string }> = {
  about: { title: 'Build with a clearer plan', text: 'Choose one technology per category to plan your next project. Ratings and badges are illustrative catalog data, not live reviews or compatibility guarantees.' },
  projects: { title: 'Ideas for your next project', text: 'Try React, TypeScript, and Tailwind CSS for a portfolio. Explore Vue.js, Node.js, and PostgreSQL for a product dashboard.' },
  contact: { title: 'Contact Dev Stack', text: 'A contact address has not been published yet.' },
  signin: { title: 'Build without an account', text: 'Sign in is not available yet. You can use the complete stack builder without an account.' },
  signup: { title: 'Your next stack starts here', text: 'Registration is not available yet. Explore the technologies and start building your stack now.' },
  privacy: { title: 'Privacy in this demo', text: 'Your selections stay in this page and reset on refresh. This app does not save accounts or stack choices to a server and includes no analytics. The hosting provider may process request logs.' },
  terms: { title: 'Using Dev Stack', text: 'This educational catalog helps you explore technologies. Names and logos belong to their respective owners. Check each technology for suitability before starting a real project.' },
  careers: { title: 'Careers', text: 'There are no open positions listed for this educational project.' },
  social: { title: 'Stay connected', text: 'Social profiles have not been published for this project yet.' },
};

// Check JSON before rendering, so a mistyped field produces a readable error.
function isTechnology(value: unknown): value is Technology {
  if (typeof value !== 'object' || value === null) return false;
  const item = value as Record<string, unknown>;
  return ['id', 'name', 'description', 'icon', 'badge'].every(
    (field) => typeof item[field] === 'string' && item[field].trim() !== '',
  ) && categories.some((category) => category === item.category)
    && difficulties.some((difficulty) => difficulty === item.difficulty)
    && typeof item.rating === 'number' && Number.isFinite(item.rating)
    && item.rating >= 0 && item.rating <= 5;
}

export default function App() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [stack, setStack] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reload, setReload] = useState(0);
  const [info, setInfo] = useState<InfoTopic | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  // The ref prevents duplicate additions if two events happen before a render.
  const latestStack = useRef<Technology[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    async function loadData() {
      try {
        const response = await fetch('/data/technologies.json', { signal: controller.signal });
        if (!response.ok) throw new Error('Could not load technologies. Please try again.');
        const data: unknown = await response.json();
        if (!Array.isArray(data) || data.length === 0 || !data.every(isTechnology)) {
          throw new Error('Check the required fields in technologies.json.');
        }
        if (new Set(data.map((item) => item.id)).size !== data.length) {
          throw new Error('Each technology must have a unique ID.');
        }
        if (!controller.signal.aborted) setTechnologies(data);
      } catch (caught: unknown) {
        if (!controller.signal.aborted) {
          setError(caught instanceof Error ? caught.message : 'Could not load technologies.');
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void loadData();
    return () => controller.abort();
  }, [reload]);

  useEffect(() => {
    if (info && !dialogRef.current?.open) dialogRef.current?.showModal();
  }, [info]);

  function updateStack(next: Technology[]) {
    latestStack.current = next;
    setStack(next);
  }

  function addToStack(technology: Technology) {
    const current = latestStack.current;
    if (current.some((item) => item.id === technology.id)) {
      toast.warn(`${technology.name} is already in your stack.`);
      return;
    }
    // The supplied UI says: choose one technology per category.
    const existing = current.find((item) => item.category === technology.category);
    if (existing) {
      toast.warn(`Remove ${existing.name} first to choose another ${technology.category} technology.`);
      return;
    }
    updateStack([...current, technology]);
    toast.success(`${technology.name} added to your stack.`);
  }

  function removeFromStack(id: string) {
    const technology = latestStack.current.find((item) => item.id === id);
    if (!technology) return;
    updateStack(latestStack.current.filter((item) => item.id !== id));
    toast.info(`${technology.name} removed from your stack.`);
  }

  function removeAll() {
    if (latestStack.current.length === 0) return;
    updateStack([]);
    toast.info('All technologies removed from your stack.');
  }

  function retry() {
    setError('');
    setLoading(true);
    setReload((value) => value + 1);
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div id="home" />
      <Navbar onInfo={setInfo} />
      <main id="main-content" tabIndex={-1}>
        <Hero onLearnMore={() => setInfo('about')} />
        <section id="technologies" className="technologies-section container" aria-labelledby="technologies-title">
          <div className="section-heading">
            <div><h2 id="technologies-title">Explore the <span className="section-highlight">Technologies</span></h2>
              <p>Pick one technology per category to build your ideal stack.</p></div>
            <a className="mobile-stack-link" href="#your-stack">Your Stack ({stack.length})</a>
          </div>
          <div className="builder-layout">
            {loading ? (
              <div className="catalog-status" role="status"><span className="spinner" aria-hidden="true" />Loading technologies...</div>
            ) : error ? (
              <div className="catalog-status catalog-error" role="alert"><h3>We couldn’t load the technologies</h3><p>{error}</p>
                <button className="button button-outline" type="button" onClick={retry}>Try Again</button></div>
            ) : (
              <div className="technology-grid">
                {technologies.map((technology) => (
                  <TechnologyCard key={technology.id} technology={technology}
                    isSelected={stack.some((item) => item.id === technology.id)} onAdd={addToStack} />
                ))}
              </div>
            )}
            <StackPanel stack={stack} onRemove={removeFromStack} onClear={removeAll} />
          </div>
        </section>
      </main>
      <Footer onInfo={setInfo} />
      <dialog className="info-dialog" ref={dialogRef} aria-labelledby="dialog-title" onClose={() => setInfo(null)}>
        <button className="icon-button dialog-close" type="button" aria-label="Close dialog" onClick={() => dialogRef.current?.close()}>×</button>
        <span className="dialog-eyebrow">DEV STACK</span>
        <h2 id="dialog-title">{info ? information[info].title : ''}</h2>
        <p>{info ? information[info].text : ''}</p>
        <a className="button button-primary" href="#technologies" onClick={() => dialogRef.current?.close()}>Explore Technologies</a>
      </dialog>
      <ToastContainer position="bottom-right" autoClose={2800} limit={3} hideProgressBar closeOnClick
        pauseOnHover theme="light" aria-label="Stack notifications" />
    </>
  );
}
