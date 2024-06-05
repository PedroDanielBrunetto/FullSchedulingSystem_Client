import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/Dashboard/Sidebar';
import RegisterForm from '../../Components/Register-Patients/Form';
import CardList from '../../Components/List-Patients/CardList';
import ModalPersonalizado from '../../Components/List-Patients/ModalPersonalizado';
import withAuth from '../../Components/withAuth.jsx';
import { listPatients, updatePatient } from '../../api.js';
import { FaSpinner } from 'react-icons/fa'; // Ícone de carregamento

function ListClients() {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await listPatients();
        if (data.success) {
          setPacientes(data.result);
        } else {
          setError('Não há pacientes encontrados.');
        }
      } catch (error) {
        setError('Erro ao listar pacientes.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm);
  };

  const openModal = (paciente) => {
    setSelectedPaciente(paciente);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPaciente(null);
  };

  const handleUpdate = async (updatedPaciente) => {
    try {
      await updatePatient(updatedPaciente);
      setFeedback(<span style={{ color: 'green' }}>Paciente atualizado com sucesso!</span>);
      console.log('Paciente atualizado:', updatedPaciente);
      setTimeout(() => {
        closeModal();
        setFeedback(null);
      }, 1800);
    } catch (error) {
      setFeedback(<span style={{ color: 'red' }}>Erro ao atualizar paciente, tente novamente.</span>);
      console.error('Erro ao atualizar paciente:', error);
    }
  };

  const filteredPacientes = pacientes.filter((paciente) =>
    paciente.first_name && paciente.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );  

  return (
    <main className="flex flex-col md:flex-row">
      <Sidebar />
      <section className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Pacientes</h1>
        <div>
          {showRegisterForm ? (
            <div>
              <button
                onClick={toggleRegisterForm}
                className="mb-4 px-4 py-2 text-white font-semibold bg-gray-800 rounded-md focus:outline-none focus:ring focus:ring-gray-600"
              >
                Voltar
              </button>
              <RegisterForm />
            </div>
          ) : (
            <button
              onClick={toggleRegisterForm}
              className="mb-4 px-4 py-2 text-white font-semibold bg-gray-800 rounded-md focus:outline-none focus:ring focus:ring-gray-600"
            >
              Adicionar Paciente
            </button>
          )}
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Pesquisar por nome"
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-600"
          />
        </div>
        {loading ? (
          <div className="flex justify-center items-center">
            <FaSpinner className="animate-spin text-4xl text-blue-600" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPacientes.map((paciente) => (
              <CardList key={paciente.id_patient} paciente={paciente} onOpenModal={openModal} />
            ))}
          </div>
        )}
      </section>
      {selectedPaciente && (
        <ModalPersonalizado
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Atualizar Paciente"
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
                value={selectedPaciente.cep_patient}
                onChange={(e) => setSelectedPaciente({ ...selectedPaciente, cep_patient: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email:
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={selectedPaciente.email_patient}
                onChange={(e) => setSelectedPaciente({ ...selectedPaciente, email_patient: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="celular">
                Celular:
              </label>
              <input
                id="celular"
                name="celular"
                type="text"
                value={selectedPaciente.cel_patient}
                onChange={(e) => setSelectedPaciente({ ...selectedPaciente, cel_patient: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="observacoes">
                Observações:
              </label>
              <textarea
                id="observacoes"
                name="observacoes"
                value={selectedPaciente.about_patient}
                onChange={(e) => setSelectedPaciente({ ...selectedPaciente, about_patient: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {feedback && <div className="text-center">{feedback}</div>}
            <button
              type="button"
              onClick={() => handleUpdate(selectedPaciente)}
              className="mt-4 px-4 py-2 text-white font-semibold bg-blue-500 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              Atualizar
            </button>
          </form>
        </ModalPersonalizado>
      )}
    </main>
  );
}

export default withAuth(ListClients);
