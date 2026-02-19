import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getUserSavedContent } from '../../lib/firestoreService';
import type { ContentItem } from '../../types/models';

export function SavedPage() {
  const { user } = useAuth();
  const [saved, setSaved] = useState<ContentItem[]>([]);

  useEffect(() => {
    if (!user) return;
    void getUserSavedContent(user.uid).then(setSaved);
  }, [user]);

  return (
    <section className="panel stack">
      <h2>Saved content</h2>
      <div className="grid">
        {saved.map((item) => (
          <Link to={`/content/${item.id}`} key={item.id} className="card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
