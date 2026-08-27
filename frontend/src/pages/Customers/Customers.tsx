import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import Navbar from '../../components/Navbar';

interface Customer {
    id: number;
    customer_name: string;
    mobile: string;
    email: string;
    business_name: string;
    customer_type: string;
    status: string;
}

const Customers = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const userRole = localStorage.getItem('userRole');
    const isAdmin = userRole === 'Admin';

    const fetchCustomers = async () => {
        try {
            const res = await api.get('/customers');
            setCustomers(res.data);
        } catch {
            setError('Failed to load customers');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCustomers();
}, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm('Delete this customer?')) return;
        try {
            await api.delete(`/customers/${id}`);
            setCustomers(customers.filter((c) => c.id !== id));
        } catch {
            alert('Failed to delete customer');
        }
    };

    const filteredCustomers = customers.filter((c) => {
        const term = search.toLowerCase();
        return (
            c.customer_name?.toLowerCase().includes(term) ||
            c.mobile?.toLowerCase().includes(term) ||
            c.business_name?.toLowerCase().includes(term) ||
            c.email?.toLowerCase().includes(term)
        );
    });

    return (
        <>
            <Navbar />
            <div className="page">
                <h1>Customers</h1>
                <div className="page-toolbar">
                    <Link to="/customers/new" className="btn btn-primary">
                        + Add Customer
                    </Link>
                    <input
                        type="text"
                        placeholder="Search by name, mobile, business, or email..."
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
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Business</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.map((c) => (
                                <tr key={c.id}>
                                    <td>{c.customer_name}</td>
                                    <td>{c.mobile}</td>
                                    <td>{c.email}</td>
                                    <td>{c.business_name}</td>
                                    <td>{c.customer_type}</td>
                                    <td>{c.status}</td>
                                    <td>
                                        <button
                                            onClick={() => navigate(`/customers/edit/${c.id}`)}
                                            className="btn btn-warning btn-sm"
                                            style={{ marginRight: 8 }}
                                        >
                                            Edit
                                        </button>
                                        {isAdmin && (
                                            <button
                                                onClick={() => handleDelete(c.id)}
                                                className="btn btn-danger btn-sm"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {!loading && !error && filteredCustomers.length === 0 && <p>No matching customers found.</p>}
            </div>
        </>
    );
};

export default Customers;