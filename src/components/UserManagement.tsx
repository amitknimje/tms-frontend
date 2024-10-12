import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Edit, Trash2, Upload } from 'lucide-react';

interface UserData {
  id: string;
  candidateName: string;
  candidateAge: number;
  departmentName: string;
  idProofNo: string;
  mobileNumber: string;
  email: string;
  role: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [newUser, setNewUser] = useState<UserData>({
    id: '',
    candidateName: '',
    candidateAge: 0,
    departmentName: '',
    idProofNo: '',
    mobileNumber: '',
    email: '',
    role: ''
  });
  const [editingUser, setEditingUser] = useState<UserData | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await axios.put(`/api/users/${editingUser.id}`, newUser);
      } else {
        await axios.post('/api/users', newUser);
      }
      fetchUsers();
      setNewUser({
        id: '',
        candidateName: '',
        candidateAge: 0,
        departmentName: '',
        idProofNo: '',
        mobileNumber: '',
        email: '',
        role: ''
      });
      setEditingUser(null);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleEdit = (user: UserData) => {
    setEditingUser(user);
    setNewUser(user);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">User Management</h2>
      
      <div className="card">
        <h3 className="card-title">{editingUser ? 'Edit User' : 'Add New User'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="candidateName" className="form-label">Candidate Name</label>
            <input
              id="candidateName"
              type="text"
              value={newUser.candidateName}
              onChange={(e) => setNewUser({ ...newUser, candidateName: e.target.value })}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="candidateAge" className="form-label">Age</label>
            <input
              id="candidateAge"
              type="number"
              value={newUser.candidateAge}
              onChange={(e) => setNewUser({ ...newUser, candidateAge: parseInt(e.target.value) })}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="departmentName" className="form-label">Department</label>
            <input
              id="departmentName"
              type="text"
              value={newUser.departmentName}
              onChange={(e) => setNewUser({ ...newUser, departmentName: e.target.value })}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="idProofNo" className="form-label">ID Proof No</label>
            <input
              id="idProofNo"
              type="text"
              value={newUser.idProofNo}
              onChange={(e) => setNewUser({ ...newUser, idProofNo: e.target.value })}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
            <input
              id="mobileNumber"
              type="tel"
              value={newUser.mobileNumber}
              onChange={(e) => setNewUser({ ...newUser, mobileNumber: e.target.value })}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role" className="form-label">Role</label>
            <input
              id="role"
              type="text"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            {editingUser ? 'Update User' : 'Add User'}
          </button>
        </form>
      </div>

      {/* User list table remains unchanged */}
    </div>
  );
};

export default UserManagement;