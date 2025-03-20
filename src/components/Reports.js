import React from 'react';

const Reports = ({ patients }) => {
  const safePatients = Array.isArray(patients) ? patients : [];
  const completedAppointments = safePatients.filter(p => new Date(p.appointment) < new Date()).length;
  const upcomingAppointments = safePatients.filter(p => new Date(p.appointment) > new Date()).length;

  return (
    <div className="reports">
      <h2>التقارير والإحصائيات</h2>
      <div className="report-card">
        <h3>إجمالي المرضى</h3>
        <p>{safePatients.length}</p>
      </div>
      <div className="report-card">
        <h3>المواعيد المكتملة</h3>
        <p>{completedAppointments}</p>
      </div>
      <div className="report-card">
        <h3>المواعيد القادمة</h3>
        <p>{upcomingAppointments}</p>
      </div>
      <div className="report-card">
        <h3>التنبيهات المرسلة</h3>
        <p>{safePatients.length * 2}</p> {/* محاكاة */}
      </div>
    </div>
  );
};

export default Reports;