import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';

const BlogPost = () => {
    const { id } = useParams();
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!post) {
        return <div>Post not found</div>;
    }

    const renderContent = () => {
        return post?.content.split('\n').map((paragraph, index) => {
            if (paragraph?.startsWith('##')) {
                return <h2 key={index} className="text-2xl font-semibold mb-4">{paragraph.slice(2)}</h2>;
            } else if (paragraph?.startsWith('#')) {
                return <h1 key={index} className="text-3xl font-bold mb-4">{paragraph.slice(1)}</h1>;
            }
            return <p key={index} className="text-lg text-gray-700 mb-4">{paragraph}</p>;
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <Link to="/blog" className="text-blue-500 hover:text-blue-700 flex items-center mb-6">
                <FaArrowLeft className="mr-2" /> All Blogs
            </Link>
            {post?.image && (
                <div className="mb-6">
                    <img
                        src={`/${post?.image}`}
                        alt={post?.title}
                        className="w-full h-auto max-h-96 rounded-lg shadow-lg object-cover"
                    />
                </div>
            )}
            <h1 className="text-4xl font-bold mb-2 text-center">{post?.title}</h1>
            <p className="text-center text-gray-600 text-lg mb-6">By {post?.author}</p>
            <div className="prose prose-lg max-w-none mx-auto">
                {renderContent()}
            </div>
        </div>
    );
};

export default BlogPost;
