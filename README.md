# ByteWise - Frontend
CILSA | Bootcamp Fullstack | Proyecto final

![](https://github.com/user-attachments/assets/9c2860cd-5282-460f-8e6e-856d4a08309d)

## Información del proyecto

Este fue el proyecto final del curso, donde pudimos poner en práctica los conocimientos que aprendimos así como también los que ya teníamos previamente, en un grupo donde pudimos compartir ideas para encontrar una propuesta con la que cumplimos los requerimientos del proyecto.

### Descripción

ByteWise es una aplicación de “Gestión Financiera Personal” que te permite organizar y gestionar tus finanzas personales de manera eficiente. El sistema permite agregar, editar y eliminar registros financieros, y visualizar estadísticas para un mejor control de ingresos y gastos. Con la inclusión de una gestión de tareas, ByteWise te permite poder llevar registro de pendientes y metas que uno quiere alcanzar, teniendo al alcance de la mano el listado de tareas con el que fomentar mejores hábitos financieros.

### Características

* Administración de cuentas y categorías financieras
* Registro de ingresos y gastos
* Reportes gráficos sobre el estado financiero
* Cálculo automático de balances
* Historial de transacciones
* Gestión de tareas (agregar, editar, completar, eliminar)

## Miembros del grupo

* Paola Fraticola ([@dgpaofraticola](https://github.com/dgpaofraticola))
* Ian Sosa ([@sosaian](https://github.com/sosaian))
* Evelin Suarez ([@evelinnn19](https://github.com/evelinnn19))

## ¿Qué aprendimos en este proyecto?

* Metodologías ágiles de trabajo - SCRUM
* React JS (Vite)
* Manejo de variables de entorno - dotenv
* Consumo de API mediante fetch() con el [proyecto backend de ByteWise](https://github.com/sosaian/bytewise-backend)

## Instalación del repositorio de manera local

_**NOTA:** Para poder hacer uso de la totalidad de funcionalidades de este frontend, es necesario tener instalado y corriendo el [proyecto backend de ByteWise](https://github.com/sosaian/bytewise-backend)._

<details>
  <summary>Instalación usando git clone 🔧</summary>

### Cómo clonar el proyecto

Sigue estos pasos para clonar el repositorio e instalar las dependencias necesarias:

1. **Clonar el repositorio**    
    Ejecuta el siguiente comando en tu terminal, reemplazando `URL_DEL_PROYECTO` por el enlace del proyecto:

```sh
git clone URL_DEL_PROYECTO
```

2. **OPCIONAL - Cambiar de rama**   
    Ejecuta el siguiente comando en tu terminal, reemplazando `RAMA` por la rama a utilizar:

```sh
git checkout RAMA
```

### Cómo instalar las dependencias del proyecto

1. Ejecuta el siguiente comando en tu terminal:

```sh
npm install
```

_Nota: Puedes utilizar otro package manager si así lo deseas; procura revisar las `Tecnologías principales` y también las `Librerías` para comprobar que son compatibles primero_

### Crear archivo `.env`

1. En la raíz del proyecto, crea un archivo llamado **.env**. Este archivo almacenará las variables de entorno utilizadas en el proyecto.
   
2. A continuación, define las variables de entorno necesarias para el proyecto. 
    
    _Nota: `Vite` tiene una forma particular de implementar variables de entorno con `.env`. La primer cuestión a tener en cuenta es usar el prefijo `VITE` a cualquier variable como se muestra en el ejemplo. Luego, la forma de invocar cada una de estas variables en el código, es haciendo uso del objeto `import.meta.env`. Para más información consultar la [documentación oficial de Vite](https://vite.dev/guide/env-and-mode)_

#### Ejemplo de archivo `.env`

```sh
# Sintaxis de un archivo .env

# Las variables se definen como clave=valor
# Las cadenas de texto pueden tener comillas, pero no es obligatorio

VITE_VARIABLE_1=Valor de la variable 1   # Texto sin comillas
VITE_VARIABLE_2 = "2"                    # Texto con comillas (opcional)
VITE_VARIABLE_3=3                        # Valor numérico
VITE_VARIABLE_4=                         # Vacío (si por ejemplo su uso es opcional)
```

### Iniciar servidor (en modo `dev`)

```sh
npm run dev
```
</details>

<details>
  <summary>Instalación descargando comprimido ZIP 🔧</summary>

## Instalación descargando comprimido ZIP 🔧

### Cómo descargar el proyecto

Sigue estos pasos para clonar el repositorio e instalar las dependencias necesarias:

1. **Descargar el proyecto en formato ZIP** 
    Ir a “code” > download ZIP

2. **Descomprimir el archivo**

3. **OPCIONAL - Cambiar de rama**   
    Ejecuta el siguiente comando en tu terminal, reemplazando `RAMA` por la rama a utilizar:

```sh
git checkout RAMA
```

### Cómo instalar las dependencias del proyecto

1. En la carpeta donde se encuentra “package.json” ejecutar en terminal:

```sh
npm install
```

_Nota: Puedes utilizar otro package manager si así lo deseas; procura revisar las `Tecnologías principales` y también las `Librerías` para comprobar que son compatibles primero_

### Crear archivo `.env`

1. En la raíz del proyecto, crea un archivo llamado **.env**. Este archivo almacenará las variables de entorno utilizadas en el proyecto.
   
2. A continuación, define las variables de entorno necesarias para el proyecto. 
    
    _Nota: `Vite` tiene una forma particular de implementar variables de entorno con `.env`. La primer cuestión a tener en cuenta es usar el prefijo `VITE` a cualquier variable como se muestra en el ejemplo. Luego, la forma de invocar cada una de estas variables en el código, es haciendo uso del objeto `import.meta.env`. Para más información consultar la [documentación oficial de Vite](https://vite.dev/guide/env-and-mode)_

#### Ejemplo de archivo `.env`

```sh
# Sintaxis de un archivo .env

# Las variables se definen como clave=valor
# Las cadenas de texto pueden tener comillas, pero no es obligatorio

VITE_VARIABLE_1=Valor de la variable 1   # Texto sin comillas
VITE_VARIABLE_2 = "2"                    # Texto con comillas (opcional)
VITE_VARIABLE_3=3                        # Valor numérico
VITE_VARIABLE_4=                         # Vacío (si por ejemplo su uso es opcional)
```

### Iniciar servidor (en modo `dev`)

```sh
npm run dev
```
</details>

## Tecnologías principales:

⚙ Node Js - para hacer uso de `npm` (v20.13.0 al momento de este commit)

⚙ Vite - para crear un proyecto React

⚙ React

## Librerias:

Para que el proyecto se logre realizar de una manera esperada utilicé las siguientes herramientas:

📚 Dotenv (`npm install dotenv`)

📚 React-dom (Incluido en la creación del proyeto con Vite)

📚 React Router (`npm install react-router-dom`)

📚 Recharts (`npm install recharts`)

📚 SweetAlert 2 (`npm install sweetalert2`)

## Algunas capturas de pantalla

![](https://github.com/user-attachments/assets/54742af8-0fd5-4a47-9276-70f6cb51120e)

![](https://github.com/user-attachments/assets/71c67344-663c-407a-8c53-97f349be0cec)

![](https://github.com/user-attachments/assets/9a1bc5a4-96df-40e4-baa9-37a83230057d)