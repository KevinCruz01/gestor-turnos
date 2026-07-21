import api from './api';

export const getAppointments = async () => {
    const response = await api.get('/appointments');
    return response.data;
};

export const updateAppointmentStatus = async (id, status) => {
    const response = await api.patch(`/appointments/${id}/status`, { status });
    return response.data;
};