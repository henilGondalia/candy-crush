import { useState } from 'react';
import './login.scss';

const Login = ({saveData}) => {
  const [userName, setuserName] = useState(null);

  return (
    <div className='login'>
      <div className="login-box">
        <div className="login-inner">
          <h2>Login</h2>
          <div className="user-box">
            <input
              type="text"
              name="name"
              required
              onChange={(e) => setuserName(e.target.value)}
            />
            <label>Username</label>
          </div>
          <button className="submit-btn" onClick={() => saveData(userName)}>Start Game</button>
        </div>
      </div>
      <div className="footer">
          <footer>made with ❤️ | ©️2023</footer>
      </div>
    </div>
  );
};

export default Login;
