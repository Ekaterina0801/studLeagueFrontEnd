import { useState } from 'react';

const useNewTeam = () => {
  const [newTeam, setNewTeam] = useState({ teamName: '', university: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTeam((prevTeam) => ({ ...prevTeam, [name]: value }));
  };

  const handleTeamSubmit = async (e, addNewTeam) => {
    e.preventDefault();
    try {
      const teamDTO = {
        name: newTeam.name,
        university: newTeam.university,
        leagueId: parseInt(newTeam.leagueId, 10),
      };

      const result = await addNewTeam(teamDTO);
      console.log('New team added successfully:', result);
      alert('Команда добавлена успешно!');
    } catch (error) {
      console.error('Error adding new team:', error);
      alert('Произошла ошибка при добавлении команды.');
    }
  };

  return { newTeam, handleChange, handleTeamSubmit };
};

export default useNewTeam;
