import React from 'react';
import Modal from 'react-modal';
import './style.css';

const ModalPersonalizado = ({ isOpen, onRequestClose, contentLabel, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto relative">
        <button 
          onClick={onRequestClose} 
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          X
        </button>
        {children}
      </div>
    </Modal>
  );
};

export default ModalPersonalizado;
