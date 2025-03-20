import React, { useState } from 'react';

const Chat = ({ patients, messages, setMessages }) => {
  const [selectedPatient, setSelectedPatient] = useState('');
  const [message, setMessage] = useState('');
  const safePatients = Array.isArray(patients) ? patients : [];

  const sendMessage = () => {
    if (selectedPatient && message.trim()) {
      setMessages([...messages, { sender: 'doctor', patient: selectedPatient, text: message, time: new Date() }]);
      console.log(`رسالة إلى ${selectedPatient}: ${message}`);
      setMessage('');
    }
  };

  const patientMessages = messages.filter(msg => msg.patient === selectedPatient);

  return (
    <div className="chat">
      <h2>الدردشة مع المرضى</h2>
      <select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}>
        <option value="">اختر مريضًا</option>
        {safePatients.map((patient) => (
          <option key={patient.id} value={patient.name}>{patient.name}</option>
        ))}
      </select>
      <div className="chat-box">
        {patientMessages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === 'doctor' ? 'doctor-msg' : 'patient-msg'}`}>
            <p>{msg.text}</p>
            <span>{new Date(msg.time).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="اكتب رسالتك..." />
      <button className="btn" onClick={sendMessage}>إرسال</button>
    </div>
  );
};

export default Chat;