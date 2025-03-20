import React, { useState } from 'react';

const FollowUp = ({ patients, setPatients }) => {
  const [selectedPatient, setSelectedPatient] = useState('');
  const [image, setImage] = useState(null);
  const [notes, setNotes] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const saveFollowUp = () => {
    if (selectedPatient && (image || notes.trim())) {
      const updatedPatients = patients.map((patient) =>
        patient.name === selectedPatient
          ? { ...patient, followUp: { image, notes } }
          : patient
      );
      setPatients(updatedPatients);
      localStorage.setItem('patients', JSON.stringify(updatedPatients));
      alert(`تم حفظ متابعة ${selectedPatient}`);
      setImage(null);
      setNotes('');
    }
  };

  return (
    <div className="follow-up">
      <h2>متابعة المرضى</h2>
      <div className="follow-up-section">
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
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="image-upload"
        />
        {image && <img src={image} alt="Uploaded" className="uploaded-image" />}
        <textarea
          placeholder="أضف ملاحظات المتابعة..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="notes-input"
        />
        <button className="btn save-btn" onClick={saveFollowUp}>حفظ المتابعة</button>
      </div>
    </div>
  );
};

export default FollowUp;