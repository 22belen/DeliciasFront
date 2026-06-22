import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./componentes/Login";
import Productos from "./componentes/Productos";
import AgregarProducto from "./componentes/AgregarProducto";
import EditarProducto from "./componentes/EditarProducto";
import useStore from "./store";

function App() {
  const token = useStore((state) => {
    return state.token;
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/productos"
          element={token ? <Productos /> : <Navigate to="/login" />}
        />
        <Route
          path="/productos/nuevo"
          element={token ? <AgregarProducto /> : <Navigate to="/login" />}
        />
        <Route
          path="/productos/:id"
          element={token ? <EditarProducto /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
