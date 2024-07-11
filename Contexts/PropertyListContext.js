import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const PropertyContext = createContext();
export const PropertyProvider = ({ children }) => {
  const [propertyData, setPropertyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Function to fetch property data from API
    const fetchProperties = async () => {
      try {
        const response = await axios.get('https://node-trial2.mebamarketing.com/properties');
        setPropertyData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <PropertyContext.Provider value={{ propertyData, loading, error }}>
      {children}
    </PropertyContext.Provider>
  );
};