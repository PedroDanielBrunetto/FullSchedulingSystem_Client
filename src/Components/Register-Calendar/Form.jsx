import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import Modal from 'react-modal';
import { addDays, format, isSameDay, isWithinInterval, parseISO, subMinutes } from 'date-fns';
import './FormCalendar.css';
import { registerAppointment, NotRegisteredAppointment } from "../../api.js";

const initialDaysToShow = 7;

Modal.setAppElement('#root');

export default function FormCalendar({ setSelectedDate }) {
  const [daysToShow, setDaysToShow] = useState(initialDaysToShow);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cpf, setCpf] = useState('');
  const [name, setName] = useState('');
  const [observation, setObservation] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [endTime, setEndTime] = useState('');
  const [isRegistered, setIsRegistered] = useState(true);
  const [phone, setPhone] = useState('');
  const [appointmentsForSelectedDate, setAppointmentsForSelectedDate] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = isRegistered
        ?
        {
          'cpf': cpf.replace(/\D/g, ''),
          dateInitial: format(startDate, 'dd/MM/yyyy') + ' ' + selectedTime,
          dateFinal: format(startDate, 'dd/MM/yyyy') + ' ' + endTime,
          message: observation
        }
        :
        {
          'name': name,
          cel: phone.replace(/\D/g, ''),
          dateInitial: format(startDate, 'dd/MM/yyyy') + ' ' + selectedTime,
          dateFinal: format(startDate, 'dd/MM/yyyy') + ' ' + endTime,
          message: observation
        };

      if (isRegistered) {
        await registerAppointment(data);
      } else {
        await NotRegisteredAppointment(data);
      }

      setFeedback(<span style={{ color: 'green' }}>Consulta agendada com sucesso!</span>);
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (error) {
      console.error('Erro ao registrar consulta:', error);
      setFeedback(<span style={{ color: 'red' }}>Erro ao registrar consulta. Por favor, tente novamente.</span>);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem('appointments'));
    if (storedAppointments) {
      const formattedSelectedDate = format(startDate, 'yyyy-MM-dd');
      setAppointmentsForSelectedDate(storedAppointments[formattedSelectedDate] || []);
    }
  }, [startDate]);

  useEffect(() => {
    fetchAvailableTimes();
  }, [startDate, appointmentsForSelectedDate]);

  const fetchAvailableTimes = () => {
    const bookedTimes = appointmentsForSelectedDate.map(appointment => {
      const start = parseISO(`${appointment.date_appointment}T${appointment.initial}`);
      const end = parseISO(`${appointment.date_appointment}T${appointment.final}`);
      return { start, end: subMinutes(end, 1) };
    });

    const times = generateTimes().filter(time => {
      const selectedDateTime = parseISO(`${format(startDate, 'yyyy-MM-dd')}T${time}`);
      return !bookedTimes.some(({ start, end }) => isWithinInterval(selectedDateTime, { start, end }));
    });

    setAvailableTimes(times);
  };

  const openModal = (time) => {
    setSelectedTime(time);
    setEndTime(getEndTime(time));
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setCpf('');
    setName('');
    setObservation('');
    setSelectedTime(null);
    setEndTime('');
    setPhone('');
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
                onClick={() => {
                  setStartDate(date);
                  setSelectedDate(date);
                }}
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
              onClick={() => openModal(time)}
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
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl md:mt-0 mt-7"
              onClick={closeModal}
            >
              &times;
            </button>
            <form onSubmit={handleSubmit} className="w-full md:mt-0 mt-5">
              <div className="mb-4">
                <label className="block font-semibold">Tipo de Paciente <span className="text-red-500">&#42;</span></label>
                <div className="flex items-center">
                  <label className="custom-radio mr-4">
                    <input
                      type="radio"
                      name="patientType"
                      value="registered"
                      checked={isRegistered}
                      onChange={() => setIsRegistered(true)}
                    />
                    <span className="checkmark"></span>
                    Cadastrado
                  </label>
                  <label className="custom-radio">
                    <input
                      type="radio"
                      name="patientType"
                      value="notRegistered"
                      checked={!isRegistered}
                      onChange={() => setIsRegistered(false)}
                    />
                    <span className="checkmark"></span>
                    Não cadastrado
                  </label>
                </div>
              </div>

              {isRegistered ? (
                <>
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
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="block font-semibold">Nome do Paciente <span className="text-red-500">&#42;</span></label>
                    <input
                      className="border border-gray-300 p-2 rounded w-full"
                      placeholder="Nome do Paciente"
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-semibold">Celular do Paciente <span className="text-red-500">&#42;</span></label>
                    <InputMask
                      className="border border-gray-300 p-2 rounded w-full"
                      placeholder="(99) 99999-9999"
                      required
                      mask="(99) 99999-9999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </>
              )}

              <div className="mb-4">
                <label className="block font-semibold">Data <span className="text-red-500">&#42;</span></label>
                <input
                  className="border border-gray-300 p-2 rounded w-full"
                  type="text"
                  value={format(startDate, 'dd/MM/yyyy')}
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
              {feedback && <div className="text-center mt-4 md:text-xs">{feedback}</div>}
              <div className="flex justify-end mb-7">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Agendar'}
                </button>
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