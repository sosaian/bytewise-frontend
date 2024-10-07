import React, { useState } from 'react';

function TareasHabitos() {
    // Estado inicial con algunas tareas de ejemplo
    const [tareas, setTareas] = useState([
        { id: 1, descripcion: 'Hacer ejercicio', estado: 'incompleta', fechaVencimiento: '2024-10-10' },
        { id: 2, descripcion: 'Leer un libro', estado: 'completa', fechaVencimiento: '2024-10-11' },
        { id: 3, descripcion: 'Meditar', estado: 'en progreso', fechaVencimiento: '2024-10-12' }
    ]);

    // Estados para los inputs de nueva tarea
    const [nuevaTarea, setNuevaTarea] = useState('');
    const [nuevoEstado, setNuevoEstado] = useState('incompleta');
    const [nuevaFecha, setNuevaFecha] = useState('');

    // Estado para controlar la edición
    const [editandoTareaId, setEditandoTareaId] = useState(null);

    // Función para agregar una nueva tarea
    const agregarTarea = (e) => {
        e.preventDefault();
        const tarea = {
            id: tareas.length + 1,
            descripcion: nuevaTarea,
            estado: nuevoEstado,
            fechaVencimiento: nuevaFecha
        };
        setTareas([...tareas, tarea]);
        setNuevaTarea('');
        setNuevoEstado('incompleta');
        setNuevaFecha('');
    };

    // Función para eliminar una tarea por ID
    const eliminarTarea = (id) => {
        setTareas(tareas.filter(tarea => tarea.id !== id));
    };

    // Función para modificar una tarea
    const modificarTarea = (e, id) => {
        e.preventDefault();
        setTareas(tareas.map(tarea => 
            tarea.id === id ? { ...tarea, descripcion: nuevaTarea, estado: nuevoEstado, fechaVencimiento: nuevaFecha } : tarea
        ));
        setEditandoTareaId(null); // Finalizar edición
        setNuevaTarea('');
        setNuevoEstado('incompleta');
        setNuevaFecha('');
    };

    // Función para activar el modo de edición
    const iniciarEdicion = (tarea) => {
        setEditandoTareaId(tarea.id);
        setNuevaTarea(tarea.descripcion);
        setNuevoEstado(tarea.estado);
        setNuevaFecha(tarea.fechaVencimiento);
    };

    return (
        <div>
            <h1>Gestión de Tareas y Hábitos</h1>

            <h3>Lista de Tareas</h3>
            <ul>
                {tareas.map(tarea => (
                    <li key={tarea.id}>
                        <span>{tarea.descripcion} - Estado: {tarea.estado} - Fecha de Vencimiento: {tarea.fechaVencimiento}</span>
                        <button onClick={() => iniciarEdicion(tarea)}>Editar</button>
                        <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>

            <h3>{editandoTareaId ? 'Modificar Tarea' : 'Agregar Nueva Tarea'}</h3>
            <form onSubmit={editandoTareaId ? (e) => modificarTarea(e, editandoTareaId) : agregarTarea}>
                <input 
                    type="text" 
                    placeholder="Descripción de la tarea" 
                    value={nuevaTarea} 
                    onChange={(e) => setNuevaTarea(e.target.value)} 
                    required 
                />
                <select value={nuevoEstado} onChange={(e) => setNuevoEstado(e.target.value)}>
                    <option value="incompleta">Incompleta</option>
                    <option value="completa">Completa</option>
                    <option value="en progreso">En Progreso</option>
                </select>
                <input 
                    type="date" 
                    value={nuevaFecha} 
                    onChange={(e) => setNuevaFecha(e.target.value)} 
                    required 
                />
                <button type="submit">{editandoTareaId ? 'Guardar Cambios' : 'Agregar'}</button>
            </form>
        </div>
    );
}

export default TareasHabitos;
