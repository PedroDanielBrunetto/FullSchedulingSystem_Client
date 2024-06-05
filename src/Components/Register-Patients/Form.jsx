import { useState } from 'react';
import axios from 'axios';
import { registerPatient } from '../../api.js';

export default function RegisterForm() {
  const [agreed, setAgreed] = useState(false);
  const [endereco, setEndereco] = useState('');
  const [enderecoDisabled, setEnderecoDisabled] = useState(true);
  const [observacoes, setObservacoes] = useState('');
  const [observacoesChars, setObservacoesChars] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    cpf: '',
    email: '',
    cel: '',
    cep: '',
    about: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Função para formatar o CPF
  const formatCPF = (value) => {
    return value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  // Função para formatar o CEP
  const formatCEP = (value) => {
    return value.replace(/\D/g, '').replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  // Função para formatar o celular
  const formatCelular = (value) => {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === 'cpf') {
      formattedValue = formatCPF(value);
    } else if (name === 'cep') {
      formattedValue = formatCEP(value);
    } else if (name === 'cel') {
      formattedValue = formatCelular(value);
    }
    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleCepChange = async () => {
    const { cep } = formData;
    if (cep.length === 9) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const { logradouro } = response.data;
        setEndereco(logradouro);
        setEnderecoDisabled(true);
      } catch (error) {
        console.error('Erro ao buscar endereço:', error);
        setEnderecoDisabled(true);
      }
    } else {
      setEndereco('');
      setEnderecoDisabled(true);
    }
  };

  const handleObservacoesChange = (event) => {
    const { value } = event.target;
    if (value.length <= 200) {
      setObservacoes(value);
      setObservacoesChars(value.length);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formattedFormData = {
        ...formData,
        cpf: formData.cpf.replace(/\D/g, ''),
        cep: formData.cep.replace(/\D/g, ''),
        cel: formData.cel.replace(/\D/g, ''),
      };
      await registerPatient(formattedFormData);
      setFeedback(<span style={{ color: 'green' }}>Paciente registrado com sucesso!</span>);
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    } catch (error) {
      console.error('Erro ao registrar paciente:', error);
      setFeedback(<span style={{ color: 'red' }}>Erro ao registrar paciente. Por favor, tente novamente.</span>);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Registrar novo paciente</h2>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
              Primeiro Nome
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="firstName"
                id="first-name"
                autoComplete="given-name"
                value={formData.firstName}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
              Último Nome
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="secondName"
                id="last-name"
                autoComplete="family-name"
                value={formData.secondName}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="cpf" className="block text-sm font-semibold leading-6 text-gray-900">
              CPF
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="cpf"
                id="cpf"
                autoComplete="cpf"
                value={formData.cpf}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="cep" className="block text-sm font-semibold leading-6 text-gray-900">
              CEP
            </label>
            <div className="mt-2.5 flex items-center">
              <input
                type="text"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="cep"
                placeholder="00000-000"
                name="cep"
                value={formData.cep}
                onChange={handleChange}
              />
              <button
                type="button"
                className="ml-2 bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                onClick={handleCepChange}
              >
                Buscar
              </button>
            </div>
            <div className="mt-2">
              <input
                type="text"
                className="w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="endereco"
                placeholder="Endereço"
                name="endereco"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                disabled={enderecoDisabled}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
              Celular
            </label>
            <div className="relative mt-2.5">
              <input
                type="text"
                name="cel"
                id="phone-number"
                autoComplete="tel"
                value={formData.cel}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
              Observações
            </label>
            <div className="mt-2.5 relative">
              <textarea
                name="about"
                id="message"
                rows={4}
                maxLength={200}
                value={formData.about}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 resize-none"
              />
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-end pointer-events-none">
                <p className="text-sm text-gray-500">{observacoesChars}/200</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            disabled={isSubmitting}
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isSubmitting ? 'Enviando...' : 'Registrar'}
          </button>
          {feedback && <div className="text-center mt-4">{feedback}</div>}
        </div>
      </form>
    </div>
  );
}
