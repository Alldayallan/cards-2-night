import React, { useState, useEffect } from 'react';
import { Sword, Trophy, RotateCcw, Play, Heart, Menu } from 'lucide-react';
import Card from './components/Card';
import PlayerSection from './components/PlayerSection';
import { createDeck, shuffleDeck, dealCards } from './utils/deckUtils';
import GameOverModal from './components/GameOverModal';
import TopicSelector from './components/TopicSelector';
import { relationshipTopics } from './data/relationshipTopics';
import QuestionModal from './components/QuestionModal';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [player1Deck, setPlayer1Deck] = useState<string[]>([]);
  const [player2Deck, setPlayer2Deck] = useState<string[]>([]);
  const [player1Card, setPlayer1Card] = useState<string | null>(null);
  const [player2Card, setPlayer2Card] = useState<string | null>(null);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [roundWinner, setRoundWinner] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [roundCount, setRoundCount] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showTopicSelector, setShowTopicSelector] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [showQuestion, setShowQuestion] = useState(false);

  useEffect(() => {
    if (gameStarted && (player1Deck.length === 0 || player2Deck.length === 0)) {
      setGameOver(true);
      setWinner(player1Deck.length > 0 ? 'Player 1' : 'Player 2');
    }
  }, [player1Deck, player2Deck, gameStarted]);

  const openTopicSelector = () => {
    setShowTopicSelector(true);
  };

  const selectTopic = (topic: string) => {
    setSelectedTopic(topic);
    setShowTopicSelector(false);
    startGame();
  };

  const startGame = () => {
    const deck = createDeck();
    const shuffledDeck = shuffleDeck(deck);
    const { player1Cards, player2Cards } = dealCards(shuffledDeck);
    
    setPlayer1Deck(player1Cards);
    setPlayer2Deck(player2Cards);
    setPlayer1Card(null);
    setPlayer2Card(null);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setRoundWinner(null);
    setGameOver(false);
    setWinner(null);
    setRoundCount(0);
    setGameStarted(true);
  };

  const drawCards = () => {
    if (isDrawing || player1Deck.length === 0 || player2Deck.length === 0) return;
    
    setIsDrawing(true);
    setRoundCount(prev => prev + 1);
    
    const newPlayer1Deck = [...player1Deck];
    const newPlayer2Deck = [...player2Deck];
    
    const p1Card = newPlayer1Deck.shift() as string;
    const p2Card = newPlayer2Deck.shift() as string;
    
    setPlayer1Card(p1Card);
    setPlayer2Card(p2Card);
    
    setTimeout(() => {
      const p1Value = getCardValue(p1Card);
      const p2Value = getCardValue(p2Card);
      
      if (p1Value > p2Value) {
        setPlayer1Score(prev => prev + 1);
        setRoundWinner('Player 1');
        newPlayer1Deck.push(p1Card, p2Card);
        
        // Show a question for Player 1 to answer
        if (selectedTopic && relationshipTopics[selectedTopic]) {
          const questions = relationshipTopics[selectedTopic];
          const randomIndex = Math.floor(Math.random() * questions.length);
          setCurrentQuestion(questions[randomIndex]);
          setShowQuestion(true);
        }
      } else if (p2Value > p1Value) {
        setPlayer2Score(prev => prev + 1);
        setRoundWinner('Player 2');
        newPlayer2Deck.push(p1Card, p2Card);
        
        // Show a question for Player 2 to answer
        if (selectedTopic && relationshipTopics[selectedTopic]) {
          const questions = relationshipTopics[selectedTopic];
          const randomIndex = Math.floor(Math.random() * questions.length);
          setCurrentQuestion(questions[randomIndex]);
          setShowQuestion(true);
        }
      } else {
        // Tie - each player keeps their card
        newPlayer1Deck.push(p1Card);
        newPlayer2Deck.push(p2Card);
        setRoundWinner('Tie');
      }
      
      setPlayer1Deck(newPlayer1Deck);
      setPlayer2Deck(newPlayer2Deck);
      setIsDrawing(false);
    }, 1000);
  };

  const getCardValue = (card: string) => {
    const value = card.slice(0, -1);
    switch (value) {
      case 'A': return 14;
      case 'K': return 13;
      case 'Q': return 12;
      case 'J': return 11;
      default: return parseInt(value);
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setPlayer1Card(null);
    setPlayer2Card(null);
    setRoundWinner(null);
    setSelectedTopic(null);
  };

  const closeQuestionModal = () => {
    setShowQuestion(false);
    setCurrentQuestion(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-800 to-purple-950 text-white">
      <header className="py-6 text-center">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
          <Heart className="h-8 w-8 text-pink-400" />
          Couple's Connection
          <Heart className="h-8 w-8 text-pink-400" />
        </h1>
        <p className="mt-2 text-pink-200">Reconnect, rediscover, rekindle</p>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!gameStarted ? (
          <div className="max-w-md mx-auto bg-purple-900/60 rounded-xl p-8 shadow-lg backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4 text-center">Welcome to Couple's Connection!</h2>
            <p className="mb-6 text-pink-200">
              This card game helps couples reconnect and learn more about each other. Draw cards and answer relationship questions based on your chosen topic. The player with the higher card wins the round and gets to answer a question.
            </p>
            <div className="flex justify-center">
              <button
                onClick={openTopicSelector}
                className="flex items-center gap-2 bg-pink-600 hover:bg-pink-500 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Menu className="h-5 w-5" />
                Choose a Topic
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-full max-w-4xl">
              <div className="flex justify-between items-center mb-6">
                <div className="bg-purple-900/60 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <p className="text-lg">Round: <span className="font-bold">{roundCount}</span></p>
                </div>
                <div className="bg-purple-900/60 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <p className="text-lg">Topic: <span className="font-bold">{selectedTopic}</span></p>
                </div>
                <button
                  onClick={resetGame}
                  className="flex items-center gap-2 bg-purple-700 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-all"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <PlayerSection
                  playerName="Player 1"
                  cardsRemaining={player1Deck.length}
                  currentCard={player1Card}
                  score={player1Score}
                  isWinner={roundWinner === 'Player 1'}
                />
                
                <PlayerSection
                  playerName="Player 2"
                  cardsRemaining={player2Deck.length}
                  currentCard={player2Card}
                  score={player2Score}
                  isWinner={roundWinner === 'Player 2'}
                />
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  onClick={drawCards}
                  disabled={isDrawing || player1Deck.length === 0 || player2Deck.length === 0}
                  className={`flex items-center gap-2 bg-pink-600 hover:bg-pink-500 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg`}
                >
                  <Sword className="h-5 w-5" />
                  Draw Cards
                </button>
              </div>

              {roundWinner && (
                <div className="mt-6 text-center">
                  <p className="text-xl font-semibold">
                    {roundWinner === 'Tie' 
                      ? "It's a tie! Both players keep their cards." 
                      : `${roundWinner} wins this round and gets to answer a question!`}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {showTopicSelector && (
        <TopicSelector 
          topics={Object.keys(relationshipTopics)} 
          onSelectTopic={selectTopic} 
          onClose={() => setShowTopicSelector(false)} 
        />
      )}

      {showQuestion && currentQuestion && (
        <QuestionModal 
          question={currentQuestion} 
          winner={roundWinner} 
          onClose={closeQuestionModal} 
        />
      )}

      {gameOver && (
        <GameOverModal winner={winner} onRestart={() => setShowTopicSelector(true)} />
      )}

      <footer className="py-4 text-center text-pink-300 text-sm">
        <p>© 2023 Couple's Connection | Created with ❤️ for couples everywhere</p>
      </footer>
    </div>
  );
}

export default App;
