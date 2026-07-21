import { useState, useEffect } from 'react';
import { getAppointments, updateAppointmentStatus, createAppointment } from '../services/appointmentService';
import { getClients } from '../services/clientService';
import { getServices } from '../services/serviceService';

const Dashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [clients, setClients] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Estados para el Modal y el Formulario
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        client_id: '',
        service_id: '',
        appointment_date: '',
        notes: ''
    });

    const fetchData = async () => {
        try {
            const [appointmentsData, clientsData, servicesData] = await Promise.all([
                getAppointments(),
                getClients(),
                getServices()
            ]);
            setAppointments(appointmentsData);
            setClients(clientsData);
            setServices(servicesData);
        } catch (error) {
            console.error("Error cargando los datos del dashboard:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateAppointmentStatus(id, newStatus);
            fetchData(); 
        } catch (error) {
            console.error("Error al actualizar estado:", error);
        }
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createAppointment(formData);
            setShowModal(false); // Cerramos el modal
            setFormData({ client_id: '', service_id: '', appointment_date: '', notes: '' }); // Limpiamos form
            fetchData(); // Recargamos la tabla
        } catch (error) {
            console.error("Error al agendar el turno:", error);
            alert("Hubo un error al guardar el turno");
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
                <h2 className='text-dark'>Panel de Control (Turnos)</h2>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    + Nuevo Turno
                </button>
            </div>

            {/* MODAL PERSONALIZADO */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">Agendar Nuevo Turno</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Cliente</label>
                                        <select className="form-select" name="client_id" value={formData.client_id} onChange={handleFormChange} required>
                                            <option value="">Seleccione un cliente...</option>
                                            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Servicio</label>
                                        <select className="form-select" name="service_id" value={formData.service_id} onChange={handleFormChange} required>
                                            <option value="">Seleccione un servicio...</option>
                                            {services.map(s => <option key={s.id} value={s.id}>{s.name} - ${s.price}</option>)}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Fecha y Hora</label>
                                        <input type="datetime-local" className="form-control" name="appointment_date" value={formData.appointment_date} onChange={handleFormChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Notas (Opcional)</label>
                                        <textarea className="form-control" name="notes" rows="2" value={formData.notes} onChange={handleFormChange}></textarea>
                                    </div>
                                    <div className="d-flex justify-content-end gap-2">
                                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                                        <button type="submit" className="btn btn-primary">Guardar Turno</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TABLA DE TURNOS */}
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