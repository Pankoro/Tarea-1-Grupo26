import prisma from '../prismaClient.js'

const getReinos = async (req, res) => {
    try{
        const reinos = await prisma.reinos.findMany();
        res.status(200).json(reinos);
    }
    catch(error){
        res.status(500).json({error: "Error al encontrar Reinos"});
    }
}

const getReinoById = async (req, res) => {
    const { id } = req.params;

    try {
        const reino = await prisma.reinos.findUnique({
            where: { id: Number(id) },
        });
    
        
        if (!reino) {
            return res.status(422).json({ error: 'reino no encontrado' });
        }
        
        res.status(200).json(reino);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Se produjo un error al obtener la diplomacia.',
        });
    }
}

const createReino = async (req, res) => {
    const { nombre, ubicacion, superficie} = req.body;

    if (nombre === undefined || ubicacion === undefined || superficie === undefined){
        return res.status(400).json({ error: 'Los campos nombre, ubicacion y superficie son requeridos.' });
    }

    try {
        const reino = await prisma.reinos.create({
            data: { 
                nombre, 
                ubicacion,
                superficie
            },
        });

        res.status(200).json(reino)
    } catch (error) {
        if (error instanceof prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            res.status(409).json({
                error: 'El reino ya existe.',
            });
        } else {
            console.error(error);

            res.status(500).json({
                error: 'Se produjo un error al crear el reino.',
            });
        }
    }
}

const updateReino = async (req, res) => {
    const {id} = req.params;
    const { nombre, ubicacion, superficie } = req.body;

    if (id === undefined){
        return res.status(400).json({error: 'el id es requerido'});   
    }

    if (nombre === undefined && ubicacion === undefined && superficie === undefined){
        return res.status(400).json({error: 'aluno de los campos, nombre, ubicación o superficie tiene que ser rellenado'});
    }

    let data = {}

    if (nombre !== undefined) data.nombre = nombre;
    if (ubicacion !== undefined) data.ubicacion = ubicacion;
    if (superficie !== undefined) data.superficie = superficie;

    try{
        const reino = await prisma.reinos.update({
            where: { id: Number(id)},
            data
        });
    
        res.status(200).json(reino);
    } catch (error) {
        if (error instanceof prisma.PrismaClientKnownRequestError && error.code ==='P2016'){
            res.status(422).json({
                error: 'el reino no existe.',
            });
        } else {
            console.error(error);
            res.status(500).json({
                error: 'Se produjo un error al actualizar la diplomacia.',
            });
        }
    }
}

const deleteReino = async (req, res) =>{
    const {id} = req.params;

    try {
        const diplomacias1 = prisma.diplomacias.deleteMany({
            where: { id_reino_1: Number(id) },
        });
        
        const diplomacias2 = prisma.diplomacias.deleteMany({
            where: { id_reino_2: Number(id) },
        });
    
        const personajeReino = prisma.personaje_habita_reino.deleteMany({
            where:{
                id_reino: Number(id),
            },
        });
    
        const deleteReino = prisma.reinos.delete({ 
            where: {id: Number(id)},
        });
    
        await prisma.$transaction([diplomacias1, diplomacias2, personajeReino, deleteReino]);
        res.status(200).json({message: "el reino ha sido eliminado exitosamente"});
        
    } catch (error) {
        if (error instanceof prisma.PrismaClientKnownRequestError && error.code ==='P2016'){
            res.status(422).json({
                error: 'el reino no existe.',
            });
        } else {
            console.error(error);
            res.status(500).json({
                error: 'Se produjo un error al actualizar la diplomacia.',
            });
        }
    }
}

const ReinosController = {
    getReinos,
    getReinoById,
    createReino,
    updateReino,
    deleteReino
}

export default ReinosController;

