class Materias {
    constructor() {
        let data = localStorage.getItem('materias'); //obtener datos
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
            this.datos.forEach(m => {
                if (m.mate_id > idmax) {
                    idmax = m.mate_id;
                }
            });
            return idmax;
        }
    }

    agregar(materia) {
        materia.mate_id = this.getMaxId() + 1;
        this.datos.push(materia);
        this.persistir();
    }

    actualizar(materia) {
        const index = this.datos.findIndex(m => m.mate_id === materia.mate_id);
        if (index !== -1) {
            this.datos[index] = materia;
            this.persistir();
        }
    }

    borrar(id) {
        this.datos = this.datos.filter(materia => materia.mate_id !== id);
        this.persistir();
    }

    obtenerPorId(id) {
        return this.datos.find(materia => materia.mate_id === id);
    }

    persistir() {
        localStorage.setItem('materias', JSON.stringify(this.datos));
    }
}
