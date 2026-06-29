import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useStore from "../store";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();
  const token = useStore((state) => state.token);
  const logout = useStore((state) => state.logout);
  const [searchParams] = useSearchParams();
  const categoriaFiltro = searchParams.get("categoria");

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

  const productosFiltrados = productos.filter((p) => {
    const coincideNombre = p.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaFiltro
      ? p.categoria === categoriaFiltro
      : true;
    return coincideNombre && coincideCategoria;
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6">
          <button
            className="btn btn-outline-secondary mb-3"
            onClick={() => navigate("/dashboard")}
          >
            ← Volver
          </button>
        </div>
        <div className="col-6 text-end">
          <button className="btn btn-danger mb-3" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">
          {categoriaFiltro
            ? `${categoriaFiltro.charAt(0).toUpperCase() + categoriaFiltro.slice(1)}s`
            : "Productos"}
        </h2>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
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
          {productosFiltrados.map((p) => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.descripcion}</td>
              <td>${p.precio}</td>
              <td>
                <button
                  className="btn btn-secondary btn-sm me-2"
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
