import React, { useState, useEffect } from 'react';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  // Simulimi i të dhënave të takimeve, mund të zëvendësohet me një API
  useEffect(() => {
    // Simulimi i të dhënave të takimeve
    setAppointments([
      { id: 1, patient: 'John Doe', date: '2025-05-10', status: 'Confirmed' },
      { id: 2, patient: 'Jane Smith', date: '2025-05-12', status: 'Pending' },
      { id: 3, patient: 'Mark Johnson', date: '2025-05-15', status: 'Canceled' },
    ]);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Appointment List</h2>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Patient</th>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id} className="border-b">
              <td className="p-2">{appointment.patient}</td>
              <td className="p-2">{appointment.date}</td>
              <td className="p-2">{appointment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;
