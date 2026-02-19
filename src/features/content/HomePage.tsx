import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getLatestResumeContent, getSuggestedContent } from '../../lib/firestoreService';
import type { ContentItem } from '../../types/models';

export function HomePage() {
  const { user } = useAuth();
  const [resumeItem, setResumeItem] = useState<ContentItem | null>(null);
  const [suggested, setSuggested] = useState<ContentItem[]>([]);

  useEffect(() => {
    if (!user) return;

    void (async () => {
      const [resume, suggestions] = await Promise.all([
        getLatestResumeContent(user.uid),
        getSuggestedContent()
      ]);
      setResumeItem(resume);
      setSuggested(suggestions);
    })();
  }, [user]);

  return (
    <div className="stack">
      <section className="panel">
        <h2>Continue where you left off</h2>
        {resumeItem ? (
          <Link to={`/content/${resumeItem.id}`} className="card">
            <h3>{resumeItem.title}</h3>
            <p>{resumeItem.description}</p>
          </Link>
        ) : (
          <p>No progress yet. Start exploring new content below.</p>
        )}
      </section>
      <section className="panel">
        <h2>Suggested for you</h2>
        <div className="grid">
          {suggested.map((item) => (
            <Link key={item.id} to={`/content/${item.id}`} className="card">
              <h3>{item.title}</h3>
              <p>{item.category} · {item.subcategory ?? 'general'}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
