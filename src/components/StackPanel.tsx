import type { Technology } from '../types';

interface Props {
  stack: Technology[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export default function StackPanel({ stack, onRemove, onClear }: Props) {
  return (
    <aside className="stack-panel" id="your-stack" aria-labelledby="stack-title">
      <h2 id="stack-title">Your Stack</h2>
      <p className="stack-count" role="status" aria-live="polite" aria-atomic="true">
        {stack.length === 0 ? 'No technologies selected yet.'
          : `${stack.length} ${stack.length === 1 ? 'Technology' : 'Technologies'} Selected`}
      </p>
      {stack.length === 0 ? <div className="empty-stack">Your stack is empty.</div> : (
        <>
          <ul className="stack-list">
            {stack.map((technology) => (
              <li key={technology.id} className="stack-item">
                <img className="technology-logo" src={technology.icon} alt="" width="28" height="28" />
                <div className="stack-item-copy"><h3>{technology.name}</h3><p>{technology.category}</p></div>
                <button className="icon-button remove-item" type="button"
                  aria-label={`Remove ${technology.name} from stack`} onClick={() => onRemove(technology.id)}>
                  <span aria-hidden="true">×</span>
                </button>
              </li>
            ))}
          </ul>
          <button className="remove-all" type="button" onClick={onClear}>Remove All</button>
        </>
      )}
    </aside>
  );
}
