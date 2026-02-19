import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getContentByFilter } from '../../lib/firestoreService';
import type { ContentItem } from '../../types/models';

const categories = [
  { label: 'Cook · African', category: 'cook', subcategory: 'african' },
  { label: 'Cook · Continental', category: 'cook', subcategory: 'continental' },
  { label: 'Care · Bathing', category: 'care', subcategory: 'bathing' },
  { label: 'DIY · Guides', category: 'diy' },
  { label: 'Family · Activities', category: 'family', type: 'activity' },
  { label: 'Family · Stories', category: 'family', type: 'story' }
] as const;

export function CategoriesPage() {
  const [active, setActive] = useState(0);
  const [items, setItems] = useState<ContentItem[]>([]);

  useEffect(() => {
    const selection = categories[active];
    void getContentByFilter(selection).then(setItems);
  }, [active]);

  return (
    <section className="panel stack">
      <h2>Explore categories</h2>
      <div className="tabs">
        {categories.map((item, index) => (
          <button key={item.label} className={active === index ? 'active' : ''} onClick={() => setActive(index)}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="grid">
        {items.map((item) => (
          <Link to={`/content/${item.id}`} key={item.id} className="card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
