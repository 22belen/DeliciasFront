import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./componentes/Login";
import Productos from "./componentes/Productos";
import AgregarProducto from "./componentes/AgregarProducto";
import EditarProducto from "./componentes/EditarProducto";
import useStore from "./store";
import ProtectedRoute from "./componentes/ProtectedRoute";

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
          element={
            <ProtectedRoute>
              <Productos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/productos/nuevo"
          element={
            <ProtectedRoute>
              <AgregarProducto />
            </ProtectedRoute>
          }
        />
        <Route
          path="/productos/:id"
          element={
            <ProtectedRoute>
              <EditarProducto />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
