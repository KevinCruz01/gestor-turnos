const { getAllServices } = require('../models/serviceModel');

const getServices = async (req, res) => {
    try {
        const services = await getAllServices();
        res.status(200).json(services);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los servicios' });
    }
};

module.exports = { getServices };