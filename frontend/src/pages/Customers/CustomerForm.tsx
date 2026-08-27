import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api';
import Navbar from '../../components/Navbar';
import axios from 'axios';

const CustomerForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const [form, setForm] = useState({
        customer_name: '', mobile: '', email: '', business_name: '',
        gst_number: '', customer_type: 'Retail', address: '', status: 'Lead',
        follow_up_date: '', notes: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditMode) {
            api.get(`/customers/${id}`)
                .then((res) => {
                    const data = res.data;
                    setForm({ ...data, follow_up_date: data.follow_up_date ? data.follow_up_date.split('T')[0] : '' });
                })
                .catch(() => setError('Failed to load customer'));
        }
    }, [id, isEditMode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            if (isEditMode) await api.put(`/customers/${id}`, form);
            else await api.post('/customers', form);
            navigate('/customers');
        } catch (err) {
            if (axios.isAxiosError(err)) setError(err.response?.data?.message || 'Failed to save customer');
            else setError('Failed to save customer');
        }
    };

    return (
        <>
            <Navbar />
            <div className="form-container">
                <h1>{isEditMode ? 'Edit Customer' : 'Add Customer'}</h1>
                <form onSubmit={handleSubmit}>
                    <input className="input" name="customer_name" placeholder="Customer Name" value={form.customer_name} onChange={handleChange} required />
                    <input className="input" name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} required />
                    <input className="input" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
                    <input className="input" name="business_name" placeholder="Business Name" value={form.business_name} onChange={handleChange} required />
                    <input className="input" name="gst_number" placeholder="GST Number" value={form.gst_number} onChange={handleChange} />

                    <select name="customer_type" value={form.customer_type} onChange={handleChange}>
                        <option value="Retail">Retail</option>
                        <option value="Wholesale">Wholesale</option>
                        <option value="Distributer">Distributer</option>
                    </select>

                    <textarea className="input" name="address" placeholder="Address" value={form.address} onChange={handleChange} required />

                    <select name="status" value={form.status} onChange={handleChange}>
                        <option value="Lead">Lead</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>

                    <input type="date" className="input" name="follow_up_date" value={form.follow_up_date} onChange={handleChange} />
                    <textarea className="input" name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} />

                    {error && <p className="error-text">{error}</p>}

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        {isEditMode ? 'Update Customer' : 'Save Customer'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default CustomerForm;