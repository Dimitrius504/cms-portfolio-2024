import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminStatusPage = () => {
  const [currentStatus, setCurrentStatus] = useState('');
  const [details, setDetails] = useState('');
  const [employedSince, setEmployedSince] = useState('');
  const [statusLoaded, setStatusLoaded] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get('/api/status');
        console.log(response.data);

        if (response.data) {
          setCurrentStatus(response.data.currentStatus || '');
          setDetails(response.data.details || '');
          const employedDate = response.data.employedSince && response.data.employedSince.includes('T')
            ? response.data.employedSince.split('T')[0]
            : '';
          setEmployedSince(employedDate);
          setStatusLoaded(true);
        } else {
          throw new Error('No data returned from the API');
        }

        setStatusLoaded(true);
      } catch (error) {
        console.error('Error fetching status:', error);
        setStatusLoaded(true);
      }
    };

    fetchStatus();
  }, []);


  const handleUpdateStatus = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put('/api/status', {
        currentStatus,
        details,
        employedSince,
      });
      alert('Status updated successfully!');
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status.');
    }
  };

  if (!statusLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin: Update Status</h1>
      <form onSubmit={handleUpdateStatus} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Status</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={currentStatus}
            onChange={(e) => setCurrentStatus(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Details</label>
          <textarea
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Employed Since</label>
          <input
            type="date"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={employedSince}
            onChange={(e) => setEmployedSince(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Update Status
        </button>
      </form>
    </div>
  );
};

export default AdminStatusPage;
