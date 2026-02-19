import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getContentById, saveContent, trackProgress } from '../../lib/firestoreService';
import type { ContentItem } from '../../types/models';

export function ContentDetailPage() {
  const { contentId = '' } = useParams();
  const { user } = useAuth();
  const [item, setItem] = useState<ContentItem | null>(null);
  const [progressSeconds, setProgressSeconds] = useState(0);

  useEffect(() => {
    void getContentById(contentId).then(setItem);
  }, [contentId]);

  if (!item) return <section className="panel">Loading content…</section>;

  return (
    <section className="panel stack">
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <p>
        Category: {item.category} {item.subcategory ? `· ${item.subcategory}` : ''}
      </p>
      <label>
        Progress (seconds)
        <input
          type="number"
          value={progressSeconds}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setProgressSeconds(Number(event.target.value))}
          min={0}
        />
      </label>
      <div className="actions">
        <button onClick={() => user && void saveContent(user.uid, contentId)}>Save Content</button>
        <button onClick={() => user && void trackProgress(user.uid, contentId, progressSeconds)}>
          Update Progress
        </button>
      </div>
    </section>
  );
}
