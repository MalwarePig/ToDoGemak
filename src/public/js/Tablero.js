
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

                var Contenido = document.querySelector("#Contenido-Borrador");
                Contenido.innerHTML = data[index].ProyectoDesc;
                Contenido.id = 'Contenido' + index;

                document.querySelector("#indiceProyecto").setAttribute('onclick', 'AsignarLocalStorage("' +data[index].Proyecto+ '")');
                document.querySelector("#indiceProyecto").setAttribute('href', '/MostrarFormulario'); 
                var indiceProyecto = document.querySelector("#indiceProyecto");
                indiceProyecto.id = 'indiceProyecto' + data[index].Proyecto;    

         
                document.querySelector("#BarraCumplimiento").value = (data[index].Completos/TotalRegistros);//Total de llenado
                document.querySelector("#BarraCumplimiento").buffer= (data[index].Completos/TotalRegistros)+.10//Total de llenado + un porcentaje estimado 
                console.log( "Proyecto: "+data[index].Proyecto+ " Valor: "+data[index].Completos)
                var BarraCumplimiento = document.querySelector("#BarraCumplimiento"); 
                BarraCumplimiento.id = 'BarraCumplimiento' + index;
              
            }

        } //Funcion success
    }); //Ajax 
}

function AsignarLocalStorage(params) { 
    localStorage.setItem('ProyectoActual',params);
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
        DescripcionProyecto: document.querySelector("#DescripcionProyecto").value
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
 