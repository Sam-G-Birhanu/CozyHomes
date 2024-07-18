import React, { createContext, useState, useEffect, useContext } from 'react';
import { LoggedInContext } from './LoggedInContext';
export const FavoritePropertyContext = createContext();

export const FavoritePropertyProvider = ({ children }) => {
  const [favoritePropertyData, setFavoritePropertyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {user_id, setUser_id, isLoggedIn, setIsLoggedIn} = useContext(LoggedInContext);

  useEffect(() => {
    // Function to fetch property data from API
    const fetchProperties = async () => {
      try {
        const response = await fetch('https://node-trial2.mebamarketing.com/favorites');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("favorites data", data)
        setFavoritePropertyData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

     if (user_id) {
      fetchProperties();
    }
  }, [user_id]); 

  return (
    <FavoritePropertyContext.Provider value={{favoritePropertyData, loading, error}}>
      {children}
    </FavoritePropertyContext.Provider>
  );
};
