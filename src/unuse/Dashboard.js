import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ patients }) => {
  const upcomingAppointments = patients.filter(p => new Date(p.appointment) > new Date()).length;

  return (
    <div className="dashboard">
      <h1>لوحة تحكم Dr. Reminder</h1>
      <div className="stats">
        <div className="stat-card">
          <h3>إجمالي المرضى</h3>
          <p>{patients.length}</p>
        </div>
        <div className="stat-card">
          <h3>المواعيد القادمة</h3>
          <p>{upcomingAppointments}</p>
        </div>
        <div className="stat-card">
          <h3>التنبيهات المرسلة</h3>
          <p>{patients.length * 2}</p> {/* محاكاة */}
        </div>
      </div>
      <div className="quick-actions">
        <Link to="/add-patient" className="btn">إضافة مريض</Link>
        <Link to="/patients" className="btn">عرض المرضى</Link>
        <Link to="/chat" className="btn">الدردشة</Link>
      </div>
    </div>
  );
};

export default Dashboard;