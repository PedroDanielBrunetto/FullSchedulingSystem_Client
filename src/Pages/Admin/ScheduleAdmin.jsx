import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Dashboard/Sidebar";
import FormCalendar from "../../Components/Register-Calendar/Form";
import { addDays, format, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import withAuth from "../../Components/withAuth.jsx";
import { getAppointmentsByDay, CancelAppointment } from "../../api.js";

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

  const handleCancelAppointment = async (id, identify) => {
    try {
      await CancelAppointment(id, identify);
      fetchAppointments(formattedSelectedDate); // Recarrega appointments
    } catch (error) {
      console.error('Erro ao cancelar consulta:', error);
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
              {format(date, 'dd MMM', { locale: ptBR })}
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
          {!showForm ?
            <></>
            :
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-md mt-4"
              onClick={handleHideForm}
            >
              Voltar
            </button>
          }
        </div>
        {!showForm ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Consultas para {format(selectedDate, 'dd MMM')} - {format(selectedDate, 'EEEE', { locale: ptBR })}</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {appointmentsForSelectedDate.length > 0 ? (
                appointmentsForSelectedDate.map(appointment => (
                  <div key={appointment.id} className="border p-4 rounded-md shadow-2xl">
                    <p className="font-semibold">Horário: {appointment.initial} - {appointment.final}</p>
                    <p>Paciente: {appointment.name}</p>
                    <p>Observação: {appointment.message}</p>
                    <div className="flex justify-end -mt-5">
                      <button
                        onClick={() => handleCancelAppointment(appointment.id, appointment.identify)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ff0505" viewBox="0 0 256 256"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-50.34-74.34L139.31,152l18.35,18.34a8,8,0,0,1-11.32,11.32L128,163.31l-18.34,18.35a8,8,0,0,1-11.32-11.32L116.69,152,98.34,133.66a8,8,0,0,1,11.32-11.32L128,140.69l18.34-18.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
                      </button>
                    </div>
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
