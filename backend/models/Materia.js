const mongoose = require("mongoose") 

const materiaSchema = new mongoose.Schema({ 
    codigo: {
        type: String,
        unique: true 
    },
    nombre: String,
    cargaHoraria: Number,
    descripcion: String,
    estado: {
    type: String,
    required: true,
    enum: ["Activa", "Inactiva"]
}

},
{ 
    versionKey: false 
}
)

const Materia = mongoose.model("Materia", materiaSchema) 

module.exports = Materia