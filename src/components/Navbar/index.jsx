import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css'; // Assuming you have a CSS file for styling

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate(); // Hook to programmatically navigate

    useEffect(() => {
        // Check if there's an access token in local storage
        const token = localStorage.getItem('access_token');
        setIsLoggedIn(!!token); // Set logged in state based on token presence
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access_token'); // Remove token from local storage
        setIsLoggedIn(false); // Update state
        navigate('/login');
    }

    return ( 
        <nav className="navbar">
            <ul className="navbar-links">
                <li>
                    <NavLink to="/" exact className="active-link" activeClassName="active">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/explore" exact className="active-link" activeClassName="active">
                        Explore
                    </NavLink>
                </li>
                {!isLoggedIn ? (
                    <>
                        <li>
                            <NavLink to="/login" className="active-link" activeClassName="active">
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/register" className="active-link" activeClassName="active">
                                Register
                            </NavLink>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                        <NavLink to="/self" className="active-link" activeClassName="active">
                            Self
                        </NavLink>
                    </li>
                    <li>
                        <button onClick={handleLogout} className="logout-link">Logout</button>
                    </li>
                    </>
                    
                )}
            </ul>
        </nav>
    );
}

export default Navbar;