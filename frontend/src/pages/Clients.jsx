import { useState, useEffect } from 'react';
import { getClients, createClient } from '../services/clientService';

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [error, setError] = useState(null);

    // Cargar la lista de clientes al inicio
    const fetchClients = async () => {
        try {
            const data = await getClients();
            setClients(data);
        } catch (err) {
            console.error("Error al cargar clientes:", err);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    // Manejar los cambios en los inputs del formulario
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await createClient(formData);
            setFormData({ name: '', email: '', phone: '' }); // Limpiar el formulario
            fetchClients(); // Recargar la lista para ver el nuevo cliente
        } catch (err) {
            // Manejar error de email duplicado u otros
            setError(err.response?.data?.error || 'Error al guardar el cliente');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Gestión de Clientes</h2>
            
            <div className="row">
                {/* Columna del Formulario */}
                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">Nuevo Cliente</h5>
                        </div>
                        <div className="card-body">
                            {error && <div className="alert alert-danger p-2">{error}</div>}
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Nombre Completo</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Correo Electrónico</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Teléfono</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required 
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Guardar Cliente
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Columna de la Tabla */}
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-body p-0">
                            <table className="table table-striped mb-0">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Email</th>
                                        <th>Teléfono</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clients.length === 0 ? (
                                        <tr>
                                            <td colSpan="3" className="text-center py-4">No hay clientes registrados.</td>
                                        </tr>
                                    ) : (
                                        clients.map(client => (
                                            <tr key={client.id}>
                                                <td>{client.name}</td>
                                                <td>{client.email}</td>
                                                <td>{client.phone}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Clients;