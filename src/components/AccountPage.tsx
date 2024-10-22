import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';
import { logout, updateUser } from '../features/user/userSlice';

const AccountPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const [name, setName] = useState<string>(user.name);
  const [email, setEmail] = useState<string>(user.email);
  const [password, setPassword] = useState<string>(user.password);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUser({ name, email, password }));
    setIsEditing(false);
    alert('Account updated successfully');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center mt-5">
      <h2 className="my-4">Account Information</h2>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        {!isEditing ? (
          <div>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <button
              className="btn btn-primary mt-3 w-100"
              onClick={() => setIsEditing(true)}>
              Update Information
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdate}>
            <div className="form-group mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control w-100"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control w-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>New Password (leave blank to keep current)</label>
              <input
                type="password"
                className="form-control w-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </form>
        )}
        <button className="btn btn-danger mt-3 w-100" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
