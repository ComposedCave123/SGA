const Materia = require("../models/Materia")
const ESTADOS = ["Activa", "Inactiva"]

async function obtenerMaterias(req, res) {
    try {
        const materias = await Materia.find()
        res.json(materias)
    } catch (error) {
        res.status(500).json({ mensaje: "Error del servidor" })
    }
}

async function obtenerMateria(req, res) {
    try {
        const materia = await Materia.findOne({
            codigo: String(req.params.id)
        })
        if (!materia) {
            return res.status(404).json({
                mensaje: "Materia no encontrada"
            })
        }
        res.json(materia)
    } catch (error) {
        res.status(500).json({ mensaje: "Error del servidor" })
    }
}

async function crearMateria(req, res) {
    try {
        const { codigo, nombre, descripcion, estado, cargaHoraria } = req.body
        if (!codigo || !nombre || !descripcion || !estado || !cargaHoraria) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            })
        }
        if (typeof nombre !== "string") {
            return res.status(400).json({
                mensaje: "El nombre debe ser un texto"
            })
        }
        if (typeof codigo !== "string") {
            return res.status(400).json({
                mensaje: "El codigo debe ser un texto"
            })
            
        }
        if (!ESTADOS.includes(estado)) {
            return res.status(400).json({
                mensaje: "El estado debe ser Activa o Inactiva"
            })
        }
        const existe = await Materia.findOne({ codigo })
        if (existe) {
            return res.status(409).json({
                mensaje: "El codigo ya existe"
            })
        }
        const nuevaMateria = await Materia.create({
            codigo,
            nombre,
            descripcion,
            cargaHoraria,
            estado
        })
        res.status(201).json(nuevaMateria)
    } catch (error) {
        res.status(500).json({ mensaje: "Error del servidor" })
    }
}

async function modificarMateria(req, res) {
    try {
        const { nombre, descripcion, cargaHoraria, estado } = req.body
            if (!ESTADOS.includes(estado)) {
            return res.status(400).json({
                mensaje: "El estado debe ser Activa o Inactiva"
        })
        }
        const materiaActualizada = await Materia.findOneAndUpdate(
            { codigo: String(req.params.id) },
            { nombre, estado, descripcion, cargaHoraria },
            { returnDocument: "after", runValidators: true }
        )
        if (!materiaActualizada) {
            return res.status(404).json({
                mensaje: "Materia no encontrada"
            })
        }
        res.json(materiaActualizada)
    } catch (error) {
        res.status(500).json({ mensaje: "Error del servidor" })
    }
}

async function eliminarMateria(req, res) {
    try {
        const materiaEliminada = await Materia.findOneAndDelete({
            codigo: String(req.params.id)
        })
        if (!materiaEliminada) {
            return res.status(404).json({
                mensaje: "Materia no encontrada"
            })
        }
        res.json({ mensaje: "Materia eliminada correctamente" })
    } catch (error) {
        res.status(500).json({ mensaje: "Error del servidor" })
    }
}

module.exports = {
    obtenerMaterias,
    obtenerMateria,
    crearMateria,
    modificarMateria,
    eliminarMateria
}