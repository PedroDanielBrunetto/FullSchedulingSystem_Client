import { Route, Routes } from "react-router-dom";
import Home from "./Pages/HomePage.jsx";
import LoginCliente from "./Pages/Client/LoginClient.jsx";
import MainAdmin from "./Pages/Admin/MainAdmin.jsx";
import Configurations from "./Pages/Admin/Configurations.jsx";
import ScheduleAdmin from "./Pages/Admin/ScheduleAdmin.jsx";
import ListClients from "./Pages/Admin/ListClients.jsx";

export default function Router() {
	return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Login-Paciente" element={<LoginCliente/>}/>
      <Route path="/dashboard" element={<MainAdmin/>}/>
      <Route path="/configuracoes" element={<Configurations/>}/>
      <Route path="/pacientes" element={<ListClients/>}/>
      <Route path="/agenda" element={<ScheduleAdmin/>}/>
    </Routes>
  );
}