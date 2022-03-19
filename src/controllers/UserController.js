const Controller = {};
const OS = require("os");
/////////////////////////////////////////////////////////////////////--------------- REGISTRO ----------------------/////////////////////////////////////////////////////////////////////
Controller.save = (req, res) => {
    const data = req.body;
    const nombre = req.body.Planta;
    req.getConnection((err, conn) => {

        conn.query('INSERT INTO usuarios set ?', [data], (err, ot) => {
            res.redirect('/Signup');
        });
    })
    /* console.log(req.body);//se obtienen los datos del formulario a traves del req.body
     res.send('works');*/
}


Controller.EliminarUsuario = (req, res) => {
    const data = req.body;
    const nombre = req.body.Planta;
    req.getConnection((err, conn) => {

        var id = Object.values(data)[0].id;

        conn.query("delete from usuarios WHERE Usuario = '" + nombre + "'", (err, ot) => {
            res.json(true);
        });
    })
    /* console.log(req.body);//se obtienen los datos del formulario a traves del req.body
     res.send('works');*/
}

/////////////////////////////////////////////////////////////////////--------------- LOGIN ----------------------/////////////////////////////////////////////////////////////////////
Controller.login = (req, res) => {
    req.session.Usuario = req.body.username;
    const data = req.body; //TRAE TODO EL OBJETO

    let Usuario = Object.values(data)[0].Usuario;
    let Contrasena = Object.values(data)[0].Contraseña;

    console.log(Usuario, Contrasena)
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuarios WHERE Usuario = ? AND Contrasena = ?', [Usuario, Contrasena], (error, results, fields) => {
            if (error) {
                console.log(error);
                res.redirect('/');
            }
            if (Object.keys(results).length > 0)//si contiene almenso 1 resultado entra
            {
                console.log("Resultados: " + Object.keys(results).length)
                const id = results[0].id//Obtener contraseña de la consulta
                const Usuario = results[0].Usuario//Obtener contraseña de la consulta
                const pass = results[0].Contrasena//Obtener contraseña de la consulta
                const Rol = results[0].Rol//Obtener nivel de la consulta

                console.log("Resultados: " + Object.keys(results).length, Contrasena, pass)
                if (Contrasena == pass) {//si las contraseñas coinciden entran
                    req.session.loggedin = true;
                    req.session.idDB = id;
                    req.session.Usuario = Usuario;
                    req.session.Contrasena = Contrasena;
                    req.session.Rol = Rol;
                    //req.session.nombre = OS.hostname(); 
                    let ip = req.connection.remoteAddres;
                    console.log("chi: ")
                    res.json({ Usuario: Usuario, Rol: Rol });
                } else {//si las contraseñas no coinciden
                    res.redirect('/');
                }
            } else {
                console.log('Sin resultados ' + error);
                res.redirect('/');
            }
            //response.end();
        });
    })
}

/////////////////////////////////////////////////////////////////////--------------- SignUp ----------------------/////////////////////////////////////////////////////////////////////
Controller.SignUp = (req, res) => {
    req.getConnection((err, conn) => {
        if (req.session.loggedin) {
            conn.query('SELECT * FROM usuarios', [], (error, results, fields) => {
                if (error) {
                    console.log(error);
                    res.redirect('/');
                    console.log('error en query');
                }
                else if (Object.keys(results).length > 0)//si contiene almenso 1 resultado entra
                {
                    res.render('Admin/Signup.html', {
                        data: results
                    });
                }
            });
        } else {
            res.redirect('/');
        }
    })
}

/////////////////////////////////////////////////////////////////////--------------- HOME ----------------------/////////////////////////////////////////////////////////////////////
Controller.HOME = (req, res) => {
    req.getConnection((err, conn) => {
        if (req.session.loggedin) {
            console.log("EN home");
            conn.query("SELECT * FROM usuarios WHERE usuario = '" + req.session.username + "'", (err, user) => {
                if (err) {
                    console.log('Error de lectura');
                }
                console.log(user);
                res.render('index.html', {
                    data: user
                });
            });
        } else {
            res.redirect('/');
        }
    })
}



Controller.TodosUsuarios = (req, res) => {
    //res.send('Metodo Get list');
    req.getConnection((err, conn) => {
        const {
            param
        } = req.params; 
        
        conn.query("SELECT * from Usuarios", (err, data) => {
            if (err) {
                //res.json("Error json: " + err);
                console.log('Error al registrar recepcion ' + err);
            } else {
                // console.log(data);
                res.json(data)
            }
        });
    });
};




Controller.RegistrarUsuario = (req, res) => {
    req.getConnection((err, conn) => {
        const data = req.body; //TRAE TODO EL OBJETO

        let user = Object.values(data)[0].user;
        let pass = Object.values(data)[0].pass;
        let Nivel = Object.values(data)[0].Nivel;

        conn.query("INSERT INTO Usuarios(Usuario,Contrasena,Rol)VALUES ('" + user + "','" + pass + "','" + Nivel + "')", (err, Herramientas) => {
            if (err) {
                console.log('Error de lectura' + err);
                res.json(false);
            } else {
                console.log('Listo')
                res.json(true);
            }

        });
    });
};

Controller.EliminarUsuario = (req, res) => {
    req.getConnection((err, conn) => {
        const data = req.body; //TRAE TODO EL OBJETO

        let user = data.user
        conn.query("DELETE FROM Usuarios WHERE Usuario = '" + user + "'", (err, Herramientas) => {
            if (err) {
                console.log('Error de lectura' + err);
                res.json(false);
            } else {
                console.log('Listo')
                res.json(true);
            }

        });
    });
};





Controller.RegistrarCategoria = (req, res) => {
    req.getConnection((err, conn) => {
        const data = req.body; //TRAE TODO EL OBJETO

        let NombreCategoria = Object.values(data)[0].NombreCategoria; 
        conn.query("INSERT INTO Categorias(Categoria)VALUES ('" + NombreCategoria + "')", (err, Herramientas) => {
            if (err) {
                console.log('Error de lectura' + err);
                res.json(false);
            } else {
                console.log('Listo')
                res.json(true);
            }

        });
    });
};

Controller.TodosCategorias = (req, res) => {
    //res.send('Metodo Get list');
    req.getConnection((err, conn) => {
        const {
            param
        } = req.params;

        console.log("param id: " + param)

        conn.query("SELECT * from Categorias", (err, data) => {
            if (err) {
                //res.json("Error json: " + err);
                console.log('Error al registrar recepcion ' + err);
            } else {
                // console.log(data);
                res.json(data)
            }
        });
    });
};




Controller.EliminarCategoria = (req, res) => {
    const data = req.body; 
    req.getConnection((err, conn) => {

        var categoria = data.cat;

        conn.query("delete from Categorias WHERE categoria = '" + categoria + "'", (err, ot) => {
            res.json(true);
        });
    })
    /* console.log(req.body);//se obtienen los datos del formulario a traves del req.body
     res.send('works');*/
}



module.exports = Controller;