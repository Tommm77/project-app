import React from 'react';

const AdminConv = ({ isOpen, onClose, children, ConvInfo }) => {
  if (!isOpen) return null;

  const deleteElement = async () => {
    const id = ConvInfo._id;
    const token = localStorage.getItem('token');
    console.log(id);

    try {
      const response = await fetch(`http://localhost:3001/api/v1/conv/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('La suppression de l\'élément a échoué.');
      }
  
      console.log('Élément supprimé avec succès.');
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'élément:', error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay fixed inset-0 bg-gray-800 opacity-75"></div>
      <div className="modal-container bg-gray-100 w-2/3 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="grid gap-3">
            <button className="hover:bg-gray-300 p-1 rounded-lg">changer de titre</button>
            <button className="hover:bg-gray-300 p-1 rounded-lg">ajouter membres</button>
            <button className="hover:bg-red-300 p-1 rounded-lg bg-red-100">supprimer membres</button>
            <button className="hover:bg-red-300 p-1 rounded-lg bg-red-100" onClick={deleteElement}>supprimer conversation</button>
            <button
              onClick={onClose}
              className="modal-close-btn cursor-pointer z-50 mt-4 hover:bg-red-300 p-1 rounded-lg bg-red-100"
            >
              Close
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminConv;
