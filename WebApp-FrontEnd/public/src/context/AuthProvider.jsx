import { useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';

import { types } from '../types/types';

const init = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));

  return {
    logged: !!user,
    user: user,
  }
}


export const AuthProvider = ({ children }) => {

  const [authState, dispatch] = useReducer(authReducer, {}, init);

  const login = (data) => {
    const user = data; 
    const action = { type: types.login, payload: user }

    sessionStorage.setItem('user', JSON.stringify(user));

    dispatch(action);
  }

  const logout = () => {
    sessionStorage.removeItem('user');
    const action = { type: types.logout };
    dispatch(action);
  }


  return (
    <AuthContext.Provider value={{
      ...authState,
      //methods
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}