import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import Modal from 'react-modal';
import { addDays, format, isSameDay } from 'date-fns';
import axios from 'axios';

const initialDaysToShow = 7;

Modal.setAppElement('#root');

export default function FormCalendar() {
  const [daysToShow, setDaysToShow] = useState(initialDaysToShow);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cpf, setCpf] = useState('');
  const [name, setName] = useState('');
  const [observation, setObservation] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState([]);
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    fetchAvailableTimes(startDate);
  }, [startDate]);

  const fetchAvailableTimes = async (date) => {
    try {
      const bookedTimes = ['15:30', '17:30', '18:00', '18:30'];
      const times = generateTimes().filter(time => !bookedTimes.includes(time));
      setAvailableTimes(times);
    } catch (error) {
      console.error('Erro ao buscar horários disponíveis:', error);
    }
  };

  const openModal = (date, time) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setEndTime(getEndTime(time));
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const generateTimes = () => {
    const times = [];
    let start = 7 * 60; // 7:00 em minutos
    const end = 21 * 60; // 21:00 em minutos
    while (start <= end) {
      const hours = Math.floor(start / 60);
      const minutes = start % 60;
      const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      times.push(time);
      start += 30; // Incremento de 30 minutos
    }
    return times;
  };

  const getEndTime = (startTime) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const startMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + 30;
    const endHours = Math.floor(endMinutes / 60);
    const endMinutesFormatted = endMinutes % 60;
    return `${endHours.toString().padStart(2, '0')}:${endMinutesFormatted.toString().padStart(2, '0')}`;
  };

  const handleCpfChange = (e) => {
    setCpf(e.target.value);
    if (e.target.value === '123.456.789-00') {
      setName('Sync Up');
    } else {
      setName('');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { cpf, name, selectedDate, selectedTime, endTime, observation });
    closeModal();
  };

  const loadMoreDays = () => {
    setDaysToShow(daysToShow + 7);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Nova Consulta</h1>

        <div className="flex overflow-x-scroll mb-4 space-x-2">
          {Array.from({ length: daysToShow }).map((_, index) => {
            const date = addDays(new Date(), index);
            const isSelected = isSameDay(date, startDate);
            return (
              <button
                key={index}
                className={`min-w-[120px] p-2 rounded ${isSelected ? 'bg-red-500' : 'bg-blue-500'} text-white`}
                onClick={() => setStartDate(date)}
              >
                {format(date, 'dd MMM')}
              </button>
            );
          })}
          <button
            className="min-w-[120px] p-2 bg-gray-500 text-white rounded"
            onClick={loadMoreDays}
          >
            Mais dias
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {availableTimes.map((time, index) => (
            <button
              key={index}
              className="p-2 bg-gray-800 text-white rounded"
              onClick={() => openModal(startDate, time)}
            >
              {time}
            </button>
          ))}
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="w-full flex justify-center items-center"
          overlayClassName="modal-overlay"
          contentLabel="Agendamento"
        >
          <div className="relative w-full md:w-[718px] bg-white rounded shadow-lg p-6">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <form onSubmit={handleFormSubmit} className="w-full">
              <div className="mb-4">
                <label className="block font-semibold">CPF <span className="text-red-500">&#42;</span></label>
                <InputMask
                  className="border border-gray-300 p-2 rounded w-full"
                  placeholder="Digite o CPF do paciente cadastrado"
                  required
                  mask="999.999.999-99"
                  value={cpf}
                  onChange={handleCpfChange}
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Nome</label>
                <input
                  className="border border-gray-300 p-2 rounded w-full"
                  placeholder="Nome do Paciente"
                  required
                  type="text"
                  value={name}
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Data <span className="text-red-500">&#42;</span></label>
                <input
                  className="border border-gray-300 p-2 rounded w-full"
                  type="text"
                  value={format(selectedDate, 'dd/MM/yyyy')}
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Horário Inicial <span className="text-red-500">&#42;</span></label>
                <input
                  className="border border-gray-300 p-2 rounded w-full"
                  type="text"
                  value={selectedTime}
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Horário Final <span className="text-red-500">&#42;</span></label>
                <input
                  className="border border-gray-300 p-2 rounded w-full"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Observação</label>
                <input
                  className="border border-gray-300 p-2 rounded w-full"
                  placeholder="Coloque alguma observação"
                  type="text"
                  value={observation}
                  onChange={(e) => setObservation(e.target.value)}
                />
              </div>
              <div className="flex justify-end mb-7">
                <button className="bg-blue-500 text-white py-2 px-4 rounded" type="submit">Agendar</button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '400px',
    padding: '20px',
    zIndex: 1000,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 999,
  },
};

Modal.defaultStyles = customStyles;
