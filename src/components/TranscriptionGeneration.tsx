import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FileText, Download, Printer } from 'lucide-react';

interface Transcription {
  id: string;
  candidateName: string;
  course: string;
  courseType: string;
  duration: string;
  certificateStatus: string;
}

const TranscriptionGeneration: React.FC = () => {
  const [transcriptions, setTranscriptions] = useState<Transcription[]>([]);
  const [newTranscription, setNewTranscription] = useState<Transcription>({
    id: '',
    candidateName: '',
    course: '',
    courseType: '',
    duration: '',
    certificateStatus: ''
  });

  useEffect(() => {
    fetchTranscriptions();
  }, []);

  const fetchTranscriptions = async () => {
    try {
      const response = await axios.get('/api/transcriptions');
      setTranscriptions(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching transcriptions:', error);
      setTranscriptions([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/transcriptions', newTranscription);
      fetchTranscriptions();
      setNewTranscription({
        id: '',
        candidateName: '',
        course: '',
        courseType: '',
        duration: '',
        certificateStatus: ''
      });
    } catch (error) {
      console.error('Error saving transcription:', error);
    }
  };

  const handleDownload = (id: string) => {
    // Implement download logic here
    console.log('Downloading transcription:', id);
  };

  const handlePrint = (id: string) => {
    // Implement print logic here
    console.log('Printing transcription:', id);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Transcription Generation</h2>
      
      <div className="card">
        <h3 className="card-title">Generate New Transcription</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="candidateName" className="form-label">Candidate Name</label>
            <input
              id="candidateName"
              type="text"
              value={newTranscription.candidateName}
              onChange={(e) => setNewTranscription({ ...newTranscription, candidateName: e.target.value })}
              className="form-input"
              required
            />
          </div>
          <div>
            <label htmlFor="course" className="form-label">Course</label>
            <input
              id="course"
              type="text"
              value={newTranscription.course}
              onChange={(e) => setNewTranscription({ ...newTranscription, course: e.target.value })}
              className="form-input"
              required
            />
          </div>
          <div>
            <label htmlFor="courseType" className="form-label">Course Type</label>
            <input
              id="courseType"
              type="text"
              value={newTranscription.courseType}
              onChange={(e) => setNewTranscription({ ...newTranscription, courseType: e.target.value })}
              className="form-input"
              required
            />
          </div>
          <div>
            <label htmlFor="duration" className="form-label">Duration</label>
            <input
              id="duration"
              type="text"
              value={newTranscription.duration}
              onChange={(e) => setNewTranscription({ ...newTranscription, duration: e.target.value })}
              className="form-input"
              required
            />
          </div>
          <div>
            <label htmlFor="certificateStatus" className="form-label">Certificate Status</label>
            <select
              id="certificateStatus"
              value={newTranscription.certificateStatus}
              onChange={(e) => setNewTranscription({ ...newTranscription, certificateStatus: e.target.value })}
              className="form-select"
              required
            >
              <option value="">Select Status</option>
              <option value="Issued">Issued</option>
              <option value="Pending">Pending</option>
              <option value="Not Applicable">Not Applicable</option>
            </select>
          </div>
          <button type="submit" className="btn-primary">
            Generate Transcription
          </button>
        </form>
      </div>

      <div className="card">
        <h3 className="card-title">Transcription List</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="table-header">Candidate Name</th>
                <th scope="col" className="table-header">Course</th>
                <th scope="col" className="table-header">Course Type</th>
                <th scope="col" className="table-header">Duration</th>
                <th scope="col" className="table-header">Certificate Status</th>
                <th scope="col" className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transcriptions.map((transcription, index) => (
                <tr key={transcription.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="table-cell">{transcription.candidateName}</td>
                  <td className="table-cell">{transcription.course}</td>
                  <td className="table-cell">{transcription.courseType}</td>
                  <td className="table-cell">{transcription.duration}</td>
                  <td className="table-cell">{transcription.certificateStatus}</td>
                  <td className="table-cell">
                    <button
                      onClick={() => handleDownload(transcription.id)}
                      className="action-button"
                    >
                      <Download size={16} />
                    </button>
                    <button
                      onClick={() => handlePrint(transcription.id)}
                      className="action-button"
                    >
                      <Printer size={16} />
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

export default TranscriptionGeneration;