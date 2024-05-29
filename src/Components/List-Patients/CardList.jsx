import React, { useState } from 'react';
import ModalPersonalizado from './ModalPersonalizado';

const CardList = ({ paciente, onOpenModal }) => {
  const { id, nomeCompleto, cep, email, celular, observacoes, cpf } = paciente;
  const [showCPF, setShowCPF] = useState(false);

  const toggleShowCPF = () => {
    setShowCPF(!showCPF);
  };

  const formattedCPF = cpf ? cpf.slice(0, 5) + cpf.slice(5).replace(/\d/g, '*') : '';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 relative">
      <h2 className="text-lg font-semibold mb-2">{nomeCompleto}</h2>
      <p className="text-gray-700 mb-2">CEP: {cep}</p>
      <p className="text-gray-700 mb-2">Email: {email}</p>
      <p className="text-gray-700 mb-2">Celular: {celular}</p>
      {showCPF ? (
        <p className="text-gray-700 mb-2">
          CPF: {cpf}
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
      <p className="text-gray-700">Observações: {observacoes}</p>
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
