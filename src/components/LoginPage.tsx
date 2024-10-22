import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../features/user/userSlice';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if any field is empty
    if (!email || !password) {
      setError('All fields are required');
      return;
    }

    // Clear any previous errors
    setError('');

    dispatch(login({ email, password }));
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (user && user.email === email && user.password === password) {
      navigate('/account');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center mt-5">
      <h2 className="my-4">Login</h2>
      <form
        onSubmit={handleLogin}
        className="w-100"
        style={{ maxWidth: '400px' }}>
        <div className="form-group mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control w-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control w-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary mt-3">
            Login
          </button>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/register')}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
