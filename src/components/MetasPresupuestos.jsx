import React, { useState } from 'react';

function MetasPresupuestos() {
    // Estado con metas de ejemplo
    const [metas, setMetas] = useState([
        { id: 1, nombre: 'Ahorro para vacaciones', monto: 2000, completado: false },
        { id: 2, nombre: 'Pago de tarjeta de crédito', monto: 500, completado: true }
    ]);

    // Funciones para editar, agregar y eliminar metas
    const agregarMeta = () => {
        const nuevaMeta = { id: metas.length + 1, nombre: 'Nueva Meta', monto: 0, completado: false };
        setMetas([...metas, nuevaMeta]);
    };

    const eliminarMeta = (id) => {
        setMetas(metas.filter(meta => meta.id !== id));
    };

    const toggleMetaCompletada = (id) => {
        setMetas(metas.map(meta => (meta.id === id ? { ...meta, completado: !meta.completado } : meta)));
    };

    return (
        <div>
            <h3>Metas Activas</h3>
            <ul>
                {metas.map(meta => (
                    <li key={meta.id}>
                        {meta.nombre} - ${meta.monto} 
                        {meta.completado ? " (Completada)" : ""}
                        <button onClick={() => toggleMetaCompletada(meta.id)}>
                            {meta.completado ? "Reactivar" : "Completar"}
                        </button>
                        <button onClick={() => eliminarMeta(meta.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
            <button onClick={agregarMeta}>Agregar Meta</button>
        </div>
    );
}

export default MetasPresupuestos;