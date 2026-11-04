const mongoose = require("mongoose")

const materiaSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    descripcion: {
        type: String,
        trim: true
    },
    cargaHoraria: {
        type: Number,
        required: true,
        min: 1,
        validate: {
            validator: Number.isInteger,
            message: "La carga horaria debe ser un número entero"
        }
    },
    estado: {
        type: String,
        required: true,
        enum: ["activa", "inactiva"]
    }
},
{
    versionKey: false
})

const Materia = mongoose.model("Materia", materiaSchema)

module.exports = Materia
