import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PatientProfile = ({ patients, setPatients }) => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [medications, setMedications] = useState([]);
  const [description, setDescription] = useState('');
  const [nextVisit, setNextVisit] = useState('');
  const [reminder, setReminder] = useState('');

  useEffect(() => {
    console.log('patientId:', patientId); // تحقق من قيمة patientId
    console.log('patients:', patients); // تحقق من مصفوفة patients

    const selectedPatient = patients.find((p) => String(p.id) === patientId); // تحويل p.id إلى نص للمقارنة
    if (selectedPatient) {
      setPatient(selectedPatient);
      setMedications(selectedPatient.medications || []);
      setDescription(selectedPatient.notes || '');
      setNextVisit(selectedPatient.appointment || '');
      setReminder(
        selectedPatient.medications?.length > 0
          ? `تذكير: تناول ${selectedPatient.medications[0]} غدًا`
          : 'لا توجد تذكيرات'
      );
    } else {
      console.log('لم يتم العثور على المريض');
    }
  }, [patientId, patients]);

  const handleSave = () => {
    const updatedPatients = patients.map((p) =>
      String(p.id) === patientId
        ? { ...p, medications, notes: description, appointment: nextVisit }
        : p
    );
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
    alert('تم حفظ التعديلات بنجاح!');
  };

  const handleMedicationChange = (index, value) => {
    const updatedMedications = [...medications];
    updatedMedications[index] = value;
    setMedications(updatedMedications);
  };

  const addMedication = () => {
    setMedications([...medications, '']);
  };

  const removeMedication = (index) => {
    const updatedMedications = medications.filter((_, i) => i !== index);
    setMedications(updatedMedications);
  };

  if (!patient) {
    return (
      <div>
        {patients.length === 0 ? (
          <p>لا توجد بيانات مرضى متاحة</p>
        ) : (
          <p>لم يتم العثور على المريض. تأكدي من اختيار مريض من القائمة.</p>
        )}
      </div>
    );
  }

  return (
    <div className="patient-profile">
      <div className="card">
        <h2>{patient.name}</h2>
        <div className="patient-info">
          <div className="info-section">
            <h3>الوصف</h3>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="أدخل وصف الحالة..."
            />
          </div>
          <div className="info-section">
            <h3>تاريخ الزيارة القادمة</h3>
            <input
              type="datetime-local"
              value={nextVisit}
              onChange={(e) => setNextVisit(e.target.value)}
            />
          </div>
        </div>

        <div className="medications-section">
          <h3>الأدوية</h3>
          <ul className="medication-list">
            {medications.map((med, index) => (
              <li key={index} className="medication-item">
                <input
                  value={med}
                  onChange={(e) => handleMedicationChange(index, e.target.value)}
                  placeholder="اسم الدواء وموعده"
                />
                <div className="med-actions">
                  <button className="btn btn--accent" onClick={() => removeMedication(index)}>
                    حذف
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button className="btn btn--success add-med-btn" onClick={addMedication}>
            إضافة دواء
          </button>
        </div>

        <div className="reminder-section">
          <h3>تذكير بالأدوية</h3>
          <p>{reminder}</p>
        </div>

        <button className="btn save-btn" onClick={handleSave}>
          حفظ التعديلات
        </button>
      </div>
    </div>
  );
};

export default PatientProfile;