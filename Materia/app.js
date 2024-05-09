document.addEventListener('DOMContentLoaded', function () {
    const materiaForm = document.getElementById('materiaForm');
    const materiasTable = document.getElementById('materiasTable');
    const cancelButton = document.getElementById('cancelar');
    const materiaCarreraSelect = document.getElementById('materia_carrera');
    const materiaDocenteSelect = document.getElementById('materia_docente');

    const materias = new Materias();
    const docentes = new Docentes();

    // Cargar docentes guardados
docentes.datos.forEach(docente => {
    const option = document.createElement('option');
    option.value = docente.docente_id;
    option.textContent = `${docente.docente_apellido}, ${docente.docente_nombre}`;
    materiaDocenteSelect.appendChild(option);
});


    materiaForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const id = parseInt(document.getElementById('materia_id').value);
        const carreraId = parseInt(document.getElementById('materia_carrera').value);
        const docenteId = parseInt(document.getElementById('materia_docente').value);
        const nombre = document.getElementById('materia_nombre').value;
        const codigo = document.getElementById('materia_codigo').value;
        const anho = document.getElementById('materia_anho').value;

        const materia = new Materia(id, carreraId, docenteId, nombre, codigo, anho);

        if (id === -1) {
            materias.agregar(materia);
            console.log("Se agregó a la tabla:", materia);
        } else {
            materias.actualizar(materia);
            console.log("Se actualizó en la tabla:", materia);
        }

        limpiarFormulario();
        dibujarTabla1();
    });

    cancelButton.addEventListener('click', function () {
        limpiarFormulario();
    });

    function limpiarFormulario() {
        materiaForm.reset();
        document.getElementById('materia_id').value = -1;
    }

    function dibujarTabla1() {
        let html = '';
        materias.datos.forEach(materia => {
            html += `
                <tr>
                    <td>${materia.mate_id}</td>
                    <td>${obtenerNombreCarrera(materia.carre_id)}</td>
                    <td>${obtenerNombreDocente(materia.doce_id)}</td>
                    <td>${materia.mate_name}</td>
                    <td>${materia.mate_codi}</td>
                    <td>${materia.mate_anho}</td>
                    <td>
                        <button class="btn btn-info btn-sm editar" data-id="${materia.mate_id}">Editar</button>
                        <button class="btn btn-danger btn-sm borrar" data-id="${materia.mate_id}">Eliminar</button>
                    </td>
                </tr>
            `;
        });
        materiasTable.innerHTML = html;

        asignarEventos();
    }

    function asignarEventos() {
        const editarBotones = document.querySelectorAll('.editar'); //selec a tods
        editarBotones.forEach(boton => {
            boton.addEventListener('click', function (event) { //asignar
                const id = parseInt(event.target.getAttribute('data-id')); //obt id
                const materia = materias.obtenerPorId(id); //search la materia 
                if (materia) { //act los campos
                    document.getElementById('materia_id').value = materia.mate_id;
                    document.getElementById('materia_carrera').value = materia.carre_id;
                    document.getElementById('materia_docente').value = materia.doce_id;
                    document.getElementById('materia_nombre').value = materia.mate_name;
                    document.getElementById('materia_codigo').value = materia.mate_codi;
                    document.getElementById('materia_anho').value = materia.mate_anho;
                }
            });
        });

        const borrarBotones = document.querySelectorAll('.borrar');
        borrarBotones.forEach(boton => {
            boton.addEventListener('click', function (event) {
                const id = parseInt(event.target.getAttribute('data-id'));
                materias.borrar(id);
                dibujarTabla1();
            });
        });
    }


    function obtenerNombreCarrera(id) {
        switch (id) {
            case 1:
                return 'Facultad de Salud';
            case 2:
                return 'FACAT';
            case 3:
                return 'FACEM';
            default:
                return 'Desconocido';
        }
    }

    // Función para obtener el nombre del docente según su ID
    function obtenerNombreDocente(docente_id) {
        const docente = docentes.obtenerPorId(docente_id);
        if (docente) {
            return `${docente.apellido}, ${docente.nombre}`;
        } else {
            return 'desconocido';
        }
    }
    

    
});
