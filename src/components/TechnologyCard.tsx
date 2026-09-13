import type { Technology } from '../types';

interface Props {
  technology: Technology;
  isSelected: boolean;
  onAdd: (technology: Technology) => void;
}

export default function TechnologyCard({ technology, isSelected, onAdd }: Props) {
  return (
    <article className="technology-card" aria-labelledby={`technology-${technology.id}`}>
      <div className="card-top">
        <img className="technology-logo" src={technology.icon} alt="" width="29" height="29" loading="lazy" />
        <span className={`badge badge-${technology.id}`}>{technology.badge}</span>
      </div>
      <h3 id={`technology-${technology.id}`}>{technology.name}</h3>
      <p className="card-description">{technology.description}</p>
      <div className="card-meta">
        <span className="category-chip">{technology.category}</span>
        <span className="difficulty">{technology.difficulty}</span>
        <span className="rating" aria-label={`${technology.rating.toFixed(1)} out of 5 stars`}>
          <span className="rating-star" aria-hidden="true">★</span>{technology.rating.toFixed(1)}
        </span>
      </div>
      <button className={`add-button${isSelected ? ' is-added' : ''}`} type="button"
        disabled={isSelected} onClick={() => onAdd(technology)}>
        {isSelected && <span className="check" aria-hidden="true">✓</span>}
        {isSelected ? 'Added to Stack' : 'Add to Stack'}
      </button>
    </article>
  );
}
