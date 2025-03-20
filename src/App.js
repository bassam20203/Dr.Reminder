import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'; // استبدلت BrowserRouter بـ HashRouter
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import PatientList from './components/PatientList';
import AddPatient from './components/AddPatient';
import Chat from './components/Chat';
import Login from './components/Login';
import PatientPortal from './components/PatientPortal';
import PatientProfile from './components/PatientProfile';
import Bookings from './components/Bookings';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [patients, setPatients] = useState(JSON.parse(localStorage.getItem('patients')) || []);
  const [messages, setMessages] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem('loggedInUser')) || { role: null, username: null }
  );
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    localStorage.setItem('loggedInUser', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn({ role: null, username: null });
  };

  return (
    <Router>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} handleLogout={handleLogout} />
        <div className="page-container">
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                isLoggedIn.role ? (
                  isLoggedIn.role === 'doctor' ? (
                    <LandingPage
                      patients={patients}
                      setPatients={setPatients}
                      messages={messages}
                      setMessages={setMessages}
                      notifications={notifications}
                      setNotifications={setNotifications}
                    />
                  ) : (
                    <PatientPortal
                      patients={patients}
                      setPatients={setPatients}
                      messages={messages}
                      setMessages={setMessages}
                      notifications={notifications}
                      setNotifications={setNotifications}
                      username={isLoggedIn.username}
                    />
                  )
                ) : (
                  <Login setIsLoggedIn={setIsLoggedIn} />
                )
              }
            />
            <Route
              path="/patients"
              render={() =>
                isLoggedIn.role === 'doctor' ? (
                  <PatientList patients={patients} setPatients={setPatients} />
                ) : (
                  <Login setIsLoggedIn={setIsLoggedIn} />
                )
              }
            />
            <Route
              path="/add-patient"
              render={() =>
                isLoggedIn.role === 'doctor' ? (
                  <AddPatient patients={patients} setPatients={setPatients} />
                ) : (
                  <Login setIsLoggedIn={setIsLoggedIn} />
                )
              }
            />
            <Route
              path="/chat"
              render={() =>
                isLoggedIn.role === 'doctor' ? (
                  <Chat patients={patients} messages={messages} setMessages={setMessages} />
                ) : (
                  <Login setIsLoggedIn={setIsLoggedIn} />
                )
              }
            />
            <Route
              path="/patient/:patientId"
              render={() =>
                isLoggedIn.role === 'doctor' ? (
                  <PatientProfile patients={patients} setPatients={setPatients} />
                ) : (
                  <Login setIsLoggedIn={setIsLoggedIn} />
                )
              }
            />
            <Route
              path="/bookings"
              render={() =>
                isLoggedIn.role === 'doctor' ? (
                  <Bookings
                    patients={patients}
                    setPatients={setPatients}
                    messages={messages}
                    setMessages={setMessages}
                  />
                ) : (
                  <Login setIsLoggedIn={setIsLoggedIn} />
                )
              }
            />
          </Switch>
        </div>
        <Footer />
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    </Router>
  );
}

export default App;