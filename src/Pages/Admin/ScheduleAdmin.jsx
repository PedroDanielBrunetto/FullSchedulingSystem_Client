import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Dashboard/Sidebar";
import FormCalendar from "../../Components/Register-Calendar/Form";
import { addDays, format, startOfDay } from 'date-fns';
import withAuth from "../../Components/withAuth.jsx";
import { getAppointmentsByDay } from "../../api.js";

function ScheduleAdmin() {
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));
  const [numberOfDays, setNumberOfDays] = useState(7);
  const [appointmentsForSelectedDate, setAppointmentsForSelectedDate] = useState([]);

  const formattedSelectedDate = format(selectedDate, 'yyyy-MM-dd');

  useEffect(() => {
    fetchAppointments(formattedSelectedDate);
  }, []);

  useEffect(() => {
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      const parsedAppointments = JSON.parse(storedAppointments);
      setAppointmentsForSelectedDate(parsedAppointments[formattedSelectedDate] || []);
    }
  }, [formattedSelectedDate]);

  const generateDays = (numberOfDays) => {
    const days = [];
    for (let i = 0; i < numberOfDays; i++) {
      const date = addDays(new Date(), i);
      days.push(date);
    }
    return days;
  };

  const handleGenerateMoreDays = () => {
    setNumberOfDays(numberOfDays + 7);
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
  };

  useEffect(() => {
    const storedAppointments = localStorage.getItem('appointments');
  
    if (storedAppointments) {
      const parsedAppointments = JSON.parse(storedAppointments);
      const selectedFormattedDate = format(selectedDate, 'yyyy-MM-dd');
      setAppointmentsForSelectedDate(parsedAppointments[selectedFormattedDate] || []);
    } else {
      fetchAppointments(format(selectedDate, 'yyyy-MM-dd'));
    }
  }, [selectedDate]);
  
  const fetchAppointments = async (date) => {
    try {
      const data = await getAppointmentsByDay(date);
      if (data.success) {
        const appointments = data.appointments;
        const storedAppointments = {};
        appointments.forEach(appointment => {
          const dateAppointment = appointment.date_appointment;
          if (!storedAppointments[dateAppointment]) {
            storedAppointments[dateAppointment] = [];
          }
          storedAppointments[dateAppointment].push(appointment);
        });
        // Ordena as consultas por horário
        for (const key in storedAppointments) {
          storedAppointments[key].sort((a, b) => a.initial.localeCompare(b.initial));
        }
        localStorage.setItem('appointments', JSON.stringify(storedAppointments));
        setAppointmentsForSelectedDate(storedAppointments[date] || []);
      } else {
        console.error('Erro ao obter consultas:', data.message);
      }
    } catch (error) {
      console.error('Erro ao obter consultas:', error);
    }
  };

  return (
    <main className="flex flex-col md:flex-row">
      <Sidebar />
      <section className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Agenda</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {generateDays(numberOfDays).map((date, index) => (
            <button
              key={index}
              className={`p-2 rounded-md border ${format(date, 'yyyy-MM-dd') === formattedSelectedDate ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setSelectedDate(date)}
            >
              {format(date, 'dd MMM')}
            </button>
          ))}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleGenerateMoreDays}
          >
            Gerar mais dias
          </button>
        </div>
        <div className="flex gap-3 mb-5">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
            onClick={handleShowForm}
          >
            Agendar Nova Consulta
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md mt-4"
            onClick={handleHideForm}
          >
            Voltar
          </button>
        </div>
        {!showForm ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Consultas para {formattedSelectedDate}</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {appointmentsForSelectedDate.length > 0 ? (
                appointmentsForSelectedDate.map(appointment => (
                  <div key={appointment.id} className="border p-4 rounded-md shadow-lg">
                    <p className="font-semibold">Horário: {appointment.initial} - {appointment.final}</p>
                    <p>Paciente: {appointment.name}</p>
                    <p>Observação: {appointment.message}</p>
                  </div>
                ))
              ) : (
                <p>Nenhuma consulta agendada para este dia.</p>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-4">Agendar Nova Consulta</h2>
            <FormCalendar setSelectedDate={setSelectedDate} />
          </div>
        )}
      </section>
    </main>
  );
}

export default withAuth(ScheduleAdmin);
