import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layers, Edit, Trash2 } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  description: string;
  courseType: string;
}

const CoursesManagement: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [newCourse, setNewCourse] = useState({ name: '', description: '', courseType: '' });
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courseTypes, setCourseTypes] = useState<string[]>([]);

  useEffect(() => {
    fetchCourses();
    fetchCourseTypes();
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

  const fetchCourseTypes = async () => {
    try {
      const response = await axios.get('/api/course-types');
      setCourseTypes(Array.isArray(response.data) ? response.data.map((type: any) => type.name) : []);
    } catch (error) {
      console.error('Error fetching course types:', error);
      setCourseTypes([]);
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
      setNewCourse({ name: '', description: '', courseType: '' });
      setEditingCourse(null);
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setNewCourse({ name: course.name, description: course.description, courseType: course.courseType });
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
      <h2 className="text-2xl font-semibold">Courses Management</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">{editingCourse ? 'Edit Course' : 'Add New Course'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter course name"
              value={newCourse.name}
              onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              placeholder="Enter course description"
              value={newCourse.description}
              onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="courseType" className="block text-sm font-medium text-gray-700">Course Type</label>
            <select
              id="courseType"
              value={newCourse.courseType}
              onChange={(e) => setNewCourse({ ...newCourse, courseType: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            >
              <option value="">Select a course type</option>
              {courseTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            {editingCourse ? 'Update Course' : 'Add Course'}
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Course List</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center space-x-2 mb-2">
                <Layers size={20} className="text-blue-500" />
                <h3 className="font-semibold">{course.name}</h3>
              </div>
              <p className="text-gray-600 mb-2">{course.description}</p>
              <p className="text-sm text-blue-600 mb-4">Type: {course.courseType}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(course)}
                  className="flex items-center space-x-1 text-blue-500 hover:text-blue-700"
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
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

export default CoursesManagement;