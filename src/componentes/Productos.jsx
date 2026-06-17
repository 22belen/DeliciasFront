import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Productos({ token }) {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerProductos = async () => {
      const response = await fetch("http://localhost:8000/productos");
      const data = await response.json();
      setProductos(data);
    };
    obtenerProductos();
  }, []);

  const eliminarProducto = async (id) => {
    await fetch(`http://localhost:8000/productos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setProductos(productos.filter((p) => p.id !== id));
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Productos</h2>
        <button
          className="btn btn-success"
          onClick={() => navigate("/productos/nuevo")}
        >
          Agregar producto
        </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.descripcion}</td>
              <td>${p.precio}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => navigate(`/productos/${p.id}`)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarProducto(p.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Productos;
