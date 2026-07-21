const db = require('../config/db');

// Obtenemos todos los clientes ordenados por el más reciente
const getAllClients = async () => {
    const [rows] = await db.query('SELECT * FROM clients ORDER BY created_at DESC');
    return rows;
};

//  Creamos un cliente con sus parámetros
const createClient = async (clientData) => {
    const { name, email, phone } = clientData;
    const [result] = await db.query(
        'INSERT INTO clients (name, email, phone) VALUES (?, ?, ?)',
        [name, email, phone]
    );
    return result.insertId;
};

module.exports = {
    getAllClients,
    createClient
};