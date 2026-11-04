const mongoose = require("mongoose") 

const materiaSchema = new mongoose.Schema({ 
    codigo: {
        type: String,
        unique: true 
    },
    nombre: String,
    cargaHoraria: Number,
    descripcion: String,
    estado: String

},
{ 
    versionKey: false 
}
)

const Materia = mongoose.model("Materia", materiaSchema) 

module.exports = Materia