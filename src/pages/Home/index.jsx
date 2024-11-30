import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../../components/Navbar";

const Home = () => {
    const [post, setPost] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        perPage: 10,
        total: null,
        prevPage: null,
        nextPage: null,
    });
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const isAuthenticated = () => {
        return localStorage.getItem('access_token') !== null;
    };

    const getExplorePost = () => {
        setLoading(true);
        setError(null);

        const apiKey = 'c7b411cc-0e7c-4ad1-aa3f-822b00e7734b';
        const accessToken = localStorage.getItem('access_token');

    
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'apiKey': apiKey, 
        };

        axios.get(
            `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/following-post?size=${pagination.perPage}&page=${pagination.page}`,
            { headers } 
        )
        .then((res) => {
            setPost(res.data.data.posts);
            setPagination(prev => ({
                ...prev,
                total: res.data.data.totalPosts, 
                nextPage: res.data.nextPage, 
                prevPage: res.data.prevPage, 
            }));
        })
        .catch((err) => {
            console.error(err);
            setError("Failed to fetch posts. Please try again.");
        })
        .finally(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
        } else {
            getExplorePost();
        }
    }, [pagination.page, navigate]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

     const filteredPosts = post.filter(item => 
        item.user?.username.toLowerCase().includes(search.toLowerCase())
    );

    return ( 
        <div>
            <Navbar />
            
            <h1 className="text-3xl">Home</h1>

            {/* <input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={handleSearch}
                className="p-2 mb-4 border"
            /> */}

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}


            {filteredPosts.length > 0 ? (
            filteredPosts.map((item, idx) => (
                <div key={idx} className="p-4 mb-4 border">
                    <Link to={`/profile/${item.user?.id}`}>
                            <img className='w-10 h-10 rounded-full' src={item.user?.profilePictureUrl || ''} alt={item.user?.username || 'User  profile'} />
                            <p><strong>{item.user?.username || ''}</strong></p>
                    </Link>
                    
                    <img className='max-w-56' src={item.imageUrl} alt="Post content" />
                </div>
            ))
        ) : (
            <p>No posts available</p>
        )}

            <div className="pagination">
                {pagination.prevPage && <button onClick={() => setPagination(prev => ({ ...prev, page: pagination.page - 1 }))}>Previous</button>}
                {pagination.nextPage && <button onClick={() => setPagination(prev => ({ ...prev, page: pagination.page + 1 }))}>Next</button>}
            </div>
        </div>
    );
}

export default Home;