import React from 'react';

const Features = () => {
  return (
    <div className="features-page">
      <h2>مميزات Dr. Reminder</h2>
      <div className="features-grid">
        <div className="feature-card">
          <img src="https://img.freepik.com/free-icon/calendar_318-996172.jpg" alt="Scheduling" />
          <h3>جدولة المواعيد</h3>
          <p>إدارة مواعيد المرضى بسهولة حسب التخصص والطبيب.</p>
        </div>
        <div className="feature-card">
          <img src="https://img.freepik.com/free-icon/whatsapp_318-1014797.jpg" alt="Notifications" />
          <h3>تذكيرات تلقائية</h3>
          <p>إرسال إشعارات عبر واتساب لتذكير المرضى بمواعيدهم.</p>
        </div>
        <div className="feature-card">
          <img src="https://img.freepik.com/free-icon/notes_318-1014799.jpg" alt="Notes" />
          <h3>ملاحظات مخصصة</h3>
          <p>إضافة ملاحظات خاصة بكل مريض لحالته الصحية.</p>
        </div>
      </div>
    </div>
  );
};

export default Features;