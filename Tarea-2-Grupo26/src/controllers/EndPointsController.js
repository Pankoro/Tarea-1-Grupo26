import prisma from '../prismaClient.js'

const getMasFuerte = async (req, res) => {
    try{
        const personajes = await prisma.personajes.findMany({
            orderBy: {
                fuerza: 'desc', // Orden ascendente por el campo "fuerza"
              },
              take: 5,
        });

        res.status(200).json(personajes);
    }
    catch(error){
        res.status(500).json({error: error});
    }
}


const getPersonajeMasKarts = async (req, res) => {
    try{
        const personajes = await prisma.personajes.findMany({
            include: {kart: true},
        });

        let personajesMasKarts = [];
        let personajeMasKartsTamaño = [];
        personajes.forEach(function(name) {
            if (name.kart.length > personajeMasKartsTamaño.length) {
                personajeMasKartsTamaño = name.kart;
                personajesMasKarts = [name];
            } else if (name.kart.length == personajeMasKartsTamaño.length){
                personajesMasKarts.push(name);
            }
        })
        

        let nombre_cantidad = [];
        personajesMasKarts.forEach(function(name) {
            nombre_cantidad.push( { nombre: name.nombre, cantidad: personajeMasKartsTamaño.length } )
            console.log(nombre_cantidad);
        })
        

        res.status(200).json(nombre_cantidad);
    }
    catch(error){
        return res.status(500).json({error: error});
    }

}

const getCantidadHabitantes = async (req, res) => {
    const { id } = req.params;
    if ( id === undefined) return res.status(400).json({error: "id no ingresado"});

    try {
        const reino_cantidad = await prisma.personaje_habita_reino.count({
            where: {id_reino: Number(id)},
        });

        const reino_name = await prisma.reinos.findUnique({
            where: {id: Number(id)},
        });

        if (!reino_name) {
            return res.status(404).json({error: "Reino no encontrado"});
        }

        res.status(200).json([{
            nombre_reino: reino_name.nombre,
            cantidad: reino_cantidad,
        }]);
    } catch (error) {
        return res.status(500).json({error: error});
    }
}

const getGobernantes = async (req, res) => {
    const { id } = req.params;
    
    if ( id === undefined){
        
        try {
            var reinos = await prisma.reinos.findMany();
        } catch (error){
            return res.status(500).json({error: "ha ocurrido un problema al obtener los reinos"});
        }

        let reinos_personajes = [];
        let count = 0;
        for (const reino of reinos) {
            reinos_personajes.push( {nombre_reino: reino.nombre, gobernantes: []} );
            try{
                const id_reino = reino.id
                const reino_personaje = await prisma.personaje_habita_reino.findMany({
                    where: {id_reino: Number(id_reino), es_gobernante: true},
                    include: { personaje: true}
                });
                

                let personajes = reino_personaje.map(rel => rel.personaje);
                reinos_personajes[count].gobernantes.push(personajes);
            } 
            catch (error){
                console.log(error)
                return res.status(500).json({error: "ha ocurrido un error al obtener los personajes del reino"});
            }
            count ++
        }

        res.status(200).json(reinos_personajes);
    } 
    else{
        try {
            var reinos = await prisma.reinos.findUnique({where: {id: Number(id)}});
        } catch (error){
            return res.status(500).json({error: "ha ocurrido un problema al obtener los reinos"});
        }

        if (!reinos) return res.status(422).json({error: "El reino no existe"});

        let reinos_personajes = {nombre_reino: reinos.nombre, gobernantes: []};
        try{
            const reino_personaje = await prisma.personaje_habita_reino.findMany({
                where: {id_reino: Number(id), es_gobernante: true},
                include: { personaje: true}
            });
            

            let personajes = reino_personaje.map(rel => rel.personaje);

            reinos_personajes.gobernantes.push(personajes);
        } 
        catch (error){
            console.log(error)
            return res.status(500).json({error: "ha ocurrido un error al obtener los personajes del reino"});
        }
        res.status(200).json(reinos_personajes);
    }

}


const EndPointController = {
    getMasFuerte,
    getPersonajeMasKarts,
    getCantidadHabitantes,
    getGobernantes
}

export default EndPointController;