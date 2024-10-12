import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Home, MapPin, Users, BookOpen, Layers, UserCircle, FileText, Calendar, FileSignature } from 'lucide-react';
import LocationManagement from './components/LocationManagement';
import CandidateManagement from './components/CandidateManagement';
import CourseTypeManagement from './components/CourseTypeManagement';
import CoursesManagement from './components/CoursesManagement';
import UserManagement from './components/UserManagement';
import ExpertManagement from './components/ExpertManagement';
import EvaluationManagement from './components/EvaluationManagement';
import AllotmentManagement from './components/AllotmentManagement';
import Dashboard from './components/Dashboard';
import CourseManagement from './components/CourseManagement';
import TranscriptionGeneration from './components/TranscriptionGeneration';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar */}
        <nav className="bg-blue-600 text-white w-64 space-y-6 py-7 px-2">
          <div className="text-xl font-semibold text-center mb-6">TMS</div>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded">
                <Home size={20} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/locations" className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded">
                <MapPin size={20} />
                <span>Locations</span>
              </Link>
            </li>
            <li>
              <Link to="/candidates" className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded">
                <Users size={20} />
                <span>Candidates</span>
              </Link>
            </li>
            <li>
              <Link to="/course-types" className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded">
                <BookOpen size={20} />
                <span>Course Types</span>
              </Link>
            </li>
            <li>
              <Link to="/courses" className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded">
                <Layers size={20} />
                <span>Courses</span>
              </Link>
            </li>
            <li>
              <Link to="/users" className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded">
                <UserCircle size={20} />
                <span>Users</span>
              </Link>
            </li>
            <li>
              <Link to="/experts" className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded">
                <Users size={20} />
                <span>Experts</span>
              </Link>
            </li>
            <li>
              <Link to="/evaluations" className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded">
                <FileText size={20} />
                <span>Evaluations</span>
              </Link>
            </li>
            <li>
              <Link to="/allotments" className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded">
                <Calendar size={20} />
                <span>Allotments</span>
              </Link>
            </li>
            <li>
              <Link to="/transcriptions" className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded">
                <FileSignature size={20} />
                <span>Transcriptions</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Main content */}
        <main className="flex-1 p-10">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/locations" element={<LocationManagement />} />
            <Route path="/candidates" element={<CandidateManagement />} />
            <Route path="/course-types" element={<CourseTypeManagement />} />
            <Route path="/courses" element={<CourseManagement />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/experts" element={<ExpertManagement />} />
            <Route path="/evaluations" element={<EvaluationManagement />} />
            <Route path="/allotments" element={<AllotmentManagement />} />
            <Route path="/transcriptions" element={<TranscriptionGeneration />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;