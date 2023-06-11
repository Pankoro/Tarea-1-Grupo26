import prisma from '../prismaClient.js'

const getKarts = async (req, res) => {

    try{
        const karts = await prisma.karts.findMany();
        res.status(200).json(karts);
    }
    catch(error){
        res.status(500).json({error: "Error al encontrar Karts"});
    }
}

const getKartById = async (req, res) => {
    const { id } = req.params

    try {
        const karts = await prisma.karts.findUnique({
            where: {
                id: Number(id)
            }
        })
        
        if (!karts) {
            return res.status(422).json({ error: 'Karts no encontrado' });
        }
        
        res.status(200).json(karts)
    } catch (error) {
        if (error instanceof prisma.PrismaClientKnownRequestError && error.code === 'P2001') {
            res.status(422).json({
                error: 'El coche no existe.',
            });
        } else {
            
            console.error(error);

            res.status(500).json({
                error: 'Se produjo un error al obtener el coche.',
            });
        }
    }
}

const createKart = async (req, res) => {
    const { modelo, color, velocidad_maxima, id_personaje } = req.body;

    // Verificar si los campos requeridos están presentes
    if (modelo === undefined || color === undefined || id_personaje === undefined) {
        return res.status(400).json({ error: 'Los campos modelo, color, velocidad_maxima y id_personaje son requeridos.' });
    }

    // Verificar si el personaje existe
    let personaje;
    try {
        personaje = await prisma.personajes.findUnique({
            where: {
                id: id_personaje,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Se produjo un error al buscar el personaje.' });
    }

    if (!personaje) {
        return res.status(422).json({
            error: `No existe un personaje con el id ${id_personaje}`,
        });
    }

    // Si el personaje existe, crear el kart
    try {
        const kart = await prisma.karts.create({
            data: {
                modelo,
                color,
                velocidad_maxima,
                kartId: id_personaje,
            },
        });

        res.status(201).json(kart);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Se produjo un error al crear el kart.',
        });
    }
};

const updateKart = async (req, res) => {
    const { modelo, color, velocidad_maxima, id_personaje } = req.body;
    const { id } = req.params;

    let data = {};

    if (modelo !== undefined){
        data.modelo = modelo;
    }

    if (color !== undefined) {
        data.color = color;
    }

    if (velocidad_maxima !== undefined) {
        data.velocidad_maxima = velocidad_maxima;
    }

    if (id_personaje !== undefined){
        if (id_personaje == 0){
            data.personaje = {disconnect: true,}
        } else{
            // Verificar si el personaje existe antes de conectarlo
            let personaje;
            try {
                personaje = await prisma.personajes.findUnique({
                    where: {
                        id: id_personaje,
                    },
                });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Se produjo un error al buscar el personaje.' });
            }

            if (!personaje) {
                return res.status(404).json({
                    error: `No existe un personaje con el id ${id_personaje}`,
                });
            }

            data.personaje = {
                connect: {
                    id: id_personaje,
                }
            }
        }
    }

    try{
        const kart = await prisma.karts.update({
            where: { id: Number(id) },
            data
        });

        res.status(200).json(kart);
    } catch (error) {
        if (error instanceof prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2001') {
                return res.status(422).json({ error: 'El kart que intenta actualizar no existe.' });
            } else if (error.code === 'P2002') {
                return res.status(409).json({ error: 'Ya existe un kart con ese modelo.' });
            }
        }

        console.error(error);
        res.status(500).json({
            error: 'Se produjo un error al actualizar el kart.',
        });
    }
};

const deleteKartById = async (req, res) => {
    const { id } = req.params;

    // Verificar si el kart existe antes de intentar eliminarlo
    let kart;
    try {
        kart = await prisma.karts.findUnique({
            where: {
                id: Number(id),
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Se produjo un error al buscar el kart.' });
    }

    if (!kart) {
        return res.status(404).json({
            error: `No existe un kart con el id ${id}`,
        });
    }

    // Si el kart existe, intentar eliminarlo
    try {
        await prisma.karts.delete({
            where: { id: Number(id) },
        });

        res.status(200).json({ message: 'Kart eliminado exitosamente' });
    } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: 'Se produjo un error al eliminar el kart.',
            });
    }
};

const KartsController = {
    getKarts,
    getKartById,
    createKart,
    updateKart,
    deleteKartById
}

export default KartsController;