require('colors');
const { inquirerMenu, 
        inquirerPausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const Tarea = require('./models/tarea');
const { guardarDb, leerDb } = require('./helpers/guardarArchivo');




const main = async() => {
    
    let opt = '';

    const tareas = new Tareas();

    const tareasDb = leerDb();

    if ( tareasDb ){
        //establecer tareas
        tareas.cargarTareasFromArray( tareasDb );
    }

    do {

        opt = await inquirerMenu();
        //console.log({ opt });

        switch (opt){
            case '1':
                //crear opcion
                const desc = await leerInput( 'Descipción: ' );
                tareas.crearTarea( desc );
                console.log(desc);
            break;

            case '2':
                tareas.listadoCompleto();
            break;

            case '3':
                tareas.listarPendientesCompletadas(true);            
            break;

            case '4':
                tareas.listarPendientesCompletadas(false);       
            break;

            case '5':
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas( ids );  
            break;

            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr );
                

                if ( id !== '0' ){
                    const ok = await confirmar('¿Está seguro?');
                    if ( ok ){
                        tareas.borrarTarea( id );
                        console.log( 'Tarea Borrada.' );
                    }
    
                }
                
                
            break;

        }

        guardarDb( tareas.listadoArr );

        await inquirerPausa();

        
    }while ( opt !== '0' )

    //mostrarMenu();
    //pausa();

}

main();