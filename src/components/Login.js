import React, { useState } from 'react';

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const patient = patients.find(p => p.username === username && p.password === password);
  
    let userData = null;
  
    if (username === 'doctor' && password === '12345') {
      userData = { role: 'doctor', username: 'doctor' };
    } else if (patient) {
      userData = { role: 'patient', username: patient.name };
    }
  
    if (userData) {
      localStorage.setItem('loggedInUser', JSON.stringify(userData)); // حفظ بيانات تسجيل الدخول
      setIsLoggedIn(userData);
    } else {
      alert('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };
  

  return (
    <div className="login">
      <h2>تسجيل الدخول</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="اسم المستخدم"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn primary-btn">دخول</button>
      </form>
    </div>
  );
};

export default Login;