
import { useState, useEffect } from 'react';
import { addNewLeague } from '../api/apiLeagues';
import { getSystemResults } from '../api/apiSystemResult';

const useNewLeague = () => {
  const [newLeague, setNewLeague] = useState({
    name: '',
    countExcludedGames: '',
    systemResultId: '',
  });
  const [systemResults, setSystemResults] = useState([]);


  useEffect(() => {
    const loadSystemResults = async () => {
      try {
        const results = await getSystemResults();
        setSystemResults(results);
      } catch (error) {
        console.error('Error fetching system results:', error);
      }
    };

    loadSystemResults();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLeague((prevLeague) => ({ ...prevLeague, [name]: value }));
  };


  return { 
    newLeague, 
    systemResults, 
    handleChange
  };
};

export default useNewLeague;
