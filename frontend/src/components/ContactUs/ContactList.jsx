import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ContactPanel() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

const apiUrl = 'http://localhost:5000/contact/all';
const apiUrlDelete = 'http://localhost:5000/contact';


  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiUrl);
      setContacts(response.data);
    } catch (error) {
      console.error('Gabim në marrjen e kontakteve:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrlDelete}/${contactToDelete}`);
      fetchContacts();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Gabim gjatë fshirjes së kontaktit:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-blue-800">Contact Messages</h2>

      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
        <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Phone</th>
            <th className="px-6 py-3">Reason</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center py-6">
                Loading messages...
              </td>
            </tr>
          ) : contacts.length > 0 ? (
            contacts.map((contact) => (
              <tr key={contact.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{contact.firstName} {contact.lastName}</td>
                <td className="px-6 py-4">{contact.email}</td>
                <td className="px-6 py-4">{contact.phoneNumber}</td>
                <td className="px-6 py-4">{contact.reason}</td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => {
                      setSelectedContact(contact);
                      setShowDetailsModal(true);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => {
                 setContactToDelete(contact._id); 
                      setShowDeleteModal(true);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-6">
                No messages found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-semibold">Are you sure you want to delete this message?</h3>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[500px]">
            <h3 className="text-xl font-bold mb-4 text-blue-700">Contact Details</h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>Name:</strong> {selectedContact.firstName} {selectedContact.lastName}</p>
              <p><strong>Email:</strong> {selectedContact.email}</p>
              <p><strong>Phone:</strong> {selectedContact.phoneNumber}</p>
              <p><strong>Reason:</strong> {selectedContact.reason}</p>
              <p><strong>Message:</strong> {selectedContact.messageContent}</p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
