import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
        const data = await dispatch(signUp(email, firstName, lastName, age, password));
        if (data) {
          setErrors(data)
        }
    } else {
        setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <div className='outer-form'>
      <div className="form-container">
        <div className='create-form-header'>
          Sign up for blickr
        </div>
          <form className='actual-form signup' onSubmit={handleSubmit}>
            <div>
              {errors.map((error, idx) => <div className='errors' key={idx}>{error}</div>)}
            </div>
            <label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeHolder='Email'
                required
              />
            </label>
            <label>
              {/* First Name */}
              <input
                placeHolder='First Name'
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            <label>
              {/* Last Name */}
              <input
                placeHolder='Last Name'
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
            <label>
              {/* Age */}
              <input
                placeHolder='Age'
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </label>
            <label>
              {/* Password */}
              <input
                placeHolder='Password'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <label>
              {/* Confirm Password */}
              <input
                placeHolder='Confirm Password'
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit">Sign Up</button>
          </form>
        <div className='terms'>By signing up, you agree with blickr's Terms of Services and Privacy Policy.</div>

      </div>
    </div>
  );
}

export default SignupFormPage;
