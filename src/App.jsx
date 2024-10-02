import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterScreen from './RegisterScreen';
import HomeScreen from './HomeScreen';
import Dashboard from './Dashboard';
import Transacciones from './Transacciones';
import TareasHabitos from './TareasHabitos';
import logo from './img/color-bw-03.svg';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import './App.css';

function App() {
  const WIP_MESSAGE = "Página aún en construcción...";
  const ERROR_MESSAGE = "¡UPS! Esa página no existe...";

  return (
    <>
      <BrowserRouter>
        <header>
          <img src={logo} alt="Logo" className="logo" />
        </header>
        <main>
          <Routes>
            {/* Página principal cuando el usuario está logueado */}
            <Route path="/" element={<HomeScreen user={{ name: "Pao" }} />} />

            {/* Página de registro */}
            <Route path="/register" element={<RegisterScreen />} />

            {/* Secciones disponibles desde HomeScreen */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transacciones" element={<Transacciones />} />
            <Route path="/tareas-habitos" element={<TareasHabitos />} />

            {/* Página en construcción */}
            <Route path="*" element={<h2>{ERROR_MESSAGE}</h2>} />
          </Routes>
        </main>
        <footer>
          CILSA | Bootcamp Fullstack | Proyecto final
        </footer>
      </BrowserRouter>
    </>
  );
}

export default App;