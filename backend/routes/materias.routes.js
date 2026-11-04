const express = require("express") 

const { 
    obtenerMaterias, 
    obtenerMateria, 
    crearMateria, 
    modificarMateria, 
    eliminarMateria } = require("../controllers/materias.controller")
    
const { obtenerMaterias, obtenerMateria, crearMateria, modificarMateria, eliminarMateria } = require("../controllers/materias.controller")
const router = express.Router() 

router.get("/", obtenerMaterias) 

router.get("/:id", obtenerMateria) 

router.post("/", crearMateria) 

router.put("/:id", modificarMateria) 

router.delete("/:id", eliminarMateria) 

module.exports = router 