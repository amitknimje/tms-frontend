import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, Edit, Trash2 } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  address: string;
}

const LocationManagement: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [newLocation, setNewLocation] = useState({ name: '', address: '' });
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get('/api/locations');
      setLocations(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setLocations([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingLocation) {
        await axios.put(`/api/locations/${editingLocation.id}`, newLocation);
      } else {
        await axios.post('/api/locations', newLocation);
      }
      fetchLocations();
      setNewLocation({ name: '', address: '' });
      setEditingLocation(null);
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };

  const handleEdit = (location: Location) => {
    setEditingLocation(location);
    setNewLocation({ name: location.name, address: location.address });
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/locations/${id}`);
      fetchLocations();
    } catch (error) {
      console.error('Error deleting location:', error);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Location Management</h2>
      
      <div className="card">
        <h3 className="card-title">{editingLocation ? 'Edit Location' : 'Add New Location'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="form-label">Location Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter location name"
              value={newLocation.name}
              onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
              className="form-input"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="form-label">Address</label>
            <input
              id="address"
              type="text"
              placeholder="Enter address"
              value={newLocation.address}
              onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            {editingLocation ? 'Update Location' : 'Add Location'}
          </button>
        </form>
      </div>

      <div className="card">
        <h3 className="card-title">Location List</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="table-header">Name</th>
                <th scope="col" className="table-header">Address</th>
                <th scope="col" className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {locations.map((location, index) => (
                <tr key={location.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="table-cell">{location.name}</td>
                  <td className="table-cell">{location.address}</td>
                  <td className="table-cell">
                    <button
                      onClick={() => handleEdit(location)}
                      className="action-button"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(location.id)}
                      className="action-button text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LocationManagement;