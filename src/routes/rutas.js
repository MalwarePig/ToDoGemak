const express = require('express'); //guardar express en una variable de servidor
const router = express.Router(); //usar modulo de router de ex´press
 
const UserController = require('../controllers/UserController');
const ProjectosController = require('../controllers/ProjectosController');
/////////////////////////////////////////////////////////////////////////// USUARIOS /////////////////////////////////////////////////////////////////////////////////
//Acceder a login
var reinicio = router.get('/', (req, res) => {
	//res.send('holoo');
	res.render('Login.html');
	
});

router.get('/PanelProyectos', (req, res) => {
	//res.send('holoo');
	res.render('PanelProyectos.html'); 
});

router.get('/homeAdmin', (req, res) => {
	//res.send('holoo');
	res.render('homeAdmin.html'); 
});

var RegistroTareas = router.get('/NuevaTarea', (req, res) => {
	//res.send('holoo');
	res.render('RegistroTareas.html'); 
}); 

/////////////////////////////////////////////////////////////////////////// ENTRAR A HOME ///////////////////////////////////////////////////////////////////////////////
//Carga pagina principal
/* router.get('/home', UserController.HOME);
  */
//Mostrar formulario de nueva tarea
router.get('/FormNuevaTarea', (req, res) => { 
	res.render('RegistroTareas.html');
});
//Registra Nueva tarea
router.post('/registrarTarea', ProjectosController.NuevaTarea);
//Actualizar tarea
router.post('/ActualizarTarea', ProjectosController.ActualizarTarea);
//Lee las tareas del proyecto
router.get('/ListarTareas/:param', ProjectosController.ListarTareas);
//Muestra Pantalla de tareas de un proyecto
//router.get('/MostrarFormulario/:id', ProjectosController.MostrarFormulario);

router.get('/MostrarFormulario', (req, res) => { 
	res.render('ListaTareas.html');
});
  
router.post('/registrarProyecto', ProjectosController.registrarProyecto);
router.get('/Proyectos', ProjectosController.Proyectos);
router.get('/tareasCompletas/:param', ProjectosController.tareasCompletas);

//Carga pagina principal
router.get('/Grafica', (req, res) => { 
	res.render('Grafica.html');
});

//Lee las tareas del proyecto
router.get('/EstaCategoria/:param', ProjectosController.EstaCategoria);
//Lee las tareas del proyecto Por persona
router.get('/EstaPersonal/:param', ProjectosController.EstaPersonal);


/* SESION */
router.post('/IniciarSesion', UserController.login);
//Lee todos los usuario
router.get('/TodosUsuarios', UserController.TodosUsuarios);
//Registrar usuario
router.post('/RegistrarUsuario', UserController.RegistrarUsuario);
//Eliminar usuario
router.post('/EliminarUsuario', UserController.EliminarUsuario);

/***********************/
//Registrar usuario
router.post('/RegistrarCategoria', UserController.RegistrarCategoria);
//Lee todas los categorias
router.get('/TodosCategorias', UserController.TodosCategorias);
//Eliminar categoria
router.post('/EliminarCategoria', UserController.EliminarCategoria);


module.exports = router;
 