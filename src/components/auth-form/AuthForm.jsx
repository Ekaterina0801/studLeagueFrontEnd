import React,  {useState } from 'react';
import './style.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirm: '',
    fullname: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setMessage('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required.';
    if (!formData.password) newErrors.password = 'Password is required.';
    if (!isLogin) {
      if (!formData.confirm) newErrors.confirm = 'Confirm password is required.';
      if (formData.password !== formData.confirm) newErrors.confirm = 'Passwords do not match.';
      if (!formData.email) newErrors.email = 'Email is required.';
      if (!formData.fullname) newErrors.fullname = 'Full name is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: Add API call here
      setMessage(isLogin ? 'Logging in...' : 'Registering...');
      console.log(formData);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        {!isLogin && (
          <>
            <div>
              <label htmlFor="confirm">Confirm Password</label>
              <input
                type="password"
                id="confirm"
                name="confirm"
                value={formData.confirm}
                onChange={handleChange}
                required
              />
              {errors.confirm && <span className="error">{errors.confirm}</span>}
            </div>
            
            <div>
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required
              />
              {errors.fullname && <span className="error">{errors.fullname}</span>}
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
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
          </>
        )}

        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <div className="toggle-link" onClick={toggleForm}>
        {isLogin ? 'New here? Register' : 'Already have an account? Login'}
      </div>
    </div>
  );
};

export default AuthForm;
