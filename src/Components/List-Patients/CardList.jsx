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
        Atualizar
      </button>
    </div>
  );
};

export default CardList;
