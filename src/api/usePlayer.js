import { useState } from 'react';

const usePlayer = () => {
  const [playerForm, setPlayerForm] = useState({
    name: '',
    patronymic: '',
    surname: '',
    university: null,
    dateOfBirth: null,
    teamIds: [],
  });

  const handlePlayerChange = (e) => {
    const { name, value } = e.target;
    setPlayerForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const resetPlayerForm = () => {
    setPlayerForm({
      name: '',
      patronymic: '',
      surname: '',
      university: null,
      dateOfBirth: null,
      teamIds: [],
    });
  };

  return {
    playerForm,
    handlePlayerChange,
    resetPlayerForm,
  };
};

export default usePlayer;
