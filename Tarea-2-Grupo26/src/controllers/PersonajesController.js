import prisma from '../prismaClient.js'

const getPersonajes = async (req, res) => {
    const personajes = await prisma.personajes.findMany();
    res.status(200).json(personajes);
}

const getPersonajeById = async (req, res) => {
    const { id } = req.params
    const personaje = await prisma.personajes.findUnique({
        where: {
            id: Number(id)
        }
    })
    res.json(personaje)
}

const getPersonajeByNombre = async (req, res) => {
    try {
        const { nombre } = req.params
        const personaje = await prisma.personajes.findMany({
            where: {
                nombre: String(nombre)
            }
        })
        res.json(personaje)
    } catch (error) {
        // Otros errores de la base de datos
        res.status(500).json({ 
            error: error.message
        });
    }
}

const createPersonaje = async (req, res) => {
    const { nombre, fuerza, fecha_nacimiento, objeto } = req.body;
    const fecha = new Date(fecha_nacimiento);

    try {
        const personajes = await prisma.personajes.create({
        data: {
            nombre,
            fuerza,
            fecha_nacimiento: fecha,
            objeto
        }
        });
        
        res.status(201).json(personajes);
    } catch (error) { 
        // Otros errores de la base de datos
        res.status(500).json({ 
            error: error.message, 
        });
    }
}

const updatePersonaje = async (req, res) => {
    const { fuerza, objeto } = req.body;
    const { id } = req.params;

    let data = {};

    if (fuerza !== undefined){
        data.fuerza = fuerza;
    }

    if (objeto !== undefined) {
        data.objeto = objeto;
    }

    try{
        const personajes = await prisma.personajes.update({
            where: { id: Number(id) },
            data
        });
        
        res.status(200).json(personajes);
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}

const deletePersonajeById = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPersonaje = await prisma.personajes.delete({
            where: { id: Number(id) },
        });

        res.status(200).json({ message: 'Personaje eliminado exitosamente' });
    } catch (error) {
        console.log(error.message);
        console.log(error.stack);
        res.status(500).json({ 
            error: error.message,
        });
    }
}

const PersonajesController = {
    getPersonajes,
    getPersonajeById,
    getPersonajeByNombre,
    createPersonaje,
    updatePersonaje,
    deletePersonajeById
}

export default PersonajesController;