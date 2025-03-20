import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Dr. Reminder</Link>
      </div>
      <nav className="nav">
        {isLoggedIn.role ? (
          <>
            <Link to="/">الرئيسية</Link>
            {isLoggedIn.role === 'doctor' && (
              <>
                <Link to="/patients">المرضى</Link>
                <Link to="/add-patient">إضافة مريض</Link>
                <Link to="/chat">الدردشة</Link>
                <Link to="/bookings">الحجوزات</Link>
              </>
            )}
            <button className="btn logout-btn" onClick={() => setIsLoggedIn({ role: null, username: null })}>تسجيل الخروج</button>
          </>
        ) : (
          <Link to="/">تسجيل الدخول</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;