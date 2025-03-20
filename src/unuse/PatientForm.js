import React, { useState } from 'react';

const PatientForm = ({ patients, setPatients }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    phone: '',
    specialty: '',
    appointment: '',
    medications: [],
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addMedication = () => {
    const medication = prompt('أدخل اسم الدواء وموعد الجرعة (مثل: باراسيتامول - 8 صباحًا):');
    if (medication) {
      setFormData({ ...formData, medications: [...formData.medications, medication] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPatient = { ...formData, id: Date.now().toString() };
    const updatedPatients = [...patients, newPatient];
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
    setFormData({ id: '', name: '', phone: '', specialty: '', appointment: '', medications: [], notes: '' });
    alert('تم إضافة المريض بنجاح!');
  };

  return (
    <div className="patient-form">
      <h2>إضافة مريض جديد</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="اسم المريض" required />
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="رقم الهاتف" required />
        <select name="specialty" value={formData.specialty} onChange={handleChange} required>
          <option value="">اختر التخصص</option>
          <option value="عام">طب عام</option>
          <option value="أسنان">أسنان</option>
          <option value="عيون">عيون</option>
          <option value="قلب">قلب</option>
        </select>
        <input type="datetime-local" name="appointment" value={formData.appointment} onChange={handleChange} required />
        <button type="button" className="btn" onClick={addMedication}>إضافة دواء</button>
        {formData.medications.length > 0 && (
          <ul>
            {formData.medications.map((med, index) => (
              <li key={index}>{med}</li>
            ))}
          </ul>
        )}
        <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="ملاحظات طبية" />
        <button type="submit" className="btn submit-btn">إضافة المريض</button>
      </form>
    </div>
  );
};

export default PatientForm;