import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api';
import Navbar from '../../components/Navbar';
import axios from 'axios';

interface Product {
    id: number;
    product_name: string;
}

const StockMovementForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const [products, setProducts] = useState<Product[]>([]);
    const [form, setForm] = useState({ product_id: '', quantity: '', movement_type: 'IN', reason: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/products');
                setProducts(res.data);
            } catch {
                setError('Failed to load products');
            }
        };
        void fetchProducts();
    }, []);

    useEffect(() => {
        if (isEditMode) {
            api.get(`/stock-movements/${id}`)
                .then((res) => {
                    const data = res.data;
                    setForm({
                        product_id: String(data.product_id),
                        quantity: String(data.quantity),
                        movement_type: data.movement_type,
                        reason: data.reason,
                    });
                })
                .catch(() => setError('Failed to load stock movement'));
        }
    }, [id, isEditMode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const payload = { ...form, product_id: Number(form.product_id), quantity: Number(form.quantity), created_by: Number(localStorage.getItem('userId')) };
        try {
            if (isEditMode) await api.put(`/stock-movements/${id}`, payload);
            else await api.post('/stock-movements', payload);
            navigate('/stock-movements');
        } catch (err) {
            if (axios.isAxiosError(err)) setError(err.response?.data?.message || 'Failed to save stock movement');
            else setError('Failed to save stock movement');
        }
    };

    return (
        <>
            <Navbar />
            <div className="form-container">
                <h1>{isEditMode ? 'Edit Stock Movement' : 'Add Stock Movement'}</h1>
                <form onSubmit={handleSubmit}>
                    <select name="product_id" value={form.product_id} onChange={handleChange} required>
                        <option value="">Select Product</option>
                        {products.map((p) => (
                            <option key={p.id} value={p.id}>{p.product_name}</option>
                        ))}
                    </select>

                    <select name="movement_type" value={form.movement_type} onChange={handleChange} required>
                        <option value="IN">IN</option>
                        <option value="OUT">OUT</option>
                    </select>

                    <input type="number" className="input" name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
                    <textarea className="input" name="reason" placeholder="Reason" value={form.reason} onChange={handleChange} required />

                    {error && <p className="error-text">{error}</p>}

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        {isEditMode ? 'Update Stock Movement' : 'Save Stock Movement'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default StockMovementForm;