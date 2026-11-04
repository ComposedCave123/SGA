import { useState } from "react"
import FormularioM from "../components/FormularioM"
import { ListaMaterias } from "../components/ListaMaterias"

export default function Materias() {
    const [actualizar, setActualizar] = useState(0)
    const [materiaEditar, setMateriaEditar] = useState(null)

    function refrescarMaterias() {
        setActualizar(valor => valor + 1)
        setMateriaEditar(null)
    }

    return (
        <>
            <FormularioM
                materiaEditar={materiaEditar}
                onMateriaGuardada={refrescarMaterias}
                onCancelar={() => setMateriaEditar(null)}
            />
            <ListaMaterias
                actualizar={actualizar}
                onEditarMateria={setMateriaEditar}
                onMateriaEliminada={refrescarMaterias}
            />
        </>
    )
}
