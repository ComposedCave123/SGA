# Sistema de Gestión Académica (SGA)

Proyecto desarrollado durante la materia Programación IV.

## Descripción

El Sistema de Gestión Académica (SGA) es una aplicación web desarrollada como proyecto integrador de la asignatura Programación IV, correspondiente a la Tecnicatura Universitaria en Programación de la Universidad Tecnológica Nacional – Facultad Regional Reconquista.

El sistema tiene como finalidad facilitar la gestión de la información académica mediante una aplicación web que permite administrar alumnos y docentes, consultar información y organizar los distintos módulos del sistema.

El proyecto utiliza una arquitectura cliente-servidor, con un frontend desarrollado en React y un backend basado en Node.js y Express, conectado a una base de datos MongoDB.


## Objetivos

- Desarrollar una aplicación web completa.

- Implementar operaciones CRUD para la gestión de alumnos y docentes.

- Integrar frontend y backend mediante una API REST.

- Gestionar la información utilizando una base de datos no relacional.

- Incorporar autenticación de usuarios.

- Aplicar buenas prácticas de organización y separación de responsabilidades.

- Utilizar Git y GitHub para el control de versiones y el trabajo colaborativo.


## Tecnologías

### Frontend

- React.

- Vite.

- JavaScript.

- React Router DOM.

- Material UI (MUI).

- CSS.

### Backend

- Node.js.

- Express.

- JavaScript.

- Mongoose.

- bcrypt.

- jsonwebtoken (JWT).

### Base de datos

- MongoDB.

## Funcionalidades implementadas

### Interfaz de usuario

- Navegación mediante React Router DOM.

- Estructura de diseño compartida mediante componentes.

- Header y Footer.

- Páginas de Inicio, Alumnos, Docentes y Ayuda.

- Estilos y componentes de interfaz utilizando Material UI.

- Organización de componentes y páginas.

### Autenticación

- Modelo de usuarios en MongoDB.

- Almacenamiento de contraseñas mediante hash con bcrypt.

- Login mediante email y contraseña.

- Validación de credenciales en el backend.

- Generación de tokens JWT después de validar el usuario.

- Recepción y almacenamiento del token en el frontend.



## Autor

Irina Agretti

Programación IV