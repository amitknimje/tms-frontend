import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipboardList, Edit, Trash2, Upload } from 'lucide-react';

interface Evaluation {
  id: string;
  candidateName: string;
  courseName: string;
  courseType: string;
  location: string;
  date: string;
  status: string;
  marks: number;
}

const EvaluationManagement: React.FC = () => {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [newEvaluation, setNewEvaluation] = useState<Evaluation>({
    id: '',
    candidateName: '',
    courseName: '',
    courseType: '',
    location: '',
    date: '',
    status: '',
    marks: 0
  });
  const [editingEvaluation, setEditingEvaluation] = useState<Evaluation | null>(null);

  useEffect(() => {
    fetchEvaluations();
  }, []);

  const fetchEvaluations = async () => {
    try {
      const response = await axios.get('/api/evaluations');
      setEvaluations(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching evaluations:', error);
      setEvaluations([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingEvaluation) {
        await axios.put(`/api/evaluations/${editingEvaluation.id}`, newEvaluation);
      } else {
        await axios.post('/api/evaluations', newEvaluation);
      }
      fetchEvaluations();
      setNewEvaluation({
        id: '',
        candidateName: '',
        courseName: '',
        courseType: '',
        location: '',
        date: '',
        status: '',
        marks: 0
      });
      setEditingEvaluation(null);
    } catch (error) {
      console.error('Error saving evaluation:', error);
    }
  };

  const handleEdit = (evaluation: Evaluation) => {
    setEditingEvaluation(evaluation);
    setNewEvaluation(evaluation);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/evaluations/${id}`);
      fetchEvaluations();
    } catch (error) {
      console.error('Error deleting evaluation:', error);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('File selected:', file.name);
      // Implement file upload logic here
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Evaluation Management</h2>
      
      <div className="card">
        <h3 className="card-title">{editingEvaluation ? 'Edit Evaluation' : 'Add New Evaluation'}</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="candidateName" className="form-label">Candidate Name</label>
              <input
                id="candidateName"
                type="text"
                value={newEvaluation.candidateName}
                onChange={(e) => setNewEvaluation({ ...newEvaluation, candidateName: e.target.value })}
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="courseName" className="form-label">Course Name</label>
              <input
                id="courseName"
                type="text"
                value={newEvaluation.courseName}
                onChange={(e) => setNewEvaluation({ ...newEvaluation, courseName: e.target.value })}
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="courseType" className="form-label">Course Type</label>
              <input
                id="courseType"
                type="text"
                value={newEvaluation.courseType}
                onChange={(e) => setNewEvaluation({ ...newEvaluation, courseType: e.target.value })}
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="location" className="form-label">Location</label>
              <input
                id="location"
                type="text"
                value={newEvaluation.location}
                onChange={(e) => setNewEvaluation({ ...newEvaluation, location: e.target.value })}
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="date" className="form-label">Date</label>
              <input
                id="date"
                type="date"
                value={newEvaluation.date}
                onChange={(e) => setNewEvaluation({ ...newEvaluation, date: e.target.value })}
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="status" className="form-label">Status</label>
              <select
                id="status"
                value={newEvaluation.status}
                onChange={(e) => setNewEvaluation({ ...newEvaluation, status: e.target.value })}
                className="form-input"
                required
              >
                <option value="">Select Status</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Not Started">Not Started</option>
              </select>
            </div>
            <div>
              <label htmlFor="marks" className="form-label">Marks</label>
              <input
                id="marks"
                type="number"
                value={newEvaluation.marks}
                onChange={(e) => setNewEvaluation({ ...newEvaluation, marks: Number(e.target.value) })}
                className="form-input"
                required
                min="0"
                max="100"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn-primary w-full md:w-auto">
              {editingEvaluation ? 'Update Evaluation' : 'Add Evaluation'}
            </button>
          </div>
        </form>
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h3 className="card-title">Evaluation List</h3>
          <div>
            <input
              type="file"
              id="fileUpload"
              className="hidden"
              onChange={handleFileUpload}
              accept=".xlsx,.xls"
            />
            <label
              htmlFor="fileUpload"
              className="btn-primary flex items-center cursor-pointer"
            >
              <Upload size={16} className="mr-2" />
              Upload Excel
            </label>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="table-header">Candidate</th>
                <th scope="col" className="table-header">Course</th>
                <th scope="col" className="table-header">Type</th>
                <th scope="col" className="table-header">Location</th>
                <th scope="col" className="table-header">Date</th>
                <th scope="col" className="table-header">Status</th>
                <th scope="col" className="table-header">Marks</th>
                <th scope="col" className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {evaluations.map((evaluation, index) => (
                <tr key={evaluation.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="table-cell">{evaluation.candidateName}</td>
                  <td className="table-cell">{evaluation.courseName}</td>
                  <td className="table-cell">{evaluation.courseType}</td>
                  <td className="table-cell">{evaluation.location}</td>
                  <td className="table-cell">{evaluation.date}</td>
                  <td className="table-cell">{evaluation.status}</td>
                  <td className="table-cell">{evaluation.marks}</td>
                  <td className="table-cell">
                    <button
                      onClick={() => handleEdit(evaluation)}
                      className="action-button"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(evaluation.id)}
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

export default EvaluationManagement;