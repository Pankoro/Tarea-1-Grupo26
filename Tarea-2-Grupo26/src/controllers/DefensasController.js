import prisma from '../prismaClient.js'

import {Prisma} from '@prisma/client';

const getDefensas = async (req, res) => {
    try{
        const defensas = await prisma.defensas.findMany();
        res.status(200).json(defensas);
    }
    catch(error){
        res.status(500).json({error: "Error al encontrar Defensas"});
    }
}

const getDefensasById = async (req, res) => {
    const {id} = req.params;

    try {
        const defensas = await prisma.defensas.findUnique({
            where: {
                id: Number(id)
            }
        })
        
        if (!defensas) {
            return res.status(422).json({ error: 'Defensa no encontrada' });
        }
        
        res.status(200).json(defensas)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2001') {
            res.status(422).json({
                error: 'La defensa no existe.',
            });
        } else {
            
            console.error(error);

            res.status(500).json({
                error: 'Se produjo un error al obtener la defensa.',
            });
        }
    }
}


const createDefensa = async (req, res) => {
    const {defensa} = req.body;

    if (defensa === undefined) {
        return res.status(400).json({ error: 'El campos defensa es requerido.' });
    }

    try {
        const defensas = await prisma.defensas.create({
            data: {
                defensa,
            }
        });
        res.status(200).json(defensas);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(422).json({
                error: 'El reino no existe.',
            });
        } 
        else {
            console.error(error);

            res.status(500).json({
                error: 'Se produjo un error al crear la defensa.',
            });
        }
    }
}


const updateDefensa = async (req, res) => {
    const { defensa } = req.body;

    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({ error: 'El ID de la defensa no es válido.' });
    }

    let data = {};

    if (defensa !== undefined) {
        if (typeof defensa !== 'string') {
            return res.status(400).json({ error: 'La defensa debe ser una cadena de caracteres.' });
        }
        data.defensa = defensa;
    }


    try {
        const updatedDefensa = await prisma.defensas.update({
          where: { id: Number(id) },
          data,
        });
    
        res.json(updatedDefensa);
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Se produjo un error al actualizar la defensa.' });
    }

}


const deleteDefensaById = async (req, res) => {
    const { id } = req.params;

    let defensa;
    try {
        defensa = await prisma.defensas.findUnique({
            where: {
                id: Number(id),
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Se produjo un error al buscar la defensa.' });
    }

    if (!defensa) {
        return res.status(404).json({
            error: `No existe una defensa con el id ${id}`,
        });
    }

    try {
        await prisma.defensas.delete({
            where: { id: Number(id) },
        });

        res.status(200).json({ message: 'Defensa eliminada exitosamente' });
    } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: 'Se produjo un error al eliminar la defensa.',
            });
    }
};


const DefensasController = {
    getDefensas,
    getDefensasById,
    createDefensa,
    updateDefensa,
    deleteDefensaById
}

export default DefensasController;