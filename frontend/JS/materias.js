const formulario = document.querySelector("#formulario")
const listaMaterias = document.querySelector("#listaMaterias")
let materiaEditandoCodigo = null
let materiaEditar = null
const btnCancelar = document.querySelector("#btnCancelar")
btnCancelar.style.display = "none"
const btnGuardar = document.querySelector("#btnGuardar")
const API_MATERIAS = "http://localhost:3000/materias"
 
formulario.addEventListener("submit", async function (event) {
    event.preventDefault()
 
    // Cargamos los valores de los campos del formulario
    const codigo = document.querySelector("#codigo").value.trim()
    const nombre = document.querySelector("#nombre").value.trim()
    const descripcionOriginal = document.querySelector("#descripcion").value
    const descripcion = descripcionOriginal.trim()
    const cargaHoraria = document.querySelector("#cargaHoraria").value.trim()
    const estado = document.querySelector("#estado").value.trim()
 
    // Validaciones de los campos del formulario
    // La descripción es opcional, el resto de los campos son obligatorios
    if (codigo === "" || nombre === "" || cargaHoraria === "" || estado === "") {
        mostrarMensaje("Código, nombre, carga horaria y estado son obligatorios", "mje-error")
        return
    }
 
    if (nombre.length < 3 || nombre.length > 100) {
        mostrarMensaje("El nombre debe tener entre 3 y 100 caracteres", "mje-error")
        return
    }

    // Si se informa la descripción, no puede tener solo espacios
    if (descripcionOriginal.length > 0 && descripcion === "") {
        mostrarMensaje("La descripción no puede contener solo espacios", "mje-error")
        return
    }
 
    if (!Number.isInteger(Number(cargaHoraria)) || Number(cargaHoraria) <= 0) {
        mostrarMensaje("La carga horaria debe ser un número entero mayor a 0", "mje-error")
        return
    }
 
    try {
        // Si materiaEditandoCodigo es null, estamos creando una nueva materia, por lo que hacemos un POST.
        if (materiaEditandoCodigo === null) {
            const materia = {
                codigo: codigo, // el código se envía como texto (string), tal como pide la consigna
                nombre: nombre,
                descripcion: descripcion,
                cargaHoraria: Number(cargaHoraria),
                estado: estado
            }
            const respuesta = await fetch(API_MATERIAS, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(materia)
            })
            if (respuesta.status === 409) {
                mostrarMensaje("Ya existe una materia con ese código", "mje-error")
                return
            }
            if (!respuesta.ok) {
                throw new Error("La API respondió con un error.")
            }
            mostrarMensaje("Materia guardada correctamente", "mje-exito")
        } else {
            const datosActuales = {
                nombre: nombre,
                descripcion: descripcion,
                cargaHoraria: Number(cargaHoraria),
                estado: estado
            }
            if (JSON.stringify(datosActuales) === JSON.stringify(materiaEditar)) {
                mostrarMensaje("No se realizaron cambios", "mje-adv")
                return
            }
            const respuesta = await fetch(`${API_MATERIAS}/${encodeURIComponent(materiaEditandoCodigo)}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datosActuales)
            })
            if (!respuesta.ok) {
                throw new Error("La API respondió con un error")
            }
            materiaEditandoCodigo = null
            materiaEditar = null
            btnGuardar.textContent = "Guardar Materia"
            document.querySelector("#codigo").disabled = false
            btnCancelar.style.display = "none"
 
            mostrarMensaje("Materia actualizada correctamente", "mje-exito")
        }
        await actualizarListaMaterias()
        formulario.reset()
    } catch (error) {
        console.error(error.message)
        mostrarMensaje("No fue posible realizar la operación", "mje-error")
    }
})
 
 
async function obtenerMaterias() {
    try {
        const respuesta = await fetch(API_MATERIAS)
        if (!respuesta.ok) {
            throw new Error("La API respondió con un error")
        }
        const materias = await respuesta.json()
        return materias
    } catch (error) {
        console.error(error.message)
        throw error
    }
}
 
function mostrarMaterias(materias) {
    listaMaterias.innerHTML = ""
    for (const materia of materias) {
        listaMaterias.innerHTML += `
        <tr>
            <td>${materia.codigo}</td>
            <td>${materia.nombre}</td>
            <td>${materia.descripcion || ""}</td>
            <td>${materia.cargaHoraria}</td>
            <td>${materia.estado}</td>
            <td>
                <button
                class="btn-editar"
                data-codigo="${materia.codigo}"
                title="Editar materia">
                <i class="fa-solid fa-pen"></i>
                </button>
                <button
                class="btn-eliminar"
                data-codigo="${materia.codigo}"
                title="Eliminar materia">
                <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
        `
    }
}
 
async function eliminarMateria(codigo) {
    const respuesta = await fetch(`${API_MATERIAS}/${encodeURIComponent(codigo)}`, {
        method: "DELETE"
    })
    if (!respuesta.ok) {
        mostrarMensaje("No se pudo eliminar la materia", "mje-error")
        return
    }
 
    // Si justo se estaba editando la materia eliminada, limpiamos el formulario
    if (materiaEditandoCodigo === codigo) {
        formulario.reset()
        materiaEditar = null
        materiaEditandoCodigo = null
        btnGuardar.textContent = "Guardar Materia"
        document.querySelector("#codigo").disabled = false
        btnCancelar.style.display = "none"
    }
    mostrarMensaje("Materia eliminada correctamente", "mje-exito")
    await actualizarListaMaterias()
}
 
async function actualizarListaMaterias() {
    try {
        const materias = await obtenerMaterias()
        mostrarMaterias(materias)
    } catch (error) {
        mostrarMensaje("No se pudo cargar la lista de materias", "mje-error")
    }
}
 
listaMaterias.addEventListener("click", (e) => {
    const boton_el = e.target.closest(".btn-eliminar")
    if (boton_el) {
        const codigo = boton_el.dataset.codigo // se queda como texto, no se convierte a Number
        const confirmar = confirm("¿Está seguro de eliminar esta materia?")
        if (confirmar) {
            eliminarMateria(codigo)
        }
    }
    const boton_ed = e.target.closest(".btn-editar")
    if (boton_ed) {
        const codigo = boton_ed.dataset.codigo
        editarMateria(codigo)
    }
})
 
async function editarMateria(codigo) {
    try {
        const materias = await obtenerMaterias()
        const materia = materias.find(materia => materia.codigo === codigo)
 
        if (!materia) {
            mostrarMensaje("Materia no encontrada", "mje-error")
            return
        }
        document.querySelector("#codigo").value = materia.codigo
        document.querySelector("#codigo").disabled = true
        document.querySelector("#nombre").value = materia.nombre
        document.querySelector("#descripcion").value = materia.descripcion || ""
        document.querySelector("#cargaHoraria").value = materia.cargaHoraria
        document.querySelector("#estado").value = materia.estado
 
        materiaEditar = {
            nombre: materia.nombre,
            descripcion: materia.descripcion || "",
            cargaHoraria: materia.cargaHoraria,
            estado: materia.estado
        }
 
        materiaEditandoCodigo = materia.codigo
        btnCancelar.style.display = "inline-block"
        btnGuardar.textContent = "Actualizar Materia"
        document.querySelector("#nombre").focus()
    } catch (error) {
        mostrarMensaje("No se pudo cargar la materia", "mje-error")
    }
}
 
function cancelarEdicion() {
    formulario.reset()
    materiaEditandoCodigo = null
    materiaEditar = null
    btnGuardar.textContent = "Guardar Materia"
    document.querySelector("#codigo").disabled = false
    btnCancelar.style.display = "none"
    document.querySelector("#codigo").focus()
}
 
btnCancelar.addEventListener("click", cancelarEdicion)
 
async function iniciar() {
    await actualizarListaMaterias()
}
 
iniciar()