import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the UserState interface
interface UserState {
  name: string;
  email: string;
  password: string;
  isLoggedIn: boolean;
}

//interface for login payload
interface LoginPayload {
  email: string;
  password: string;
}

//interface for update user payload
interface UpdateUserPayload {
  name: string;
  email: string;
  password: string;
}

const initialState: UserState = {
  name: '',
  email: '',
  password: '',
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register: (state, action: PayloadAction<UserState>) => {
      const { name, email, password } = action.payload;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify({ name, email, password }));
    },
    login: (state, action: PayloadAction<LoginPayload>) => {
      const { email, password } = action.payload;
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.email === email && user.password === password) {
        state.name = user.name;
        state.email = user.email;
        state.password = user.password;
        state.isLoggedIn = true;
      }
    },
    logout: (state) => {
      state.name = '';
      state.email = '';
      state.password = '';
      state.isLoggedIn = false;
      localStorage.removeItem('user');
    },
    updateUser: (state, action: PayloadAction<UpdateUserPayload>) => {
      const { name, email, password } = action.payload;
      state.name = name;
      state.email = email;
      state.password = password;
      localStorage.setItem('user', JSON.stringify({ name, email, password }));
    },
  },
});

export const { register, login, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
