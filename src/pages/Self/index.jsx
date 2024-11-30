import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navigation from '../../components/Navbar';

const Self = () => {
    const [userData, setUserData] = useState(null); // State to hold user data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage error state

    const fetchUserData = async () => {
        const apiUrl = 'https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/user';
        const token = localStorage.getItem('access_token'); // Ensure this token is valid

        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'apiKey': 'c7b411cc-0e7c-4ad1-aa3f-822b00e7734b',
                }
            });

            setUserData(response.data); // Update state with fetched data
            setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
            console.error('Error fetching user data:', error);
            setError(error); // Set error state
            setLoading(false); // Set loading to false even if there's an error
        }
    };

    useEffect(() => {
        fetchUserData(); // Call the function to fetch user data
    }, []); // This runs once when the component mounts

    // Render loading state or error message
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching user data: {error.message}</div>;

    // Render user data
    return (
        <div>
            <Navigation/>
            
            {userData ? (
                <div>
                    <h1 className='text-2xl font-bold'>{userData.data.username}</h1>
                    <img className='rounded-full max-h-11' src={userData.data.profilePictureUrl} alt="User Avatar" />
                    <p><strong>Name:</strong> {userData.data.name}</p>
                    <p><strong>Email:</strong> {userData.data.email}</p>
                    <p>Bio: {userData.data.bio}</p>
                    <p><strong>Following:</strong> {userData.data.totalFollowing}</p>
                    <p><strong>Followers:</strong> {userData.data.totalFollowers}</p>
                    {/* Render other user data fields as needed */}
                </div>
            ) : (
                <p>No user data available.</p>
            )}
        </div>
    );
};

export default Self;