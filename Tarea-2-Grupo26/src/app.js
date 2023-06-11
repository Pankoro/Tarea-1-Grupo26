import express from 'express';
import PersonajesController from './controllers/PersonajesController.js';
import KartsController from './controllers/KartsController.js';
import TrabajosController from './controllers/TrabajosController.js';
import Personaje_tiene_trabajoController from './controllers/Personaje_tiene_trabajoController.js';
import ReinosController from './controllers/Reinos.js';
import DiplomaciasController from './controllers/DiplomaciasConstroller.js';
import PersonajeHabitaReino from './controllers/PersonajeHabitaReino.js'
import morgan from 'morgan';
import personaje_tiene_trabajoController from './controllers/Personaje_tiene_trabajoController.js';
import DefensasController from './controllers/DefensasController.js';
import Defensas_del_reino_Controller from './controllers/Defensas_del_reino_Controller.js';

const ENV = process.env;
const app = express();

//middleware
app.use(express.json());
app.use(morgan('dev'));

// rutas personajes
app.get('/personajes', PersonajesController.getPersonajes); 
app.get('/personajes/:id', PersonajesController.getPersonajeById);
app.get('/personaje/:nombre', PersonajesController.getPersonajeByNombre);
app.post('/personajes', PersonajesController.createPersonaje);
app.put('/personajes/:id', PersonajesController.updatePersonaje);
app.delete('/personajes/:id', PersonajesController.deletePersonajeById,);

// rutas karts
app.get('/karts', KartsController.getKarts); 
app.get('/karts/:id', KartsController.getKartById);
app.post('/karts', KartsController.createKart);
app.put('/karts/:id', KartsController.updateKart);
app.delete('/karts/:id', KartsController.deleteKartById);

// rutas trabajos
app.get('/trabajos', TrabajosController.getTrabajos);
app.get('/trabajos/:id', TrabajosController.getTrabajosById);
app.post('/trabajos', TrabajosController.createTrabajos);
app.put('/trabajos/:id', TrabajosController.updateTrabajos);
app.delete('/trabajos/:id', TrabajosController.deleteTrabajos);

// rutas trabajos de personaje
app.get('/trabajosPersonaje/:id', Personaje_tiene_trabajoController.getTrabajosPersonaje);
app.post('/trabajosPersonaje/:id', Personaje_tiene_trabajoController.createTrabajosPersonaje);
app.put('/trabajosPersonaje/:id_personaje/:idTrabajo', Personaje_tiene_trabajoController.actualizarFechaTermino);
app.delete('/trabajosPersonaje/:idPersonaje/:idTrabajo', personaje_tiene_trabajoController.eliminarAsignacionTrabajo);

//rutas reinos
app.get('/reinos', ReinosController.getReinos);
app.get('/reinos/:id', ReinosController.getReinoById);
app.post('/reinos', ReinosController.createReino);
app.put('/reinos/:id', ReinosController.updateReino);
app.delete('/reinos/:id', ReinosController.deleteReino);

// diplomacias
app.get('/diplomacias', DiplomaciasController.getDiplomacias);
app.get('/diplomacias/:id_reino_1/:id_reino_2', DiplomaciasController.getDiplomaciaById);
app.post('/diplomacias', DiplomaciasController.createDiplomacia);
app.put('/diplomacias/:id_reino_1/:id_reino_2', DiplomaciasController.updateDiplomacia);
app.delete('/diplomacias/:id_reino_1/:id_reino_2', DiplomaciasController.deleteDiplomacia);

// ruta personaje habita reino
app.get('/personaje_habita_reino', PersonajeHabitaReino.getPersonaje_habita_reino);
app.post('/personaje_habita_reino', PersonajeHabitaReino.createPersonajeReino);
app.put('/personaje_habita_reino/:id_personaje/:id_reino', PersonajeHabitaReino.updatePersonajeReino);
app.delete('/personaje_habita_reino/:id_personaje/:id_reino', PersonajeHabitaReino.deletePersonajeReino);

// ruta defensas
app.get('/defensas', DefensasController.getDefensas);
app.get('/defensas/:id', DefensasController.getDefensasById);
app.post('/defensas', DefensasController.createDefensa);
app.put('/defensas/:id', DefensasController.updateDefensa);
app.delete('/defensas/:id', DefensasController.deleteDefensaById);

// ruta defensas_del_reino
app.get('/defensas_del_reino/:id', Defensas_del_reino_Controller.getReinoDefensa);
app.post('/defensas_del_reino/:id', Defensas_del_reino_Controller.createReinoDefensa);
app.put('/defensas_del_reino/:idDefensa/:idreino', Defensas_del_reino_Controller.actualizarFechaComienzo);
app.delete('/defensas_del_reino/:idDefensa/:idReino', Defensas_del_reino_Controller.eliminarAsignacionReino);

//==========================================================//
app.get('/', (req, res) => {
    res.json({ message: 'Hello World!!' });
})
//==========================================================//


// 404 not found route
app.use((_, res) => {
    res.status(404).json({ message: 'Not found Crack!' });
})


//Init server
app.listen(ENV.API_PORT, () => {
    console.log(`Server running on port ${ENV.API_PORT}`);
})