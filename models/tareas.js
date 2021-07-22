require('colors');
const Tarea = require('./tarea');
const { green } = require('colors');

/**
 *  _listado:
 *  { 'uuid_123456789_123456789': {id: 12, desc, asd, completadoEn: 926465} }
 * 
 */

class Tareas {

    _listado = {};

    get listadoArr(){
        
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea);

        });

        return listado;

    }

    constructor(){
        this._listado = {}
    }

    borrarTarea( id = ''){

        if ( this._listado[id]){
            delete this._listado[id];
        }
        
    }

    cargarTareasFromArray( tareas = [] ){

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea; 
        })

    }

    crearTarea( desc = '' ){

        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;

    }

    listadoCompleto(){

        console.log();
        this.listadoArr.forEach( ( tarea, index) => {

            const idx = `${ index + 1 }`.green;
            const { desc, completadoEn} = tarea;
            const estado = ( completadoEn )
                                ? 'Completada'.green
                                : 'Pendiente'.red;

            console.log(`${ idx } ${ desc } :: ${ estado }`)

        })

    }

    listarPendientesCompletadas( completadas = true){

        console.log();
        let index = 0;
        this.listadoArr.forEach( tarea => {

            const { desc, completadoEn} = tarea;

            if (completadas && completadoEn){
                index = index + 1
                console.log(`${ index.toString().green } ${ desc } :: ${ completadoEn.green }`)
                
            }

            if (!completadas && !completadoEn){
                index = index + 1
                console.log(`${ index.toString().green } ${ desc } :: ${ 'Pendiente'.red }`)
                
            }

        })

    }

    toggleCompletadas( ids = [] ){
        
        ids.forEach( id => {

            const tarea = this._listado[id];

            if ( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString();
            }

        })

        this.listadoArr.forEach( tarea => {

            if( !ids.includes(tarea.id )){
                
                this._listado[tarea.id].completadoEn = null;

            }

        })
    
    }

}

module.exports = Tareas