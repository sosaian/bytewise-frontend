import React from 'react';
import ResumenGeneral from './ResumenGeneral';
import MetasPresupuestos from './MetasPresupuestos';
import AlertasRecomendaciones from './AlertasRecomendaciones';

function Dashboard() {
    return (
        <div className="dashboard-container">
            <h1>Dashboard Financiero</h1>

            <section>
                <h2>Resumen General</h2>
                <ResumenGeneral />
            </section>

            <section>
                <h2>Metas y Presupuestos</h2>
                <MetasPresupuestos />
            </section>

            <section>
                <h2>Alertas y Recomendaciones</h2>
                <AlertasRecomendaciones />
            </section>
        </div>
    );
}

export default Dashboard;