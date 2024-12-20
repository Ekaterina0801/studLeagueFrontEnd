
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

  const handleLeagueSubmit = async (e) => {
    e.preventDefault();

    try {
      const leagueDTO = {
        name: newLeague.name,
        countExcludedGames: newLeague.countExcludedGames || 0, 
        systemResultId: newLeague.systemResultId,
      };

      const result = await addNewLeague(leagueDTO);
      console.log('New league added successfully:', result);
      alert('Лига добавлена успешно!');
      setTimeout(() => {
        window.location.reload();
    }, 2000);
    } catch (error) {
      console.error('Error adding new league:', error);
      alert('Произошла ошибка при добавлении лиги.');
    }
  };

  return { 
    newLeague, 
    systemResults, 
    handleChange, 
    handleLeagueSubmit 
  };
};

export default useNewLeague;
