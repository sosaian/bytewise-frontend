import React from 'react';

function AlertasRecomendaciones() {
    const alertas = [
        { id: 1, mensaje: 'Recordatorio: Pagar factura de electricidad antes del 5 de octubre.' },
        { id: 2, mensaje: 'Sugerencia: Aumenta tus ahorros en un 10% este mes.' }
    ];

    return (
        <div>
            <h3>Alertas y Recomendaciones</h3>
            <ul>
                {alertas.map(alerta => (
                    <li key={alerta.id}>
                        {alerta.mensaje}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AlertasRecomendaciones;