import express from 'express';
import UsersController from './controllers/UsersController.js';
import PersonajesController from './controllers/PersonajesController.js';
import KartsController from './controllers/KartsController.js';
import morgan from 'morgan';

const ENV = process.env;
const app = express();

//middleware
app.use(express.json());
app.use(morgan('dev'));


//endpoints(Routes)
app.get('/users', UsersController.getUsers)
app.get('/users/:id', UsersController.getUserById)
app.post('/users', UsersController.createUser)
app.get('/users/:id/posts', UsersController.usersPosts)

// rutas personajes
app.get('/personajes', PersonajesController.getPersonajes); 
app.get('/personajes/:id', PersonajesController.getPersonajeById);
app.get('/personaje/:nombre', PersonajesController.getPersonajeByNombre);
app.post('/personajes', PersonajesController.createPersonaje);
app.put('/personajes/:id', PersonajesController.updatePersonaje);
app.delete('/personajes/:id', PersonajesController.deletePersonajeById);

// rutas karts
app.get('/karts', KartsController.getKarts); 
app.get('/karts/:id', KartsController.getKartById);
app.post('/karts', KartsController.createKart);
app.put('/karts/:id', KartsController.updateKart);
app.delete('/karts/:id', KartsController.deleteKartById);

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