import { useState } from "react";
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
const API_ALUMNOS = "http://localhost:3000/alumnos"

function FormularioA({ onAlumnoCreado, alumnoEditar, onCancelar }){
    const [formulario, setFormulario] = useState({
        legajo: String(alumnoEditar?.legajo ?? ""),
        nombre: alumnoEditar?.nombre ?? "",
        carrera: alumnoEditar?.carrera ?? "",
        correo: alumnoEditar?.correo ?? ""
    })
    const [error, setError] = useState("")
    const [guardando, setGuardando] = useState(false)

    function manejarCambio(e) {
        const { name, value} = e.target

        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    async function guardar(e) {
        e.preventDefault()
        setError("")
        setGuardando(true)
        
    const alumno = {
        ...formulario,
        legajo: Number(formulario.legajo)
    }
    const editando = Boolean(alumnoEditar)
    const url = editando 
                ? `${API_ALUMNOS}/${alumnoEditar.legajo}`
                : API_ALUMNOS
        try {
            const token = localStorage.getItem("token")
            const respuesta = await fetch(url, {
                method: editando ? "PUT" : "POST",
                headers: {"Content-Type":"application/json", Authorization: `Bearer ${token}`},
                body: JSON.stringify(alumno)
            })

            if (!respuesta.ok) {
                throw new Error(`No se pudo guardar el alumno. Estado HTTP: ${respuesta.status}`)
            }

            setFormulario({
                legajo: "",
                nombre: "",
                carrera: "",
                correo: ""
            })
            onAlumnoCreado(editando ? "Modificado" : "Creado") 
        } catch (error) {
            console.error("Error al guardar:", error)
            setError(error.message || "No se pudo conectar con el servidor")
        } finally {
            setGuardando(false)
        }
    }
    function cancelar(){
        onCancelar()
    }
    return(
        <Paper
            component="section"
            elevation={0}
            sx={{
                p: { xs: 2.5, sm: 3.5 },
                mb: 3,
                border: 1,
                borderColor: "divider",
                borderRadius: 4,
                bgcolor: "background.paper"
            }}
        >
            <Typography component="h2" variant="h5" sx={{ mb: 2.5, fontWeight: 700 }}>
                {alumnoEditar ? "Editar alumno" : "Nuevo Alumno"}
            </Typography>
            <Box
                component="form"
                onSubmit={guardar}
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
                    gap: 2
                }}
            >
                <TextField
                    id="legajo"
                    name="legajo"
                    label="Legajo"
                    value={formulario.legajo}
                    onChange={manejarCambio}
                    required
                    fullWidth
                />
                <TextField
                    id="nombre"
                    name="nombre"
                    label="Nombre"
                    value={formulario.nombre}
                    onChange={manejarCambio}
                    required
                    fullWidth
                />
                <TextField
                    id="carrera"
                    name="carrera"
                    label="Carrera"
                    value={formulario.carrera}
                    onChange={manejarCambio}
                    required
                    fullWidth
                />
                <TextField
                    id="correo"
                    name="correo"
                    label="Correo"
                    value={formulario.correo}
                    onChange={manejarCambio}
                    required
                    fullWidth
                />
                <Box
                    sx={{
                        gridColumn: "1 / -1",
                        display: "flex",
                        justifyContent: "flex-end",
                        flexWrap: "wrap",
                        gap: 1.5,
                        mt: 1
                    }}
                >
                    <Button type="submit" variant="contained" disabled={guardando}>
                        {guardando
                            ? "Guardando..."
                            : alumnoEditar
                                ? "Guardar cambios"
                                : "Guardar"}
                    </Button>
                    {alumnoEditar && (
                        <Button
                            type="button"
                            onClick={cancelar}
                            disabled={guardando}
                            variant="outlined"
                        >
                            Cancelar
                        </Button>
                    )}
                </Box>
                {error && (
                    <Alert severity="error" role="alert" sx={{ gridColumn: "1 / -1" }}>
                        {error}
                    </Alert>
                )}
            </Box>
        </Paper>
    )
}
export default FormularioA