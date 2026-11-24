const express = require("express") 
// const alumnosController = require(
const { verificarToken } = require("../middlewares/authMiddleware") // Importar el middleware de verificación de token

const { 
    obtenerAlumnos, 
    obtenerAlumno, 
    crearAlumno, 
    actualizarAlumno, 
    eliminarAlumno } = require("../controllers/alumnos.controller")
const router = express.Router() 

router.get("/", verificarToken, obtenerAlumnos) // Ruta para obtener todos los alumnos, protegida por el middleware de verificación de token

router.get("/:id", verificarToken, obtenerAlumno) 

router.post("/", verificarToken, crearAlumno) 

router.put("/:id", verificarToken, actualizarAlumno) 

router.delete("/:id",verificarToken, eliminarAlumno) 

module.exports = router 