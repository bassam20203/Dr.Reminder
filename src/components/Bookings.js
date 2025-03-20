import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Bookings = ({ patients, setPatients, messages, setMessages }) => {
  const [suggestedDate, setSuggestedDate] = useState('');
  const [message, setMessage] = useState('');

  // تصفية الحجوزات المعلقة
  const pendingBookings = patients.filter(p => p.status === 'pending');

  const acceptBooking = (patientId) => {
    const updatedPatients = patients.map(p =>
      p.id === patientId ? { ...p, status: 'accepted' } : p
    );
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
    toast.success('تم قبول الحجز');
  };

  const rejectBooking = (patientId) => {
    const updatedPatients = patients.map(p =>
      p.id === patientId ? { ...p, status: 'rejected', appointment: null } : p
    );
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
    toast.error('تم رفض الحجز');
  };

  const suggestNewDate = (patientId) => {
    if (suggestedDate) {
      const updatedPatients = patients.map(p =>
        p.id === patientId ? { ...p, appointment: new Date(suggestedDate).toISOString(), status: 'suggested' } : p
      );
      setPatients(updatedPatients);
      localStorage.setItem('patients', JSON.stringify(updatedPatients));
      toast.info('تم اقتراح موعد جديد');
      setSuggestedDate('');
    } else {
      toast.error('يرجى اختيار موعد جديد');
    }
  };

  const sendMessage = (patient) => {
    if (message.trim()) {
      const msg = { sender: 'doctor', patient: patient.name, text: message, time: new Date() };
      setMessages([...messages, msg]);
      toast.info(`تم إرسال رسالة إلى ${patient.name}`);
      setMessage('');
    } else {
      toast.error('يرجى كتابة رسالة قبل الإرسال');
    }
  };

  return (
    <div className="bookings">
      <h2>إدارة الحجوزات</h2>
      {pendingBookings.length === 0 ? (
        <p>لا توجد حجوزات معلقة</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>اسم المريض</th>
              <th>الموعد المطلوب</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {pendingBookings.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>
                  {patient.appointment
                    ? new Date(patient.appointment).toLocaleString('ar-EG', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'غير محدد'}
                </td>
                <td className="actions-cell">
                  <button className="btn accept-btn" onClick={() => acceptBooking(patient.id)}>
                    قبول
                  </button>
                  <button className="btn reject-btn" onClick={() => rejectBooking(patient.id)}>
                    رفض
                  </button>
                  <div className="suggest-date-group">
                    <input
                      type="datetime-local"
                      value={suggestedDate}
                      onChange={(e) => setSuggestedDate(e.target.value)}
                      min={new Date().toISOString().slice(0, 16)} // منع اختيار تاريخ سابق
                    />
                    <button className="btn suggest-btn" onClick={() => suggestNewDate(patient.id)}>
                      اقتراح موعد
                    </button>
                  </div>
                  <div className="message-group">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="اكتب رسالة للمريض..."
                      rows="2"
                    />
                    <button className="btn chat-btn" onClick={() => sendMessage(patient)}>
                      تحدث
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Bookings;