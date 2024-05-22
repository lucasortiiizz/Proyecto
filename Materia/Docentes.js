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
        if (this.datos.length === 0) {
            return 0;
        } else {
            let idmax = -1;
            this.datos.forEach(docente => {
                if (docente.doce_id > idmax) {
                    idmax = docente.doce_id;
                }
            });
            return idmax;
        }
    }

    agregar(docente) {
        docente.doce_id = this.getMaxId() + 1;
        this.datos.push(docente);
        this.persistir();
    }

    actualizar(docente) {
        const index = this.datos.findIndex(d => d.doce_id === docente.doce_id);
        if (index !== -1) {
            this.datos[index] = docente;
            this.persistir();
        }
    }

    borrar(id) {
        this.datos = this.datos.filter(docente => docente.doce_id !== id);
        this.persistir();
    }

    obtenerPorId(id) {
        return this.datos.find(docente => docente.doce_id === id);
    }

    persistir() {
        localStorage.setItem('docentes', JSON.stringify(this.datos));
    }
}
