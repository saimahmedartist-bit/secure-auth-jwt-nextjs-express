import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // ✅ Client-side check only
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (!token) {
        router.push('/login');
      } else {
        setIsAuthenticated(true);
        if (userData) {
          setUser(JSON.parse(userData));
        }
      }
    }
  }, []);

  if (!isAuthenticated) {
    return <p>Checking authentication...</p>;
  }

  return (
    <div style={{
      height: '100vh',
      backgroundColor: '#000',
      color: '#fff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      fontFamily: 'Arial',
    }}>
      <h1>Welcome to the Dashboard ✅</h1>
      {user && <h2>Welcome, {user.name} 👋</h2>}
      <p>You are successfully logged in.</p>

      <button
        style={{
          marginTop: '20px',
          padding: '10px 25px',
          background: '#fff',
          color: '#000',
          border: 'none',
          fontWeight: 'bold',
          cursor: 'pointer',
          borderRadius: '5px'
        }}
        onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/login');
        }}
      >
        Logout
      </button>
    </div>
  );
}
