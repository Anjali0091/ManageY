import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import Navbar from '../../components/Navbar';

interface StockMovement {
    id: number;
    product_id: number;
    quantity: number;
    movement_type: string;
    reason: string;
    created_at: string;
}

const StockMovements = () => {
    const [movements, setMovements] = useState<StockMovement[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const fetchMovements = async () => {
        try {
            const res = await api.get('/stock-movements');
            setMovements(res.data);
        } catch {
            setError('Failed to load stock movements');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMovements();
}, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm('Delete this stock movement?')) return;
        try {
            await api.delete(`/stock-movements/${id}`);
            setMovements(movements.filter((m) => m.id !== id));
        } catch {
            alert('Failed to delete stock movement');
        }
    };

    const filteredMovements = movements.filter((m) => {
        const term = search.toLowerCase();
        return (
            m.movement_type?.toLowerCase().includes(term) ||
            m.reason?.toLowerCase().includes(term)
        );
    });

    return (
        <>
            <Navbar />
            <div className="page">
                <h1>Stock Movements</h1>
                <div className="page-toolbar">
                    <Link to="/stock-movements/new" className="btn btn-primary">
                        + Add Stock Movement
                    </Link>
                    <input
                        type="text"
                        placeholder="Search by type or reason..."
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
                                <th>Product ID</th>
                                <th>Type</th>
                                <th>Quantity</th>
                                <th>Reason</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMovements.map((m) => (
                                <tr key={m.id}>
                                    <td>{m.product_id}</td>
                                    <td style={{ color: m.movement_type === 'IN' ? 'green' : 'red', fontWeight: 'bold' }}>{m.movement_type}</td>
                                    <td>{m.quantity}</td>
                                    <td>{m.reason}</td>
                                    <td>{new Date(m.created_at).toLocaleString()}</td>
                                    <td>
                                        <button
                                            onClick={() => navigate(`/stock-movements/edit/${m.id}`)}
                                            className="btn btn-warning btn-sm"
                                            style={{ marginRight: 8 }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(m.id)}
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

                {!loading && !error && filteredMovements.length === 0 && <p>No matching stock movements found.</p>}
            </div>
        </>
    );
};

export default StockMovements;