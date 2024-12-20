import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ResetPasswordForm from '../components/forms/ResetPasswordForm';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); 

  if (!token) {
    return <p>Недействительный или отсутствующий токен.</p>;
  }

  return (
    <div className="reset-password-page">
      <ResetPasswordForm token={token} />
    </div>
  );
};

export default ResetPasswordPage;
