import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";

const Profile = () => {
    const { id } = useParams();
    const [user, setUser ] = useState({});
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);

    
    const accessToken = localStorage.getItem('access_token');
    const apiKey = "c7b411cc-0e7c-4ad1-aa3f-822b00e7734b";

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch user data
                const userResponse = await axios.get(`https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/user/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'apiKey': apiKey,
                    },
                });
                setUser (userResponse.data.data);


                // Fetch user posts
                const postsResponse = await axios.get(`https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/users-post/${id}?size=10&page=1`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'apiKey': apiKey,
                    },
                });
                setPosts(postsResponse.data.data.posts);
            } catch (error) {
                setError(error.response ? error.response.data.message : "Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, accessToken, apiKey]);

    const handleFollow = async (userId) => {
        try {
            const response = await axios.post(`https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/follow`, {
                userIdFollow: userId
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'apiKey': apiKey,
                },
            });
            
            // Check if the response is successful
            if (response.status === 200) {
                setIsFollowing(true);
                setUser (prev => ({
                    ...prev,
                    totalFollowers: prev.totalFollowers + 1,
                }));
            }
        } catch (error) {
            // Log the error response for debugging
            console.error("Failed to follow user", error.response ? error.response.data : error);
        }
    };

    const handleUnfollow = async (userId) => {
        try {
            const response = await axios.post(`https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/unfollow`, {
                userIdUnfollow: userId
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'apiKey': apiKey,
                },
            });
            setIsFollowing(false);
            setUser (prev => ({
                ...prev,
                totalFollowers: prev.totalFollowers - 1,
            }));
        } catch (error) {
            console.error("Failed to unfollow user", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return ( 
        <div>
            <Navbar />
            <div className="profile">
                <img className="w-20 h-20 rounded-full" src={user.profilePictureUrl} alt={`${user.name}'s profile`} />
                <h1>{user.name}</h1>
                <p className="username">@{user.username}</p> 
                <div className="follower-info">
                    <span>{user.totalFollowing} Following</span>
                    <span>{user.totalFollowers} Followers</span>
                </div>
                <button 
                    onClick={() => isFollowing ? handleUnfollow(user.id) : handleFollow(user.id)} 
                    className={`mt-4 px-4 py-2 rounded ${isFollowing ? 'bg-red-500' : 'bg-blue-500'} text-white`}
                >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                </button>

                <h2>Posts:</h2>
                <div className="posts">
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <div key={post.id} className="post">
                                <h3>{post.title}</h3>
                                <img className="max-h-32" src={post.imageUrl} alt={post.title} />
                                <p>{post.description}</p>
                            </div>
                        ))
                    ) : (
                        <p>No posts available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
 
export default Profile;