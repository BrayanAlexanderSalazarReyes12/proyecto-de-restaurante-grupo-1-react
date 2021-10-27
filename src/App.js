
import { useReducer, useEffect } from 'react';
import './App.css';
import { AuthContext } from './auth/AuthContext';
import { authReducer } from './auth/authReducer';

import { RouterApp } from './routers/RouterApp';

const init = () => {
  return JSON.parse(localStorage.getItem('user')) || {  }
}

function App() {

  const [user, dispatch] = useReducer(authReducer, {}, init)

  useEffect(() => {
    localStorage.setItem("user",JSON.stringify(user))
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, dispatch}}>
      <RouterApp />
    </AuthContext.Provider>
  );
}

export default App;
