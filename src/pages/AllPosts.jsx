import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";

function AllPosts() {
    // add a loading state also....
    const [posts, setPosts] = useState([])
    const [error, setError] = useState(null); // AI
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
            .catch((error) => setError(error.message)); // AI
    }, []);

    if (error) return <div>Error: {error}</div>;

    return (
        <div className='w-full py-8 bg-neutral-950'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
