import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../api/apiHeaders';
import "./style.css";
const ResetPasswordForm = ({ token }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Пароли не совпадают.');
      return;
    }

    setLoading(true);

    try {
        const response = await axios.post(
            `${API_URL}/auth/confirm-reset-password?token=${token}&newPassword=${newPassword}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        setMessage('Пароль успешно сброшен! Перенаправляем...');
    
        setTimeout(() => {
            const redirectUrl = response.data.redirectUrl;
            window.location.href = redirectUrl;
        }, 2000);
    } catch (err) {
        setError(err.response?.data?.message || 'Произошла ошибка, попробуйте еще раз.');
    }
    
    
  };

  return (
    <div className="reset-password-form">
      <h2>Сброс пароля</h2>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="newPassword">Новый пароль</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">Подтвердите новый пароль</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Сбрасываем...' : 'Сбросить пароль'}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
