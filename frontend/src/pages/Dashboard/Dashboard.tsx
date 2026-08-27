import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import Navbar from '../../components/Navbar';

interface Counts {
    customers: number;
    products: number;
    challans: number;
}

const Dashboard = () => {
    const [counts, setCounts] = useState<Counts>({ customers: 0, products: 0, challans: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const [customersRes, productsRes, challansRes] = await Promise.all([
                    api.get('/customers'),
                    api.get('/products'),
                    api.get('/challans'),
                ]);
                setCounts({
                    customers: customersRes.data.length,
                    products: productsRes.data.length,
                    challans: challansRes.data.length,
                });
            } catch {
                setError('Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };
        void fetchCounts();
    }, []);

    return (
        <>
            <Navbar />
            <div className="page">
                <h1>Dashboard</h1>

                {loading && <p>Loading...</p>}
                {error && <p className="error-text">{error}</p>}

                {!loading && !error && (
                    <div className="dashboard-cards">
                        <div className="dashboard-card">
                            <h2>{counts.customers}</h2>
                            <p>Customers</p>
                        </div>
                        <div className="dashboard-card">
                            <h2>{counts.products}</h2>
                            <p>Products</p>
                        </div>
                        <div className="dashboard-card">
                            <h2>{counts.challans}</h2>
                            <p>Challans</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Dashboard;