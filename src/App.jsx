import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { RegisterScreen } from './components/RegisterScreen'
// import HomeScreen from './components/HomeScreen'
import Dashboard from './components/Dashboard'
import Transacciones from './components/Transacciones'
import TareasHabitos from './components/TareasHabitos'
import { NavBar } from './components/NavBar/NavBar'
 import logo from '/assets/img/color-bw-03.svg'
// import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import './App.css'

function App() {
    const WIP_MESSAGE = "Página aún en construcción..."
    const ERROR_MESSAGE = "¡UPS! Esa página no existe..."

    return (
        <>
            <BrowserRouter>
                <header>
                    {/* <img src={logo} alt="Logo" className="logo" /> */}
                    <NavBar/>
                </header>
                <main>
                    <Routes>
                        {/* Página principal cuando el usuario está logueado */}
                        {/* <Route path="/" element={<HomeScreen user={{ name: "Pao" }} />} /> */}
                        <Route path="/" element={<Navigate to="/register" />}/>

                        {/* Página de registro y autenticación */}
                        <Route path="/register" element={<RegisterScreen />} />
                        <Route path="/login" element={<h2>{WIP_MESSAGE}</h2>} />

                        {/* Secciones disponibles desde HomeScreen */}
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/transactions" element={<Transacciones />} />
                        <Route path="/tasks" element={<TareasHabitos />} />

                        {/* Página que no existe */}
                        <Route path="*" element={<h2>{ERROR_MESSAGE}</h2>} />
                    </Routes>
                </main>
                <footer>
                    CILSA | Bootcamp Fullstack | Proyecto final
                </footer>
            </BrowserRouter>
        </>
    )
}

export default App
