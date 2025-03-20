import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // تأكدي من استيراد ملف CSS إذا لم يكن موجودًا

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Dr. Reminder</Link>
      </div>
      <button className="hamburger" onClick={toggleMenu}>
        {isMenuOpen ? '✕' : '☰'} {/* رمز الهمبرجر وعلامة الإغلاق */}
      </button>
      <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
        {isLoggedIn.role ? (
          <>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>الرئيسية</Link>
            {isLoggedIn.role === 'doctor' && (
              <>
                <Link to="/patients" onClick={() => setIsMenuOpen(false)}>المرضى</Link>
                <Link to="/add-patient" onClick={() => setIsMenuOpen(false)}>إضافة مريض</Link>
                <Link to="/chat" onClick={() => setIsMenuOpen(false)}>الدردشة</Link>
                <Link to="/bookings" onClick={() => setIsMenuOpen(false)}>الحجوزات</Link>
              </>
            )}
            <button
              className="btn logout-btn"
              onClick={() => {
                setIsLoggedIn({ role: null, username: null });
                setIsMenuOpen(false);
              }}
            >
              تسجيل الخروج
            </button>
          </>
        ) : (
          <Link to="/" onClick={() => setIsMenuOpen(false)}>تسجيل الدخول</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;