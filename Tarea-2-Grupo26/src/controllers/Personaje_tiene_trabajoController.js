import prisma from '../prismaClient.js';

import {Prisma} from '@prisma/client';

const getTrabajosPersonaje = async (req, res) => {
    try {
        const {id} = req.params;
    
        // Verificar si el personaje existe antes de buscar sus trabajos
        let nombrePersonaje;
        try {
            nombrePersonaje = await prisma.personajes.findUnique({
                where: {id: Number(id)},
                select: { nombre: true },
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Se produjo un error al buscar el personaje.' });
        }

        if (!nombrePersonaje) {
            return res.status(422).json({
                error: `No existe un personaje con el id ${id}`,
            });
        }
    
        let trabajosPersonaje;
        try {
            trabajosPersonaje = await prisma.personaje_tiene_trabajo.findMany({
                where: {id_personaje: Number(id)},
                include: {
                    Trabajos: {
                        select: {
                            descripcion: true,
                            sueldo: true
                    }}
                },
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Se produjo un error al buscar los trabajos del personaje.' });
        }
        
        // Aquí los combinamos en un solo objeto antes de enviar
        res.status(200).json({nombrePersonaje, trabajosPersonaje});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Ha ocurrido un error al obtener el trabajo del personaje: ${error.message}` });
    }
};


const createTrabajosPersonaje = async (req, res) => {
    const { id } = req.params;
    const { id_trabajo, fecha_inicio, fecha_termino } = req.body;

    const fecha_inicio_formato = new Date(fecha_inicio);

    let fecha_termino_formato;
    if (fecha_termino !== null){
        fecha_termino_formato = new Date(fecha_termino);
        if (fecha_termino_formato < fecha_inicio_formato){
            return res.status(400).json({ error: "La fecha de término debe ser posterior a la fecha de inicio." });
        }
    }

    // Verificar si el personaje existe
    let personaje;
    try {
        personaje = await prisma.personajes.findUnique({
            where: {id: Number(id)}
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Se produjo un error al buscar el personaje.' });
    }

    if (!personaje) {
        return res.status(422).json({ error: `No existe un personaje con el id ${id}` });
    }

    // Verificar si el trabajo existe
    let trabajo;
    try {
        trabajo = await prisma.trabajos.findUnique({
            where: {id: Number(id_trabajo)}
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Se produjo un error al buscar el trabajo.' });
    }

    if (!trabajo) {
        return res.status(422).json({ error: `No existe un trabajo con el id ${id_trabajo}` });
    }

    try {
        const trabajoCreado = await prisma.personaje_tiene_trabajo.create({
            data: {
                id_personaje: Number(id),
                id_trabajo,
                fecha_inicio: fecha_inicio_formato,
                fecha_termino: fecha_termino ? fecha_termino_formato : null
            },
        });
        res.status(201).json(trabajoCreado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Ha ocurrido un error al crear el trabajo del personaje: ${error.message}` });
    }
};

const actualizarFechaTermino = async (req, res) => {
    const { idPersonaje, idTrabajo } = req.params;
    const { nuevaFechaTermino } = req.body;

    const fechaTermino = new Date(nuevaFechaTermino);
    
    // Verificar si la fecha es válida
    if (isNaN(fechaTermino)) {
        return res.status(400).json({ error: "La nueva fecha de término no es válida." });
    }
    let fecha_inicio;

    const getFecha_inicio = await prisma.personaje_tiene_trabajo.findMany({
        where: {id_personaje: Number(idPersonaje)},
                select: {
                    fecha_inicio: true,
                }    
    });
    
    fecha_inicio = getFecha_inicio[0].fecha_inicio;

    if (fechaTermino !== null){
        let fecha_termino_formato;
        fecha_termino_formato = new Date(fechaTermino);

        if (fecha_termino_formato < fecha_inicio){
            return res.status(400).json({ error: "La fecha de término debe ser posterior a la fecha de inicio." });
        }
    }

    // Verificar si el personaje existe
    let personaje;
    try {
        personaje = await prisma.personajes.findUnique({
            where: {id: Number(idPersonaje)}
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Se produjo un error al buscar el personaje.' });
    }

    if (!personaje) {
        return res.status(422).json({ error: `No existe un personaje con el id ${idPersonaje}` });
    }

    // Verificar si el trabajo existe
    let trabajo;
    try {
        trabajo = await prisma.trabajos.findUnique({
            where: {id: Number(idTrabajo)}
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Se produjo un error al buscar el trabajo.' });
    }

    if (!trabajo) {
        return res.status(422).json({ error: `No existe un trabajo con el id ${idTrabajo}` });
    }

    try {
        const trabajoActualizado = await prisma.personaje_tiene_trabajo.update({
            where:{    
                id_trabajo_id_personaje: {
                    id_personaje: Number(idPersonaje),
                    id_trabajo: Number(idTrabajo),
                },
            },
            data: {
                fecha_termino: fechaTermino,
            },
        });
        
        res.status(200).json(trabajoActualizado);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(422).json({
                error: 'La relacion entre personaje y trabajo no existe.',
            });
        }
        else{
            console.error(error);
            res.status(500).json({ error: `Ha ocurrido un error al actualizar la fecha de término del trabajo: ${error.message}` });
        }
    }
};

const eliminarAsignacionTrabajo = async (req, res) => {
    const { idPersonaje, idTrabajo } = req.params;

    //verificar si existe el personaje
    let personaje;
    try {
        personaje = await prisma.personajes.findUnique({
            where: {id: Number(idPersonaje)}
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Se produjo un error al buscar el personaje.' });
    }

    if (!personaje) {
        return res.status(422).json({ error: `No existe un personaje con el id ${idPersonaje}` });
    }

    // Verificar si el trabajo existe
    let trabajo;
    try {
        trabajo = await prisma.trabajos.findUnique({
            where: {id: Number(idTrabajo)}
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Se produjo un error al buscar el trabajo.' });
    }

    if (!trabajo) {
        return res.status(404).json({ error: `No existe un trabajo con el id ${idTrabajo}` });
    }


    try {
        const trabajoEliminado = await prisma.personaje_tiene_trabajo.delete({
            where: {
                id_trabajo_id_personaje: {
                    id_personaje: Number(idPersonaje),
                    id_trabajo: Number(idTrabajo),
                },
            },
        });

        res.status(200).json("el trabajo asociado ha sido eliminado exitosamente");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Ha ocurrido un error al eliminar la asignación de trabajo: ${error.message}` });
    }
};

const personaje_tiene_trabajoController = {
    getTrabajosPersonaje,
    createTrabajosPersonaje,
    actualizarFechaTermino,
    eliminarAsignacionTrabajo
};

export default personaje_tiene_trabajoController;