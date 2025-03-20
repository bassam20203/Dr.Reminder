import React, { useState } from 'react';

const DoctorDashboard = ({ patients }) => {
  const [selectedPatient, setSelectedPatient] = useState('');
  const [message, setMessage] = useState('');
  const [reminder, setReminder] = useState('');

  const sendReply = () => {
    if (selectedPatient && message.trim()) {
      console.log(`رد الطبيب إلى ${selectedPatient}: ${message}`);
      alert(`تم إرسال الرد إلى ${selectedPatient}`);
      setMessage('');
    }
  };

  const sendReminder = () => {
    if (selectedPatient && reminder.trim()) {
      console.log(`تذكير إلى ${selectedPatient}: ${reminder}`);
      alert(`تم إرسال تذكير إلى ${selectedPatient}`);
      setReminder('');
    }
  };

  return (
    <div className="doctor-dashboard">
      <h2>لوحة تحكم الطبيب</h2>
      <div className="dashboard-section">
        <h3>إرسال رد إلى مريض</h3>
        <select
          value={selectedPatient}
          onChange={(e) => setSelectedPatient(e.target.value)}
          className="patient-select"
        >
          <option value="">اختر مريضًا</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.name}>{patient.name}</option>
          ))}
        </select>
        <textarea
          placeholder="اكتب ردك هنا..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="message-input"
        />
        <button className="btn send-btn" onClick={sendReply}>إرسال الرد</button>
      </div>
      <div className="dashboard-section">
        <h3>إرسال تذكير يدوي</h3>
        <select
          value={selectedPatient}
          onChange={(e) => setSelectedPatient(e.target.value)}
          className="patient-select"
        >
          <option value="">اختر مريضًا</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.name}>{patient.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="اكتب التذكير (مثل: تناول الدواء الساعة 8)"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
          className="reminder-input"
        />
        <button className="btn reminder-btn" onClick={sendReminder}>إرسال التذكير</button>
      </div>
    </div>
  );
};

export default DoctorDashboard;