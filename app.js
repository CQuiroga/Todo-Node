const colors = require('colors');
const { inquirerMenu, pausa, leerInput, 
    listadoTareasBorrar, confirmar, mostrarListadoCheckList} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');



console.clear();

const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {
        opt = await inquirerMenu();    
        
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
                break;
        
            case '2':
                tareas.listadoCompleto();
                break;

            case '3':
                tareas.listarPendientesCompletadas();
                break;
                
            case '4':
                tareas.listarPendientesCompletadas(comp = false);
                break;
        
            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArray);
                //console.log(ids);  
                tareas.toggleCompletadas( ids );
                break;
               

            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArray);
                

                if (id !== '0') {
                    const ok = await confirmar(colors.red('¿Estas seguro?'));

                    if (ok) {
                        tareas.borrarTarea( id ); 
                        console.log('Tarea Eliminada correctamente!');
                    }
                }
                break;
            /*
            case '7':
                
                break; */
        }

        guardarDB( tareas.listadoArray );

        await pausa();

    } while (opt !== '7');

    
}

main();