import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen, Edit, Trash2 } from 'lucide-react';

interface CourseType {
  id: string;
  name: string;
  description: string;
}

const CourseTypeManagement: React.FC = () => {
  const [courseTypes, setCourseTypes] = useState<CourseType[]>([]);
  const [newCourseType, setNewCourseType] = useState({ name: '', description: '' });
  const [editingCourseType, setEditingCourseType] = useState<CourseType | null>(null);

  useEffect(() => {
    fetchCourseTypes();
  }, []);

  const fetchCourseTypes = async () => {
    try {
      const response = await axios.get('/api/course-types');
      setCourseTypes(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching course types:', error);
      setCourseTypes([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCourseType) {
        await axios.put(`/api/course-types/${editingCourseType.id}`, newCourseType);
      } else {
        await axios.post('/api/course-types', newCourseType);
      }
      fetchCourseTypes();
      setNewCourseType({ name: '', description: '' });
      setEditingCourseType(null);
    } catch (error) {
      console.error('Error saving course type:', error);
    }
  };

  const handleEdit = (courseType: CourseType) => {
    setEditingCourseType(courseType);
    setNewCourseType({ name: courseType.name, description: courseType.description });
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/course-types/${id}`);
      fetchCourseTypes();
    } catch (error) {
      console.error('Error deleting course type:', error);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Course Type Management</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">{editingCourseType ? 'Edit Course Type' : 'Add New Course Type'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter course type name"
              value={newCourseType.name}
              onChange={(e) => setNewCourseType({ ...newCourseType, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              placeholder="Enter course type description"
              value={newCourseType.description}
              onChange={(e) => setNewCourseType({ ...newCourseType, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            {editingCourseType ? 'Update Course Type' : 'Add Course Type'}
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Course Type List</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courseTypes.map((courseType) => (
            <div key={courseType.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center space-x-2 mb-2">
                <BookOpen size={20} className="text-blue-500" />
                <h3 className="font-semibold">{courseType.name}</h3>
              </div>
              <p className="text-gray-600 mb-4">{courseType.description}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(courseType)}
                  className="flex items-center space-x-1 text-blue-500 hover:text-blue-700"
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(courseType.id)}
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

export default CourseTypeManagement;