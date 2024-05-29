import { useState } from 'react';
import Sidebar from "../../Components/Dashboard/Sidebar";
import RegisterForm from "../../Components/Register-Patients/Form";
import CardList from '../../Components/List-Patients/CardList';
import ModalPersonalizado from '../../Components/List-Patients/ModalPersonalizado';

export default function ListClients() {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState(null);

  const pacientes = [
    {
      id: 1,
      nomeCompleto: 'João Silva',
      cep: '12345-678',
      email: 'joao@example.com',
      celular: '(11) 98765-4321',
      observacoes: 'Observações do João Silva...',
      cpf: '123.456.789-10'
    },
    {
      id: 2,
      nomeCompleto: 'Maria Souza',
      cep: '98765-432',
      email: 'maria@example.com',
      celular: '(11) 12345-6789',
      observacoes: 'Observações da Maria Souza...',
      cpf: '987.654.321-98'
    },
    {
      id: 3,
      nomeCompleto: 'Ana Oliveira',
      cep: '54321-876',
      email: 'ana@example.com',
      celular: '(11) 87654-3210',
      observacoes: 'Observações da Ana Oliveira...',
      cpf: '543.210.987-76'
    },
    {
      id: 4,
      nomeCompleto: 'Pedro Santos',
      cep: '23456-789',
      email: 'pedro@example.com',
      celular: '(11) 65432-1098',
      observacoes: 'Observações do Pedro Santos...',
      cpf: '234.567.890-54'
    },
    {
      id: 5,
      nomeCompleto: 'Sandra Lima',
      cep: '67890-123',
      email: 'sandra@example.com',
      celular: '(11) 43210-9876',
      observacoes: 'Observações da Sandra Lima...',
      cpf: '678.901.234-32'
    },
    {
      id: 6,
      nomeCompleto: 'Marcos Pereira',
      cep: '87654-321',
      email: 'marcos@example.com',
      celular: '(11) 21098-7654',
      observacoes: 'Observações do Marcos Pereira...',
      cpf: '876.543.210-21'
    },
    {
      id: 7,
      nomeCompleto: 'Carla Almeida',
      cep: '34567-890',
      email: 'carla@example.com',
      celular: '(11) 98765-4321',
      observacoes: 'Observações da Carla Almeida...',
      cpf: '345.678.901-09'
    },
    {
      id: 8,
      nomeCompleto: 'Ricardo Fernandes',
      cep: '45678-901',
      email: 'ricardo@example.com',
      celular: '(11) 87654-3210',
      observacoes: 'Observações do Ricardo Fernandes...',
      cpf: '456.789.012-98'
    },
  ];

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

  const handleUpdate = (updatedPaciente) => {
    console.log('Paciente atualizado:', updatedPaciente);
    closeModal();
  };

  const filteredPacientes = pacientes.filter((paciente) =>
    paciente.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase())
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
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPacientes.map((paciente) => (
            <CardList key={paciente.id} paciente={paciente} onOpenModal={openModal} />
          ))}
        </div>
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
                value={selectedPaciente.cep}
                onChange={(e) => setSelectedPaciente({ ...selectedPaciente, cep: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                value={selectedPaciente.email}
                onChange={(e) => setSelectedPaciente({ ...selectedPaciente, email: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                value={selectedPaciente.celular}
                onChange={(e) => setSelectedPaciente({ ...selectedPaciente, celular: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="observacoes">
                Observações:
              </label>
              <textarea
                id="observacoes"
                name="observacoes"
                value={selectedPaciente.observacoes}
                onChange={(e) => setSelectedPaciente({ ...selectedPaciente, observacoes: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
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
