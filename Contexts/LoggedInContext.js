import React, { createContext, useState } from 'react';

// Create a Context
export const LoggedInContext = createContext();

export const LoggedInContextProvider = ({ children }) => {
  const [user_id, setUser_id] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoggedInContext.Provider value={{ user_id, setUser_id, isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoggedInContext.Provider>
  );
};
