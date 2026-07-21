const db = require('../config/db');

const getAllServices = async () => {
    const [rows] = await db.query('SELECT * FROM services ORDER BY name ASC');
    return rows;
};

module.exports = { getAllServices };