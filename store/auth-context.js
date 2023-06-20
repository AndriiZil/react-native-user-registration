import { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState('');

  async function authenticate(token) {
    setAuthToken(token);
    await AsyncStorage.setItem('token', token);
  }

  async function logout() {
    setAuthToken('');
    await AsyncStorage.removeItem('token');
  }

  const value = {
    logout,
    authenticate,
    token: authToken,
    isAuthenticated: Boolean(authToken),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;
