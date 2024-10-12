import { useEffect, useState } from 'react'
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
            // console.log(data)
            setTasks(data)
            console.log(tasks)
        })
        .catch(err => console.error(err))
    },[])

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

    return (
        <div className="task-list-container">
        <h2>Tareas del usuario</h2>

        <table className="task-table">
            <thead>
            <tr>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Fecha límite</th>
                <th></th>
                <th></th>
            </tr>
            </thead>

            <tbody>
            {tasks.map((task) => (
                <tr key={task.id}>
                    <td>{task.description_task}</td>
                    <td className={`estado ${task.status_task.replace(' ', '-')}`}>{task.status_task}</td>
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
