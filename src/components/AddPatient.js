import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddPatient = ({ patients, setPatients }) => {
  const history = useHistory();
  const today = new Date().toISOString().slice(0, 16); // تاريخ اليوم تلقائيًا

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    specialty: '',
    appointment: today,
    medications: [],
    notes: '',
    username: '',
    password: '12345',
    status: 'pending',
  });

  const [credentials, setCredentials] = useState(null); // حالة بيانات تسجيل الدخول

  useEffect(() => {
    setFormData((prev) => ({ ...prev, appointment: today }));
  }, [today]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addMedication = () => {
    const med = prompt('أدخل اسم الدواء وموعده (مثل: باراسيتامول - 8 صباحًا):');
    if (med) {
      setFormData({ ...formData, medications: [...formData.medications, med] });
      toast.info(`تم إضافة الدواء: ${med}`);
    }
  };

  const editMedication = (index) => {
    const newMed = prompt('عدل الدواء:', formData.medications[index]);
    if (newMed) {
      const updatedMeds = [...formData.medications];
      updatedMeds[index] = newMed;
      setFormData({ ...formData, medications: updatedMeds });
      toast.info('تم تعديل الدواء بنجاح');
    }
  };

  const deleteMedication = (index) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الدواء؟')) {
      const updatedMeds = formData.medications.filter((_, i) => i !== index);
      setFormData({ ...formData, medications: updatedMeds });
      toast.success('تم حذف الدواء');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedUsername = `user_${Date.now()}`;
    const newPatient = {
      ...formData,
      id: Date.now().toString(),
      username: generatedUsername,
    };
    const updatedPatients = [...patients, newPatient];
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
    
    // تعيين بيانات تسجيل الدخول وعرضها
    setCredentials({ username: generatedUsername, password: formData.password });
    
    // إخفاء البيانات بعد 60 ثانية
    setTimeout(() => {
      setCredentials(null);
      console.log('تم إخفاء بيانات تسجيل الدخول بعد 60 ثانية');
    }, 60000);
    
    toast.success('تم إضافة المريض بنجاح!');
    // تأخير الانتقال للسماح برؤية البيانات
    setTimeout(() => history.push('/patients'), 10000);
  };

  return (
    <div className="add-patient">
      <h2>إضافة مريض جديد</h2>
      <form onSubmit={handleSubmit} className="add-patient-form">
        <div className="form-group">
          <label htmlFor="name">اسم المريض</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="أدخل اسم المريض"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">رقم الهاتف</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="أدخل رقم الهاتف"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="specialty">التخصص</label>
          <select
            id="specialty"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            required
          >
            <option value="">اختر التخصص</option>
            <option value="عام">طب عام</option>
            <option value="أسنان">أسنان</option>
            <option value="عيون">عيون</option>
            <option value="قلب">قلب</option>
            <option value="جلدية">جلدية</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="appointment">موعد الزيارة</label>
          <input
            type="datetime-local"
            id="appointment"
            name="appointment"
            value={formData.appointment}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group medications-group">
          <label>الأدوية</label>
          <button type="button" className="btn add-med-btn" onClick={addMedication}>
            إضافة دواء
          </button>
          {formData.medications.length > 0 && (
            <ul className="medications-list">
              {formData.medications.map((med, index) => (
                <li key={index} className="medication-item">
                  <span>{med}</span>
                  <div className="med-actions">
                    <button
                      type="button"
                      className="btn edit-med-btn"
                      onClick={() => editMedication(index)}
                    >
                      تعديل
                    </button>
                    <button
                      type="button"
                      className="btn delete-med-btn"
                      onClick={() => deleteMedication(index)}
                    >
                      حذف
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="notes">ملاحظات طبية</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="أضف ملاحظات طبية (اختياري)"
          />
        </div>

        <button type="submit" className="btn primary-btn submit-btn">
          حفظ المريض
        </button>
      </form>

      {/* عرض بيانات تسجيل الدخول */}
      {credentials && (
        <div className="credentials-box">
          <h3>بيانات تسجيل الدخول</h3>
          <p>اسم المستخدم: <strong>{credentials.username}</strong></p>
          <p>كلمة المرور: <strong>{credentials.password}</strong></p>
          <small>(ستختفي هذه المعلومات بعد دقيقة)</small>
        </div>
      )}
    </div>
  );
};

export default AddPatient;