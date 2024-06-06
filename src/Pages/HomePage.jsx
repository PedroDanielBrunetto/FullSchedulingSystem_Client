import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { loginMainUser } from '../api.js';

export default function Home() {
  const [emailCpf, setEmailCpf] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await loginMainUser(emailCpf, password);

      if (response.acesso) {
        const expires = rememberMe ? 30 : 1;
        Cookies.set('userId', response.idUser, { expires });
        navigate('/dashboard');
      } else {
        setError('Email ou senha incorretos!');
      }
    } catch (err) {
      setError('Erro ao processar login. Tente novamente.');
      console.error('Erro ao processar login:', err);
    }
  };

  return (
    <main>
      <div className="text-center mt-24">
        <div className="flex items-center justify-center">
          <svg fill="none" viewBox="0 0 24 24" className="w-12 h-12 text-blue-500" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-4xl tracking-tight">
          Inicie sessão na sua conta
        </h2>
      </div>
      <div className="flex justify-center my-2 mx-4 md:mx-0">
        <form className="w-full max-w-xl bg-white rounded-lg shadow-md p-6" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='emailCpf'>Email ou CPF</label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type='text'
                id='emailCpf'
                value={emailCpf}
                onChange={(e) => setEmailCpf(e.target.value)}
                required
              />
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='password'>Senha</label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="w-full flex items-center justify-between px-3 mb-3">
              <label htmlFor="remember" className="flex items-center w-1/2">
                <input
                  type="checkbox"
                  id="remember"
                  className="mr-1 bg-white shadow"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="text-sm text-gray-700 pt-1">Lembrar-me</span>
              </label>
            </div>
            {error && <div className="w-full md:w-full px-3 mb-6"><span className="text-red-500">{error}</span></div>}
            <div className="w-full md:w-full px-3 mb-6">
              <button className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500">Entrar</button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
