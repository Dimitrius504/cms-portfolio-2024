// components/TextInput.jsx
import React from 'react';

const TextInput = ({ label, name, value, onChange, required = false, disabled = false }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">{label}:</label>
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
    </div>
);

export default TextInput;
