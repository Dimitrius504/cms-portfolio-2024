import React, { useState, useEffect, useRef } from 'react';

const BioForm = ({ bio, onSubmit }) => {
    const [formData, setFormData] = useState({
        summary: bio.summary || '',
    });

    const textareaRef = useRef(null);

    useEffect(() => {
        setFormData({
            summary: bio.summary || '',
        });

        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [bio]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ summary: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Summary:</label>
                <textarea
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    required
                    ref={textareaRef}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md resize-none overflow-hidden"
                    style={{ minHeight: '100px' }}
                />
            </div>
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
                Save Changes
            </button>
        </form>
    );
};

export default BioForm;
