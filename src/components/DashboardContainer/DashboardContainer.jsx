import { useEffect, useState, useContext } from 'react'
import { LoginContext } from '../../context/LoginContext'

export function DashboardContainer() {
    const { login } = useContext(LoginContext)
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
        const date = new Date(due_date)
        
        // Extract day, month, and year
        const day = date.getUTCDate() // Get the day (UTC)
        const year = date.getUTCFullYear() // Get the year (UTC)

        // Array to convert the month number to an abbreviated name
        const monthNames = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"]

        // Get the corresponding month name
        const month = monthNames[date.getUTCMonth()] // getUTCMonth returns an index between 0 and 11

        // Format the date as `DD-MMM-YYYY`
        return `${day}-${month}-${year}`
    }

    return (
        <>
            <h1>{"👋🏿 Hola, " + login.name}</h1>
            <section>
                <h2>Tareas no finalizadas</h2>
                <table className="task-table">
                    <thead>
                    <tr>
                        <th>Descripción</th>
                        <th>Estado de la tarea</th>
                        <th>Fecha límite</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.map((task) => {
                        if (task.status_task !== "complete")
                            return (
                                <tr key={task.id}>
                                    <td>{task.description_task}</td>
                                    <td className={`estado ${task.status_task.replace(' ', '-')}`}>{translateStatus(task.status_task)}</td>
                                    <td>{formatDate(task.due_date)}</td>
                                </tr>
                            )
                    })}
                    </tbody>
                </table>
            </section>
        </>
    )
}