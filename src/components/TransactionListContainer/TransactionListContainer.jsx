import { useEffect, useState, useContext } from 'react'
import { LoginContext } from '../../context/LoginContext'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import './TransactionListContainer.css'

export function TransactionListContainer() {
    const [transactions, setTransactions] = useState([])
    const { login, checkLogin } = useContext(LoginContext)
    const navigateTo = useNavigate()

    const fetchData = async () => {
        try {
            const transactionsResponse = await fetch((import.meta.env.VITE_TRANSACTION_GET_ALL_URL), {
                method: 'GET',
                credentials: 'include'
            })

            const transactionsData = await transactionsResponse.json()

            setTransactions(transactionsData)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        checkLogin().then(() => login.valid ? fetchData() : navigateTo('/login'))
    },[])

    const manualTransactionListFetch = () => {
        fetch((import.meta.env.VITE_TRANSACTION_GET_ALL_URL), {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setTransactions(data)
        })
        .catch(err => console.error(err))
    }

    const translateStatus = (type_transaction) => {
        switch (type_transaction) {
            case "expense":
                return "Gasto"

            case "income":
                return "Ingreso"

            case "save":
                return "Ahorro"
                
            default:
                return "Ahorro"
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

        // Extract hours and minutes (UTC)
        const hours = date.getUTCHours() // Get hours (UTC)
        const minutes = date.getUTCMinutes() // Get minutes (UTC)

        // Pad minutes with leading zero if needed
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

        // Format the date as `DD-MMM-YYYY HH:mm`
        return `${day}-${month}-${year} ${hours}:${formattedMinutes}`
    }

    const createTransaction = (NEW_TRANSACTION) => {
        fetch(import.meta.env.VITE_TRANSACTION_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(NEW_TRANSACTION),
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            console.log((data.id) ? "Transaction creation successful" : "Transaction creation failed")
        })
        .then(() => {            
            Swal.fire({
                title: "Todo ta bien",
                html: `Transaction creada exitosamente.`,
                icon: "success"
            }).then(() => manualTransactionListFetch())
        })
        .catch(error => console.error(error))
    }
    
    const handleNewTransactionFormSubmit = () => {
        const AMOUNT = document.getElementById("transactionFormAmount").value.trim()
        const DESCRIPTION = document.getElementById("transactionFormDescription").value.trim()
        const TRANSACTION_TYPE = document.getElementById("transactionFormType").value

        if (AMOUNT === "") {
            Swal.fire({
                title: "Error al crear transacción",
                text: "El monto de la transacción no es válido, recordá que sigue la notación americana y además el monto puede ser de hasta 15 digitos con hasta 4 decimales.",
                icon: "error"
            })

            return
        }

        if (DESCRIPTION === "") {
            Swal.fire({
                title: "Error al crear transacción",
                text: "La observación o descripción de la transacción no es válida, por favor vuelva a intentarlo.",
                icon: "error"
            })

            return
        }

        if (TRANSACTION_TYPE === "") {
            Swal.fire({
                title: "Error al crear transacción",
                text: "Es necesario elegir algún tipo de transacción, por favor vuelva a intentarlo.",
                icon: "error"
            })

            return
        }

        const NEW_TRANSACTION = {
            type_transaction: TRANSACTION_TYPE,
            amount: parseFloat(AMOUNT).toFixed(2),
            description_transaction: DESCRIPTION
        }

        createTransaction(NEW_TRANSACTION)
    }

    const createNewTransactionForm = () => {
        Swal.fire({
            title: 'Registrar nueva transacción',
            html: `
                <div>
                    <label for="transactionFormType">Tipo de transacción</label>
                    <select id="transactionFormType" class="swal2-input" required>
                        <option value="" disabled selected>Seleccionar tipo de transacción</option>
                        <option value="expense">Egreso</option>
                        <option value="income">Ingreso</option>
                        <option value="save">Ahorro</option>
                    </select>
                </div>
                <div>
                    <label for="transactionFormAmount" class="swal2-input">Monto en $ (notación americana)</label>
                    <input id="transactionFormAmount" class="swal2-input" type="text" placeholder="15000.00" required />
                </div>
                <div>
                    <label for="transactionFormDescription" class="swal2-input">Observación o descripción</label>
                    <input id="transactionFormDescription" class="swal2-input" type="text" placeholder="Lo que me debía" required />
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: "Crear Transacción",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) handleNewTransactionFormSubmit()
        })
    }

    const editTransaction = (ID, NEW_TRANSACTION) => {
        fetch((import.meta.env.VITE_TRANSACTION_URL + "/" + ID), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(NEW_TRANSACTION),
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            console.log((data.message) ? "Transaction update successful" : "Transaction update failed")
        })
        .then(() => {            
            Swal.fire({
            title: "Todo ta bien",
            html: `Transaction actualizada exitosamente.`,
            icon: "success"
            }).then(() => manualTransactionListFetch())
        })
        .catch(error => console.error(error))
    }

    const handleEditTransactionFormSubmit = (id, original_description, original_type, original_amount) => {
        const DESCRIPTION = document.getElementById("editTransactionFormDescription").value.trim()
        const TRANSACTION_TYPE = document.getElementById("editTransactionFormType").value
        const AMOUNT = document.getElementById("editTransactionFormAmount").value.trim()

        const UNCHANGED_DESCRIPTION = DESCRIPTION === original_description
        const UNCHANGED_TYPE = TRANSACTION_TYPE === original_type
        const UNCHANGED_AMOUNT = AMOUNT === parseFloat(original_amount).toFixed(2)

        if (UNCHANGED_DESCRIPTION && UNCHANGED_TYPE && UNCHANGED_AMOUNT) {
            Swal.fire({
                title: "Error al actualizar transacción",
                text: "No se ha detectado ningún cambio en los valores, vuelva a intentarlo.",
                icon: "error"
            })

            return
        }

        const NEW_TRANSACTION = {
            ...(!UNCHANGED_DESCRIPTION && { description_transaction: DESCRIPTION }),
            ...(!UNCHANGED_TYPE && { type_transaction: TRANSACTION_TYPE }),
            ...(!UNCHANGED_AMOUNT && { amount: AMOUNT })
        }

        editTransaction(id, NEW_TRANSACTION)
    }

    const createEditTransactionForm = (id, description, type, amount) => {
        Swal.fire({
            title: 'Editar transacción',
            html: `
                <div>
                    <label for="editTransactionFormType">Tipo de transacción</label>
                    <select id="editTransactionFormType" class="swal2-input" required>
                        <option value="" disabled selected>Seleccionar tipo de transacción</option>
                        <option value="expense">Egreso</option>
                        <option value="income">Ingreso</option>
                        <option value="save">Ahorro</option>
                    </select>
                </div>
                <div>
                    <label for="editTransactionFormAmount" class="swal2-input">Monto en $ (notación americana)</label>
                    <input id="editTransactionFormAmount" class="swal2-input" type="text" placeholder="15000.00" required />
                </div>
                <div>
                    <label for="editTransactionFormDescription" class="swal2-input">Observación o descripción</label>
                    <input id="editTransactionFormDescription" class="swal2-input" type="text" placeholder="Lo que me debía" required />
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: "Actualizar Tarea",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) handleEditTransactionFormSubmit(id, description, type, amount)
        })

        //  After creating the modal, update the actual values of this transaction.
        document.getElementById("editTransactionFormDescription").value = description
        console.log(amount)
        document.getElementById("editTransactionFormType").value = type
        document.getElementById("editTransactionFormAmount").value = parseFloat(amount).toFixed(2)
    }

    const handleDeleteTransaction = (ID) => {
        Swal.fire({
            title: "Eliminar transacción",
            text: "Estás por eliminar esta transacción ... ¿Continuar?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Eliminar transacción",
            denyButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch((import.meta.env.VITE_TRANSACTION_URL + "/" + ID), {
                    method: 'DELETE',
                    credentials: 'include'
                })
                .then(res => res.json())
                .then(() => {
                    Swal.fire({
                    title: "Eliminar transacción",
                    html: `¡Tarea eliminada exitosamente!`,
                    icon: "success"
                    }).then(() => manualTransactionListFetch())
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
        <div className="transaction-list-container">
            <div>
                <h2>Transacciones del usuario</h2>
                <button onClick={createNewTransactionForm}><img src="./assets/icon/icon_add.svg" alt="Add icon"/> Nueva transacción</button>
            </div>

            <table className="transaction-table">
                <thead>
                <tr>
                    <th>Fecha (UTC)</th>
                    <th>Tipo</th>
                    <th>Monto</th>
                    <th>Descripción</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <td>{formatDate(transaction.date_transaction)}</td>
                        <td className={`type ${transaction.type_transaction}`}>{translateStatus(transaction.type_transaction)}</td>
                        <td>{"$" + parseFloat(transaction.amount).toFixed(2)}</td>
                        <td>{transaction.description_transaction}</td>
                        <td>
                            <button className="transactionEditListButton" onClick={() => { createEditTransactionForm(transaction.id, transaction.description_transaction, transaction.type_transaction, transaction.amount) }}><img src="./assets/icon/icon_edit.svg" alt="Edit icon"/></button>
                        </td>
                        <td>
                            <button className="transactionDeleteListButton" onClick={() => { handleDeleteTransaction(transaction.id) }}><img src="./assets/icon/icon_delete.svg" alt="Delete icon"/></button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
