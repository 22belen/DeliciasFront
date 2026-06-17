import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./componentes/Login";
import Productos from "./componentes/Productos";
import AgregarProducto from "./componentes/AgregarProducto";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const handleSetToken = (nuevoToken) => {
    localStorage.setItem("token", nuevoToken);
    setToken(nuevoToken);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login setToken={handleSetToken} />} />
        <Route
          path="/productos"
          element={
            token ? <Productos token={token} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/productos/nuevo"
          element={
            token ? <AgregarProducto token={token} /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
