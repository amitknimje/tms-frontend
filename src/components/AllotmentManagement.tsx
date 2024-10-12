import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Edit, Trash2 } from 'lucide-react';

interface Allotment {
  id: string;
  candidateName: string;
  courseName: string;
  courseType: string;
  expert: string;
  startDate: string;
  endDate: string;
  location: string;
}

const AllotmentManagement: React.FC = () => {
  const [allotments, setAllotments] = useState<Allotment[]>([]);
  const [newAllotment, setNewAllotment] = useState<Allotment>({
    id: '',
    candidateName: '',
    courseName: '',
    courseType: '',
    expert: '',
    startDate: '',
    endDate: '',
    location: ''
  });
  const [editingAllotment, setEditingAllotment] = useState<Allotment | null>(null);

  useEffect(() => {
    fetchAllotments();
  }, []);

  const fetchAllotments = async () => {
    try {
      const response = await axios.get('/api/allotments');
      setAllotments(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching allotments:', error);
      setAllotments([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingAllotment) {
        await axios.put(`/api/allotments/${editingAllotment.id}`, newAllotment);
      } else {
        await axios.post('/api/allotments', newAllotment);
      }
      fetchAllotments();
      setNewAllotment({
        id: '',
        candidateName: '',
        courseName: '',
        courseType: '',
        expert: '',
        startDate: '',
        endDate: '',
        location: ''
      });
      setEditingAllotment(null);
    } catch (error) {
      console.error('Error saving allotment:', error);
    }
  };

  const handleEdit = (allotment: Allotment) => {
    setEditingAllotment(allotment);
    setNewAllotment(allotment);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/allotments/${id}`);
      fetchAllotments();
    } catch (error) {
      console.error('Error deleting allotment:', error);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Course Allotment Management</h2>
      
      <div className="card">
        <h3 className="card-title">{editingAllotment ? 'Edit Allotment' : 'Add New Allotment'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="candidateName" className="form-label">Candidate Name</label>
              <input
                id="candidateName"
                type="text"
                value={newAllotment.candidateName}
                onChange={(e) => setNewAllotment({ ...newAllotment, candidateName: e.target.value })}
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="courseName" className="form-label">Course Name</label>
              <input
                id="courseName"
                type="text"
                value={newAllotment.courseName}
                onChange={(e) => setNewAllotment({ ...newAllotment, courseName: e.target.value })}
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="courseType" className="form-label">Course Type</label>
              <input
                id="courseType"
                type="text"
                value={newAllotment.courseType}
                onChange={(e) => setNewAllotment({ ...newAllotment, courseType: e.target.value })}
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="expert" className="form-label">Expert</label>
              <input
                id="expert"
                type="text"
                value={newAllotment.expert}
                onChange={(e) => setNewAllotment({ ...newAllotment, expert: e.target.value })}
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="startDate" className="form-label">Start Date</label>
              <input
                id="startDate"
                type="date"
                value={newAllotment.startDate}
                onChange={(e) => setNewAllotment({ ...newAllotment, startDate: e.target.value })}
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="endDate" className="form-label">End Date</label>
              <input
                id="endDate"
                type="date"
                value={newAllotment.endDate}
                onChange={(e) => setNewAllotment({ ...newAllotment, endDate: e.target.value })}
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="location" className="form-label">Location</label>
              <input
                id="location"
                type="text"
                value={newAllotment.location}
                onChange={(e) => setNewAllotment({ ...newAllotment, location: e.target.value })}
                className="form-input"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn-primary">
              {editingAllotment ? 'Update Allotment' : 'Add Allotment'}
            </button>
          </div>
        </form>
      </div>

      <div className="card">
        <h3 className="card-title">Allotment List</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="table-header">Candidate Name</th>
                <th scope="col" className="table-header">Course Name</th>
                <th scope="col" className="table-header">Course Type</th>
                <th scope="col" className="table-header">Expert</th>
                <th scope="col" className="table-header">Start Date</th>
                <th scope="col" className="table-header">End Date</th>
                <th scope="col" className="table-header">Location</th>
                <th scope="col" className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allotments.map((allotment, index) => (
                <tr key={allotment.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="table-cell">{allotment.candidateName}</td>
                  <td className="table-cell">{allotment.courseName}</td>
                  <td className="table-cell">{allotment.courseType}</td>
                  <td className="table-cell">{allotment.expert}</td>
                  <td className="table-cell">{allotment.startDate}</td>
                  <td className="table-cell">{allotment.endDate}</td>
                  <td className="table-cell">{allotment.location}</td>
                  <td className="table-cell">
                    <button
                      onClick={() => handleEdit(allotment)}
                      className="action-button"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(allotment.id)}
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

export default AllotmentManagement;