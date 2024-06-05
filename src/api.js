import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_WS_API,
});

export const loginMainUser = async (emailCpf, password) => {
  try {
    const response = await api.post("/login-main-user", { emailCpf, password });
    return response.data;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
};

export const listPatients = async () => {
  try {
    const response = await api.get("/list-patients");
    return response.data;
  } catch (error) {
    console.error("Erro ao listar pacientes:", error);
    throw error;
  }
};

export const registerPatient = async (data) => {
  try {
    const response = await api.post("/register-patient", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao registrar paciente:", error);
    throw error;
  }
};

export const updatePatient = async (data) => {
  try {
    const response = await api.put("/update-patients", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar paciente:", error);
    throw error;
  }
};

export const getAppointmentsByDay = async (day) => {
  try {
    const response = await api.get(`/list-appointments/${day}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao trazer consultas", error);
    throw error;
  }
};

export const registerAppointment = async (data) => {
  try {
    const response = await api.post("/register-appointment", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao registrar consulta", error);
    throw error;
  }
};

export const NotRegisteredAppointment = async (data) => {
  try {
    const response = await api.post("/not-registered-appointment", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao registrar consulta", error);
    throw error;
  }
};
