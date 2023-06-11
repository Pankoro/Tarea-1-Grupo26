import prisma from '../prismaClient.js'

const getPersonajes = async (req, res) => {
    try{
        const personajes = await prisma.personajes.findMany({
            include:{
                kart: true
            }
        });
        res.status(200).json(personajes);
    }
    catch(error){
        res.status(500).json({error: "Error al encontrar Personajes"});
    }
}

const getPersonajeById = async (req, res) => {
    const { id } = req.params

    if (id === undefined) {
        return res.status(400).json({ error: 'El id es requerido.' });
    }

    // Verificar si el personaje existe
    const personajeExistente = await prisma.personajes.findUnique({
        where: {
            id: Number(id)
        }
    });

    if (!personajeExistente) {
        return res.status(422).json({
            error: `No existe un personaje con el id ${id}`
        });
    }

    const personaje = await prisma.personajes.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            kart: true,
        }
    })

    const trabajo_actual = await prisma.personajes.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            trabajos: {where:{fecha_termino: null}}
        }
    })

    res.json({personaje, trabajo_actual: trabajo_actual.trabajos})
};

const getPersonajeByNombre = async (req, res) => {
    try {
        const { nombre } = req.params

        if (nombre === undefined) {
            return res.status(400).json({ error: 'El nombre es requerido.' });
        }

        const personajes = await prisma.personajes.findMany({
            where: {
                nombre: String(nombre)
            }
        })

        if (personajes.length === 0) {
            return res.status(422).json({
                error: `No se encontraron personajes con el nombre ${nombre}`
            });
        }

        res.json(personajes)
    } catch (error) {
        // Otros errores de la base de datos
        res.status(500).json({ 
            error: error.message
        });
    }
};

const createPersonaje = async (req, res) => {
    const { nombre, fuerza, fecha_nacimiento, objeto } = req.body;

    if (!nombre) {
        return res.status(400).json({ error: 'El nombre es requerido.' });
    }

    if (typeof fuerza !== 'number' || fuerza < 0 ) {
        return res.status(400).json({ error: 'La fuerza debe ser mayor a 0.' });
    }

    if (!Date.parse(fecha_nacimiento)) {
        return res.status(400).json({ error: 'La fecha de nacimiento debe ser una fecha válida.' });
    }

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
        if (error instanceof prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            res.status(409).json({
                error: 'La relación diplomática ya existe.',
            });
        } else {
            res.status(500).json({
                error: error.message,
            });
        }
    }
}

const updatePersonaje = async (req, res) => {
    const { fuerza, objeto, nombre } = req.body;
    const { id } = req.params;

    let data = {};

    if (nombre !== undefined) {
        if (typeof objeto !== 'string') {
            return res.status(400).json({ error: 'El nombre debe ser una cadena de caracteres.' });
        }
        data.nombre = nombre;
    }

    if (fuerza !== undefined) {
        if (typeof fuerza !== 'number' || fuerza < 0 ) {
            return res.status(400).json({ error: 'La fuerza debe ser un número mayor a 0.' });
        }
        data.fuerza = fuerza;
    }

    if (objeto !== undefined) {
        if (typeof objeto !== 'string') {
            return res.status(400).json({ error: 'El objeto debe ser una cadena de caracteres.' });
        }
        data.objeto = objeto;
    }

    try {
        const existePersonaje = await prisma.personajes.findUnique({
            where: { id: Number(id) },
        });

        if (!existePersonaje) {
            return res.status(422).json({ error: 'El personaje no existe.' });
        }

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

    try{
        const existePersonaje = await prisma.personajes.findUnique({
            where: { id: Number(id) },
        });

        if (!existePersonaje) {
            return res.status(422).json({ error: 'El personaje no existe.' });
        }

        const karts = await prisma.karts.findMany({
            where: {
                personaje: { 
                    id: Number(id), 
                },
            },
        });

        const kartUpdates = karts.map((kart) => {
            return prisma.karts.update({
                where: {id: kart.id},
                
                data: {
                    personaje: {
                        disconnect: true,
                    },
                },
            });
        });

        const personajeReino = prisma.personaje_habita_reino.deleteMany({
            where:{
                id_personaje: Number(id),
            },
        });

        const trabajoEliminado = prisma.personaje_tiene_trabajo.deleteMany({
            where: { id_personaje: Number(id) },
        });

        const deletePersonaje = prisma.personajes.delete({
            where: { id: Number(id) },
        });

        await prisma.$transaction([...kartUpdates,personajeReino, trabajoEliminado, deletePersonaje]);
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