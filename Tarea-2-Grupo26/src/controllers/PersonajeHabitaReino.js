import prisma from '../prismaClient.js'

const getPersonaje_habita_reino = async (req, res) => {
    function buildPersonajeHabitaReinoQuery() {
        return prisma.personaje_habita_reino.findMany({
          include: {
            reino: {select: { nombre:true }},
            personaje: {select: { nombre:true }}
          },
        });
      }


    function buildPersonajesReinoQuery(id_reino) {
    return prisma.personaje_habita_reino.findMany({
        where: { id_reino: Number(id_reino) },
        include: {
        personaje: {select: { nombre:true }}
        },
    });
    }
    
    function buildReinos_personajeQuery(id_personaje) {
        return prisma.personaje_habita_reino.findMany({
            where: {id_personaje: Number(id_personaje)},
            include: {
                reino: {select: { nombre:true }},
                personaje: {select: { nombre:true }}
            },
        });
    }
    
    function buildReino_personajeQuery(id_personaje, id_reino) {
        return prisma.personaje_habita_reino.findMany({
            where: {
                AND: [
                    {id_personaje: Number(id_personaje),},
                    {id_reino: Number(id_reino)}
                ]
            },
            include:{
                reino: {select: { nombre:true }},
                personaje: {select: { nombre:true }}
            },
        });
    }


    const { id_reino, id_personaje } = req.body;

    // Verificar si el reino existe si se proporciona un id_reino
    if (id_reino !== undefined) {
        const reino = await prisma.reinos.findUnique({
            where: { id: Number(id_reino) }
        });

        if (!reino) {
            return res.status(422).json({
                error: `No existe un reino con el id ${id_reino}`
            });
        }
    }

    // Verificar si el personaje existe si se proporciona un id_personaje
    if (id_personaje !== undefined) {
        const personaje = await prisma.personajes.findUnique({
            where: { id: Number(id_personaje) }
        });

        if (!personaje) {
            return res.status(422).json({
                error: `No existe un personaje con el id ${id_personaje}`
            });
        }
    }

    
    try {
        let query;

        if (id_reino !== undefined && id_personaje !== undefined) {
            // Un personaje y reino especifico
            query = buildReino_personajeQuery(id_personaje, id_reino);
        } else if (id_reino !== undefined && id_personaje === undefined) {
            // todos los personajes dentro del reino
            query = buildPersonajesReinoQuery(id_reino);
        } else if (id_reino === undefined && id_personaje !== undefined) {
            // todos los reinos que habita un personaje
            query = buildReinos_personajeQuery(id_personaje);
        } else {
            // todos los personajes y todos los reinos
            query = buildPersonajeHabitaReinoQuery();
        }

        const result = await query;
        res.status(200).json(result);
    
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}

const createPersonajeReino = async (req, res) => {
    const { id_personaje, id_reino, es_gobernante } = req.body;

    // Verificar si el reino existe
    const reino = await prisma.reinos.findUnique({
        where: { id: Number(id_reino) }
    });

    if (!reino) {
        return res.status(422).json({
            error: `No existe un reino con el id ${id_reino}`
        });
    }

    // Verificar si el personaje existe
    const personaje = await prisma.personajes.findUnique({
        where: { id: Number(id_personaje) }
    });

    if (!personaje) {
        return res.status(422).json({
            error: `No existe un personaje con el id ${id_personaje}`
        });
    }

    const fecha_registro = new Date();

    try {
        const personajeReino = await prisma.personaje_habita_reino.create({
            data: {
                id_personaje: Number(id_personaje),
                id_reino: Number(id_reino),
                fecha_registro,
                es_gobernante
            },
        });

        res.status(200).json(personajeReino);
    } catch (error) {
        console.log(error.message);
        console.log(error.stack);
        res.status(500).json({ 
            error: error.message,
        });
    }
};

const updatePersonajeReino = async (req, res) => {
    const { id_personaje, id_reino } = req.params;
    const { es_gobernante } = req.body;

    if (id_personaje === undefined || id_reino === undefined || es_gobernante === undefined) {
        return res.status(400).json({ error: 'Los campos id_personaje, id_reino y es_gobernante son requeridos.' });
    }

    // Verificar si la relación personaje-reino existe
    const personajeReinoExistente = await prisma.personaje_habita_reino.findUnique({
        where: {
            id_personaje_id_reino: {
                id_personaje: Number(id_personaje),
                id_reino: Number(id_reino)
            }
        }
    });

    if (!personajeReinoExistente) {
        return res.status(422).json({
            error: `No existe una relación entre el personaje con id ${id_personaje} y el reino con id ${id_reino}`
        });
    }

    try {
        const personajeReino = await prisma.personaje_habita_reino.update({
            where: {
                id_personaje_id_reino: {
                    id_personaje: Number(id_personaje),
                    id_reino: Number(id_reino)
                }
            },
            data: { es_gobernante }
        });

        res.status(200).json(personajeReino);

    } catch (error) {
        console.log(error.message);
        console.log(error.stack);
        res.status(500).json({ 
            error: error.message,
        });
    }
};

const deletePersonajeReino = async (req, res) => {
    const { id_personaje, id_reino } = req.params;

    if (id_personaje === undefined || id_reino === undefined) {
        return res.status(400).json({ error: 'Los campos id_personaje e id_reino son requeridos.' });
    }

    // Verificar si la relación personaje-reino existe
    const personajeReinoExistente = await prisma.personaje_habita_reino.findUnique({
        where: {
            id_personaje_id_reino: {
                id_personaje: Number(id_personaje),
                id_reino: Number(id_reino)
            }
        }
    });

    if (!personajeReinoExistente) {
        return res.status(422).json({
            error: `No existe una relación entre el personaje con id ${id_personaje} y el reino con id ${id_reino}`
        });
    }

    try {
        const personajeReino = await prisma.personaje_habita_reino.delete({
            where: {
                id_personaje_id_reino: {
                    id_personaje: Number(id_personaje),
                    id_reino: Number(id_reino)
                }
            },
        });

        res.status(200).json("el personaje ha sido eliminado de los registros del reino");
        
    } catch (error) {
        console.log(error.message);
        console.log(error.stack);
        res.status(500).json({ 
            error: error.message,
        });
    }
};

const PersonajeHabitaReinosController = {
    getPersonaje_habita_reino,
    createPersonajeReino,
    updatePersonajeReino,
    deletePersonajeReino
}

export default PersonajeHabitaReinosController;