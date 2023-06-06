import prisma from '../prismaClient.js'

const getDiplomacias = async (req, res) => {

    try {
        

        const diplomacias = await prisma.diplomacias.findMany({
            include:{
                reino1: {select: { nombre:true }},
                reino2: {select: { nombre:true }}
            },
        });
        res.status(200).json(diplomacias);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message,
        });
    }
}

const getDiplomaciaById = async (req, res) => {
    const { id_reino_1, id_reino_2} = req.params;

    try {
        const diplomacia = await prisma.diplomacias.findUnique({
            where:{
                id_reino_1_id_reino_2:{
                    id_reino_1: Number(id_reino_1),
                    id_reino_2: Number(id_reino_2)
                }
            },

            include:{
                reino1: {select: { nombre:true }},
                reino2: {select: { nombre:true }}
            },
        });

        if (!diplomacia) {
            return res.status(422).json({ error: 'Diplomacia no encontrada' });
        }

        res.status(200).json(diplomacia);
    } catch (error) {
        if (error instanceof prisma.PrismaClientKnownRequestError && error.code === 'P2001') {
            res.status(422).json({
                error: 'Uno de los reinos no existe.',
            });
        } else {
            
            console.error(error);

            res.status(500).json({
                error: 'Se produjo un error al obtener la diplomacia.',
            });
        }
    }
}

const createDiplomacia = async (req, res) => {
    const { id_reino_1, id_reino_2, es_aliado } = req.body;

    if (id_reino_1 === undefined || id_reino_2 === undefined || es_aliado === undefined) {
        return res.status(400).json({ error: 'Los campos id_reino_1, id_reino_2 y es_aliado son requeridos.' });
    }

    try {
        const diplomacia = await prisma.diplomacias.create({
            data: {
                id_reino_1: Number(id_reino_1),
                id_reino_2: Number(id_reino_2),
                es_aliado
            }
        });

        res.status(200).json(diplomacia);
    } catch (error) {
        if (error instanceof prisma.PrismaClientKnownRequestError && error.code === 'P2001') {
            res.status(422).json({
                error: 'Uno de los reinos no existe.',
            });
        } else if (error instanceof prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            res.status(409).json({
                error: 'La relación diplomática ya existe.',
            });
        } else {
            console.error(error);

            res.status(500).json({
                error: 'Se produjo un error al crear la diplomacia.',
            });
        }
    }
}

const updateDiplomacia = async (req, res) => {
    const { id_reino_1, id_reino_2 } = req.params;
    const { es_aliado } = req.body;

    if (id_reino_1 === undefined || id_reino_2 === undefined || es_aliado === undefined) {
        return res.status(400).json({ error: 'Los campos id_reino_1, id_reino_2 y es_aliado son requeridos.' });
    }

    try {
        const diplomacia = await prisma.diplomacias.update({
            where:{
                id_reino_1_id_reino_2:{
                    id_reino_1: Number(id_reino_1),
                    id_reino_2: Number(id_reino_2)
                }
            },
            data: {
                es_aliado
            },
        });

        res.status(200).json(diplomacia);
    } catch (error) {
        if (error instanceof prisma.PrismaClientKnownRequestError && error.code === 'P2001') {
            res.status(422).json({
                error: 'Uno de los reinos no existe.',
            });
        } else if (error instanceof prisma.PrismaClientKnownRequestError && error.code === 'P2016') {
            res.status(422).json({
                error: 'La relación diplomática que se intenta actualizar no existe.',
            });
        } else {
            console.error(error);
            res.status(500).json({
                error: 'Se produjo un error al actualizar la diplomacia.',
            });
        }
    }
}

const deleteDiplomacia = async (req, res) => {
    const { id_reino_1, id_reino_2 } = req.params;

    try {
        const diplomacia = await prisma.diplomacias.delete({
            where: {
                id_reino_1_id_reino_2:{
                    id_reino_1: Number(id_reino_1),
                    id_reino_2: Number(id_reino_2)
                }
            }
        });

        res.status(200).json("La diplomacia entre ambos paises ha sido eliminada");
    } catch (error) {
        if (error instanceof prisma.PrismaClientKnownRequestError && error.code === 'P2001') {
            res.status(422).json({
                error: 'Uno o más reinos no existen.',
            });
        } else if (error instanceof prisma.PrismaClientKnownRequestError && error.code === 'P2016') {
            res.status(422).json({
                error: 'La relación diplomática que se intenta eliminar no existe.',
            });
        } else {
            console.error(error);
            res.status(500).json({
                error: 'Se produjo un error al eliminar la diplomacia.',
            });
        }
    }
}
const diplomaciasController = {
    getDiplomacias,
    getDiplomaciaById,
    createDiplomacia,
    updateDiplomacia,
    deleteDiplomacia
}

export default diplomaciasController;