import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AccountPage from './components/AccountPage';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';

function App() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/account" /> : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/account"
          element={isLoggedIn ? <AccountPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
