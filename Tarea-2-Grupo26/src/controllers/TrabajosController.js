import prisma from '../prismaClient.js'

const getTrabajos = async (req, res) => {
    try{
        const trabajos = await prisma.trabajos.findMany();
        res.status(200).json(trabajos);

    }catch (error) {
        res.status(500).json({ 
            error: "Error al encontrar Trabajos", 
        });
    }
}

const getTrabajosById = async (req, res) => {
    const {id} = req.params;

    try {

        const trabajos = await prisma.trabajos.findUnique({
           where: { id: Number(id) } 
        });
        
        if (!trabajos){
            return res.status(422).json({error: 'Trabajo no encontrado'});
        }

        res.status(200).json(trabajos);
        
    } catch (error) {
        res.status(500).json({ 
            error: error.message, 
        });
    }
}

//falta45
const createTrabajos = async (req, res) => {
    const { descripcion, sueldo } = req.body;
    
    try {
        const trabajos = await prisma.trabajos.create({
            data: {
                descripcion,
                sueldo
            }
        });
        res.status(201).json(trabajos);
    } catch (error) { 
        // Otros errores de la base de datos
        res.status(500).json({ 
            error: error.message, 
        });
    }
};

const updateTrabajos = async (req, res) => {
    const { descripcion, sueldo} = req.body;
    const {id} = req.params;

    let data = {};

    if (descripcion !== undefined) data.descripcion = descripcion;
    if (sueldo !== undefined) data.sueldo = sueldo;

    try {
        const trabajos = await prisma.trabajos.update({
            where: { id: Number(id) },
            data
        });
        res.status(201).json(trabajos);
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    };

}

const deleteTrabajos = async (req, res) => {
    const {id} = req.params;

    try{
        const trabajoEliminado = prisma.personaje_tiene_trabajo.deleteMany({
            where: { id_trabajo: Number(id) },
        });
        
        const trabajos = prisma.trabajos.delete({
            where: { id: Number(id) },
        })

        await prisma.$transaction([trabajoEliminado, trabajos]);
        res.status(201).json({message: "trabajo eliminado exitosamente"});
    } catch (error){
        res.status(500).json({
            error:"el trabajo no existe",
        });
    };
}


const TrabajosController = {
    getTrabajos,
    getTrabajosById,
    createTrabajos,
    updateTrabajos,
    deleteTrabajos
}

export default TrabajosController;