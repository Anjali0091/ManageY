import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import Navbar from '../../components/Navbar';

interface Supplier {
    id: number;
    supplier_name: string;
    email: string;
    phone: string;
    address: string;
}

const Suppliers = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const fetchSuppliers = async () => {
        try {
            const res = await api.get('/suppliers');
            setSuppliers(res.data);
        } catch {
            setError('Failed to load suppliers');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSuppliers();
}, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm('Delete this supplier?')) return;
        try {
            await api.delete(`/suppliers/${id}`);
            setSuppliers(suppliers.filter((s) => s.id !== id));
        } catch {
            alert('Failed to delete supplier');
        }
    };

    const filteredSuppliers = suppliers.filter((s) => {
        const term = search.toLowerCase();
        return (
            s.supplier_name?.toLowerCase().includes(term) ||
            s.email?.toLowerCase().includes(term) ||
            s.phone?.toLowerCase().includes(term)
        );
    });

    return (
        <>
            <Navbar />
            <div className="page">
                <h1>Suppliers</h1>
                <div className="page-toolbar">
                    <Link to="/suppliers/new" className="btn btn-primary">
                        + Add Supplier
                    </Link>
                    <input
                        type="text"
                        placeholder="Search by name, email, or phone..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input search-input"
                    />
                </div>

                {loading && <p>Loading...</p>}
                {error && <p className="error-text">{error}</p>}

                {!loading && !error && (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSuppliers.map((s) => (
                                <tr key={s.id}>
                                    <td>{s.supplier_name}</td>
                                    <td>{s.email}</td>
                                    <td>{s.phone}</td>
                                    <td>{s.address}</td>
                                    <td>
                                        <button
                                            onClick={() => navigate(`/suppliers/edit/${s.id}`)}
                                            className="btn btn-warning btn-sm"
                                            style={{ marginRight: 8 }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(s.id)}
                                            className="btn btn-danger btn-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {!loading && !error && filteredSuppliers.length === 0 && <p>No matching suppliers found.</p>}
            </div>
        </>
    );
};

export default Suppliers;