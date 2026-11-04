import { useEffect, useState } from "react"
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

const API_MATERIAS = "http://localhost:3000/materias"

const formularioInicial = {
    codigo: "",
    nombre: "",
    descripcion: "",
    cargaHoraria: "",
    estado: ""
}

export default function FormularioM({ materiaEditar, onMateriaGuardada, onCancelar }) {
    const [formulario, setFormulario] = useState(formularioInicial)
    const [mensaje, setMensaje] = useState(null)
    const [guardando, setGuardando] = useState(false)

    useEffect(() => {
        if (materiaEditar) {
            setFormulario({
                codigo: materiaEditar.codigo,
                nombre: materiaEditar.nombre,
                descripcion: materiaEditar.descripcion,
                cargaHoraria: String(materiaEditar.cargaHoraria),
                estado: materiaEditar.estado
            })
            return
        }

        setFormulario(formularioInicial)
    }, [materiaEditar])

    function actualizarCampo(evento) {
        const { name, value } = evento.target
        setFormulario(valorActual => ({ ...valorActual, [name]: value }))
    }

    async function guardarMateria(evento) {
        evento.preventDefault()
        setMensaje(null)

        const cargaHoraria = Number(formulario.cargaHoraria)
        if (!Number.isFinite(cargaHoraria) || cargaHoraria <= 0) {
            setMensaje({ tipo: "error", texto: "La carga horaria debe ser un número mayor a 0." })
            return
        }

        const datos = {
            nombre: formulario.nombre.trim(),
            descripcion: formulario.descripcion.trim(),
            cargaHoraria,
            estado: formulario.estado.trim()
        }

        if (!materiaEditar) {
            datos.codigo = formulario.codigo.trim()
        }

        setGuardando(true)

        try {
            const url = materiaEditar
                ? API_MATERIAS + "/" + encodeURIComponent(materiaEditar.codigo)
                : API_MATERIAS
            const respuesta = await fetch(url, {
                method: materiaEditar ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos)
            })

            if (!respuesta.ok) {
                const cuerpo = await respuesta.json().catch(() => null)
                throw new Error(cuerpo?.mensaje || "No se pudo guardar la materia.")
            }

            setMensaje({
                tipo: "success",
                texto: materiaEditar ? "Materia actualizada correctamente." : "Materia creada correctamente."
            })
            setFormulario(formularioInicial)
            onMateriaGuardada()
        } catch (error) {
            setMensaje({ tipo: "error", texto: error.message || "No se pudo guardar la materia." })
        } finally {
            setGuardando(false)
        }
    }

    function cancelarEdicion() {
        setMensaje(null)
        setFormulario(formularioInicial)
        onCancelar()
    }

    return (
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
            <Typography component="h1" variant="h4" sx={{ mb: 0.75, fontWeight: 800 }}>
                Gestión de Materias
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
                {materiaEditar ? "Actualizá los datos de la materia seleccionada." : "Registrá una nueva materia."}
            </Typography>

            <Box component="form" onSubmit={guardarMateria} noValidate>
                <Stack spacing={2}>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <TextField
                            label="Código"
                            name="codigo"
                            value={formulario.codigo}
                            onChange={actualizarCampo}
                            required
                            disabled={Boolean(materiaEditar)}
                            fullWidth
                        />
                        <TextField
                            label="Nombre"
                            name="nombre"
                            value={formulario.nombre}
                            onChange={actualizarCampo}
                            required
                            fullWidth
                        />
                    </Stack>
                    <TextField
                        label="Descripción"
                        name="descripcion"
                        value={formulario.descripcion}
                        onChange={actualizarCampo}
                        required
                        fullWidth
                    />
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <TextField
                            label="Carga horaria"
                            name="cargaHoraria"
                            type="number"
                            value={formulario.cargaHoraria}
                            onChange={actualizarCampo}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Estado"
                            name="estado"
                            value={formulario.estado}
                            onChange={actualizarCampo}
                            required
                            fullWidth
                        />
                    </Stack>
                    {mensaje && <Alert severity={mensaje.tipo}>{mensaje.texto}</Alert>}
                    <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end" }}>
                        {materiaEditar && (
                            <Button type="button" onClick={cancelarEdicion} disabled={guardando}>
                                Cancelar
                            </Button>
                        )}
                        <Button type="submit" variant="contained" disabled={guardando}>
                            {guardando ? "Guardando..." : materiaEditar ? "Actualizar materia" : "Guardar materia"}
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Paper>
    )
}
