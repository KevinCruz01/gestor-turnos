import { useState, useEffect } from 'react';
import { getAppointments, updateAppointmentStatus } from '../services/appointmentService';

const Dashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAppointments = async () => {
        try {
            const data = await getAppointments();
            setAppointments(data);
        } catch (error) {
            console.error("Error cargando los turnos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateAppointmentStatus(id, newStatus);
            fetchAppointments(); // Recargamos la tabla para ver el cambio
        } catch (error) {
            console.error("Error al actualizar estado:", error);
        }
    };

    const getBadgeClass = (status) => {
        switch (status) {
            case 'Pendiente': return 'bg-secondary';
            case 'En proceso': return 'bg-warning text-dark';
            case 'Completado': return 'bg-success';
            default: return 'bg-primary';
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Panel de Control (Turnos)</h2>
            </div>

            {loading ? (
                <div className="text-center"><div className="spinner-border text-primary" role="status"></div></div>
            ) : (
                <div className="card shadow-sm">
                    <div className="card-body p-0">
                        <table className="table table-hover mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>Fecha</th>
                                    <th>Cliente</th>
                                    <th>Servicio</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4">No hay turnos agendados.</td>
                                    </tr>
                                ) : (
                                    appointments.map((appt) => (
                                        <tr key={appt.id}>
                                            <td>{new Date(appt.appointment_date).toLocaleString()}</td>
                                            <td>
                                                <strong>{appt.client_name}</strong><br />
                                                <small className="text-muted">{appt.client_phone}</small>
                                            </td>
                                            <td>
                                                {appt.service_name}<br />
                                                <small className="text-muted">${appt.service_price}</small>
                                            </td>
                                            <td>
                                                <span className={`badge ${getBadgeClass(appt.status)}`}>
                                                    {appt.status}
                                                </span>
                                            </td>
                                            <td>
                                                <select 
                                                    className="form-select form-select-sm" 
                                                    value={appt.status}
                                                    onChange={(e) => handleStatusChange(appt.id, e.target.value)}
                                                >
                                                    <option value="Pendiente">Pendiente</option>
                                                    <option value="En proceso">En proceso</option>
                                                    <option value="Completado">Completado</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;