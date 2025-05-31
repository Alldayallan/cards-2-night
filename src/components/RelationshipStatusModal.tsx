import React from 'react';
import { Heart, X } from 'lucide-react';

interface RelationshipStatusModalProps {
  onSelectStatus: (status: string) => void;
  onClose: () => void;
}

const RelationshipStatusModal: React.FC<RelationshipStatusModalProps> = ({ onSelectStatus, onClose }) => {
  const statuses = ['Friends', 'Dating', 'Engaged', 'Married'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl transform animate-fadeIn">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-pink-400" />
            <h2 className="text-2xl font-bold">Relationship Status</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-pink-200 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <p className="text-pink-200 mb-6">
          What best describes your relationship? This will help us tailor the experience for you both.
        </p>
        
        <div className="grid grid-cols-1 gap-3">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => onSelectStatus(status)}
              className="bg-purple-700 hover:bg-pink-600 text-white py-3 px-4 rounded-lg transition-all text-left hover:transform hover:translate-x-1 flex items-center gap-3"
            >
              <Heart className="h-5 w-5 text-pink-400" />
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelationshipStatusModal;