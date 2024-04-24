import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import axios from 'axios';
import InputMask from 'react-input-mask';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function RegisterForm() {
  const [agreed, setAgreed] = useState(false);
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [enderecoDisabled, setEnderecoDisabled] = useState(true);
  const [observacoes, setObservacoes] = useState('');
  const [observacoesChars, setObservacoesChars] = useState(0);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const { logradouro } = response.data;
        setEndereco(logradouro);
      } catch (error) {
        console.error('Erro ao buscar endereço:', error);
      }
    };

    if (cep.length === 9) {
      fetchAddress();
    } else {
      setEndereco('');
    }
  }, [cep]);

  const handleCepChange = (event) => {
    const { value } = event.target;
    setCep(value);
    if (value.length === 9) {
      setEnderecoDisabled(true);
    } else {
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

  return (
    <div className=" bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Registrar novo paciente</h2>
      </div>
      <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
              Primeiro Nome
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
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
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="cpf" className="block text-sm font-semibold leading-6 text-gray-900">
              CPF
            </label>
            <div className="mt-2.5">
              <InputMask
                mask="999.999.999-99"
                name="cpf"
                id="cpf"
                autoComplete="cpf"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="cep" className="block text-sm font-semibold leading-6 text-gray-900">
              CEP
            </label>
            <div className="mt-2.5">
              <InputMask
                mask="99999-999"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="cep"
                placeholder="00000-000"
                name="cep"
                value={cep}
                onChange={handleCepChange}
              />
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
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
              Celular
            </label>
            <div className="relative mt-2.5">
              <InputMask
                mask="(99) 99999-9999"
                name="phone-number"
                id="phone-number"
                autoComplete="tel"
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
                name="message"
                id="message"
                rows={4}
                maxLength={200}
                value={observacoes}
                onChange={handleObservacoesChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 resize-none"
              />
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-end pointer-events-none">
                <p className="text-sm text-gray-500">{observacoesChars}/200</p>
              </div>
            </div>
          </div>
          <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className={classNames(
                  agreed ? 'bg-indigo-600' : 'bg-gray-200',
                  'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                )}
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    agreed ? 'translate-x-3.5' : 'translate-x-0',
                    'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>
            <Switch.Label className="text-sm leading-6 text-gray-600">
              By selecting this, you agree to our{' '}
              <a href="#" className="font-semibold text-indigo-600">
                privacy&nbsp;policy
              </a>
              .
            </Switch.Label>
          </Switch.Group>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}
