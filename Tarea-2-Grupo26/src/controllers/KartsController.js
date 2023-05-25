import prisma from '../prismaClient.js'

const getKarts = async (req, res) => {
    const karts = await prisma.karts.findMany();
    res.status(200).json(karts);
}

const getKartById = async (req, res) => {
    const { id } = req.params
    const karts = await prisma.karts.findUnique({
        where: {
            id: Number(id)
        }
    })
    res.json(karts)
}

const createKart = async (req, res) => {
    const { modelo, color, velocidad_maxima, id_personaje } = req.body;
  
    // Verificar si el personaje existe
    if (id_personaje !== undefined) {
        const personaje = await prisma.personajes.findUnique({
          where: {
            id: id_personaje,
          },
        });
      
        // Si el personaje no existe, devolver un error
        if (!personaje) {
          return res.status(404).json({
            error: `No existe un personaje con el id ${id_personaje}`,
          });
        }
    }
  
    // Si el personaje existe, crear el kart
    try {
      const karts = await prisma.karts.create({
        data: {
          modelo,
          color,
          velocidad_maxima,
          kartId: id_personaje,
        },
      });
  
      res.status(201).json(karts);
    } catch (error) {
      // Otros errores de la base de datos
      res.status(500).json({
        error: error.message,
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
        data.id_personaje = (kartId)=>{kartId:id_personaje}
    }

    try{
        const karts = await prisma.karts.update({
            where: { id: Number(id) },
            data
        });
        
        res.status(200).json(karts);
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}

const deleteKartById = async (req, res) => {
    const { id } = req.params;

    try {
        const deletekart = await prisma.karts.delete({
            where: { id: Number(id) },
        });

        res.status(200).json({ message: 'Kart eliminado exitosamente' });
    } catch (error) {
        console.log(error.message);
        console.log(error.stack);
        res.status(500).json({ 
            error: error.message,
        });
    }
}

const KartsController = {
    getKarts,
    getKartById,
    createKart,
    updateKart,
    deleteKartById
}

export default KartsController;