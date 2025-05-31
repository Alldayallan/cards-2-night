import React from 'react';

interface CardProps {
  card: string | null;
  isRevealed?: boolean;
  isWinner?: boolean;
}

const Card: React.FC<CardProps> = ({ card, isRevealed = true, isWinner = false }) => {
  if (!card) {
    return (
      <div className="w-32 h-44 bg-emerald-900/40 rounded-lg border-2 border-emerald-700/50 flex items-center justify-center shadow-lg">
        <p className="text-emerald-500 text-opacity-50 text-lg">No Card</p>
      </div>
    );
  }

  const suit = card.slice(-1);
  const value = card.slice(0, -1);
  
  const getSuitColor = () => {
    return suit === '♥' || suit === '♦' ? 'text-red-500' : 'text-slate-800';
  };
  
  const getSuitSymbol = () => {
    switch (suit) {
      case 'H': return '♥';
      case 'D': return '♦';
      case 'C': return '♣';
      case 'S': return '♠';
      default: return suit;
    }
  };

  const getCardValue = () => {
    switch (value) {
      case 'A': return 'A';
      case 'K': return 'K';
      case 'Q': return 'Q';
      case 'J': return 'J';
      default: return value;
    }
  };

  return (
    <div 
      className={`w-32 h-44 rounded-lg shadow-xl transition-all duration-300 transform ${
        isRevealed ? 'rotate-0' : 'rotate-180'
      } ${
        isWinner ? 'scale-110 ring-4 ring-yellow-400 ring-opacity-70' : ''
      }`}
    >
      {isRevealed ? (
        <div className="w-full h-full bg-white rounded-lg p-2 flex flex-col">
          <div className="flex justify-between items-start">
            <div className={`text-xl font-bold ${getSuitColor()}`}>{getCardValue()}</div>
            <div className={`text-xl ${getSuitColor()}`}>{getSuitSymbol()}</div>
          </div>
          <div className="flex-grow flex items-center justify-center">
            <div className={`text-4xl ${getSuitColor()}`}>{getSuitSymbol()}</div>
          </div>
          <div className="flex justify-between items-end">
            <div className={`text-xl ${getSuitColor()}`}>{getSuitSymbol()}</div>
            <div className={`text-xl font-bold ${getSuitColor()}`}>{getCardValue()}</div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-lg flex items-center justify-center">
          <div className="w-20 h-32 rounded-lg border-4 border-emerald-400 border-opacity-30 flex items-center justify-center">
            <div className="text-3xl text-emerald-300 opacity-50">♠♥♦♣</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
