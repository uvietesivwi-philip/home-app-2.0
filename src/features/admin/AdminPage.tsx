import { useState } from 'react';

export function AdminPage() {
  const [message, setMessage] = useState('');

  return (
    <section className="panel stack">
      <h2>Admin content control center</h2>
      <p>
        Client writes to <code>content</code> are blocked by security rules. Use Firebase Console or secure Admin SDK service.
      </p>
      <textarea
        value={message}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(event.target.value)}
        rows={5}
        placeholder="Draft content announcement / release checklist"
      />
      <button onClick={() => window.alert('Integrate this page with privileged admin backend or Cloud Functions.')}>
        Preview admin workflow
      </button>
    </section>
  );
}
