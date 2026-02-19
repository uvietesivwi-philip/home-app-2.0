import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createServiceRequest } from '../../lib/firestoreService';

export function RequestsPage() {
  const { user } = useAuth();
  const [type, setType] = useState<'maid' | 'driver' | 'caregiver' | 'nanny'>('maid');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');

  async function submitRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;
    await createServiceRequest(user.uid, { type, notes });
    setStatus('Request submitted. Our team will review shortly.');
    setNotes('');
  }

  return (
    <section className="panel stack">
      <h2>Request trusted services</h2>
      <form onSubmit={submitRequest} className="stack">
        <select
          value={type}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setType(event.target.value as typeof type)}
        >
          <option value="maid">Maid</option>
          <option value="driver">Driver</option>
          <option value="caregiver">Caregiver</option>
          <option value="nanny">Nanny</option>
        </select>
        <textarea
          value={notes}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(event.target.value)}
          placeholder="Describe timing, requirements, and safety notes"
          rows={4}
          required
        />
        <button type="submit">Submit request</button>
      </form>
      {status && <p className="success">{status}</p>}
    </section>
  );
}
