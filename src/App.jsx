import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterScreen from './RegisterScreen';
import logo from './img/color-bw-03.svg';
import './App.css'
  
function App() {
  const WIP_MESSAGE = "Página aún en construcción..."
  const ERROR_MESSAGE = "¡UPS! Esa página no existe..."

  return (
    <>
      <BrowserRouter>
        <header>
        <img src={logo} alt="Logo" className="logo" />
        </header>
        <main>
          <RegisterScreen />
          <Routes>
           {/* <Route path="/" element={<h2>{WIP_MESSAGE}</h2>} />*/}
           {/* <Route path="*" element={<h2>{ERROR_MESSAGE}</h2>} />*/}
          </Routes>
        </main>
        <footer>
          CILSA | Bootcamp Fullstack | Proyecto final
        </footer>
      </BrowserRouter>
    </>
  )
}

export default App;