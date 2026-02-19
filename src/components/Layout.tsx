import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Layout() {
  const { logOut } = useAuth();

  return (
    <div className="app-shell">
      <header>
        <h1>Home App 2.0</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/requests">Requests</Link>
          <Link to="/saved">Saved</Link>
          <Link to="/admin">Admin</Link>
          <button onClick={() => void logOut()}>Logout</button>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
