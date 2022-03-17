const Controller = {}; 
const express = require('express'); //guardar express en una variable de servidor 

Controller.NuevaTarea = (req, res) => {
        req.getConnection((err, conn) => {
            const data = req.body; //TRAE TODO EL OBJETO
 
            let Proyecto = Object.values(data)[0].Proyecto;
            let Tarea = Object.values(data)[0].Tarea;
            let Descripcion = Object.values(data)[0].Descripcion;
            let Grupo = Object.values(data)[0].Grupo;
            let Inicio = Object.values(data)[0].Inicio;
            let Responsable = Object.values(data)[0].Responsable;
            let Soporte = Object.values(data)[0].Soporte;
            let Cumplimiento = Object.values(data)[0].Cumplimiento;
            let Vencimiento = Object.values(data)[0].Vencimiento;
            let Notas = Object.values(data)[0].Notas; 
            console.log(Tarea )
            conn.query("INSERT INTO Proyectos(Proyecto,Tarea,Descripcion,Grupo,Responsable,Soporte,Cumplimiento,Vencimiento,Notas)VALUES" +
                "('" +Proyecto + "','" + Tarea + "','" + Descripcion + "','" + Grupo + "','"+Responsable+"','"+Soporte+"',"+Cumplimiento+",'"+Vencimiento+"','"+Notas+"')", (err, Herramientas) => {
                    if (err) {
                        console.log('Error de lectura' + err);
                        res.json(false);
                    }else{
                          console.log('Listo' )
                        res.json(true);
                    }
                   
                });
        });
 
};


Controller.ActualizarTarea = (req, res) => {
    req.getConnection((err, conn) => {
        const data = req.body; //TRAE TODO EL OBJETO

        let Avance = Object.values(data)[0].Avance;
        let id = Object.values(data)[0].id; 
 
        conn.query("Update Proyectos SET Cumplimiento = "+Avance+" WHERE id = "+id , (err, Herramientas) => {
                if (err) {
                    console.log('Error de lectura' + err);
                    res.json(false);
                }else{
                      console.log('Listo' )
                    res.json(true);
                }
            });
    });

};

Controller.Proyectos = (req, res) => {
  
        //res.send('Metodo Get list');
        req.getConnection((err, conn) => {
            let Planta = req.session.planta; //obeter datos de un objeto Planta
            conn.query("SELECT Proyecto,ProyectoDesc, COUNT(*) as Tareas,InicioProyecto,VencimientoProyecto FROM Proyectos  GROUP BY Proyecto", (err, data) => {
                if (err) {
                    //res.json("Error json: " + err);
                    console.log('Error al registrar recepcion ' + err);
                } else {
                    //console.log(data);
                    res.json(data)
                }
            });
        }); 
};

 


Controller.registrarProyecto = (req, res) => {
    req.getConnection((err, conn) => {
        const data = req.body; //TRAE TODO EL OBJETO

        let NombreProyecto = Object.values(data)[0].NombreProyecto;
        let DescripcionProyecto = Object.values(data)[0].DescripcionProyecto;
        let CalendarioInicio = Object.values(data)[0].CalendarioInicio;
        let CalendarioVencimiento = Object.values(data)[0].CalendarioVencimiento;
        conn.query("INSERT INTO Proyectos(Proyecto,ProyectoDesc,InicioProyecto,VencimientoProyecto)VALUES ('" + NombreProyecto + "','" + DescripcionProyecto +"','"+CalendarioInicio+"','"+CalendarioVencimiento+"')", (err, Herramientas) => {
           
                if (err) {
                    console.log('Error de lectura' + err);
                    res.json(false);
                }else{
                      console.log('Listo' )
                    res.json(true);
                }
               
            });
    });

};





Controller.ListarTareas = (req, res) => {
    //res.send('Metodo Get list');
    req.getConnection((err, conn) => {
        const {
            param
        } = req.params;

        console.log("param id: " +param) 
 
        conn.query("SELECT * FROM Proyectos WHERE Proyecto = '"+param+"' AND Tarea != ''", (err, data) => {
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



Controller.tareasCompletas = (req, res) => {
    //res.send('Metodo Get list');
    req.getConnection((err, conn) => {
        const {
            param
        } = req.params;

        console.log("param id: " +param) 
 
        conn.query("SELECT COUNT(*) as Completas FROM Proyectos WHERE proyecto = '"+param+"' AND  Cumplimiento = 100", (err, data) => {
            if (err) {
                //res.json("Error json: " + err);
                console.log('Error al registrar recepcion ' + err);
            } else {
                console.log(data[0].Completas);
                res.json(data)
            }
        });
    }); 
};

Controller.EstaCategoria = (req, res) => {
    //res.send('Metodo Get list');
    req.getConnection((err, conn) => {
        const {
            param
        } = req.params;

        console.log("param id: " +param) 
 
        conn.query("SELECT Grupo, COUNT(*) as Cantidad FROM Proyectos WHERE proyecto = '"+param+"' AND Tarea is NOT null GROUP BY Grupo", (err, data) => {
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

Controller.EstaPersonal = (req, res) => {
    //res.send('Metodo Get list');
    req.getConnection((err, conn) => {
        const {
            param
        } = req.params;

        console.log("param id: " +param) 
 
        conn.query("SELECT (SELECT count(*) from Proyectos WHERE Cumplimiento = 100 and Proyecto = '"+param+"' and Tarea is NOT null)as Completas,(SELECT count(*) from Proyectos WHERE Cumplimiento < 100 and Proyecto = '"+param+"' and Tarea is NOT null) as Pendientes", (err, data) => {
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

module.exports = Controller;


