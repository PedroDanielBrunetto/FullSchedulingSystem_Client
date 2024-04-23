import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Index";
import LoginCliente from "./Pages/Client/LoginClient";
import MainAdmin from "./Pages/Admin/MainAdmin";
import Configurations from "./Pages/Admin/Configurations";
import ScheduleAdmin from "./Pages/Admin/ScheduleAdmin";
import ListClients from "./Pages/Admin/ListClients";

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