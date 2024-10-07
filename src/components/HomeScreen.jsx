import React from 'react';
import { Link } from 'react-router-dom';

function HomeScreen({ user }) {
    return (
        <div className="home-container">
            <h1>Bienvenido, {user.name}, a ByteWise</h1>
            <p>¿Qué te gustaría hacer hoy?</p>

            <div className="home-options">
                <div className="option-card">
                    <h3>Dashboard</h3>
                    <p>Visualiza un resumen de tu situación financiera.</p>
                    <Link to="/dashboard" className="btn btn-primary">Ir al Dashboard</Link>
                </div>

                <div className="option-card">
                    <h3>Gestión de Transacciones</h3>
                    <p>Administra tus ingresos y gastos.</p>
                    <Link to="/transacciones" className="btn btn-primary">Gestionar Transacciones</Link>
                </div>

                <div className="option-card">
                    <h3>Gestión de Tareas y Hábitos</h3>
                    <p>Organiza tus tareas y hábitos financieros.</p>
                    <Link to="/tareas-habitos" className="btn btn-primary">Gestionar Tareas y Hábitos</Link>
                </div>
            </div>
        </div>
    );
}

export default HomeScreen;