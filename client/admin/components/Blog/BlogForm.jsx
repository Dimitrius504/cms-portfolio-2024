import React, { useState } from 'react';
import TextArea from './TextArea';
import FileInput from './FileInput';

const BlogForm = ({ post, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: post.title || '',
        content: post.content || '',
        author: post.author || '',
        tags: post.tags.join(', ') || '',
        image: post.image || null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Title:</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>
            <TextArea
                label="Content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
            />
            <div>
                <label className="block text-sm font-medium text-gray-700">Author:</label>
                <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Tags:</label>
                <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>
            {formData.image && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Current Image:</label>
                    <img src={`/${formData.image}`} alt="Current Blog Post" className="max-w-xs rounded-lg mb-2" />
                </div>
            )}
            <FileInput
                label="Replace Image"
                name="image"
                onChange={handleChange}
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
                Save Changes
            </button>
        </form>
    );
};

export default BlogForm;
