import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  const WIP_MESSAGE = "Página aún en construcción..."
  const ERROR_MESSAGE = "¡UPS! Esa página no existe..."

  return (
    <>
      <BrowserRouter>
        <header>
          <h1>BYTEWISE - Tu gestión</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<h2>{WIP_MESSAGE}</h2>} />
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
