const { getAllClients, createClient } = require('../models/clientModel');

const getClients = async (req, res) => {
    try {
        const clients = await getAllClients();
        res.status(200).json(clients);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
};

const addClient = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        
        if (!name || !email || !phone) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
        
        const newClientId = await createClient({ name, email, phone });
        res.status(201).json({ message: 'Cliente creado con éxito', id: newClientId });

    } catch (error) {
        console.error(error);
        // Manejo de error si el email ya existe (UNIQUE constraint en MySQL)
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'El email ya está registrado' });
        }
        res.status(500).json({ error: 'Error al crear el cliente' });
    }
};

module.exports = {
    getClients,
    addClient
};