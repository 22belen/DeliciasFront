import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store";
import "../App.css";

function Dashboard() {
  const [totalProductos, setTotalProductos] = useState(0);
  const [ultimosProductos, setUltimosProductos] = useState([]);
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState({
    hamburguesa: 0,
    empanada: 0,
    acompañamiento: 0,
  });

  const obtenerProductos = async () => {
    const response = await fetch("http://localhost:8000/productos");
    const data = await response.json();

    setTotalProductos(data.length);
    setUltimosProductos(data.slice(-3));
    setCategorias({
      hamburguesa: data.filter((p) => p.categoria === "hamburguesa").length,
      empanada: data.filter((p) => p.categoria === "empanada").length,
      acompañamiento: data.filter((p) => p.categoria === "acompañamiento")
        .length,
    });
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="d-flex">
      <div className="sidebar p-3">
        <h4 className="mb-5 mt-3">Administrar</h4>
        <button
          className="btn btn-light w-100 mb-2 text-start"
          onClick={() => navigate("/productos")}
        >
          Productos
        </button>
        <button
          className="btn btn-light w-100 mb-2 text-start"
          onClick={() => navigate("/productos?categoria=hamburguesa")}
        >
          Hamburguesas
        </button>
        <button
          className="btn btn-light w-100 mb-2 text-start"
          onClick={() => navigate("/productos?categoria=empanada")}
        >
          Empanadas
        </button>
        <button
          className="btn btn-light w-100 mb-2 text-start"
          onClick={() => navigate("/productos?categoria=acompañamiento")}
        >
          Acompañamientos
        </button>
        <hr />
        <button className="btn btn-danger w-100" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>

      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="mb-0">Dashboard</h1>
            <p className="text-muted mb-0">
              Gestión de productos y vista del sitio
            </p>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <div className="card product-list p-3 mb-3">
              <h5 className="p-3 mb-0">Últimos productos agregados</h5>
              {ultimosProductos.map((p) => (
                <div
                  key={p.id}
                  className="product-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/productos/${p.id}`)}
                >
                  <span className="product-name">{p.nombre}</span>
                  <span className="product-price">${p.precio}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-6">
            <div className="card product-list p-4 mb-3">
              <h5 className="mb-3">Resumen por categoría</h5>
              <div
                className="product-item"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/productos?categoria=hamburguesa")}
              >
                <span className="product-name">Hamburguesas</span>
                <span className="product-price">{categorias.hamburguesa}</span>
              </div>
              <div
                className="product-item"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/productos?categoria=empanada")}
              >
                <span className="product-name">Empanadas</span>
                <span className="product-price">{categorias.empanada}</span>
              </div>
              <div
                className="product-item"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/productos?categoria=acompañamiento")}
              >
                <span className="product-name">Acompañamientos</span>
                <span className="product-price">
                  {categorias.acompañamiento}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-lg-4 mb-3 d-flex">
            <div className="card dashboard-card text-center p-4 w-100 d-flex flex-column">
              <h5 className="fw-semibold">Productos</h5>
              <div className="stat-number">{totalProductos}</div>
              <p className="card-text-muted">Productos en el catálogo</p>
              <div className="mt-auto pt-3">
                <button
                  className="btn btn-outline-warning w-100"
                  onClick={() => navigate("/productos")}
                >
                  Gestionar
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4 mb-3 d-flex">
            <div className="card dashboard-card text-center p-4 w-100 d-flex flex-column">
              <h5 className="fw-semibold mt-4">Vista pública</h5>
              <p className="card-text-muted">
                Ver cómo se ve el sitio para clientes
              </p>
              <div className="mt-auto pt-3">
                <button
                  className="btn btn-outline-warning w-100"
                  onClick={() => window.open("http://localhost:5174", "_blank")}
                >
                  Abrir sitio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
