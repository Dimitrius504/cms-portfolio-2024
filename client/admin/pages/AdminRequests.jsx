import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/admin-requests');
        setRequests(response.data.requests);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch admin requests:', error);
        setError('Failed to fetch admin requests');
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const updateAdminStatus = async (adminId, status) => {
    try {
      const response = await axios.post('/api/update-admin-status', { adminId, status });
      console.log('API response:', response.data);
      setRequests(prevRequests => prevRequests.map(req =>
        req._id === adminId ? { ...req, adminRequested: status } : req
      ));
    } catch (error) {
      console.error('Failed to update admin status:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Admin Requests</h1>
      <ul>
        {requests.length > 0 ? requests.map(request => (
          <li key={request._id}>
            {request.firstName} {request.lastName} - {request.email}
            <button onClick={() => updateAdminStatus(request._id, 'CONFIRMED')}>Yes</button>
            <button onClick={() => updateAdminStatus(request._id, 'NO')}>No</button>
          </li>
        )) : <p>No admin requests pending.</p>}
      </ul>
    </div>
  );
}

export default AdminRequests;
