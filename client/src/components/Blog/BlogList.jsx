import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogPostPreview from './BlogPostPreview';
import BlogListContainer from './BlogListContainer';

const BlogList = () => {
    const [posts, setPosts] = useState([]);

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

    return (
        <BlogListContainer>
            {posts.map(post => (
                <BlogPostPreview key={post._id} post={post} />
            ))}
        </BlogListContainer>
    );
};

export default BlogList;
