import React, { useState } from 'react';

const CardList = ({ paciente, onOpenModal }) => {
  const { id_patient, first_name, second_name, cep_patient, email_patient, cel_patient, about_patient, cpf_patient } = paciente;
  const [showCPF, setShowCPF] = useState(false);

  const toggleShowCPF = () => {
    setShowCPF(!showCPF);
  };

  const formattedCPF = cpf_patient ? cpf_patient.slice(0, 5) + cpf_patient.slice(5).replace(/\d/g, '*') : '';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 relative">
      <h2 className="text-lg font-semibold mb-2">{first_name} {second_name}</h2>
      <p className="text-gray-700 mb-2">CEP: {cep_patient}</p>
      <p className="text-gray-700 mb-2">Email: {email_patient}</p>
      <p className="text-gray-700 mb-2">Celular: {cel_patient}</p>
      {showCPF ? (
        <p className="text-gray-700 mb-2">
          CPF: {cpf_patient}
          <button onClick={toggleShowCPF} className="ml-2 text-indigo-600 focus:outline-none">
            Ocultar
          </button>
        </p>
      ) : (
        <p className="text-gray-700 mb-2">
          CPF: {formattedCPF}
          <button onClick={toggleShowCPF} className="ml-2 text-indigo-600 focus:outline-none">
            Mostrar
          </button>
        </p>
      )}
      <p className="text-gray-700">Observações: {about_patient}</p>
      <button
        onClick={() => onOpenModal(paciente)}
        className="absolute top-2 right-2 text-indigo-600 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256"><path d="M229.66,58.34l-32-32a8,8,0,0,0-11.32,0l-96,96A8,8,0,0,0,88,128v32a8,8,0,0,0,8,8h32a8,8,0,0,0,5.66-2.34l96-96A8,8,0,0,0,229.66,58.34ZM124.69,152H104V131.31l64-64L188.69,88ZM200,76.69,179.31,56,192,43.31,212.69,64ZM224,128v80a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h80a8,8,0,0,1,0,16H48V208H208V128a8,8,0,0,1,16,0Z"></path></svg>
      </button>
    </div>
  );
};

export default CardList;
