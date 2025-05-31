import React from 'react';
import { MessageCircle, X } from 'lucide-react';

interface QuestionModalProps {
  question: string;
  winner: string | null;
  onClose: () => void;
}

const QuestionModal: React.FC<QuestionModalProps> = ({ question, winner, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl transform animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-pink-400" />
            <h2 className="text-xl font-bold">{winner}'s Question</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-pink-200 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="bg-purple-700/50 rounded-lg p-6 mb-6">
          <p className="text-xl text-white">{question}</p>
        </div>
        
        <div className="flex justify-between">
          <p className="text-pink-200 text-sm">Take your time to answer thoughtfully</p>
          <button
            onClick={onClose}
            className="bg-pink-600 hover:bg-pink-500 text-white py-2 px-4 rounded-lg transition-all"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
