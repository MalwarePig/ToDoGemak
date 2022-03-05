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


Controller.Proyectos = (req, res) => {
  
        //res.send('Metodo Get list');
        req.getConnection((err, conn) => {
            let Planta = req.session.planta; //obeter datos de un objeto Planta
            conn.query("SELECT * FROM Proyectos", (err, data) => {
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
  
        conn.query("INSERT INTO Proyectos(Proyecto,ProyectoDesc)VALUES ('" + NombreProyecto + "','" + DescripcionProyecto +"')", (err, Herramientas) => {
           
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



module.exports = Controller;


