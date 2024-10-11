import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../context/LoginContext'
import { useLoginRedirect } from '../hooks/useLoginRedirect'

function Transacciones() {
    const { login } = useContext(LoginContext)
    useLoginRedirect(login)

    // Estado inicial con algunas transacciones de ejemplo
    const [transacciones, setTransacciones] = useState([
        { id: 1, tipo: 'gasto', descripcion: 'Pago de alquiler', monto: -500, fecha: '2024-10-07' },
        { id: 2, tipo: 'ingreso', descripcion: 'Sueldo', monto: 1500, fecha: '2024-10-05' },
        { id: 3, tipo: 'gasto', descripcion: 'Compra supermercado', monto: -200, fecha: '2024-10-06' }
    ]);

    // Estados para los inputs de nueva transacción
    const [nuevoTipo, setNuevoTipo] = useState('gasto');
    const [nuevaDescripcion, setNuevaDescripcion] = useState('');
    const [nuevoMonto, setNuevoMonto] = useState('');
    const [editandoTransaccionId, setEditandoTransaccionId] = useState(null);

    // Función para agregar una nueva transacción
    const agregarTransaccion = (e) => {
        e.preventDefault();
        const nuevaTransaccion = {
            id: transacciones.length + 1,
            tipo: nuevoTipo,
            descripcion: nuevaDescripcion,
            monto: parseFloat(nuevoMonto),
            fecha: new Date().toISOString().split('T')[0] // Fecha automática
        };
        setTransacciones([...transacciones, nuevaTransaccion]);
        setNuevoTipo('gasto');
        setNuevaDescripcion('');
        setNuevoMonto('');
    };

    // Función para eliminar una transacción por ID
    const eliminarTransaccion = (id) => {
        setTransacciones(transacciones.filter(transaccion => transaccion.id !== id));
    };

    // Función para modificar una transacción
    const modificarTransaccion = (e, id) => {
        e.preventDefault();
        setTransacciones(transacciones.map(transaccion =>
            transaccion.id === id
                ? { ...transaccion, tipo: nuevoTipo, descripcion: nuevaDescripcion, monto: parseFloat(nuevoMonto) }
                : transaccion
        ));
        setEditandoTransaccionId(null); // Finaliza edición
        setNuevoTipo('gasto');
        setNuevaDescripcion('');
        setNuevoMonto('');
    };

    // Función para iniciar la edición de una transacción
    const iniciarEdicion = (transaccion) => {
        setEditandoTransaccionId(transaccion.id);
        setNuevoTipo(transaccion.tipo);
        setNuevaDescripcion(transaccion.descripcion);
        setNuevoMonto(transaccion.monto.toString());
    };

    return (
        <div>
            <h1>Gestión de Transacciones</h1>

            <h3>Listado de Transacciones</h3>
            <ul>
                {transacciones.map(transaccion => (
                    <li key={transaccion.id}>
                        <span>
                            {transaccion.tipo} - {transaccion.descripcion} - ${transaccion.monto} - Fecha: {transaccion.fecha}
                        </span>
                        <button onClick={() => iniciarEdicion(transaccion)}>Editar</button>
                        <button onClick={() => eliminarTransaccion(transaccion.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>

            <h3>{editandoTransaccionId ? 'Modificar Transacción' : 'Agregar Nueva Transacción'}</h3>
            <form onSubmit={editandoTransaccionId ? (e) => modificarTransaccion(e, editandoTransaccionId) : agregarTransaccion}>
                <select value={nuevoTipo} onChange={(e) => setNuevoTipo(e.target.value)}>
                    <option value="gasto">Gasto</option>
                    <option value="ingreso">Ingreso</option>
                    <option value="ahorro">Ahorro</option>
                </select>
                <input 
                    type="text" 
                    placeholder="Descripción" 
                    value={nuevaDescripcion} 
                    onChange={(e) => setNuevaDescripcion(e.target.value)} 
                    required 
                />
                <input 
                    type="number" 
                    placeholder="Monto" 
                    value={nuevoMonto} 
                    onChange={(e) => setNuevoMonto(e.target.value)} 
                    required 
                />
                <button type="submit">{editandoTransaccionId ? 'Guardar Cambios' : 'Agregar'}</button>
            </form>
        </div>
    );
}

export default Transacciones;
