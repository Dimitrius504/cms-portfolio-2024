import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BlogPostPreview = ({ post, isAdmin, onDelete }) => {

    const navigate = useNavigate();

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            onDelete(post._id);
        }
    };

    const handleEdit = () => {
        navigate(`/admin/edit-blog/${post._id}`);
    };

    return (
        <div className="p-6 mb-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-3xl font-bold mb-3 text-gray-800">{post.title}</h2>
            <p className="text-gray-600 mb-4 italic">By {post.author}</p>
            <p className="text-gray-700 mb-4 truncate">{post.content}</p>
            <div className="flex items-center justify-between">
                <Link
                    to={`/blog/post/${post._id}`}
                    className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md transition-colors duration-300"
                >
                    Read More
                </Link>

                {isAdmin && (
                    <div className="flex space-x-2">
                        <button
                            onClick={handleEdit}
                            className="text-white bg-yellow-500 hover:bg-yellow-600 py-1 px-3 rounded transition-colors duration-300"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="text-white bg-red-500 hover:bg-red-600 py-1 px-3 rounded transition-colors duration-300"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPostPreview;
