function Registrar() {

    if (document.querySelector("#Cumplimiento").value > 100) {
        alert("El valor máximo permitido es 100");
        document.querySelector("#Cumplimiento").value = 100
    } else {

        let Proyecto = localStorage.getItem('ProyectoActual');
        let Tarea = document.querySelector("#Tarea").value;
        let Descripcion = document.querySelector("#Descripcion").value;
        let Grupo = document.querySelector("#Grupo").value || '';
        let Inicio = document.querySelector("#Inicio").value || '';
        let Responsable = document.querySelector("#Responsable").value || '';
        let Soporte = document.querySelector("#Soporte").value || '';
        let Cumplimiento = document.querySelector("#Cumplimiento").value;
        let Vencimiento = document.querySelector("#CalendarioVencimiento").value || '';
        let Notas = document.querySelector("#Notas").value;
        var Arreglo = [Proyecto, Tarea, Descripcion, Grupo, Inicio, Responsable, Soporte, Cumplimiento, Vencimiento, Notas];
        console.log(Arreglo)
        var Condicion = true; //para campos vacios
        for (var a in Arreglo) { //recorrer arreglo en busca de campos vacios
            console.log(a)
            console.log(Arreglo[a])
            if (Arreglo[a].length == 0 || Arreglo[a] == undefined) {
                Condicion = false; //si algun campo esta vacio cambia a falso
            }
        }

        let Registro = {
            Proyecto: Proyecto,
            Tarea: Tarea,
            Descripcion: Descripcion,
            Grupo: Grupo,
            Inicio: Inicio,
            Responsable: Responsable,
            Soporte: Soporte,
            Cumplimiento: Cumplimiento,
            Vencimiento: Vencimiento,
            Notas: Notas
        }

        console.log(Registro)

        if (Condicion == true) { //si todos los campos estan llenos avanza
            $.post("/registrarTarea", // url
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

//=========================================== EVENTO SOLO DATOS NUMERICOS EN CANTIDAD =================================================//
$(function () {
    $(".solo-numero").keydown(function (event) {
        //alert(event.keyCode);
        if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode !== 190 && event.keyCode !== 110 && event.keyCode !== 8 && event.keyCode !== 9) {
            return false;
        }

    });
}); //Funcion JQuery
