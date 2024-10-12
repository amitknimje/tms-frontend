import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Book, Edit, Trash2 } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  duration: string;
  courseType: string;
  description: string;
  expert: string;
  status: string;
}

const CourseManagement: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [newCourse, setNewCourse] = useState<Course>({
    id: '',
    name: '',
    duration: '',
    courseType: '',
    description: '',
    expert: '',
    status: ''
  });
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/courses');
      setCourses(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCourses([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        await axios.put(`/api/courses/${editingCourse.id}`, newCourse);
      } else {
        await axios.post('/api/courses', newCourse);
      }
      fetchCourses();
      setNewCourse({
        id: '',
        name: '',
        duration: '',
        courseType: '',
        description: '',
        expert: '',
        status: ''
      });
      setEditingCourse(null);
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setNewCourse(course);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/courses/${id}`);
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Course Management</h2>
      
      <div className="card">
        <h3 className="card-title">{editingCourse ? 'Edit Course' : 'Add New Course'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="form-label">Course Name</label>
              <input
                id="name"
                type="text"
                value={newCourse.name}
                onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="duration" className="form-label">Duration</label>
              <input
                id="duration"
                type="text"
                value={newCourse.duration}
                onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="courseType" className="form-label">Course Type</label>
              <input
                id="courseType"
                type="text"
                value={newCourse.courseType}
                onChange={(e) => setNewCourse({ ...newCourse, courseType: e.target.value })}
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="expert" className="form-label">Expert</label>
              <input
                id="expert"
                type="text"
                value={newCourse.expert}
                onChange={(e) => setNewCourse({ ...newCourse, expert: e.target.value })}
                className="form-input"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                value={newCourse.description}
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                className="form-input"
                rows={3}
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="status" className="form-label">Status</label>
              <select
                id="status"
                value={newCourse.status}
                onChange={(e) => setNewCourse({ ...newCourse, status: e.target.value })}
                className="form-input"
                required
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Upcoming">Upcoming</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn-primary">
              {editingCourse ? 'Update Course' : 'Add Course'}
            </button>
          </div>
        </form>
      </div>

      <div className="card">
        <h3 className="card-title">Course List</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="table-header">Name</th>
                <th scope="col" className="table-header">Duration</th>
                <th scope="col" className="table-header">Type</th>
                <th scope="col" className="table-header">Expert</th>
                <th scope="col" className="table-header">Status</th>
                <th scope="col" className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course, index) => (
                <tr key={course.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="table-cell">{course.name}</td>
                  <td className="table-cell">{course.duration}</td>
                  <td className="table-cell">{course.courseType}</td>
                  <td className="table-cell">{course.expert}</td>
                  <td className="table-cell">{course.status}</td>
                  <td className="table-cell">
                    <button
                      onClick={() => handleEdit(course)}
                      className="action-button"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
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

export default CourseManagement;