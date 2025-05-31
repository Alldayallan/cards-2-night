import React from 'react';
import { Clock, X } from 'lucide-react';

interface RelationshipDurationModalProps {
  onSelectDuration: (duration: string) => void;
  onClose: () => void;
  relationshipStatus: string;
}

const RelationshipDurationModal: React.FC<RelationshipDurationModalProps> = ({ onSelectDuration, onClose, relationshipStatus }) => {
  const durations = [
    '1 day or just met',
    '1-6 months',
    '6 months - 1 year',
    '1-3 years',
    '3-5 years',
    '5-7 years',
    '7-10 years',
    '10+ years'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
      <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-xl p-6 md:p-8 max-w-lg w-full max-h-[90vh] shadow-2xl transform animate-fadeIn flex flex-col">
        <div className="flex justify-between items-center mb-4 md:mb-6 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Clock className="h-6 w-6 text-pink-400" />
            <h2 className="text-xl md:text-2xl font-bold">How Long Together?</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-pink-200 hover:text-white flex-shrink-0"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <p className="text-pink-200 mb-4 md:mb-6 flex-shrink-0">
          How long have you been {relationshipStatus.toLowerCase()}? This helps us suggest the most relevant questions.
        </p>
        
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 gap-3 pb-2">
          {durations.map((duration) => (
            <button
              key={duration}
              onClick={() => onSelectDuration(duration)}
              className="bg-purple-700 hover:bg-pink-600 text-white py-3 px-4 rounded-lg transition-all text-left hover:transform hover:translate-x-1 flex items-center gap-3 min-h-[3rem]"
            >
              <Clock className="h-5 w-5 text-pink-400 flex-shrink-0" />
              <span className="flex-1">{duration}</span>
            </button>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelationshipDurationModal;