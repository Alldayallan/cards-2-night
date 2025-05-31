import React from 'react';
import { Trophy, RotateCcw } from 'lucide-react';

interface GameOverModalProps {
  winner: string | null;
  onRestart: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ winner, onRestart }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-emerald-800 to-emerald-900 rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl transform animate-fadeIn">
        <div className="flex flex-col items-center">
          <div className="bg-yellow-500 rounded-full p-4 mb-4">
            <Trophy className="h-10 w-10 text-emerald-900" />
          </div>
          <h2 className="text-3xl font-bold mb-2 text-center">Game Over!</h2>
          <p className="text-xl mb-6 text-center text-emerald-100">
            {winner} has won the game!
          </p>
          
          <div className="w-full h-1 bg-emerald-700 mb-6"></div>
          
          <p className="text-emerald-200 mb-6 text-center">
            Congratulations to the winner! Would you like to play again?
          </p>
          
          <button
            onClick={onRestart}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <RotateCcw className="h-5 w-5" />
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
