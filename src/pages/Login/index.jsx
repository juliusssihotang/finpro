import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            navigate("/"); // Redirect to home if already logged in
        }
    }, [navigate]);

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        const payload = {
            email: email,
            password: password,
        };

        const apiUrl = "https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/login";

        axios
            .post(apiUrl, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'apiKey': 'c7b411cc-0e7c-4ad1-aa3f-822b00e7734b', // Ensure this API key is valid
                }
            })
            .then((res) => {
                const token = res.data.token; // Correctly access token from response
                localStorage.setItem("access_token", token);

                setSuccess(true);
                setError("");

                setTimeout(() => {
                    navigate("/"); // Redirect to /home after successful login
                }, 3000);
            })
            .catch((err) => {
                console.error("Error:", err.response); // Log the full response for debugging
                setError(err.response?.data?.message || "An error occurred");
                setSuccess(false);
            });
    };

    return ( 
        <div>
            {success && <p>Login successful</p>}
            {error && <p>{error}</p>}
            <input type="text" placeholder="email" onChange={handleChangeEmail} />
            <input
                type="password"
                placeholder="password"
                onChange={handleChangePassword}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;