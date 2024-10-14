import { useEffect, useState, useContext } from 'react'
import { LoginContext } from '../../context/LoginContext'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import './TaskListContainer.css'

export function TaskListContainer() {
    const { login, checkLogin } = useContext(LoginContext)
    const [tasks, setTasks] = useState([])
    const navigateTo = useNavigate()

    const fetchData = async () => {
        try {
            const tasksResponse = await fetch((import.meta.env.VITE_TASK_GET_ALL_URL), {
                method: 'GET',
                credentials: 'include'
            })

            const tasksData = await tasksResponse.json()

            setTasks(tasksData)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        checkLogin().then(() => login.valid ? fetchData() : navigateTo('/login'))
    },[])

    const manualTaskListFetch = () => {
        fetch((import.meta.env.VITE_TASK_GET_ALL_URL), {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setTasks(data)
        })
        .catch(err => console.error(err))
    }

    const translateStatus = (status_task) => {
        switch (status_task) {
            case "not_started":
                return "Pendiente"

            case "in_progress":
                return "En progreso"

            case "complete":
                return "Terminada"

            case "overdue":
                return "Atrasada"

            case "canceled":
                return "Cancelada"
                
            default:
                return "not_started"
        }
    }

    const formatDate = (due_date) => {
        // Create a Date object from the ISO string
        const date = new Date(due_date);
        
        // Extract day, month, and year
        const day = date.getUTCDate(); // Get the day (UTC)
        const year = date.getUTCFullYear(); // Get the year (UTC)

        // Array to convert the month number to an abbreviated name
        const monthNames = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

        // Get the corresponding month name
        const month = monthNames[date.getUTCMonth()]; // getUTCMonth returns an index between 0 and 11

        // Format the date as `DD-MMM-YYYY`
        return `${day}-${month}-${year}`;
    }

    const createTask = (NEW_TASK) => {
        fetch(import.meta.env.VITE_TASK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(NEW_TASK),
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            console.log((data.id) ? "Task creation successful" : "Task creation failed")
        })
        .then(() => {            
            Swal.fire({
                title: "Todo ta bien",
                html: `Task creada exitosamente.`,
                icon: "success"
            }).then(() => manualTaskListFetch())
        })
        .catch(error => console.error(error))
    }
    
    const handleNewTaskFormSubmit = () => {
        const DESCRIPTION = document.getElementById("taskFormDescription").value.trim()
        const STATUS = document.getElementById("taskFormStatus").value
        const DUE_DATE = document.getElementById("taskFormDueDate").value

        if (DESCRIPTION === "") {
            Swal.fire({
                title: "Error al crear tarea",
                text: "El nombre o descripción de la tarea no es válida, por favor vuelva a intentarlo.",
                icon: "error"
            })

            return
        }

        if (STATUS === "") {
            Swal.fire({
                title: "Error al crear tarea",
                text: "Es necesario elegir algún estado actual para la tarea, por favor vuelva a intentarlo.",
                icon: "error"
            })

            return
        }

        if (DUE_DATE === "") {
            Swal.fire({
                title: "Error al crear tarea",
                text: "Es necesario tener alguna fecha límite para la tarea, por favor vuelva a intentarlo.",
                icon: "error"
            })

            return
        }

        const NEW_TASK = {
            description_task: DESCRIPTION,
            status_task: STATUS,
            due_date: DUE_DATE
        }

        createTask(NEW_TASK)
    }

    const createNewTaskForm = () => {
        Swal.fire({
            title: 'Crear nueva tarea',
            html: `
                <div>
                    <label for="taskFormDescription" class="swal2-input">Nombre o descripción de la tarea</label>
                    <input id="taskFormDescription" class="swal2-input" type="text" placeholder="Lo que quiero hacer" required />
                </div>
                <div>
                    <label for="taskFormStatus">Estado de la tarea</label>
                    <select id="taskFormStatus" class="swal2-input" required>
                        <option value="" disabled selected>Seleccionar estado</option>
                        <option value="not_started">Pendiente</option>
                        <option value="in_progress">En progreso</option>
                        <option value="complete">Terminada</option>
                        <option value="overdue">Atrasada</option>
                        <option value="canceled">Cancelada</option>
                    </select>
                </div>
                <div>
                    <label for="taskFormDueDate">Fecha límite</label>
                    <input id="taskFormDueDate" type="date" class="swal2-input" required />
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: "Crear Tarea",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) handleNewTaskFormSubmit()
        })
    }

    const editTask = (ID, NEW_TASK) => {
        fetch((import.meta.env.VITE_TASK_URL + "/" + ID), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(NEW_TASK),
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            console.log((data.message) ? "Task update successful" : "Task update failed")
        })
        .then(() => {            
            Swal.fire({
            title: "Todo ta bien",
            html: `Task actualizada exitosamente.`,
            icon: "success"
            }).then(() => manualTaskListFetch())
        })
        .catch(error => console.error(error))
    }

    const handleEditTaskFormSubmit = (id, original_description, original_status, original_due_date) => {
        const DESCRIPTION = document.getElementById("editTaskFormDescription").value.trim()
        const STATUS = document.getElementById("editTaskFormStatus").value
        const DUE_DATE = document.getElementById("editTaskFormDueDate").value

        const UNCHANGED_DESCRIPTION = DESCRIPTION === original_description
        const UNCHANGED_STATUS = STATUS === original_status
        const UNCHANGED_DATE = DUE_DATE === new Date(original_due_date).toISOString().split('T')[0]

        if (UNCHANGED_DESCRIPTION && UNCHANGED_STATUS && UNCHANGED_DATE) {
            Swal.fire({
                title: "Error al actualizar tarea",
                text: "No se ha detectado ningún cambio en los valores, vuelva a intentarlo.",
                icon: "error"
            })

            return
        }

        const NEW_TASK = {
            ...(DESCRIPTION !== original_description && { description_task: DESCRIPTION }),
            ...(STATUS !== original_status && { status_task: STATUS }),
            ...(DUE_DATE !== original_due_date && { due_date: DUE_DATE })
        }

        editTask(id, NEW_TASK)
    }

    const createEditTaskForm = (id, description, status, due_date) => {
        Swal.fire({
            title: 'Editar tarea',
            html: `
                <div>
                    <label for="editTaskFormDescription" class="swal2-input">Nombre o descripción de la tarea</label>
                    <input id="editTaskFormDescription" class="swal2-input" type="text" value="" required />
                </div>
                <div>
                    <label for="editTaskFormStatus">Estado de la tarea</label>
                    <select id="editTaskFormStatus" class="swal2-input" required>
                        <option value="" disabled selected>Seleccionar estado</option>
                        <option value="not_started">Pendiente</option>
                        <option value="in_progress">En progreso</option>
                        <option value="complete">Terminada</option>
                        <option value="overdue">Atrasada</option>
                        <option value="canceled">Cancelada</option>
                    </select>
                </div>
                <div>
                    <label for="editTaskFormDueDate">Fecha límite</label>
                    <input id="editTaskFormDueDate" type="date" class="swal2-input" required />
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: "Actualizar Tarea",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) handleEditTaskFormSubmit(id, description, status, due_date)
        })

        //  After creating the modal, update the actual values of this task.
        document.getElementById("editTaskFormDescription").value = description
        document.getElementById("editTaskFormStatus").value = status
        document.getElementById("editTaskFormDueDate").value = new Date(due_date).toISOString().split('T')[0]
    }

    const handleDeleteTask = (ID) => {
        Swal.fire({
            title: "Eliminar tarea",
            text: "Estás por eliminar esta tarea ... ¿Continuar?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Eliminar tarea",
            denyButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch((import.meta.env.VITE_TASK_URL + "/" + ID), {
                    method: 'DELETE',
                    credentials: 'include'
                })
                .then(res => res.json())
                .then(() => {
                    Swal.fire({
                    title: "Eliminar tarea",
                    html: `¡Tarea eliminada exitosamente!`,
                    icon: "success"
                    }).then(() => manualTaskListFetch())
                })
                .catch(error => console.error(error))
            }
        })
    }

    if (!login.valid)
        return (
            <>
                <h1>¡UPS! No puedes acceder a esta página...</h1>
            </>
        )

    return (
        <div className="task-list-container">
            <div>
                <h2>Tareas del usuario</h2>
                <button onClick={createNewTaskForm}><img src="./assets/icon/icon_add.svg" alt="Add icon"/> Nueva tarea</button>
            </div>

            <table className="task-table">
                <thead>
                <tr>
                    <th>Descripción</th>
                    <th>Estado de la tarea</th>
                    <th>Fecha límite</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                {tasks.map((task) => (
                    <tr key={task.id}>
                        <td>{task.description_task}</td>
                        <td className={`estado ${task.status_task.replace(' ', '-')}`}>{translateStatus(task.status_task)}</td>
                        <td>{formatDate(task.due_date)}</td>
                        <td>
                            <button className="taskListEditButton" onClick={() => { createEditTaskForm(task.id, task.description_task, task.status_task, task.due_date) }}><img src="./assets/icon/icon_edit.svg" alt="Edit icon"/></button>
                        </td>
                        <td>
                            <button className="taskListDeleteButton" onClick={() => { handleDeleteTask(task.id) }}><img src="./assets/icon/icon_delete.svg" alt="Delete icon"/></button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
