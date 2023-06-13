const colors = require('colors');
const { read } = require('fs');

const mostrarMenu = () => {

    return new Promise((resolve) => {
        console.clear();
        console.log(colors.cyan('============================'));
        console.log(colors.cyan('======== Bienvenid@ ========'));
        console.log(colors.cyan('== Selecciona una opción ===\n'));

        console.log(colors.cyan(`1- Crear Tarea`));
        console.log(colors.cyan(`2- Listar Tareas`));
        console.log(colors.cyan(`3- Listar Tareas Completadas`));
        console.log(colors.cyan(`4- Listar Tareas Pendientes`));
        console.log(colors.cyan(`5- Completar Tareas`));
        console.log(colors.cyan(`6- Borrar Tarea`));
        console.log(colors.cyan(`7- Salir\n`));
        console.log(colors.cyan('============================'));
        console.log(colors.cyan('============================'));

        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
    });

    readLine.question('Selecciona una opción: ', (opt) => {
        readLine.close();
        resolve(opt);
    })
    })
}




module.exports = {
    mostrarMenu,
    pausa
}