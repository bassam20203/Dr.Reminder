import React, { useState } from 'react';

const DoctorChat = ({ patients, messages, setMessages, setMedReminders }) => {
  const [selectedPatient, setSelectedPatient] = useState('');
  const [doctorMessage, setDoctorMessage] = useState('');
  const [reminder, setReminder] = useState('');

  const sendReply = () => {
    if (selectedPatient && doctorMessage.trim()) {
      setMessages([...messages, { sender: 'doctor', text: doctorMessage, time: new Date() }]);
      setDoctorMessage('');
    }
  };

  const sendMedicationReminder = () => {
    if (selectedPatient && reminder.trim()) {
      setMedReminders((prev) => [...prev, { patient: selectedPatient, text: reminder, time: new Date() }]);
      alert(`تم تعيين تذكير لـ ${selectedPatient}`);
      setReminder('');
    }
  };

  return (
    <div className="doctor-chat">
      <h2>بوابة الطبيب</h2>
      <select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}>
        <option value="">اختر مريضًا</option>
        {patients.map((patient) => (
          <option key={patient.id} value={patient.name}>{patient.name}</option>
        ))}
      </select>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === 'doctor' ? 'doctor-msg' : 'patient-msg'}`}>
            <p>{msg.text}</p>
            <span>{new Date(msg.time).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <textarea
        placeholder="ردك هنا..."
        value={doctorMessage}
        onChange={(e) => setDoctorMessage(e.target.value)}
      />
      <button className="btn send-btn" onClick={sendReply}>إرسال</button>
      <h3>تعيين تذكير</h3>
      <input
        type="text"
        placeholder="اكتب التذكير..."
        value={reminder}
        onChange={(e) => setReminder(e.target.value)}
      />
      <button className="btn reminder-btn" onClick={sendMedicationReminder}>تعيين</button>
    </div>
  );
};

export default DoctorChat;