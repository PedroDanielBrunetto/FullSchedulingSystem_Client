import React, { useState } from 'react';

const CardList = ({ paciente }) => {
  const { nomeCompleto, cep, email, celular, observacoes, cpf } = paciente;
  const [showCPF, setShowCPF] = useState(false);

  const toggleShowCPF = () => {
    setShowCPF(!showCPF);
  };

  // Exibe apenas os 5 primeiros dígitos do CPF, com os demais substituídos por asteriscos
  const formattedCPF = cpf ? cpf.slice(0, 5) + cpf.slice(5).replace(/\d/g, '*') : '';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
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
    </div>
  );
};

export default CardList;
