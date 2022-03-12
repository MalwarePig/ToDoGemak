function Registrar() {

    let Registro = {
        Proyecto: localStorage.getItem('ProyectoActual'),
        Tarea: document.querySelector("#Tarea").value,
        Descripcion: document.querySelector("#Descripcion").value,
        Grupo: document.querySelector("#Grupo").value,
        Inicio: document.querySelector("#Inicio").value,
        Responsable: document.querySelector("#Responsable").value,
        Soporte: document.querySelector("#Soporte").value,
        Cumplimiento: document.querySelector("#Cumplimiento").value,
        Vencimiento: document.querySelector("#CalendarioVencimiento").value,
        Notas: document.querySelector("#Notas").value
    }

    console.log(Registro)

    $.post("/registrarTarea", // url
        {
            Registro
        }, // data to be submit
        function (objeto, estatus) { // success callback
            window.location.href = "/MostrarFormulario";
        });
}

function IniciarFecha() {
    Inicio: document.querySelector("#Inicio").value = moment().format("DD-MM-YYYY");
}
//,Descripcion,Grupo,Inicio

function Alerta() {
    document.querySelector("#labelVencimiento").innerHTML = "Vencimiento: " + moment(document.querySelector("#CalendarioVencimiento").value).format("DD-MM-YYYY");
}

function Limpiar() {
    document.querySelector("#Tarea").value = '';
    document.querySelector("#Descripcion").value = '';
    document.querySelector("#Grupo").value = '';
    document.querySelector("#Inicio").value = '';
    document.querySelector("#Responsable").value = '';
    document.querySelector("#Soporte").value = '';
    document.querySelector("#Cumplimiento").value = '';
    document.querySelector("#labelVencimiento").innerHTML = "Vencimiento"
    document.querySelector("#Notas").value = '';
}