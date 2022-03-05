
function MostrarProyectos() {

    //Limpiar Lista Maestra
    var Lista = document.querySelector("#ListaMaestra");
    while (Lista.firstChild) {
        //The list is LIVE so it will re-index each call
        Lista.removeChild(Lista.firstChild);
    }

    //Construir Lista Maestra con tarjetas
    var ItemOriginal = document.querySelector("#Item-Borrador").innerHTML;
    $.ajax({
        url: '/ListarTareas/' + localStorage.getItem('ProyectoActual'),
        success: function (data) {
            /* $("#CuerpoRegistros tr").remove(); */

            let TotalRegistros = data.length;
            document.getElementById("total").innerText = TotalRegistros;
            console.log(TotalRegistros)
            for (let index = 0; index < TotalRegistros; index++) {
                var Lista = document.querySelector("#ListaMaestra");

                const div = document.createElement("div"); //Creo un nuevo div para la nueva tarjeta
                div.innerHTML = ItemOriginal;
                Lista.appendChild(div);

                var Titulo = document.querySelector("#Titulo-Borrador");
                Titulo.innerHTML = data[index].Proyecto;
                Titulo.id = 'Titulo' + index;

                var Tarea = document.querySelector("#Tarea");
                Tarea.innerHTML = data[index].Tarea;
                Tarea.id = 'Tarea' + index;

                var Descripcion = document.querySelector("#Descripcion");
                Descripcion.innerHTML = data[index].Descripcion;
                Descripcion.id = 'Descripcion' + index;

                var Grupo = document.querySelector("#Grupo");
                Grupo.innerHTML = data[index].Grupo;
                Grupo.id = 'Grupo' + index;

                var Inicio = document.querySelector("#Inicio");
                Inicio.innerHTML = data[index].Inicio;
                Inicio.id = 'Inicio' + index;

                var Responsable = document.querySelector("#Responsable");
                Responsable.innerHTML = data[index].Responsable;
                Responsable.id = 'Responsable' + index;

                var Soporte = document.querySelector("#Soporte");
                Soporte.innerHTML = data[index].Soporte;
                Soporte.id = 'Soporte' + index;

                var Vencimiento = document.querySelector("#Vencimiento");
                Vencimiento.innerHTML = data[index].Vencimiento;
                Vencimiento.id = 'Vencimiento' + index;

                var Notas = document.querySelector("#Notas");
                Notas.innerHTML = data[index].Notas;
                Notas.id = 'Notas' + index;

                var Cumplimiento = document.querySelector("#Cumplimiento");
                Cumplimiento.innerHTML = data[index].Cumplimiento;
                Cumplimiento.id = 'Cumplimiento' + index;
   
            }

        } //Funcion success
    }); //Ajax 
}
