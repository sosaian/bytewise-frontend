import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

// Colores para cada sección del gráfico
const COLORS = ['#0088FE', '#FF8042'];

function ResumenGeneral() {
  // Datos de ejemplo para los gráficos
  const data = [
    { name: 'Enero', ingresos: 4000, gastos: 2400 },
    { name: 'Febrero', ingresos: 3000, gastos: 1398 },
    { name: 'Marzo', ingresos: 2000, gastos: 9800 },
    { name: 'Abril', ingresos: 2780, gastos: 3908 }
  ];

  // Calcular total de ingresos y gastos
  const totalIngresos = data.reduce((acc, item) => acc + item.ingresos, 0);
  const totalGastos = data.reduce((acc, item) => acc + item.gastos, 0);

  // Datos para el gráfico de torta
  const totalData = [
    { name: 'Ingresos', value: totalIngresos },
    { name: 'Gastos', value: totalGastos }
  ];

  // Ejemplo de tareas obtenidas del backend
  const tareas = [
    { id: 1, descripcion: 'Completar análisis financiero', estado: 'completado' },
    { id: 2, descripcion: 'Revisión de presupuesto', estado: 'pendiente' },
    { id: 3, descripcion: 'Ajuste de metas trimestrales', estado: 'completado' }
  ];

  // Valores estáticos para Alertas y Recomendaciones
  const alertasYRecomendaciones = [
    'Alerta: Gastos de marzo fueron excepcionalmente altos',
    'Recomendación: Revise sus compras recurrentes para posibles ahorros',
    'Alerta: Bajo nivel de ahorro en abril'
  ];

  return (
    <div>
      <h1>Resumen General</h1>

      {/* Gráfico de torta para ingresos y gastos */}
      <PieChart width={400} height={400}>
        <Pie
          data={totalData}
          cx={200}
          cy={200}
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {totalData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      {/* Sección TASK (anteriormente Metas y Presupuestos) */}
      <h2>Tareas Realizadas</h2>
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            {tarea.descripcion} - <strong>{tarea.estado}</strong>
          </li>
        ))}
      </ul>

      {/* Sección estática para Alertas y Recomendaciones */}
      <h2>Alertas y Recomendaciones</h2>
      <ul>
        {alertasYRecomendaciones.map((alerta, index) => (
          <li key={index}>{alerta}</li>
        ))}
      </ul>
    </div>
  );
}

export default ResumenGeneral;
