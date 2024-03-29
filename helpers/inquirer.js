const inquirer = require('inquirer');
const colors = require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué deseas hacer?',
        choices: [
            {
                value: '1',
                name: `${colors.magenta('1- ')} Crear Tarea`
            },

            {
                value: '2',
                name: `${colors.magenta('2- ')} Listar Tareas`
            },
            {
                value: '3',
                name: `${colors.magenta('3- ')} Listar Tareas Completadas`
                          
            },
            {
                value: '4',
                name: `${colors.magenta('4- ')} Listar Tareas Pendientes`
            },
            {
                value: '5',
                name: `${colors.magenta('5- ')} Completar Tareas`
            },
            {
                value: '6',
                name: `${colors.magenta('6- ')} Borrar Tarea`
            },
            {
                value: '7',
                name:  `${colors.magenta('7- ')} Salir\n`
            }
            
        ]
    }
    
];

const inquirerMenu = async() => {

    console.clear();
    console.log(colors.green('============================'));
    console.log(colors.green('======== Bienvenid@ ========'));
    console.log(colors.green('== Selecciona una opción ===\n'));

    const {opcion} = await inquirer.prompt(preguntas);
    return opcion;
}

const pausa = async() => {

    const question = [
        {
            type: 'input',
            name: 'Confirma',
            message: `\nPresione ${colors.blue('Enter')} para continuar`
        }
        
    ];
    
    console.log('\n');

    await inquirer.prompt(question);

}

const leerInput = async( message ) =>{
    
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if(value.length === 0)return 'Por favor ingresa un valor';
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

    const listadoTareasBorrar = async( tareas = []) => {

        const choices = tareas.map( (tarea, i) => {

            const idx = i+1;

            return {
                value: tarea.id,
                name: `${ idx } ${ tarea.desc}`
            }
        });

        choices.unshift({
            value: '0',
            name: colors.bgRed.white('Cancelar')
        });

        const preguntas = [
            {
                type: 'list',
                name: 'id',
                choices
            }
            
        ];


        const {id} = await inquirer.prompt(preguntas);
        return id;
    }

    const confirmar = async(message) => {
        const question = [
            {
                type: 'confirm',
                name: 'ok',
                message
            }
        ];

        const { ok } = await inquirer.prompt(question);
        return ok;
    }

    const mostrarListadoCheckList = async( tareas = []) => {

        const choices = tareas.map( (tarea, i) => {

            const idx = i+1;

            return {
                value: tarea.id,
                name: colors.underline(`${ idx } ${ tarea.desc}`),
                checked: ( tarea.completado ) ? true : false
            }
        });

        const pregunta = [
            {
                type: 'checkbox',
                name: 'ids',
                message: 'Selecciones',
                choices
            }
            
        ];


        const {ids} = await inquirer.prompt(pregunta);
        return ids;
    }

module.exports = {inquirerMenu, pausa, leerInput, 
                  listadoTareasBorrar, confirmar, mostrarListadoCheckList};

                  