import React, { useState } from "react";
import Sidebar from "../../Components/Dashboard/Sidebar";
import FormCalendar from "../../Components/Register-Calendar/Form";

export default function ScheduleAdmin() {
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="flex flex-col md:flex-row">
      <Sidebar />
      <section className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Agenda</h1>
        {showForm && (
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md mb-4"
            onClick={() => setShowForm(false)}
          >
            Voltar
          </button>
        )}
        {!showForm && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
            onClick={() => setShowForm(true)}
          >
            Agendar Nova Consulta
          </button>
        )}
        {showForm && <FormCalendar />}
      </section>
    </main>
  );
}
