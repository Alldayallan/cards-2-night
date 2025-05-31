// Create a standard deck of 52 cards
export const createDeck = (): string[] => {
  const suits = ['H', 'D', 'C', 'S']; // Hearts, Diamonds, Clubs, Spades
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const deck: string[] = [];
  
  for (const suit of suits) {
    for (const value of values) {
      deck.push(value + suit);
    }
  }
  
  return deck;
};

// Shuffle the deck using Fisher-Yates algorithm
export const shuffleDeck = (deck: string[]): string[] => {
  const shuffled = [...deck];
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
};

// Deal cards to two players
export const dealCards = (deck: string[]): { player1Cards: string[], player2Cards: string[] } => {
  const halfDeck = Math.floor(deck.length / 2);
  
  return {
    player1Cards: deck.slice(0, halfDeck),
    player2Cards: deck.slice(halfDeck)
  };
};
