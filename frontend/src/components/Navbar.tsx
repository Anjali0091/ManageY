import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const userName = localStorage.getItem('userName');
    const userRole = localStorage.getItem('userRole');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-links">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/customers">Customers</Link>
                <Link to="/products">Products</Link>
                <Link to="/challans">Challans</Link>
                <Link to="/suppliers">Suppliers</Link>
                <Link to="/stock-movements">Stock</Link>
            </div>
            <div className="navbar-right">
                {userName && (
                    <span className="navbar-user">
                        {userName} {userRole && `(${userRole})`}
                    </span>
                )}
                <button onClick={handleLogout} className="btn btn-danger btn-sm">
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;