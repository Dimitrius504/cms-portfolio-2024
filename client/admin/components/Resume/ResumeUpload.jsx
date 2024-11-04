import React, { useState } from 'react';
import axios from 'axios';

export default function ResumeUpload() {
    const [file, setFile] = useState(null);

    const onFileChange = (event) => {
        setFile(event.target.files[0]); // Set the selected file
    };

    const onFileUpload = async () => {
        const formData = new FormData();
        formData.append("resume", file);

        try {
            // Fetching the pre-signed URL from express server
            const urlResponse = await axios.get('http://localhost:5000/api/s3');
            const { url } = urlResponse.data;

            // Uploading the file to S3 using the pre-signed URL
            const result = await axios.put(url, file, {
                headers: {
                    'Content-Type': file.type
                }
            });
            console.log('File Successfully uploaded', result.data);
        } catch (error) {
            console.error('Error uploading the file:', error);
        }
    };

    return (
        <div>
            <h1>Upload Your Resume</h1>
            <input type="file" onChange={onFileChange} />
            <button onClick={onFileUpload}>
                Upload!
            </button>
        </div>
    );
}
