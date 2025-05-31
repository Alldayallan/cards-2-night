import React from 'react';
import { X } from 'lucide-react';

interface TopicSelectorProps {
  topics: string[];
  onSelectTopic: (topic: string) => void;
  onClose: () => void;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ topics, onSelectTopic, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl transform animate-fadeIn">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Choose a Topic</h2>
          <button 
            onClick={onClose}
            className="text-pink-200 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <p className="text-pink-200 mb-6">
          Select a topic to explore with your partner. Each topic contains questions that will help you connect on a deeper level.
        </p>
        
        <div className="grid grid-cols-1 gap-3">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => onSelectTopic(topic)}
              className="bg-purple-700 hover:bg-pink-600 text-white py-3 px-4 rounded-lg transition-all text-left hover:transform hover:translate-x-1"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicSelector;
