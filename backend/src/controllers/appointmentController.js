const { 
    getAllAppointments,
    createAppointment,
    updateAppointmentStatus
} = require('../models/appointmentModel');

const getAppointments = async (req, res) => {
    try {
        const appointments = await getAllAppointments();
        res.status(200).json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los turnos' });
    }
};

const addAppointment = async (req, res) => {
    try {
        const { client_id, service_id, appointment_date, notes } = req.body;
        
        if (!client_id || !service_id || !appointment_date) {
            return res.status(400).json({ error: 'Faltan datos obligatorios para el turno' });
        }

        const newId = await createAppointment(req.body);
        res.status(201).json({ message: 'Turno agendado con éxito', id: newId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el turno' });
    }
};

const changeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'Pendiente', 'En proceso', 'Completado'

        const affected = await updateAppointmentStatus(id, status);
        if (affected === 0) {
            return res.status(404).json({ error: 'Turno no encontrado' });
        }
        res.status(200).json({ message: 'Estado actualizado correctamente' });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el estado' });
    }
};

module.exports = {
    getAppointments,
    addAppointment,
    changeStatus
};