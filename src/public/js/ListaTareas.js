
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
                div.setAttribute('onclick', 'TareaSeleccionada("' + index + '")');
                div.setAttribute('name', 'Tareas');
                div.setAttribute('data-Categoria', data[index].Grupo);
                div.setAttribute('data-Personal', data[index].Responsable);
                console.log(div.getAttribute("data-Categoria"))
                Lista.appendChild(div);



                /*  var Titulo = document.querySelector("#Titulo-Borrador");
                 Titulo.innerHTML = data[index].Proyecto || '';
                 Titulo.id = 'Titulo' + index; */

                var idTarea = document.querySelector("#idTarea");
                idTarea.innerHTML = data[index].id || '';
                idTarea.id = 'idTarea' + index;

                var Tarea = document.querySelector("#Tarea");
                Tarea.innerHTML = data[index].Tarea + " - " + data[index].Responsable || '';
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

                let FechaIinicio = moment(data[index].Inicio).format("DD/MM/YYYY");
                let FechaVencimiento = moment(data[index].Vencimiento).format("DD/MM/YYYY");
                let FechaActual = new Date();
                let FechaVencimientoParam = new Date(data[index].Vencimiento)

                if ((FechaVencimientoParam < FechaActual) && (data[index].Cumplimiento < 100)) {

                    document.querySelector("#BarraCumplimiento").color = 'danger'
                }
                var Cumplimiento = document.querySelector("#Cumplimiento");
                Cumplimiento.innerHTML = data[index].Cumplimiento + "%" || '';
                Cumplimiento.id = 'Cumplimiento' + index;

                var FechasProyecto = document.querySelector("#FechasProyecto");
                FechasProyecto.innerHTML = FechaIinicio + ' - ' + FechaVencimiento || '';
                FechasProyecto.id = 'FechasProyecto' + index;

                var BarraCumplimiento = document.querySelector("#BarraCumplimiento");
                BarraCumplimiento.id = 'BarraCumplimiento' + index;
                BarraCumplimiento.value = (data[index].Cumplimiento / 100);//Total de llenado
                BarraCumplimiento.buffer = (data[index].Cumplimiento / 100) + .10//Total de llenado + un porcentaje
            }

        } //Funcion success
    }); //Ajax 
}


function TareaSeleccionada(params) {
    document.querySelector("#ModalEditTarea").present()

    localStorage.setItem('TareaSeleccionada', params);
    console.log(document.querySelector("#Descripcion" + params).innerText)
    document.querySelector("#Mod_idTarea").innerHTML = document.querySelector("#idTarea" + params).innerText;
    document.querySelector("#TituloTareaModal").innerHTML = document.querySelector("#Tarea" + params).innerText;
    document.querySelector("#Mod_Descripcion").value = document.querySelector("#Descripcion" + params).innerText;
    document.querySelector("#Mod_Grupo").value = document.querySelector("#Grupo" + params).innerText;
    document.querySelector("#Mod_Inicio").value = document.querySelector("#Inicio" + params).innerText;
    document.querySelector("#Mod_Responsable").value = document.querySelector("#Responsable" + params).innerText;
    document.querySelector("#Mod_Soporte").value = document.querySelector("#Soporte" + params).innerText;
    document.querySelector("#Mod_Vencimiento").value = document.querySelector("#Vencimiento" + params).innerText;
    document.querySelector("#Mod_Notas").value = document.querySelector("#Notas" + params).innerText;
    document.querySelector("#Mod_Avance").value = document.querySelector("#Cumplimiento" + params).innerText.slice(0, -1);
    document.querySelector("#Mod_Avance").focus();
}

async function dismissModal() {
    const ModalEditTarea = document.querySelector('#ModalEditTarea');

    await ModalEditTarea.dismiss({
        'dismissed': true
    });
}

var FiltroPersonal = 'Todo'
var FiltroCategoria = 'Todo'

function FiltrarPersonal(Personal) {
    let Encontradas = 0;
    document.querySelector("#MenuPersonal").innerText = Personal
    const items = document.getElementsByName("Tareas");  // [div, div, div]
    FiltroPersonal = Personal;
    for (let index = 0; index < items.length; index++) {

        if ((FiltroPersonal == 'Todo') && (FiltroCategoria == 'Todo')) { // T & T
            items[index].style.display = ''
            Encontradas++;
        } else if ((items[index].getAttribute("data-Personal") == FiltroPersonal) && (FiltroCategoria == 'Todo')) {
            items[index].style.display = ''
            Encontradas++;
        } else if ((items[index].getAttribute("data-Personal") == FiltroPersonal) && (items[index].getAttribute("data-Categoria") == FiltroCategoria)) {
            items[index].style.display = ''
            Encontradas++;
        } else if ((FiltroPersonal == 'Todo') && (items[index].getAttribute("data-Categoria") == FiltroCategoria)) {
            items[index].style.display = ''
            Encontradas++;
        } else {
            items[index].style.display = 'none';
        }


    }
    document.getElementById("total").innerText = Encontradas


}


function FiltrarCategoria(Categoria) {
    let Encontradas = 0;
    document.querySelector("#MenuCategoria").innerText = Categoria
    const items = document.getElementsByName("Tareas");  // [div, div, div]
    FiltroCategoria = Categoria;
    for (let index = 0; index < items.length; index++) {

        if ((FiltroPersonal == 'Todo') && (FiltroCategoria == 'Todo')) { // T & T
            items[index].style.display = ''
            Encontradas++;
        } else if ((items[index].getAttribute("data-Personal") == FiltroPersonal) && (FiltroCategoria == 'Todo')) {
            items[index].style.display = ''
            Encontradas++;
        } else if ((items[index].getAttribute("data-Personal") == FiltroPersonal) && (items[index].getAttribute("data-Categoria") == FiltroCategoria)) {
            items[index].style.display = ''
            Encontradas++;
        } else if ((FiltroPersonal == 'Todo') && (items[index].getAttribute("data-Categoria") == FiltroCategoria)) {
            items[index].style.display = ''
            Encontradas++;
        } else {
            items[index].style.display = 'none';
        }

    }
    document.getElementById("total").innerText = Encontradas

}

function ActualizarTarea() {

    if (document.querySelector("#Mod_Avance").value > 100) {
        alert("El valor máximo permitido es 100");
        document.querySelector("#Mod_Avance").value = 100
    } else {
        let Registro = {
            Avance: document.querySelector("#Mod_Avance").value,
            id: document.querySelector("#Mod_idTarea").innerHTML
        }

        console.log(Registro)

        if (document.querySelector("#Mod_Avance").value != "") { //si todos los campos estan llenos avanza
            $.post("/ActualizarTarea", // url
                {
                    Registro
                }, // data to be submit
                function (objeto, estatus) { // success callback
                    window.location.href = "/MostrarFormulario";
                });
        } else {
            alert("Faltan campos por llenar")
        }
    } 
}


//=========================================== EVENTO SOLO DATOS NUMERICOS EN CANTIDAD =================================================//
$(function () {
    $(".solo-numero").keydown(function (event) {
        //alert(event.keyCode);
        if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode !== 190 && event.keyCode !== 110 && event.keyCode !== 8 && event.keyCode !== 9) {
            return false;
        }

    });
}); //Funcion JQuery
