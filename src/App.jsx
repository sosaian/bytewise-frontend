import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LoginComponentContext } from './context/LoginContext.jsx'
import { RegisterFormContainer } from './components/RegisterFormContainer/RegisterFormContainer.jsx'
import { DashboardContainer } from './components/DashboardContainer/DashboardContainer.jsx'
import { TaskListContainer } from './components/TaskListContainer/TaskListContainer.jsx'
import { TransactionListContainer } from './components/TransactionListContainer/TransactionListContainer.jsx'
import { NavBar } from './components/NavBar/NavBar'
import { LoginFormContainer } from './components/LoginFormContainer/LoginFormContainer'
import './App.css'

function App() {
    const WIP_MESSAGE = 'Página aún en construcción...'
    const ERROR_MESSAGE = '¡UPS! Esa página no existe...'

    return (
        <LoginComponentContext>
            <BrowserRouter>
                <header>
                    <NavBar/>
                </header>
                <main>
                    <Routes>
                        {/* Página principal cuando el usuario está logueado */}
                        <Route path='/' element={<Navigate to='/register' />}/>

                        {/* Página de registro y autenticación */}
                        <Route path='/register' element={<RegisterFormContainer />} />
                        <Route path='/login' element={<LoginFormContainer />} />

                        {/* Secciones disponibles desde HomeScreen */}
                        <Route path='/dashboard' element={<DashboardContainer />} />
                        <Route path='/transactions' element={<TransactionListContainer />} />
                        <Route path='/tasks' element={<TaskListContainer />} />
                        
                        {/* Perfil del usuario y configuraciones */}
                        <Route path='/profile' element={<h2>{WIP_MESSAGE}</h2>} />
                        <Route path='/settings' element={<h2>{WIP_MESSAGE}</h2>} />

                        {/* Página que no existe */}
                        <Route path='*' element={<h2>{ERROR_MESSAGE}</h2>} />
                    </Routes>
                </main>
                <footer>
                    CILSA | Bootcamp Fullstack | Proyecto final
                </footer>
            </BrowserRouter>
        </LoginComponentContext>
    )
}

export default App
