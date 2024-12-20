import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { API_URL } from "../../api/apiHeaders";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirm: "",
    fullname: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setIsForgotPassword(false);
    setErrors({});
    setMessage("");
  };

  const toggleForgotPassword = () => {
    setIsForgotPassword(true);
    setErrors({});
    setMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!isForgotPassword) {
      if (!formData.username) newErrors.username = "Логин обязателен";
      if (!formData.password) newErrors.password = "Пароль обязателен";
      if (!isLogin) {
        if (!formData.confirm)
          newErrors.confirm = "Требуется подтверждение пароля";
        if (formData.password !== formData.confirm)
          newErrors.confirm = "Пароли не совпадают";
        if (!formData.email) newErrors.email = "Email обязателен";
        if (!formData.fullname) newErrors.fullname = "ФИО обязательно";
      }
    } else {
      if (!formData.email)
        newErrors.email = "Email обязателен для восстановления пароля";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      setMessage("");

      try {
        let response;

        if (isForgotPassword) {
          // Sending password reset request
          console.log(formData.email); 
          response = await axios.post(
            `${API_URL}/auth/request-password-reset?email=${encodeURIComponent(
              formData.email
            )}`
          );

          setMessage(
            response.data ||
              "Инструкция по восстановлению пароля отправлена на вашу почту."
          );
        } else if (isLogin) {
          // Login
          response = await axios.post(`${API_URL}/auth/sign-in`, {
            username: formData.username,
            password: formData.password,
          });

          setMessage("Успешный вход!");
          const { accessToken, refreshToken, refreshTokenExpiresAt } =
            response.data;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("expiresAt", refreshTokenExpiresAt);
          window.location.href = "/teams";
        } else {
          // Registration
          response = await axios.post(`${API_URL}/auth/sign-up`, {
            username: formData.username,
            confirm: formData.confirm,
            password: formData.password,
            email: formData.email,
            fullname: formData.fullname,
          });
          setMessage("Регистрация успешна!");
          setIsLogin(true);
        }
      } catch (error) {
        console.error(error);
        setMessage(
          error.response?.data?.message ||
            "Что-то пошло не так, повторите попытку"
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="auth-form-container">
      <h2>
        {isForgotPassword
          ? "Восстановление пароля"
          : isLogin
          ? "Логин"
          : "Регистрация"}
      </h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        {isForgotPassword ? (
          <>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Отправка..." : "Восстановить пароль"}
            </button>
          </>
        ) : (
          <>
            <div>
              <label htmlFor="username">Логин</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              {errors.username && (
                <span className="error">{errors.username}</span>
              )}
            </div>

            <div>
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>

            {!isLogin && (
              <>
                <div>
                  <label htmlFor="confirm">Подтвердите пароль</label>
                  <input
                    type="password"
                    id="confirm"
                    name="confirm"
                    value={formData.confirm}
                    onChange={handleChange}
                    required
                  />
                  {errors.confirm && (
                    <span className="error">{errors.confirm}</span>
                  )}
                </div>

                <div>
                  <label htmlFor="fullname">ФИО</label>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    required
                  />
                  {errors.fullname && (
                    <span className="error">{errors.fullname}</span>
                  )}
                </div>

                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && (
                    <span className="error">{errors.email}</span>
                  )}
                </div>
              </>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : isLogin ? "Логин" : "Регистрация"}
            </button>
          </>
        )}
      </form>

      {!isForgotPassword && (
        <div className="toggle-link" onClick={toggleForm}>
          {isLogin
            ? "Впервые здесь? Зарегистрируйтесь"
            : "Уже есть аккаунт? Авторизуйтесь"}
        </div>
      )}

      {isLogin && !isForgotPassword && (
        <div className="toggle-link" onClick={toggleForgotPassword}>
          Забыли пароль?
        </div>
      )}
    </div>
  );
};

export default AuthForm;
