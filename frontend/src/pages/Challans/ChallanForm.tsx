import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api';
import Navbar from '../../components/Navbar';
import axios from 'axios';

interface Customer {
    id: number;
    customer_name: string;
}

const ChallanForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const [customers, setCustomers] = useState<Customer[]>([]);
    const [form, setForm] = useState({
        challan_number: '', customer_id: '', challan_date: '', status: 'pending', remarks: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const res = await api.get('/customers');
                setCustomers(res.data);
            } catch {
                setError('Failed to load customers');
            }
        };
        void fetchCustomers();
    }, []);

    useEffect(() => {
        if (isEditMode) {
            api.get(`/challans/${id}`)
                .then((res) => {
                    const data = res.data;
                    setForm({
                        challan_number: data.challan_number,
                        customer_id: String(data.customer_id),
                        challan_date: data.challan_date ? data.challan_date.split('T')[0] : '',
                        status: data.status,
                        remarks: data.remarks || '',
                    });
                })
                .catch(() => setError('Failed to load challan'));
        }
    }, [id, isEditMode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const payload = { ...form, customer_id: Number(form.customer_id), created_by: Number(localStorage.getItem('userId')) };
        try {
            if (isEditMode) await api.put(`/challans/${id}`, payload);
            else await api.post('/challans', payload);
            navigate('/challans');
        } catch (err) {
            if (axios.isAxiosError(err)) setError(err.response?.data?.message || 'Failed to save challan');
            else setError('Failed to save challan');
        }
    };

    return (
        <>
            <Navbar />
            <div className="form-container">
                <h1>{isEditMode ? 'Edit Challan' : 'Add Challan'}</h1>
                <form onSubmit={handleSubmit}>
                    <input className="input" name="challan_number" placeholder="Challan Number" value={form.challan_number} onChange={handleChange} required />

                    <select name="customer_id" value={form.customer_id} onChange={handleChange} required>
                        <option value="">Select Customer</option>
                        {customers.map((c) => (
                            <option key={c.id} value={c.id}>{c.customer_name}</option>
                        ))}
                    </select>

                    <input type="date" className="input" name="challan_date" value={form.challan_date} onChange={handleChange} required />
                    <input className="input" name="status" placeholder="Status" value={form.status} onChange={handleChange} required />
                    <textarea className="input" name="remarks" placeholder="Remarks" value={form.remarks} onChange={handleChange} />

                    {error && <p className="error-text">{error}</p>}

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        {isEditMode ? 'Update Challan' : 'Save Challan'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default ChallanForm;