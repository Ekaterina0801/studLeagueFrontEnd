import { useState } from 'react';
import { addNewTeam } from '../api/apiTeams';
import { useLeagueId } from './useLeagueId';
const useNewTeam = () => {
  const [newTeam, setNewTeam] = useState({ teamName: '', university: '' });
  const leagueId = useLeagueId();
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTeam((prevTeam) => ({ ...prevTeam, [name]: value }));
  };

  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    
    try {
      
      const teamDTO = {
        name: newTeam.teamName,
        university: newTeam.university,
        leagueId: leagueId,
        idSite: newTeam.idSite
      };

      const result = await addNewTeam(teamDTO);
      setMessage('Команда успешно добавлена!');
      setTimeout(() => {
        window.location.reload();
    }, 2000);
      console.log('New team added successfully:', result);
    } catch (error) {
      console.error('Error adding new team:', error);
      alert('Произошла ошибка при добавлении команды.');
    }
  };

  return { newTeam, handleChange, handleTeamSubmit, message };
};

export default useNewTeam;
