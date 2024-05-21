import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const CardList = ({ paciente }) => {
  const { nomeCompleto, cep, email, celular, observacoes, cpf } = paciente;
  const [showCPF, setShowCPF] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [updatedPaciente, setUpdatedPaciente] = useState({ cep, email, celular, observacoes });

  const toggleShowCPF = () => {
    setShowCPF(!showCPF);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPaciente({ ...updatedPaciente, [name]: value });
  };

  const handleUpdate = () => {
    console.log('Paciente atualizado:', updatedPaciente);
    closeModal();
  };

  // Exibe apenas os 5 primeiros dígitos do CPF, com os demais substituídos por asteriscos
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
        onClick={openModal} 
        className="absolute top-2 right-2 text-indigo-600 focus:outline-none"
      >
        Atualizar
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Atualizar Paciente"
        className="bg-white rounded-lg shadow-2xl p-6 mx-auto my-4 max-w-lg"
        style={{
          overlay: {
            backgroundColor: 'white',
            zIndex: 9999,
          },
          content: {
            top: '50%',
            left: '50%',
            maxWidth: '400px',
            maxHeight: '70%',
            overflow: 'auto'
          }
        }}
      >
        <h2 className="text-lg font-semibold mb-4">Atualizar Paciente</h2>
        <form>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cep">
              CEP:
            </label>
            <input
              id="cep"
              name="cep"
              type="text"
              value={updatedPaciente.cep}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={updatedPaciente.email}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="celular">
              Celular:
            </label>
            <input
              id="celular"
              name="celular"
              type="text"
              value={updatedPaciente.celular}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="observacoes">
              Observações:
            </label>
            <textarea
              id="observacoes"
              name="observacoes"
              value={updatedPaciente.observacoes}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </form>
        <div className="flex items-center justify-between mt-4">
          <button
            type="button"
            onClick={handleUpdate}
            className="bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
          >
            Atualizar
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="bg-white text-gray-700 font-bold py-2 px-4 rounded border border-gray-300 shadow-sm focus:outline-none focus:shadow-outline"
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CardList;
