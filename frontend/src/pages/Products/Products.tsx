import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import Navbar from '../../components/Navbar';

interface Product {
    id: number;
    product_name: string;
    sku: string;
    category: string;
    unit_price: number;
    current_stock: number;
    minimum_stock: number;
    warehouse_location: string;
}

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const res = await api.get('/products');
            setProducts(res.data);
        } catch {
            setError('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
}, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm('Delete this product?')) return;
        try {
            await api.delete(`/products/${id}`);
            setProducts(products.filter((p) => p.id !== id));
        } catch {
            alert('Failed to delete product');
        }
    };

    const filteredProducts = products.filter((p) => {
        const term = search.toLowerCase();
        return (
            p.product_name?.toLowerCase().includes(term) ||
            p.sku?.toLowerCase().includes(term) ||
            p.category?.toLowerCase().includes(term)
        );
    });

    return (
        <>
            <Navbar />
            <div className="page">
                <h1>Products</h1>
                <div className="page-toolbar">
                    <Link to="/products/new" className="btn btn-primary">
                        + Add Product
                    </Link>
                    <input
                        type="text"
                        placeholder="Search by name, SKU, or category..."
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
                                <th>Product Name</th>
                                <th>SKU</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Min Stock</th>
                                <th>Location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((p) => (
                                <tr key={p.id} className={p.current_stock <= p.minimum_stock ? 'row-warning' : ''}>
                                    <td>{p.product_name}</td>
                                    <td>{p.sku}</td>
                                    <td>{p.category}</td>
                                    <td>₹{p.unit_price}</td>
                                    <td>{p.current_stock}</td>
                                    <td>{p.minimum_stock}</td>
                                    <td>{p.warehouse_location}</td>
                                    <td>
                                        <button
                                            onClick={() => navigate(`/products/edit/${p.id}`)}
                                            className="btn btn-warning btn-sm"
                                            style={{ marginRight: 8 }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(p.id)}
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

                {!loading && !error && filteredProducts.length === 0 && <p>No matching products found.</p>}
            </div>
        </>
    );
};

export default Products;