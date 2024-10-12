import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import './TaskListContainer.css'

export function TaskListContainer() {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        fetch((import.meta.env.VITE_TASK_GET_ALL_URL), {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setTasks(data)
        })
        .catch(err => console.error(err))
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

    const createTaskForm = () => {
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



    return (
        <div className="task-list-container">
            <div>
                <h2>Tareas del usuario</h2>
                <button onClick={createTaskForm}><img src="./assets/icon/icon_add.svg" alt="Add icon"/> Nueva tarea</button>
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
                        <td><img src="./assets/icon/icon_edit.svg" alt="Edit icon"/></td>
                        <td><img src="./assets/icon/icon_delete.svg" alt="Delete icon"/></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
