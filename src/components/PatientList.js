import React from 'react';
import { useHistory } from 'react-router-dom';

const PatientList = ({ patients, setPatients }) => {
  const safePatients = Array.isArray(patients) ? patients : [];
  const history = useHistory();

  const sendReminder = (patient) => {
    const message = `مرحبًا ${patient.name}، تذكير بموعدك يوم ${new Date(patient.appointment).toLocaleString()}.`;
    console.log(`إرسال رسالة إلى ${patient.phone}: ${message}`);
    alert(`تم محاكاة إرسال تذكير إلى ${patient.name}`);
  };

  const deletePatient = (id) => {
    const updatedPatients = safePatients.filter((p) => p.id !== id);
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
  };

  const editPatient = (patient) => {
    const updatedName = prompt('أدخل الاسم الجديد:', patient.name);
    if (updatedName) {
      const updatedPatients = safePatients.map((p) =>
        p.id === patient.id ? { ...p, name: updatedName } : p
      );
      setPatients(updatedPatients);
      localStorage.setItem('patients', JSON.stringify(updatedPatients));
    }
  };

  const handlePatientClick = (patientId) => {
    history.push(`/patient/${patientId}`); // استخدام useHistory بدلاً من useNavigate
  };

  return (
    <div className="patient-list">
      <h2>قائمة المرضى</h2>
      {safePatients.length === 0 ? (
        <p>لا يوجد مرضى بعد</p>
      ) : (
        <table className="table-container">
          <thead>
            <tr>
              <th>الاسم</th>
              <th>رقم الهاتف</th>
              <th>التخصص</th>
              <th>الموعد</th>
              <th>الأدوية</th>
              <th>ملاحظات</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {safePatients.map((patient) => (
              <tr
                key={patient.id}
                onClick={() => handlePatientClick(patient.id)}
                style={{ cursor: 'pointer' }}
              >
                <td>{patient.name || 'غير محدد'}</td>
                <td>{patient.phone || 'غير محدد'}</td>
                <td>{patient.specialty || 'غير محدد'}</td>
                <td>{patient.appointment ? new Date(patient.appointment).toLocaleString() : 'غير محدد'}</td>
                <td>{patient.medications?.join(', ') || 'لا توجد أدوية'}</td>
                <td>{patient.notes || 'لا توجد'}</td>
                <td onClick={(e) => e.stopPropagation()}>
                  <button className="btn" onClick={() => sendReminder(patient)}>
                    إرسال تذكير
                  </button>
                  <button className="btn edit-btn" onClick={() => editPatient(patient)}>
                    تعديل
                  </button>
                  <button className="btn delete-btn" onClick={() => deletePatient(patient.id)}>
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientList;