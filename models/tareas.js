const colors = require('colors');
const Tarea = require('./tarea');

class Tareas {

    _listado = {};

    get listadoArray() {
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            listado.push(this._listado[key]);
        })
        return listado;
    } 

    constructor() {
        this._listado = {};

    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea ( desc = '' ) {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        console.log('\n');
        this.listadoArray.forEach((tarea, indice) => {

            const idx = `${colors.gray(indice + 1)}`;
            const { desc, completado } = tarea;
            const estado = (completado)? `${colors.bold.green('Completado')}`: `${colors.bold.red('Pendiente')}`;
            console.log(`${idx} ${desc} :: ${estado}`);


        });
    }

    listarPendientesCompletadas( completadas = true) {
        console.log('\n');

        if (completadas == true) {
            this.listadoArray.forEach((tarea, indice) => {

                const idx = `${colors.gray(indice + 1)}`;
                const { desc, completado } = tarea;
                console.log(`${idx} ${desc} :: ${colors.bold.green(completado)}`);

            });
        } else{
            this.listadoArray.forEach((tarea, indice) => {

                const idx = `${colors.gray(indice + 1)}`;
                const { desc, completado } = tarea;
            console.log(`${idx} ${desc} :: ${colors.bold.red('Pendiente')}`);
            });
        }
      
    };

    toggleCompletadas( ids = []) {
        ids.forEach( id => {
            const tarea = this._listado[id];
            if ( !tarea.completado ) {
                tarea.completado = new Date().toISOString();
            }
        });

        this.listadoArray.forEach( tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completado = null;
            }
        })
    }

    borrarTarea( id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }
}

module.exports = Tareas;