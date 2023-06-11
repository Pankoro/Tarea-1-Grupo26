import prisma from '../prismaClient.js';


const getReinoDefensa = async (req, res) => {
    try {
        const {id} = req.params;
    
        // Verificar si el personaje existe antes de buscar sus trabajos
        let nombreDefensa;
        try {
            nombreDefensa = await prisma.defensas.findUnique({
                where: {id: Number(id)},
                select: { defensa: true },
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Se produjo un error al buscar la defensa.' });
        }

        if (!nombreDefensa) {
            return res.status(422).json({
                error: `No existe una defensa con el id ${id}`,
            });
        }
    
        let reinosPersonaje;
        try {
            reinosPersonaje = await prisma.defensas_del_reino.findMany({
                where: {id_defensa: Number(id)},
                include: {
                    reino: {
                        select: {
                            nombre: true,
                    }}
                },
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Se produjo un error al buscar los reinos que pertenece la defensa.' });
        }
        
        // Aquí los combinamos en un solo objeto antes de enviar
        res.status(200).json({nombreDefensa, reinosPersonaje});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Ha ocurrido un error al obtener el reino de la defensa: ${error.message}` });
    }
};


const createReinoDefensa = async (req, res) => {
    const { id } = req.params;
    const { id_reino, fecha_comienzo } = req.body;

    const fecha_inicio = new Date(fecha_comienzo);

    // Verificar si el personaje existe
    let defensa;
    try {
        defensa = await prisma.defensas.findUnique({
            where: {id: Number(id)}
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Se produjo un error al buscar la defensa.' });
    }

    if (!defensa) {
        return res.status(422).json({ error: `No existe una defensa con el id ${id}` });
    }

    // Verificar si el trabajo existe
    let reino;
    try {
        reino = await prisma.reinos.findUnique({
            where: {id: Number(id_reino)}
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Se produjo un error al buscar el reino.' });
    }

    if (!reino) {
        return res.status(422).json({ error: `No existe un reino con el id ${id_trabajo}` });
    }

    try {
        const reinoAsociado = await prisma.defensas_del_reino.create({
            data: {
                id_defensa: Number(id),
                id_reino,
                fecha_comienzo: fecha_inicio,
            },
        });
        res.status(201).json(reinoAsociado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Ha ocurrido un error al asociar el reino a la defensa: ${error.message}` });
    }
};


const actualizarFechaComienzo = async (req, res) => {
    const { idDefensa, idreino } = req.params;
    const { nuevaFechaComienzo } = req.body;

    const fecha_inicio = new Date(nuevaFechaComienzo);
    
    // Verificar si la fecha es válida
    
    if (isNaN(fecha_inicio)) {
        return res.status(400).json({ error: "La nueva fecha de comiezno no es válida." });
    }


    // Verificar si el personaje existe
    let defensa;
    try {
        defensa = await prisma.defensas.findUnique({
            where: {id: Number(idDefensa)}
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Se produjo un error al buscar la defensa.' });
    }

    if (!defensa) {
        return res.status(422).json({ error: `No existe una defensa con el id ${id}` });
    }

    // Verificar si el trabajo existe
    let reino;
    try {
        reino = await prisma.reinos.findUnique({
            where: {id: Number(idreino)}
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Se produjo un error al buscar el reino.' });
    }

    if (!reino) {
        return res.status(422).json({ error: `No existe un reino con el id ${idTrabajo}` });
    }

    try {
        const reinoActualizado = await prisma.defensas_del_reino.update({
            where:{    
                id_defensa_id_reino: {
                    id_defensa: Number(idDefensa),
                    id_reino: Number(idreino),
                },
            },
            data: {
                fecha_comienzo: fecha_inicio,
            },
        });
        
        res.status(200).json(reinoActualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Ha ocurrido un error al actualizar la fecha de comienzo de la defensa: ${error.message}` });
    }
};


const eliminarAsignacionReino = async (req, res) => {
    const { idDefensa, idReino } = req.params;

    //verificar si existe el personaje
    let defensa;
    try {
        defensa = await prisma.defensas.findUnique({
            where: {id: Number(idDefensa)}
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Se produjo un error al buscar la defensa.' });
    }

    if (!defensa) {
        return res.status(422).json({ error: `No existe una defensa con el id ${idPersonaje}` });
    }

    // Verificar si el trabajo existe
    let reino;
    try {
        reino = await prisma.reinos.findUnique({
            where: {id: Number(idReino)}
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Se produjo un error al buscar el reino.' });
    }

    if (!reino) {
        return res.status(404).json({ error: `No existe un trabajo con el id ${idTrabajo}` });
    }


    try {
        const defensaEliminada = await prisma.defensas_del_reino.delete({
            where: {
                id_defensa_id_reino: {
                    id_defensa: Number(idDefensa),
                    id_reino: Number(idReino),
                },
            },
        });

        res.status(200).json("el reino asociado ha sido eliminado exitosamente");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Ha ocurrido un error al eliminar la asignación de reino: ${error.message}` });
    }
};



const Defensas_del_reino_Controller = {
    getReinoDefensa,
    createReinoDefensa,
    actualizarFechaComienzo,
    eliminarAsignacionReino
};

export default Defensas_del_reino_Controller;