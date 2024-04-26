import React from 'react';

const AdminConv = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay fixed inset-0 bg-gray-800 opacity-75"></div>
      <div className="modal-container bg-gray-100 w-2/3 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div>
            <p>changer de titre</p>
            <p>ajouter membres</p>
            <p>supprimer membres</p>
            <p>supprimer conversation</p>
            <button
              onClick={onClose}
              className="modal-close-btn cursor-pointer z-50 mt-10 hover:bg-red-300 p-1 rounded-xl bg-red-100"
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
