import prisma from '../prismaClient.js'

const getUsers = async (req , res) => {
    const users = await prisma.user.findMany()
    res.json(users)
}


const getUserById = async (req, res) => {
    const { id } = req.params
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id)
        }
    })
    res.json(user)
}


const createUser = async (req, res) => {
    const { name, email, lastame } = req.body;

    try {
        const user = await prisma.user.create({
        data: {
            name,
            email,
            lastame
        }
        });
        
        res.status(201).json(user);
    } catch (error) {
        if (error.code === 'P2002') {
            res.status(400).json({ 
            error: 'Correo ya existente en la base de datos', 
            });
        } else {
        // Otros errores de la base de datos
        res.status(500).json({ 
            error: 'Un error inesperado ocurrió', 
        });
        }
    }
}
const usersPosts = async (req, res) => {
    const { id } = req.params
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            posts: true
        }
    })
    res.json(user)
}

            
const UsersController = {
    getUsers,
    getUserById,
    createUser, 
    usersPosts
}

export default UsersController


