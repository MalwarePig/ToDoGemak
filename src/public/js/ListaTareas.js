
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
                //div.id = 'trigger-button';
                div.setAttribute('onclick', 'TareaSeleccionada("' +index+ '")');
                Lista.appendChild(div);

               /*  var Titulo = document.querySelector("#Titulo-Borrador");
                Titulo.innerHTML = data[index].Proyecto || '';
                Titulo.id = 'Titulo' + index; */

                var Tarea = document.querySelector("#Tarea");
                Tarea.innerHTML = data[index].Tarea || '';
                Tarea.id = 'Tarea' + index;

                var Descripcion = document.querySelector("#Descripcion");
                Descripcion.innerHTML = data[index].Descripcion || '';
                Descripcion.id = 'Descripcion' + index;

                var Grupo = document.querySelector("#Grupo");
                Grupo.innerHTML = data[index].Grupo || '';
                Grupo.id = 'Grupo' + index;

                var Inicio = document.querySelector("#Inicio");
                Inicio.innerHTML = data[index].Inicio || '';
                Inicio.id = 'Inicio' + index;

                var Responsable = document.querySelector("#Responsable");
                Responsable.innerHTML = data[index].Responsable || '';
                Responsable.id = 'Responsable' + index;

                var Soporte = document.querySelector("#Soporte");
                Soporte.innerHTML = data[index].Soporte || '';
                Soporte.id = 'Soporte' + index;

                var Vencimiento = document.querySelector("#Vencimiento");
                Vencimiento.innerHTML = data[index].Vencimiento || '';
                Vencimiento.id = 'Vencimiento' + index;

                var Notas = document.querySelector("#Notas");
                Notas.innerHTML = data[index].Notas;
                Notas.id = 'Notas' + index;

                var Cumplimiento = document.querySelector("#Cumplimiento");
                Cumplimiento.innerHTML = data[index].Cumplimiento+"%" || '';
                Cumplimiento.id = 'Cumplimiento' + index; 

                var BarraCumplimiento = document.querySelector("#BarraCumplimiento");
                BarraCumplimiento.id = 'BarraCumplimiento' + index;
                BarraCumplimiento.value =  (data[index].Cumplimiento/100);//Total de llenado
                BarraCumplimiento.buffer=(data[index].Cumplimiento/100)+.10//Total de llenado + un porcentaje
            }

        } //Funcion success
    }); //Ajax 
}


function TareaSeleccionada(params) {
   document.querySelector("#ModalNuevoProyecto").present()
 
    localStorage.setItem('TareaSeleccionada', params);
    console.log(document.querySelector("#Descripcion"+params).innerText)
    document.querySelector("#TituloTareaModal").innerHTML = document.querySelector("#Tarea"+params).innerText;
    document.querySelector("#Mod_Descripcion").value = document.querySelector("#Descripcion"+params).innerText;
    document.querySelector("#Mod_Grupo").value = document.querySelector("#Grupo"+params).innerText;
    document.querySelector("#Mod_Inicio").value = document.querySelector("#Inicio"+params).innerText;
    document.querySelector("#Mod_Responsable").value = document.querySelector("#Responsable"+params).innerText;
    document.querySelector("#Mod_Soporte").value = document.querySelector("#Soporte"+params).innerText;
    document.querySelector("#Mod_Vencimiento").value = document.querySelector("#Vencimiento"+params).innerText;
    document.querySelector("#Mod_Notas").value = document.querySelector("#Notas"+params).innerText;
 
}

async function dismissModal() {
    const ModalNuevoProyecto = document.querySelector('#ModalNuevoProyecto');

    await ModalNuevoProyecto.dismiss({
        'dismissed': true
    });
}