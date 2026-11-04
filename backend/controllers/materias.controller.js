const Materia = require("../models/Materia")

const ESTADOS = ["activa", "inactiva"]

// Valida los datos según la consigna. Devuelve un mensaje de error o null si todo está bien.
// validarCodigo es true al crear (el código viene en el body) y false al modificar (viene en la URL).
function validarDatos(datos, validarCodigo) {
    const { codigo, nombre, descripcion, cargaHoraria, estado } = datos

    if (validarCodigo) {
        if (typeof codigo !== "string" || codigo.trim() === "") {
            return "El codigo es obligatorio y debe ser un texto"
        }
    }

    if (typeof nombre !== "string" || nombre.trim() === "") {
        return "El nombre es obligatorio y debe ser un texto"
    }
    if (nombre.trim().length < 3 || nombre.trim().length > 100) {
        return "El nombre debe tener entre 3 y 100 caracteres"
    }

    // La descripción es opcional, pero si se informa no puede tener solo espacios
    if (descripcion !== undefined && descripcion !== null) {
        if (typeof descripcion !== "string") {
            return "La descripcion debe ser un texto"
        }
        if (descripcion.length > 0 && descripcion.trim() === "") {
            return "La descripcion no puede contener solo espacios"
        }
    }

    if (!Number.isInteger(cargaHoraria) || cargaHoraria <= 0) {
        return "La carga horaria debe ser un numero entero mayor a 0"
    }

    if (!ESTADOS.includes(estado)) {
        return "El estado debe ser activa o inactiva"
    }

    return null
}

function limpiarDescripcion(descripcion) {
    return typeof descripcion === "string" ? descripcion.trim() : undefined
}

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
            codigo: String(req.params.id).trim()
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
        const mensajeError = validarDatos(req.body, true)
        if (mensajeError) {
            return res.status(400).json({ mensaje: mensajeError })
        }

        const codigo = req.body.codigo.trim()
        const nombre = req.body.nombre.trim()
        const descripcion = limpiarDescripcion(req.body.descripcion)
        const { cargaHoraria, estado } = req.body

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
        const mensajeError = validarDatos(req.body, false)
        if (mensajeError) {
            return res.status(400).json({ mensaje: mensajeError })
        }

        const nombre = req.body.nombre.trim()
        const descripcion = limpiarDescripcion(req.body.descripcion)
        const { cargaHoraria, estado } = req.body

        const materiaActualizada = await Materia.findOneAndUpdate(
            { codigo: String(req.params.id).trim() },
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
            codigo: String(req.params.id).trim()
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
