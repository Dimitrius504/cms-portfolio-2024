import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextInput from './Blog/TextInput';
import TextArea from './Blog/TextArea';
import FileInput from './Blog/FileInput';
import { useUser } from '../../src/context/UserContext';
import { useNavigate } from 'react-router-dom';

const NewBlogPost = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author: '',
        tags: '',
        image: null,
    });

    useEffect(() => {
        if (user) {
            setFormData((prevData) => ({
                ...prevData,
                author: `${user.user.firstName} ${user.user.lastName}`,
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const response = await axios.post('/api/blog', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Blog post created:', response.data);
            navigate(`/blog/post/${response.data._id}`);
        } catch (error) {
            console.error('Error creating blog post:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto p-4 border rounded">
            <TextInput label="Title" name="title" value={formData.title} onChange={handleChange} required />
            <TextArea label="Content" name="content" value={formData.content} onChange={handleChange} required />
            <TextInput label="Author" name="author" value={formData.author} onChange={handleChange} required disabled />
            <TextInput label="Tags" name="tags" value={formData.tags} onChange={handleChange} />
            <FileInput label="Image" name="image" onChange={handleChange} />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Create Blog Post</button>
        </form>
    );
};

export default NewBlogPost;
