import React from 'react';
import Card from './Card';
import { User } from 'lucide-react';

interface PlayerSectionProps {
  playerName: string;
  cardsRemaining: number;
  currentCard: string | null;
  score: number;
  isWinner: boolean;
}

const PlayerSection: React.FC<PlayerSectionProps> = ({
  playerName,
  cardsRemaining,
  currentCard,
  score,
  isWinner
}) => {
  return (
    <div className={`bg-emerald-900/40 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 ${
      isWinner ? 'ring-2 ring-yellow-400' : ''
    }`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-emerald-700 rounded-full p-2">
          <User className="h-6 w-6 text-emerald-200" />
        </div>
        <h2 className="text-xl font-bold">{playerName}</h2>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="mb-4 flex flex-col items-center">
          <Card card={currentCard} isWinner={isWinner} />
          <div className="mt-4 flex gap-4">
            <div className="bg-emerald-800/70 rounded-lg px-3 py-1">
              <p className="text-sm text-emerald-200">Cards</p>
              <p className="text-xl font-bold">{cardsRemaining}</p>
            </div>
            <div className="bg-emerald-800/70 rounded-lg px-3 py-1">
              <p className="text-sm text-emerald-200">Score</p>
              <p className="text-xl font-bold">{score}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerSection;
