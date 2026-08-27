import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api';
import Navbar from '../../components/Navbar';
import axios from 'axios';

const ProductForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const [form, setForm] = useState({
        product_name: '', sku: '', category: '', unit_price: '',
        current_stock: '', minimum_stock: '', warehouse_location: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditMode) {
            api.get(`/products/${id}`)
                .then((res) => {
                    const data = res.data;
                    setForm({
                        product_name: data.product_name, sku: data.sku, category: data.category,
                        unit_price: String(data.unit_price), current_stock: String(data.current_stock),
                        minimum_stock: String(data.minimum_stock), warehouse_location: data.warehouse_location,
                    });
                })
                .catch(() => setError('Failed to load product'));
        }
    }, [id, isEditMode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const payload = {
            ...form,
            unit_price: Number(form.unit_price),
            current_stock: Number(form.current_stock),
            minimum_stock: Number(form.minimum_stock),
        };
        try {
            if (isEditMode) await api.put(`/products/${id}`, payload);
            else await api.post('/products', payload);
            navigate('/products');
        } catch (err) {
            if (axios.isAxiosError(err)) setError(err.response?.data?.message || 'Failed to save product');
            else setError('Failed to save product');
        }
    };

    return (
        <>
            <Navbar />
            <div className="form-container">
                <h1>{isEditMode ? 'Edit Product' : 'Add Product'}</h1>
                <form onSubmit={handleSubmit}>
                    <input className="input" name="product_name" placeholder="Product Name" value={form.product_name} onChange={handleChange} required />
                    <input className="input" name="sku" placeholder="SKU (unique)" value={form.sku} onChange={handleChange} required />
                    <input className="input" name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
                    <input type="number" step="0.01" className="input" name="unit_price" placeholder="Unit Price" value={form.unit_price} onChange={handleChange} required />
                    <input type="number" className="input" name="current_stock" placeholder="Current Stock" value={form.current_stock} onChange={handleChange} />
                    <input type="number" className="input" name="minimum_stock" placeholder="Minimum Stock" value={form.minimum_stock} onChange={handleChange} />
                    <input className="input" name="warehouse_location" placeholder="Warehouse Location" value={form.warehouse_location} onChange={handleChange} required />

                    {error && <p className="error-text">{error}</p>}

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        {isEditMode ? 'Update Product' : 'Save Product'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default ProductForm;