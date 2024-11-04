import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogPostPreview from '../components/Blog/BlogPostPreview';
import BlogListContainer from '../components/Blog/BlogListContainer';
import { useUser } from '../context/UserContext';
import { Helmet } from 'react-helmet-async';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const { user } = useUser();
    const isAdmin = user?.user?.adminRequested === 'CONFIRMED';

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/blog');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const handleDelete = async (postId) => {
        try {
            await axios.delete(`/api/blog/${postId}`);
            setPosts(posts.filter(post => post._id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Failed to delete post');
        }
    };

    return (
        <>
            <Helmet>
                <title>My Blog - Dimitrius McKinnon</title>
                <meta
                    name="description"
                    content="Discover some of my thoughts and experiences in the tech industry."
                />
                <link rel="canonical" href="/blog" />
            </Helmet>
            <BlogListContainer>

                {posts.map(post => (
                    <BlogPostPreview
                        key={post._id}
                        post={post}
                        isAdmin={isAdmin}
                        onDelete={handleDelete}
                    />
                ))}
            </BlogListContainer>
        </>

    );
};

export default Blog;
