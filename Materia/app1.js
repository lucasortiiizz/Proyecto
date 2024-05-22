class Docentes {
    constructor() {
        let data = localStorage.getItem('docentes');
        if (!data) {
            this.datos = [];
        } else {
            this.datos = JSON.parse(data);
        }
    }

    getMaxId() {
        let idmax = 0;
        this.datos.forEach(d => {
            if (!isNaN(d.docente_id) && d.docente_id > idmax) {
                idmax = d.docente_id;
            }
        });
        return idmax;
    }

    agregar(docente) {
        docente.docente_id = this.getMaxId() + 1;
        this.datos.push(docente);
        this.persistir();
    }

    actualizar(docente) {
        const index = this.datos.findIndex(d => d.docente_id === docente.docente_id);
        if (index !== -1) {
            this.datos[index] = docente;
            this.persistir();
        }
    }

    borrar(id) {
        this.datos = this.datos.filter(docente => docente.docente_id !== id);
        this.persistir();
    }

    obtenerPorId(id) {
        return this.datos.find(docente => docente.docente_id === id);
    }

    persistir() {
        localStorage.setItem('docentes', JSON.stringify(this.datos));
    }
}

class Docente {
    constructor(id, apellido, nombre, mail, cumple, celular) {
        this.docente_id = id;
        this.docente_apellido = apellido;
        this.docente_nombre = nombre;
        this.docente_mail = mail;
        this.docente_cumple = cumple;
        this.docente_celular = celular;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const docenteForm = document.getElementById('docenteForm');
    const docentesTable = document.getElementById('docentesTable');
    const cancelButton = document.getElementById('cancelar');

    const docentes = new Docentes();

    docenteForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const id = parseInt(document.getElementById('docente_id').value);
        const apellido = document.getElementById('docente_apellido').value;
        const nombre = document.getElementById('docente_nombre').value;
        const mail = document.getElementById('docente_mail').value;
        const cumple = document.getElementById('docente_cumple').value;
        const celular = document.getElementById('docente_celular').value;
		    const materiaDocenteSelect = document.getElementById('materia_docente');


        const docente = new Docente(id, apellido, nombre, mail, cumple, celular);

        if (id === -1) {
            docentes.agregar(docente);
        } else {
            docentes.actualizar(docente);
        }

        limpiarFormulario();
        dibujarTabla();
		
		 // Cargar docentes guardados
		docentes.datos.forEach(docente => {
        const option = document.createElement('option');
        option.value = docente.docente_id;
        option.textContent = `${docente.docente_apellido}, ${docente.docente_nombre}`;
        materiaDocenteSelect.appendChild(option);
    });
    });

    cancelButton.addEventListener('click', function () {
        limpiarFormulario();
    });

    function limpiarFormulario() {
        docenteForm.reset();
        document.getElementById('docente_id').value = -1;
    }

    function dibujarTabla() {
        let html = '';
        docentes.datos.forEach(docente => {
            html += `
                <tr>
                    <td>${docente.docente_id}</td>
                    <td>${docente.docente_apellido}</td>
                    <td>${docente.docente_nombre}</td>
                    <td>${docente.docente_mail}</td>
                    <td>${docente.docente_cumple}</td>
                    <td>${docente.docente_celular}</td>
                    <td>
                        <button class="btn btn-info btn-sm editar" data-id="${docente.docente_id}">Editar</button>
                        <button class="btn btn-danger btn-sm borrar" data-id="${docente.docente_id}">Eliminar</button>
                    </td>
                </tr>
            `;
        });
        docentesTable.innerHTML = html;

        asignarEventos();
    }

    function asignarEventos() {
        const editarBotones = document.querySelectorAll('.editar');
        editarBotones.forEach(boton => {
            boton.addEventListener('click', function (event) {
                const id = parseInt(event.target.getAttribute('data-id'));
                const docente = docentes.obtenerPorId(id);
                if (docente) {
                    document.getElementById('docente_id').value = docente.docente_id;
                    document.getElementById('docente_apellido').value = docente.docente_apellido;
                    document.getElementById('docente_nombre').value = docente.docente_nombre;
                    document.getElementById('docente_mail').value = docente.docente_mail;
                    document.getElementById('docente_cumple').value = docente.docente_cumple;
                    document.getElementById('docente_celular').value = docente.docente_celular;
                }
            });
        });

        const borrarBotones = document.querySelectorAll('.borrar');
        borrarBotones.forEach(boton => {
            boton.addEventListener('click', function (event) {
                const id = parseInt(event.target.getAttribute('data-id'));
                docentes.borrar(id);
                dibujarTabla();
            });
        });
    }

  
    
});
