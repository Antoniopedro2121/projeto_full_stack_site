import { Route, Routes, Navigate } from "react-router-dom";
import Cadasto from "../page/cadastro/cadastro";
import Contato from "../page/clientes/contato";

import Dashboard from "../page/dashboard/dashboard";
import Login from "../page/login/login";

export default function MainRoute() {
  return (
    <Routes>
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Cadastro" element={<Cadasto />} />
      <Route path="/Contato/:id" element={<Contato />} />
      <Route path="*" element={<Navigate to="/Login" replace />} />
    </Routes>
  );
}
