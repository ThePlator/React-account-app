import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if any field is empty
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    // Check if email is valid
    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }

    // Check if password is at least 4 characters long
    if (password.length < 4) {
      setError('Password must be at least 4 characters long');
      return;
    }

    // Clear any previous errors
    setError('');

    dispatch(register({ name, email, password, isLoggedIn: true }));
    navigate('/login');
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center mt-5">
      <h2 className="my-4">Register</h2>
      <form
        onSubmit={handleRegister}
        className="w-100"
        style={{ maxWidth: '400px' }}>
        <div className="form-group mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control w-100"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
