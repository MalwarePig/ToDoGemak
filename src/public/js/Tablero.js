var ListaTareas = []
var TotalTareas = []
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
        url: '/Proyectos',
        success: function (data) {
            /* $("#CuerpoRegistros tr").remove(); */

            let TotalRegistros = data.length;
            document.getElementById("total").innerText = TotalRegistros;

            for (let index = 0; index < TotalRegistros; index++) {
                var Lista = document.querySelector("#ListaMaestra");

                const div = document.createElement("div"); //Creo un nuevo div para la nueva tarjeta
                div.innerHTML = ItemOriginal;
                Lista.appendChild(div);

                var Titulo = document.querySelector("#Titulo-Borrador");
                Titulo.innerHTML = data[index].Proyecto;
                Titulo.id = 'Titulo' + index;
                ListaTareas.push(data[index].Proyecto);
                console.log('TotalRegistros: ' +data[index].Tareas)
                TotalTareas.push((data[index].Tareas-1))

                var Contenido = document.querySelector("#Contenido-Borrador");
                Contenido.innerHTML = data[index].ProyectoDesc;
                Contenido.id = 'Contenido' + index;

                document.querySelector("#indiceProyecto").setAttribute('onclick', 'AsignarLocalStorage("' + data[index].Proyecto + '")');
                document.querySelector("#indiceProyecto").setAttribute('href', '/MostrarFormulario');
                var indiceProyecto = document.querySelector("#indiceProyecto");
                indiceProyecto.id = 'indiceProyecto' + data[index].Proyecto;
                var BarraCumplimiento = document.querySelector("#BarraCumplimiento");
                BarraCumplimiento.id = 'BarraCumplimiento' + index;

                var Cumplimiento = document.querySelector("#Cumplimiento");
                Cumplimiento.id = 'Cumplimiento' + index; 

                var FechasProyecto = document.querySelector("#FechasProyecto");

                let Inicio = moment(data[index].InicioProyecto).format("DD/MM/YYYY")
                let Fin = moment(data[index].VencimientoProyecto).format("DD/MM/YYYY")
                FechasProyecto.innerHTML = Inicio + " - " + Fin || '';
            }
            AjustarBarras()
        } //Funcion success
    }); //Ajax 
}

function AjustarBarras() {
    console.log(ListaTareas)
    for (let index = 0; index < ListaTareas.length; index++) {

        $.ajax({
            url: '/tareasCompletas/' + ListaTareas[index],
            success: function (data) {
                console.log(data[0].Completas)
                let TotalCompletas = data[0].Completas;
                let TotalRegistros = TotalTareas[index];

                console.log('TotalCompletas: '+TotalCompletas,'TotalRegistros: '+TotalRegistros)

                var Cumplimiento = document.querySelector("#Cumplimiento"+index);
                Cumplimiento.innerHTML = ((TotalCompletas / TotalRegistros)*100).toFixed(2)+'%' || '';
                
  
                document.querySelector("#BarraCumplimiento"+index).value = (TotalCompletas / TotalRegistros);//Total de llenado
                document.querySelector("#BarraCumplimiento"+index).buffer = (TotalCompletas / TotalRegistros) + .10//Total de llenado + un porcentaje estimado
                //document.querySelector("#BarraCumplimiento"+index).color = 'danger' 
                //let Completas = data[index].Completas != undefined ? data[index].Completas : 0;
                //let Completas =  data[index]  || 0
                /*  console.log("Indice: " + index + " Lista: " + ListaTareas[index] + " Tareas: "+ Completas)
                 console.log( Completas) */
            } //Funcion success
        }); //Ajax 
    }
}

function AsignarLocalStorage(params) {
    localStorage.setItem('ProyectoActual', params);
}

async function dismissModal() {
    const ModalNuevoProyecto = document.querySelector('#ModalNuevoProyecto');

    await ModalNuevoProyecto.dismiss({
        'dismissed': true
    });
}


function RegistrarProyecto() {
    let Registro = {
        NombreProyecto: document.querySelector("#NombreProyecto").value,
        DescripcionProyecto: document.querySelector("#DescripcionProyecto").value,
        CalendarioInicio: document.querySelector("#CalendarioInicio").value,
        CalendarioVencimiento: document.querySelector("#CalendarioVencimiento").value
    }

    console.log(Registro)

    $.post("/registrarProyecto", // url
        {
            Registro
        }, // data to be submit
        function (objeto, estatus) { // success callback
            console.log("objeto: " + objeto + "Estatus: " + estatus);
            document.querySelector("#NombreProyecto").value = '';
            document.querySelector("#DescripcionProyecto").value = '';
            MostrarProyectos()
            dismissModal();
        });
}

function LimpiarFormProyectos() {
    document.querySelector("#NombreProyecto").value = '';
    document.querySelector("#DescripcionProyecto").value = '';
}

async function dismissCalendario(Calendario) {
    const ModalNuevoProyecto = document.querySelector('#Popover'+Calendario);
    await ModalNuevoProyecto.dismiss({
        'dismissed': true
    });
}