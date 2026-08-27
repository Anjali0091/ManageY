import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api';
import Navbar from '../../components/Navbar';
import axios from 'axios';

const SupplierForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const [form, setForm] = useState({ supplier_name: '', email: '', phone: '', address: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditMode) {
            api.get(`/suppliers/${id}`)
                .then((res) => setForm(res.data))
                .catch(() => setError('Failed to load supplier'));
        }
    }, [id, isEditMode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            if (isEditMode) await api.put(`/suppliers/${id}`, form);
            else await api.post('/suppliers', form);
            navigate('/suppliers');
        } catch (err) {
            if (axios.isAxiosError(err)) setError(err.response?.data?.message || 'Failed to save supplier');
            else setError('Failed to save supplier');
        }
    };

    return (
        <>
            <Navbar />
            <div className="form-container">
                <h1>{isEditMode ? 'Edit Supplier' : 'Add Supplier'}</h1>
                <form onSubmit={handleSubmit}>
                    <input className="input" name="supplier_name" placeholder="Supplier Name" value={form.supplier_name} onChange={handleChange} required />
                    <input className="input" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
                    <input className="input" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
                    <textarea className="input" name="address" placeholder="Address" value={form.address} onChange={handleChange} />

                    {error && <p className="error-text">{error}</p>}

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        {isEditMode ? 'Update Supplier' : 'Save Supplier'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default SupplierForm;