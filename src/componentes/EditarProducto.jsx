import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useStore from "../store";

function EditarProducto() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const token = useStore((state) => state.token);

  useEffect(() => {
    const obtenerProducto = async () => {
      const response = await fetch(`http://localhost:8000/productos/${id}`);
      const data = await response.json();
      setNombre(data.nombre);
      setDescripcion(data.descripcion);
      setPrecio(data.precio);
    };
    obtenerProducto();
  }, []);

  const handleEditar = async () => {
    await fetch(`http://localhost:8000/productos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nombre, descripcion, precio }),
    });
    navigate("/productos");
  };

  return (
    <div className="container mt-5">
      <button
        className="btn btn-outline-secondary"
        onClick={() => navigate("/dashboard")}
      >
        ← Volver
      </button>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Editar producto</h2>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">
              Descripción
            </label>
            <input
              type="text"
              className="form-control"
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="precio" className="form-label">
              Precio
            </label>
            <input
              type="number"
              className="form-control"
              id="precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary" onClick={handleEditar}>
              Guardar
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/productos")}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditarProducto;
