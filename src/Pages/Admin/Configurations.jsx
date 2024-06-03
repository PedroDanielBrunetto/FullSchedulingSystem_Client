import React, { useState, useEffect } from 'react';
import Sidebar from "../../Components/Dashboard/Sidebar";
import axios from 'axios';

export default function Configurations() {
  const [hoursBefore, setHoursBefore] = useState('');
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    fetchApiSettings();
  }, []);

  const fetchApiSettings = async () => {
    try {
      const response = await axios.get('/api/settings');
      setHoursBefore(response.data.hoursBefore);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Erro ao buscar configurações da API:', error);
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
      await axios.put('/api/settings', {
        hoursBefore,
        message,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao atualizar configurações da API:', error);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }
    try {
      await axios.put('/api/update-password', {
        currentPassword,
        newPassword,
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      alert('Senha atualizada com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar a senha:', error);
      alert('Erro ao atualizar a senha');
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
