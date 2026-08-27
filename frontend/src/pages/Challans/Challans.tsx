import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import Navbar from '../../components/Navbar';

interface Challan {
    id: number;
    challan_number: string;
    customer_id: number;
    challan_date: string;
    status: string;
    remarks: string;
}

const Challans = () => {
    const [challans, setChallans] = useState<Challan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const fetchChallans = async () => {
        try {
            const res = await api.get('/challans');
            setChallans(res.data);
        } catch {
            setError('Failed to load challans');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchChallans();
}, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm('Delete this challan?')) return;
        try {
            await api.delete(`/challans/${id}`);
            setChallans(challans.filter((c) => c.id !== id));
        } catch {
            alert('Failed to delete challan');
        }
    };

    const filteredChallans = challans.filter((c) => {
        const term = search.toLowerCase();
        return (
            c.challan_number?.toLowerCase().includes(term) ||
            c.status?.toLowerCase().includes(term) ||
            c.remarks?.toLowerCase().includes(term)
        );
    });

    return (
        <>
            <Navbar />
            <div className="page">
                <h1>Challans</h1>
                <div className="page-toolbar">
                    <Link to="/challans/new" className="btn btn-primary">
                        + Add Challan
                    </Link>
                    <input
                        type="text"
                        placeholder="Search by challan number, status, or remarks..."
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
                                <th>Challan No.</th>
                                <th>Customer ID</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Remarks</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredChallans.map((c) => (
                                <tr key={c.id}>
                                    <td>{c.challan_number}</td>
                                    <td>{c.customer_id}</td>
                                    <td>{c.challan_date}</td>
                                    <td>{c.status}</td>
                                    <td>{c.remarks}</td>
                                    <td>
                                        <button
                                            onClick={() => navigate(`/challans/edit/${c.id}`)}
                                            className="btn btn-warning btn-sm"
                                            style={{ marginRight: 8 }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(c.id)}
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

                {!loading && !error && filteredChallans.length === 0 && <p>No matching challans found.</p>}
            </div>
        </>
    );
};

export default Challans;