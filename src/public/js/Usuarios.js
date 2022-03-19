
function IniciarSesion() {
    let Usuario = document.querySelector("#Usuario").value
    let Contraseña = document.querySelector("#Contraseña").value

    let Registro = {
        Usuario: Usuario,
        Contraseña: Contraseña
    }

    console.log(Registro)

    $.post("/IniciarSesion", // url
        {
            Registro
        }, // data to be submit
        function (data, estatus) { // success callback
            //
            console.log(data)
            localStorage.clear();   // Elimina todos los elementos
            localStorage.setItem('UsuarioActual', data.Usuario);
            localStorage.setItem('RolActual', data.Rol);
            if (data.Rol == 'admin') {
                window.location.href = "/homeAdmin";
            } else {

            }

        });

}




function MostrarUsuarios() {

    //Limpiar Lista Maestra
    var Lista = document.querySelector("#listaUsuarios");
    while (Lista.firstChild) {
        //The list is LIVE so it will re-index each call
        Lista.removeChild(Lista.firstChild);
    }

    //Construir Lista Maestra con tarjetas
    var ItemOriginal = document.querySelector("#Item-Borrador").innerHTML;
    $.ajax({
        url: '/TodosUsuarios/',
        success: function (data) {
            /* $("#CuerpoRegistros tr").remove(); */

            let TotalRegistros = data.length;
            console.log(TotalRegistros)
            for (let index = 0; index < TotalRegistros; index++) {
                var Lista = document.querySelector("#listaUsuarios");

                const div = document.createElement("div"); //Creo un nuevo div para la nueva tarjeta
                div.innerHTML = ItemOriginal;
                Lista.appendChild(div);

                var listNombreUser = document.querySelector("#listNombreUser");
                listNombreUser.innerHTML = data[index].Usuario || '';
                listNombreUser.id = 'idUser' + index;

                var buttonEliminarUser = document.querySelector("#eliminarUsuario");
                buttonEliminarUser.setAttribute('onclick', 'eliminarUsuario("' + data[index].Usuario + '")');
                buttonEliminarUser.id = 'eliminarUsuario' + index;
            }

        } //Funcion success
    }); //Ajax 
}



function RegistrarUsuario() {
    let user = document.querySelector("#NombreUsuario").value
    let pass = document.querySelector("#ContraseñaUsuario").value
    let Nivel = document.querySelector("#Nivel").value
    if ((user == '') || (pass == '') || (Nivel == '')) {
        alert("No se permiten campos vacios");
    } else {

        let Registro = {
            user: user,
            pass: pass,
            Nivel: Nivel
        }
        console.log(Registro)

        $.post("/RegistrarUsuario", // url
            {
                Registro
            }, // data to be submit
            function (objeto, estatus) { // success callback
                if (objeto == true) {
                    LimpiarFormUser()
                    MostrarUsuarios();
                }
            });
    }
}


function eliminarUsuario(user) {
    $.post("/EliminarUsuario", // url
        {
            user: user
        }, // data to be submit
        function (data, estatus) { // success callback
            if (data == true) {
                MostrarUsuarios()
            }
        });
}

function LimpiarFormUser() {
    document.querySelector("#NombreUsuario").value = ''
    document.querySelector("#ContraseñaUsuario").value  = ''
}




async function cerrarModalUser() {
    const ModalEditTarea = document.querySelector('#ModalNuevoUsuarios');

    await ModalEditTarea.dismiss({
        'dismissed': true
    });
}


async function cerrarModalCategoria() {
    const ModalEditTarea = document.querySelector('#ModalNuevaCategorias');

    await ModalEditTarea.dismiss({
        'dismissed': true
    });
}


function RegistrarCategoria() {
    let NombreCategoria = document.querySelector("#NombreCategoria").value 

    if (NombreCategoria == '') {
        alert("No se permiten campos vacios");
    } else {

        let Registro = {
            NombreCategoria: NombreCategoria
        }
        console.log(Registro)

        $.post("/RegistrarCategoria", // url
            {
                Registro
            }, // data to be submit
            function (objeto, estatus) { // success callback
                if (objeto == true) {
                    LimpiarFormCate()
                    MostrarCategorias();
                }
            });
    }
}

function LimpiarFormCate() {
    document.querySelector("#NombreCategoria").value = '' 
}



function MostrarCategorias() {

    //Limpiar Lista Maestra
    var Lista = document.querySelector("#listaCategorias");
    while (Lista.firstChild) {
        //The list is LIVE so it will re-index each call
        Lista.removeChild(Lista.firstChild);
    }

    //Construir Lista Maestra con tarjetas
    var ItemOriginal = document.querySelector("#Item-BorradorCate").innerHTML;
    $.ajax({
        url: '/TodosCategorias/',
        success: function (data) {
            /* $("#CuerpoRegistros tr").remove(); */

            let TotalRegistros = data.length;
            console.log(TotalRegistros)
            console.log(data)
            for (let index = 0; index < TotalRegistros; index++) {
                var Lista = document.querySelector("#listaCategorias");

                const div = document.createElement("div"); //Creo un nuevo div para la nueva tarjeta
                div.innerHTML = ItemOriginal;
                Lista.appendChild(div);

                var NombreCat = document.querySelector("#NombreCat");
                NombreCat.innerHTML = data[index].Categoria || '';
                NombreCat.id = 'idCategoria' + index;

                var buttonEliminarCat = document.querySelector("#eliminarCategoria");
                buttonEliminarCat.setAttribute('onclick', 'eliminarCategoria("' + data[index].Categoria + '")');
                buttonEliminarCat.id = 'eliminarCategoria' + index;
            }

        } //Funcion success
    }); //Ajax 
}


function eliminarCategoria(cat) { 
    $.post("/EliminarCategoria", // url
        {
            cat: cat
        }, // data to be submit
        function (data, estatus) { // success callback
            if (data == true) {
                MostrarCategorias()
            }
        });
}