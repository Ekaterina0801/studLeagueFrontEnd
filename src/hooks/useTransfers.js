import { useState } from 'react';
import { addNewTransfer } from '../api/apiTransfers';

export const useTransfers = () => {
  const [transferForm, setTransferForm] = useState({
    oldTeamId: "",
    newTeamId: "",
    transferDate: "",
    comment: "",
    playerId: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handleTransferChange = (e) => {
    const { name, value } = e.target;
    setTransferForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleTransferSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNewTransfer(transferForm);
      setSuccessMessage("Трансфер игрока успешно выполнен");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Ошибка трансфера игрока");
    }
  };

  return {
    transferForm,
    successMessage,
    error,
    handleTransferChange,
    handleTransferSubmit,
  };
};
