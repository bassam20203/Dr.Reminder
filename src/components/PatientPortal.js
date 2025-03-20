import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';

const PatientPortal = ({ patients, setPatients, messages, setMessages, notifications, setNotifications, username }) => {
  const patient = patients.find(p => p.name === username) || {};
  const [message, setMessage] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [paymentAmount, setPaymentAmount] = useState('');
  const [freeConsultationUsed, setFreeConsultationUsed] = useState(localStorage.getItem(`freeConsultation_${username}`) === 'true');

  useEffect(() => {
    patients.forEach((p) => {
      if (p.name === username && p.appointment) {
        const timeDiff = new Date(p.appointment) - new Date();
        if (timeDiff > 0 && timeDiff < 24 * 60 * 60 * 1000) {
          setTimeout(() => {
            const notif = `تذكير: موعدك غدًا في ${new Date(p.appointment).toLocaleString()}`;
            setNotifications((prev) => [...prev, { id: Date.now(), text: notif }]);
            toast.warn(notif);
          }, timeDiff - 23 * 60 * 60 * 1000);
        }
      }
    });
  }, [patients, username, setNotifications]);

  const sendMessage = () => {
    if (message.trim() && patients.some(p => p.name === username)) {
      const msg = { sender: 'patient', patient: username, text: message, time: new Date() };
      setMessages([...messages, msg]);
      toast.info('تم إرسال الرسالة إلى الطبيب');
      setMessage('');
    } else {
      toast.error('غير مسموح بالمحادثة إلا للمرضى المسجلين');
    }
  };

  const bookAppointment = () => {
    const updatedPatients = patients.map(p =>
      p.name === username ? { ...p, appointment: appointmentDate.toISOString() } : p
    );
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
    toast.success('تم حجز الموعد بنجاح!');
  };

  const makePayment = () => {
    if (paymentAmount) {
      toast.success(`تم دفع ${paymentAmount} بنجاح!`);
      setPaymentAmount('');
    }
  };

  const exportReport = () => {
    const doc = new jsPDF();
    doc.text('تقرير المريض', 10, 10);
    doc.text(`الاسم: ${patient.name}`, 10, 20);
    doc.text(`الموعد: ${patient.appointment ? new Date(patient.appointment).toLocaleString() : 'غير محدد'}`, 10, 30);
    doc.text(`الأدوية: ${patient.medications?.join(', ') || 'لا توجد'}`, 10, 40);
    doc.save(`${patient.name}_report.pdf`);
  };

  const requestFreeConsultation = () => {
    if (!freeConsultationUsed) {
      setFreeConsultationUsed(true);
      localStorage.setItem(`freeConsultation_${username}`, 'true');
      toast.success('تم طلب الاستشارة المجانية بنجاح!');
    } else {
      toast.error('لقد استهلكت استشارتك المجانية');
    }
  };

  return (
    <div className="patient-portal">
      <h2>مرحبًا، {username}</h2>

      <section className="treatment">
        <h3>العلاج الخاص بك</h3>
        <p>الأدوية: {patient.medications?.join(', ') || 'لا توجد أدوية'}</p>
        <p>ملاحظات: {patient.notes || 'لا توجد ملاحظات'}</p>
      </section>

      <section className="calendar">
        <h3>حجز زيارة</h3>
        <Calendar onChange={setAppointmentDate} value={appointmentDate} />
        <button className="btn" onClick={bookAppointment}>حجز الموعد</button>
      </section>

      <section className="chat">
        <h3>الدردشة مع الطبيب</h3>
        <div className="chat-box">
          {messages.filter(msg => msg.patient === username).map((msg, index) => (
            <div key={index} className={`message ${msg.sender === 'patient' ? 'patient-msg' : 'doctor-msg'}`}>
              <p>{msg.text}</p>
              <span>{new Date(msg.time).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="اكتب رسالتك..." />
        <button className="btn" onClick={sendMessage}>إرسال</button>
      </section>

      <section className="payment">
        <h3>دفع مبلغ</h3>
        <input
          type="number"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
          placeholder="أدخل المبلغ"
        />
        <button className="btn" onClick={makePayment}>دفع</button>
      </section>

      <section className="notifications">
        <h3>التنبيهات</h3>
        {notifications.filter(n => n.text.includes(username)).length > 0 ? (
          <ul>
            {notifications.filter(n => n.text.includes(username)).map((notif) => (
              <li key={notif.id}>{notif.text}</li>
            ))}
          </ul>
        ) : (
          <p>لا توجد تنبيهات</p>
        )}
      </section>

      <section className="free-consultation">
        <h3>استشارة مجانية</h3>
        <button className="btn" onClick={requestFreeConsultation} disabled={freeConsultationUsed}>
          {freeConsultationUsed ? 'تم الاستخدام' : 'طلب استشارة مجانية'}
        </button>
      </section>

      <button className="btn export-btn" onClick={exportReport}>تصدير تقرير PDF</button>
    </div>
  );
};

export default PatientPortal;