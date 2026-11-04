import { useEffect, useState } from "react"
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"

const API_MATERIAS = "http://localhost:3000/materias"

export function ListaMaterias({ actualizar, onEditarMateria, onMateriaEliminada }) {
    const [materias, setMaterias] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState("")
    const [eliminando, setEliminando] = useState(null)

    useEffect(() => {
        async function cargarMaterias() {
            setCargando(true)
            setError("")

            try {
                const respuesta = await fetch(API_MATERIAS)
                if (!respuesta.ok) {
                    throw new Error("No se pudo obtener la lista de materias.")
                }

                setMaterias(await respuesta.json())
            } catch (error) {
                console.error("Error de conexión", error)
                setError(error.message || "No se pudo cargar la lista de materias.")
            } finally {
                setCargando(false)
            }
        }

        cargarMaterias()
    }, [actualizar])

    async function eliminarMateria(codigo) {
        if (!window.confirm("¿Seguro que querés eliminar esta materia?")) {
            return
        }

        setEliminando(codigo)

        try {
            const respuesta = await fetch(API_MATERIAS + "/" + encodeURIComponent(codigo), {
                method: "DELETE"
            })

            if (!respuesta.ok) {
                throw new Error("No se pudo eliminar la materia.")
            }

            onMateriaEliminada()
        } catch (error) {
            console.error("Error al eliminar la materia", error)
            setError(error.message || "No se pudo eliminar la materia.")
        } finally {
            setEliminando(null)
        }
    }

    if (cargando) {
        return (
            <Paper component="section" elevation={0} sx={{ p: 3, border: 1, borderColor: "divider", borderRadius: 4 }}>
                <Typography color="text.secondary">Cargando materias...</Typography>
            </Paper>
        )
    }

    if (error) {
        return <Alert severity="error" role="alert">{error}</Alert>
    }

    return (
        <Paper
            component="section"
            elevation={0}
            sx={{
                p: { xs: 2.5, sm: 3.5 },
                border: 1,
                borderColor: "divider",
                borderRadius: 4,
                bgcolor: "background.paper"
            }}
        >
            <Typography component="h2" variant="h5" sx={{ mb: 2.5, fontWeight: 700 }}>
                Materias registradas
            </Typography>
            {materias.length === 0 ? (
                <Typography color="text.secondary">No hay materias registradas.</Typography>
            ) : (
                <TableContainer component={Box} sx={{ overflowX: "auto" }}>
                    <Table size="small" aria-label="Lista de materias">
                        <TableHead>
                            <TableRow>
                                <TableCell>Código</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Descripción</TableCell>
                                <TableCell align="right">Carga horaria</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell align="right">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {materias.map(materia => (
                                <TableRow key={materia.codigo}>
                                    <TableCell>{materia.codigo}</TableCell>
                                    <TableCell>{materia.nombre}</TableCell>
                                    <TableCell>{materia.descripcion}</TableCell>
                                    <TableCell align="right">{materia.cargaHoraria}</TableCell>
                                    <TableCell>{materia.estado}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            type="button"
                                            onClick={() => onEditarMateria(materia)}
                                            size="small"
                                            sx={{ mr: 1 }}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => eliminarMateria(materia.codigo)}
                                            color="error"
                                            size="small"
                                            disabled={eliminando === materia.codigo}
                                        >
                                            {eliminando === materia.codigo ? "Eliminando..." : "Eliminar"}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Paper>
    )
}
