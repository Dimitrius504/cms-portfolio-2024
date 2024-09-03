// pages/EditBlogPost.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BlogForm from '../../components/Blog/BlogForm';

const EditBlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/api/blog/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error('Error fetching the post:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleEdit = async (updatedPost) => {
        try {
            const formData = new FormData();
            for (const key in updatedPost) {
                formData.append(key, updatedPost[key]);
            }

            const response = await axios.put(`/api/blog/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Blog post updated:', response.data);
            navigate(`/blog/post/${id}`);
        } catch (error) {
            console.error('Error updating blog post:', error);
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-4xl font-bold mb-4 text-center">Edit Blog Post</h1>
            <BlogForm post={post} onSubmit={handleEdit} />
        </div>
    );
};

export default EditBlogPost;
