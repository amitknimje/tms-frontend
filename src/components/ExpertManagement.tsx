import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Edit, Trash2 } from 'lucide-react';

interface Expert {
  id: string;
  name: string;
  email: string;
  specialization: string;
}

const ExpertManagement: React.FC = () => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [newExpert, setNewExpert] = useState({ name: '', email: '', specialization: '' });
  const [editingExpert, setEditingExpert] = useState<Expert | null>(null);

  useEffect(() => {
    fetchExperts();
  }, []);

  const fetchExperts = async () => {
    try {
      const response = await axios.get('/api/experts');
      setExperts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching experts:', error);
      setExperts([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingExpert) {
        await axios.put(`/api/experts/${editingExpert.id}`, newExpert);
      } else {
        await axios.post('/api/experts', newExpert);
      }
      fetchExperts();
      setNewExpert({ name: '', email: '', specialization: '' });
      setEditingExpert(null);
    } catch (error) {
      console.error('Error saving expert:', error);
    }
  };

  const handleEdit = (expert: Expert) => {
    setEditingExpert(expert);
    setNewExpert({ name: expert.name, email: expert.email, specialization: expert.specialization });
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/experts/${id}`);
      fetchExperts();
    } catch (error) {
      console.error('Error deleting expert:', error);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Expert Management</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">{editingExpert ? 'Edit Expert' : 'Add New Expert'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter expert name"
              value={newExpert.name}
              onChange={(e) => setNewExpert({ ...newExpert, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter email address"
              value={newExpert.email}
              onChange={(e) => setNewExpert({ ...newExpert, email: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">Specialization</label>
            <input
              id="specialization"
              type="text"
              placeholder="Enter specialization"
              value={newExpert.specialization}
              onChange={(e) => setNewExpert({ ...newExpert, specialization: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            {editingExpert ? 'Update Expert' : 'Add Expert'}
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Expert List</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {experts.map((expert) => (
            <div key={expert.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center space-x-2 mb-2">
                <User size={20} className="text-blue-500" />
                <h3 className="font-semibold">{expert.name}</h3>
              </div>
              <p className="text-gray-600">{expert.email}</p>
              <p className="text-gray-600 mb-4">Specialization: {expert.specialization}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(expert)}
                  className="flex items-center space-x-1 text-blue-500 hover:text-blue-700"
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(expert.id)}
                  className="flex items-center space-x-1 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpertManagement;