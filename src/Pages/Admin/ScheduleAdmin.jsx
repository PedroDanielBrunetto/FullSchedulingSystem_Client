import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Dashboard/Sidebar";
import FormCalendar from "../../Components/Register-Calendar/Form";
import { addDays, format, startOfDay } from 'date-fns';

const mockAppointments = {
  "2024-05-24": [
    { id: 1, time: "09:00", patient: "John Doe", observation: "Check-up" },
    { id: 2, time: "10:30", patient: "Jane Smith", observation: "Consultation" }
  ],
  "2024-05-21": [
    { id: 3, time: "11:00", patient: "Michael Johnson", observation: "Follow-up" }
  ]
};

export default function ScheduleAdmin() {
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));
  const [appointments, setAppointments] = useState(mockAppointments);
  const [numberOfDays, setNumberOfDays] = useState(7);
  const [appointmentsForSelectedDate, setAppointmentsForSelectedDate] = useState([]);

  const formattedSelectedDate = selectedDate.toISOString().split("T")[0];

  useEffect(() => {
    const selectedFormattedDate = selectedDate.toISOString().split("T")[0];
    setAppointmentsForSelectedDate(appointments[selectedFormattedDate] || []);
  }, [selectedDate, appointments]);

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
        {showForm ? (
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md mb-4"
            onClick={() => setShowForm(false)}
          >
            Voltar
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
            onClick={() => setShowForm(true)}
          >
            Agendar Nova Consulta
          </button>
        )}
        {showForm && <FormCalendar setSelectedDate={setSelectedDate} />}
        {!showForm && (
          <div>
            <h2 className="text-xl font-bold mb-4">Consultas para {formattedSelectedDate}</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {appointmentsForSelectedDate.length > 0 ? (
                appointmentsForSelectedDate.map(appointment => (
                  <div key={appointment.id} className="border p-4 rounded-md shadow-lg">
                    <p className="font-semibold">Horário: {appointment.time}</p>
                    <p>Paciente: {appointment.patient}</p>
                    <p>Observação: {appointment.observation}</p>
                  </div>
                ))
              ) : (
                <p>Nenhuma consulta agendada para este dia.</p>
              )}
            </div>
          </div>
        )}

      </section>
    </main>
  );
}
