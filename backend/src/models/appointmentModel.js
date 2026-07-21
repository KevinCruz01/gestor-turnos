const db = require('../config/db');

const getAllAppointments = async () => {
    // Consulta con JOINs para armar el dashboard completo
    const query = `
        SELECT 
            a.id, 
            a.appointment_date, 
            a.status, 
            a.notes,
            c.name AS client_name, 
            c.phone AS client_phone,
            s.name AS service_name, 
            s.price AS service_price
        FROM appointments a
        JOIN clients c ON a.client_id = c.id
        JOIN services s ON a.service_id = s.id
        ORDER BY a.appointment_date ASC
    `;
    const [rows] = await db.query(query);
    return rows;
};

const createAppointment = async (appointmentData) => {
    const { client_id, service_id, appointment_date, notes } = appointmentData;
    const [result] = await db.query(
        'INSERT INTO appointments (client_id, service_id, appointment_date, notes) VALUES (?, ?, ?, ?)',
        [client_id, service_id, appointment_date, notes]
    );
    return result.insertId;
};

const updateAppointmentStatus = async (id, status) => {
    const [result] = await db.query(
        'UPDATE appointments SET status = ? WHERE id = ?',
        [status, id]
    );
    return result.affectedRows;
};

module.exports = {
    getAllAppointments,
    createAppointment,
    updateAppointmentStatus
};