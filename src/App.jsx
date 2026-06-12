import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./componentes/Login";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
