import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to={`/user/${sessionUser.id}/photos`} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }

  };

  return (
    <div className='outer-form'>
      <div className='form-container' id='login-form-container'>
        <div>
          <div className='create-form-header'>Log in to blickr</div>
        </div>
        <div>
          <form className='actual-form' id="login" onSubmit={handleSubmit}>
            <div>
              {errors.map((error, idx) => (
                <div className='errors' key={idx}>{error}</div>
              ))}
            </div>
            <label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder='Email'
              />
            </label>
            <label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder='Password'
              />
            </label>
            <button type="submit">Log In</button>
            <button type='submit' onClick={() => {
              setEmail('demo@aa.io')
              setPassword('password')
            }}
            >Demo User</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
