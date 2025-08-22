import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated, login, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await login(email, password);
    setIsSubmitting(false);
  };

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-heading font-bold text-primary">РоНи-плюс</h1>
          <h2 className="text-2xl font-heading mt-2 text-neutral-700">Панель администратора</h2>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-card">
          <form onSubmit={handleSubmit}>
            <h3 className="text-xl font-heading font-semibold mb-6 text-neutral-800">Вход в систему</h3>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-3 mb-4">
                {error}
              </div>
            )}
            
            <div className="mb-4">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="form-label" htmlFor="password">
                Пароль
              </label>
              <input
                id="password"
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Вход...' : 'Войти'}
            </button>
          </form>
        </div>
        
        <div className="mt-8 text-center text-sm text-neutral-500">
          <p>© {new Date().getFullYear()} РоНи-плюс. Все права защищены.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;