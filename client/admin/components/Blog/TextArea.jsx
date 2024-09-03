import React, { useRef, useEffect } from 'react';

const TextArea = ({ label, name, value, onChange, required = false }) => {
    const textAreaRef = useRef(null);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [value]);

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">{label}:</label>
            <textarea
                ref={textAreaRef}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
                style={{ overflow: 'hidden' }}
            />
        </div>
    );
};

export default TextArea;
