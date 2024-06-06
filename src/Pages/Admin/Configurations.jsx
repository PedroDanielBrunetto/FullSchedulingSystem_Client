import React, { useState, useEffect } from 'react';
import Sidebar from "../../Components/Dashboard/Sidebar";
import withAuth from "../../Components/withAuth.jsx";
import { getSettings, BalanceInquirySms, UpdateMessageSms, IntervalSendingAPI, UpdatePassword } from '../../api.js';
import Cookies from 'js-cookie';

function Configurations() {
  const [hoursBefore, setHoursBefore] = useState('');
  const [message, setMessage] = useState('');
  const [smsBalance, setSmsBalance] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const [originalHoursBefore, setOriginalHoursBefore] = useState('');
  const [originalMessage, setOriginalMessage] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordFeedback, setPasswordFeedback] = useState('');

  useEffect(() => {
    fetchApiSettings();
    fetchSmsBalance();
  }, []);

  const fetchApiSettings = async () => {
    try {
      const response = await getSettings();
      const settings = response.settings;
      const message = settings.Mensagem_enviada.replace(/\+/g, ' ');

      setHoursBefore(settings.sending_interval);
      setMessage(message);
      setOriginalHoursBefore(settings.sending_interval);
      setOriginalMessage(message);
    } catch (error) {
      console.error('Erro ao buscar configurações da API:', error);
    }
  };

  const fetchSmsBalance = async () => {
    try {
      const response = await BalanceInquirySms();
      setSmsBalance(response.saldo);
    } catch (error) {
      console.error('Erro ao buscar saldo de SMS:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    fetchApiSettings();
  };

  const handleUpdate = async () => {
    try {
      // Verifica alterações e chama as APIs apropriadas
      if (message !== originalMessage) {
        const formattedMessage = message.split(' ').join('+');
        await UpdateMessageSms({ message: formattedMessage });
      }

      if (hoursBefore !== originalHoursBefore) {
        await IntervalSendingAPI({ interval: hoursBefore });
      }

      // Recarrega as configurações após a atualização
      fetchApiSettings();
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao atualizar configurações da API:', error);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPasswordFeedback('');
    if (newPassword !== confirmPassword) {
      setPasswordFeedback('As senhas não coincidem');
      return;
    }
    try {
      const userId = Cookies.get('userId');
      const data = {
        userId,
        currentPassword,
        newPassword
      };
      const response = await UpdatePassword(data);
      setPasswordFeedback(response.message);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Erro ao atualizar a senha:', error);
      setPasswordFeedback('Erro ao atualizar a senha');
    }
  };

  return (
    <main className="flex flex-col md:flex-row">
      <Sidebar />
      <section className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Configurações</h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Configurações de API</h2>
          <form className="space-y-4">
            <div>
              <label className="block font-semibold">Horas antes da consulta:</label>
              <input
                type="number"
                value={hoursBefore}
                onChange={(e) => setHoursBefore(e.target.value)}
                disabled={!isEditing}
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block font-semibold">Mensagem:</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={!isEditing}
                className="border border-gray-300 p-2 rounded w-full"
              />
              <p className="text-sm text-gray-500 mt-1">
                Use <strong>@data</strong> para a data da consulta e <strong>@horario</strong> para o horário da consulta.
              </p>
            </div>
            <div>
              <p className="block font-semibold">Saldo de SMS: {smsBalance}</p>
            </div>
            {isEditing ? (
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Confirmar
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleEdit}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Atualizar
              </button>
            )}
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Atualizar Senha</h2>
          <form className="space-y-4" onSubmit={handlePasswordUpdate}>
            <div>
              <label className="block font-semibold">Senha Atual:</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block font-semibold">Nova Senha:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block font-semibold">Confirmar Nova Senha:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            {passwordFeedback && (
              <p className={`text-sm mt-1 ${passwordFeedback.includes('sucesso') ? 'text-green-500' : 'text-red-500'}`}>
                {passwordFeedback}
              </p>
            )}
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Atualizar Senha
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default withAuth(Configurations);
