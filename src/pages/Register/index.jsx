import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [form, setForm] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        passwordrepeat: '',
        profilePictureUrl: '',
        phoneNumber: '',
        bio: '',
        website: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        setError(null);
    };

const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.passwordrepeat) {
        setError("Passwords do not match.");
        return;
    }

    const payload = {
        ...form,
    };

    console.log("Payload being sent:", payload);

    const apiKey = 'c7b411cc-0e7c-4ad1-aa3f-822b00e7734b'; 

    axios
        .post('https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/register', payload, {
            headers: {
                'Content-Type': 'application/json',
                'apiKey': apiKey,
            },
        })
        .then((res) => {
            console.log(res);
            setSuccess(true);
            navigate('/');
        })
        .catch((err) => {
            console.error('Error response:', err.response);
            if (err.response && err.response.data) {
                console.error('Error details:', err.response.data);
                setError(err.response.data.message || "Registration failed. Please try again.");
            } else {
                setError("Registration failed. Please try again.");
            }
        });

};

    return ( 
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    {success && <div style={{ color: 'green' }}>Registration successful!</div>}
                    <div>
                        <input 
                            type="text"
                            value={form.name}
                            name="name"
                            onChange={handleChange}
                            placeholder="Name"
                            required
                        />
                    </div>
                    <div>
                        <input 
                            type="text"
                            value={form.username}
                            name="username"
                            onChange={handleChange}
                            placeholder="Username"
                            required
                        />
                    </div>
                    <div>
                        <input 
                            type="email"
                            value={form.email}
                            name="email"
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div>
                        <input 
                            type="password"
                            value={form.password}
                            name="password"
                            onChange={handleChange}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div>
                        <input 
                            type="password"
                            value={form.passwordrepeat}
                            name="passwordrepeat"
                            onChange={handleChange}
                            placeholder="Repeat Password"
                            required
                        />
                    </div>
                    <div>
                        <input 
                            type="text"
                            value={form.profilePictureUrl}
                            name="profilePictureUrl"
                            onChange={handleChange}
                            placeholder="Url Profile"
                            required
                        />
                    </div>
                    <div>
                        <input 
                            type="text"
                            value={form.phoneNumber}
                            name="phoneNumber"
                            onChange={handleChange}
                            placeholder="Phone Number"
                        />
                    </div>
                    <div>
                        <input 
                            type="text"
                            value={form.bio}
                            name="bio"
                            onChange={handleChange}
                            placeholder="Bio"
                        />
                    </div>
                    <div>
                        <input 
                            type="text"
                            value={form.website}
                            name="website"
                            onChange={handleChange}
                            placeholder="Website"
                        />
                    </div>
                    
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
     );
}
 
export default Register;