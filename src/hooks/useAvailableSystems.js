import { useState, useEffect } from 'react';
import { getSystemResults } from '../api/apiSystemResult';


export const useAvailableSystems = () => {
  const [availableSystems, setAvailableSystems] = useState([]);

  useEffect(() => {
    const fetchSystems = async () => {
      try {
        const data = await getSystemResults();
        setAvailableSystems(data);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };

    fetchSystems();
  }, []);

  return availableSystems;
};

