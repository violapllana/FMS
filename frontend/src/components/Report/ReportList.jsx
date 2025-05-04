import React, { useState, useEffect } from 'react';

const ReportList = () => {
  const [reports, setReports] = useState([]);

  // Simulimi i të dhënave të raporteve, mund të zëvendësohet me një API
  useEffect(() => {
    // Simulimi i të dhënave të raporteve
    setReports([
      { id: 1, title: 'Annual Faculty Report', date: '2025-04-01', status: 'Completed' },
      { id: 2, title: 'Student Enrollment Report', date: '2025-04-15', status: 'In Progress' },
      { id: 3, title: 'Research Activities Report', date: '2025-05-01', status: 'Pending' },
    ]);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Report List</h2>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id} className="border-b">
              <td className="p-2">{report.title}</td>
              <td className="p-2">{report.date}</td>
              <td className="p-2">{report.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportList;
