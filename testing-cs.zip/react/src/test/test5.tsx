// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useAuth } from './test4';
import { useNavigate } from 'react-router-dom'; 

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await login(username, password);
    if (!success) {
      setError('Invalid username or password.');
    }
  };

  if (loading) {
    return <div>Loading authentication state...</div>;
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={loading}>Log In</button>
      </form>
      <style jsx>{`
        .login-container {
          max-width: 400px;
          margin: 50px auto;
          padding: 30px;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          background-color: #fff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        h2 { text-align: center; color: #333; margin-bottom: 25px; }
        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 8px; color: #555; font-weight: 600; }
        input[type="text"], input[type="password"] {
          width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 5px;
          box-sizing: border-box; font-size: 16px;
        }
        input[type="text"]:focus, input[type="password"]:focus {
          border-color: #007bff; outline: none; box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        }
        button {
          width: 100%; padding: 12px; background-color: #007bff; color: white;
          border: none; border-radius: 5px; font-size: 17px; cursor: pointer;
          transition: background-color 0.2s ease;
        }
        button:hover:not(:disabled) { background-color: #0056b3; }
        button:disabled { background-color: #cccccc; cursor: not-allowed; }
        .error-message { color: #dc3545; text-align: center; margin-top: 15px; font-size: 14px; }
      `}</style>
    </div>
  );
};

export default LoginPage;