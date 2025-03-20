import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { toast } from 'react-toastify';
import appointmentIcon from '../assets/appointment-icon.png';
import medicineIcon from '../assets/medicine-icon.png';
import chatIcon from '../assets/chat-icon.png';
import reportIcon from '../assets/report-icon.png';
import hospitalImage from '../assets/hospital-image.jpg'; // صورة المستشفى
import doctorImage1 from '../assets/doctor1.jpg'; // صورة طبيب 1
import doctorImage2 from '../assets/doctor2.jpg'; // صورة طبيب 2
import cleanlinessImage from '../assets/cleanliness-image.jpg'; // صورة النظافة

ChartJS.register(ArcElement, Tooltip, Legend);

const LandingPage = ({ patients, setPatients, messages, setMessages, notifications, setNotifications }) => {
  const safePatients = Array.isArray(patients) ? patients : [];
  const upcomingAppointments = safePatients.filter((p) => new Date(p.appointment) > new Date()).length;

  useEffect(() => {
    safePatients.forEach((p) => {
      if (p.appointment) {
        const timeDiff = new Date(p.appointment) - new Date();
        if (timeDiff > 0 && timeDiff < 24 * 60 * 60 * 1000) {
          setTimeout(() => {
            const notif = `تذكير لـ ${p.name}: موعدك غدًا في ${new Date(p.appointment).toLocaleString()}`;
            setNotifications((prev) => [...prev, { id: Date.now(), text: notif }]);
            toast.warn(notif);
          }, timeDiff - 23 * 60 * 60 * 1000);
        }
      }
    });
  }, [safePatients, setNotifications]);

  const sendReminder = (patient) => {
    const message = `تذكير لـ ${patient.name}: موعدك يوم ${new Date(patient.appointment).toLocaleString()}`;
    setNotifications([...notifications, { id: Date.now(), text: message }]);
    toast.info(message);
    console.log(`إرسال رسالة إلى ${patient.phone}: ${message}`);
  };

  const acceptBooking = (patientId) => {
    const updatedPatients = safePatients.map((p) =>
      p.id === patientId ? { ...p, bookingStatus: 'accepted' } : p
    );
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
    toast.success('تم قبول الحجز');
  };

  const rejectBooking = (patientId) => {
    const updatedPatients = safePatients.map((p) =>
      p.id === patientId ? { ...p, bookingStatus: 'rejected', appointment: null } : p
    );
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
    toast.error('تم رفض الحجز');
  };

  const suggestNewDate = (patientId) => {
    const newDate = prompt('أدخل موعدًا جديدًا (مثل: 2025-03-20T10:00):');
    if (newDate) {
      const updatedPatients = safePatients.map((p) =>
        p.id === patientId ? { ...p, appointment: new Date(newDate).toISOString(), bookingStatus: 'suggested' } : p
      );
      setPatients(updatedPatients);
      localStorage.setItem('patients', JSON.stringify(updatedPatients));
      toast.info('تم اقتراح موعد جديد');
    }
  };

  const chatWithPatient = (patientName) => {
    const msg = prompt(`اكتب رسالة لـ ${patientName}:`);
    if (msg) {
      setMessages([...messages, { sender: 'doctor', patient: patientName, text: msg, time: new Date() }]);
      toast.info(`تم إرسال رسالة إلى ${patientName}`);
    }
  };

  const chartData = {
    labels: ['المرضى', 'المواعيد القادمة', 'التنبيهات'],
    datasets: [
      {
        data: [safePatients.length, upcomingAppointments, notifications.length],
        backgroundColor: ['#00c4cc', '#00a8b0', '#ffcc00'],
      },
    ],
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Dr. Reminder - متابعة ذكية</h1>
          <p>إدارة مواعيد المرضى وتنبيهات الأدوية بكل سهولة</p>
          <div className="hero-buttons">
            <Link to="/add-patient" className="btn primary-btn">إضافة مريض</Link>
            <Link to="/patients" className="btn secondary-btn">عرض المرضى</Link>
          </div>
        </div>
        <img src={hospitalImage} alt="مستشفى حديث" className="hero-image" />
      </section>

      {/* من نحن */}
      <section className="about-us">
        <h2>من نحن</h2>
        <div className="about-content">
          <p>
            نحن مركز طبي متطور نهدف إلى تقديم أفضل الخدمات الصحية باستخدام التكنولوجيا الحديثة. فريقنا مكرس لضمان راحتكم وسلامتكم.
          </p>
          <img src={hospitalImage} alt="فريقنا" className="about-image" />
        </div>
      </section>

      {/* معلومات عنا */}
      <section className="info">
        <h2>معلومات عنا</h2>
        <p>
          تأسس مركزنا في عام 2020، ومنذ ذلك الحين، نقدم خدمات طبية متميزة تشمل الطب العام، طب الأسنان، وأمراض القلب، مع أكثر من 5000 مريض راضٍ.
        </p>
      </section>

      {/* الرؤية والرسالة */}
      <section className="vision-mission">
        <h2>الرؤية والرسالة</h2>
        <div className="vision-mission-content">
          <div className="vision">
            <h3>رؤيتنا</h3>
            <p>أن نكون الخيار الأول للرعاية الصحية في المنطقة من خلال تقديم خدمات مبتكرة وشاملة.</p>
          </div>
          <div className="mission">
            <h3>رسالتنا</h3>
            <p>توفير بيئة طبية آمنة ومريحة مع التركيز على رضا المريض والجودة العالية.</p>
          </div>
        </div>
      </section>

      {/* الأطباء */}
      <section className="doctors">
        <h2>أطباؤنا</h2>
        <div className="doctors-grid">
          <div className="doctor-card">
            <img src={doctorImage1} alt="د. أحمد محمد" className="doctor-image" />
            <h3>د. أحمد محمد</h3>
            <p>أخصائي طب عام - 15 عامًا من الخبرة</p>
          </div>
          <div className="doctor-card">
            <img src={doctorImage2} alt="د. سارة علي" className="doctor-image" />
            <h3>د. سارة علي</h3>
            <p>أخصائية أسنان - 10 أعوام من الخبرة</p>
          </div>
        </div>
      </section>

      {/* مدى نظافة المكان */}
      <section className="cleanliness">
        <h2>مدى نظافة المكان</h2>
        <div className="cleanliness-content">
          <p>
            نحن نفخر بالتزامنا بأعلى معايير النظافة والتعقيم. يتم تنظيف مرافقنا يوميًا باستخدام أحدث التقنيات والمواد المعتمدة عالميًا لضمان بيئة صحية خالية من الجراثيم. غرف الفحص، الأدوات الطبية، وجميع الأسطح تُعقم بانتظام، مما يجعلنا وجهة آمنة لكل مريض.
          </p>
          <img src={cleanlinessImage} alt="نظافة المكان" className="cleanliness-image" />
          <div className="cleanliness-stats">
            <div className="stat-item">
              <h3>100%</h3>
              <p>تعقيم يومي</p>
            </div>
            <div className="stat-item">
              <h3>5 نجوم</h3>
              <p>تقييم النظافة</p>
            </div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>مراقبة النظافة</p>
            </div>
          </div>
        </div>
      </section>

      {/* إدارة الحجوزات */}
      <section className="bookings">
        <h2>إدارة الحجوزات</h2>
        {safePatients.filter((p) => p.appointment && !p.bookingStatus).length > 0 ? (
          <table className="table-container">
            <thead>
              <tr>
                <th>الاسم</th>
                <th>الموعد المطلوب</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {safePatients.filter((p) => p.appointment && !p.bookingStatus).map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.name}</td>
                  <td>{new Date(patient.appointment).toLocaleString()}</td>
                  <td>
                    <button className="btn accept-btn" onClick={() => acceptBooking(patient.id)}>قبول</button>
                    <button className="btn reject-btn" onClick={() => rejectBooking(patient.id)}>رفض</button>
                    <button className="btn suggest-btn" onClick={() => suggestNewDate(patient.id)}>اقتراح موعد</button>
                    <button className="btn chat-btn" onClick={() => chatWithPatient(patient.name)}>تحدث</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>لا توجد حجوزات معلقة</p>
        )}
      </section>

      {/* التنبيهات */}
      <section className="notifications">
        <h2>آخر التنبيهات</h2>
        {notifications.length > 0 ? (
          <ul>
            {notifications.map((notif) => (
              <li key={notif.id}>{notif.text}</li>
            ))}
          </ul>
        ) : (
          <p>لا توجد تنبيهات حاليًا</p>
        )}
      </section>

      {/* الإحصائيات */}
      <section className="stats">
        <h2>إحصائياتك</h2>
        <div className="stats-grid">
          <div className="stat-item"><h3>{safePatients.length}</h3><p>مريض مسجل</p></div>
          <div className="stat-item"><h3>{upcomingAppointments}</h3><p>مواعيد قادمة</p></div>
          <div className="stat-item"><h3>{notifications.length}</h3><p>تنبيهات مرسلة</p></div>
        </div>
        <div className="chart">
          <Pie data={chartData} />
        </div>
      </section>

      {/* إجراءات سريعة */}
      <section className="quick-actions">
        <h2>إجراءات سريعة</h2>
        <div className="actions-grid">
          {safePatients.slice(0, 3).map((patient) => (
            <div key={patient.id} className="action-card">
              <p>{patient.name}</p>
              <button className="btn" onClick={() => sendReminder(patient)}>إرسال تذكير</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;