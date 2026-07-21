import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';

function App() {
  return (
    <Router>
      {/* Navbar de Bootstrap */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Gestor de Turnos</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/clientes">Clientes</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Contenedor de Rutas */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/clientes" element={<Clients />} />
      </Routes>
    </Router>
  );
}

export default App;