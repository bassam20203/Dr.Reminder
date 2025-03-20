import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Dr. Reminder</h3>
          <p>تذكير ومتابعة صحية بسهولة وأمان</p>
        </div>
        <div className="footer-section">
          <h3>روابط سريعة</h3>
          <a href="#services">الخدمات</a>
          <a href="#about">من نحن</a>
          <a href="#contact">تواصل معنا</a>
        </div>
        <div className="footer-section">
          <h3>تواصل معنا</h3>
          <p>البريد: info@drreminder.com</p>
          <p>الهاتف: +20 123 456 789</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Dr. Reminder - جميع الحقوق محفوظة</p>
      </div>
    </footer>
  );
};

export default Footer;