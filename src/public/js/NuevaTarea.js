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
 //,Descripcion,Grupo,Inicio