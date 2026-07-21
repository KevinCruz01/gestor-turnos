const express = require('express');
const router = express.Router();
const {
    getAppointments,
    addAppointment,
    changeStatus
} = require('../controllers/appointmentController');

router.get('/', getAppointments);
router.post('/', addAppointment);
router.patch('/:id/status', changeStatus);

module.exports = router;