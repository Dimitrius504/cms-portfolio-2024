import React from 'react';

const FileInput = ({ label, name, onChange }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file && file.type.startsWith('image/')) {
            onChange(e);
        } else {
            alert('Please select a valid image file (jpg, png, gif, etc.)');
            e.target.value = null;
        }
    };

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">{label}:</label>
            <input
                type="file"
                name={name}
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
        </div>
    );
};

export default FileInput;
