import React, { useState } from 'react';
import { prepareDeck, multiply, shuffle } from '../library';

const useGame = () => {
  const [deck, setDeck] = useState([]);
  const [userTotal, setUserTotal] = useState(0);
  const [dealerTotal, setDealerTotal] = useState(0);
  const [userHand, setUserHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [hasUserWon, setHasUserWon] = useState(null);
  const [userGameTotal, setUserGameTotal] = useState(0);
  const [dealerGameTotal, setDealerGameTotal] = useState(0);
  const getRandomCard = () => {
    const randomIndex = Math.random() * deck.length;
    const newDeck = [...deck];
    const card = newDeck.splice(randomIndex, 1);
    setDeck(newDeck);
    return card[0];
  };
  const drawAtRandom = (user) => {
    if (user === 'user') {
      setUserHand([
        ...userHand,
        getRandomCard(),
      ]);
    } else {
      setDealerHand([
        ...dealerHand,
        getRandomCard(),
      ]);
    }
  };
  const resetGame = () => {
    setDeck(shuffle(multiply(prepareDeck(), 3)));
    setDealerTotal(0);
    setUserTotal(0);
    setUserHand([]);
    setDealerHand([]);
    setHasUserWon(null);
    setDealerGameTotal(0);
    setUserGameTotal(0);
  };
  const reveal = () => {
    const userScore = calculateScore(userHand);
    let dealerScore = 0;
    const dealerCards = [];
    const newDeck = [...deck];
    while (dealerScore <= 21 && dealerScore <= userScore) {
      const randomIndex = Math.random() * newDeck.length;
      const card = newDeck.splice(randomIndex, 1);
      dealerCards.push(card[0]);
      dealerScore = calculateScore(dealerCards);
    }
    setDeck(newDeck);
    setDealerHand(dealerCards);
    setUserTotal(userScore);
    setDealerTotal(dealerScore);
    setHasUserWon((() => {
      if (userScore <= 21 && dealerScore >= 21) {
        return true;
      } else if (userScore < 21 && (21 - dealerScore) > (21 - userScore)) {
        return true;
      } else {
        return false;
      }
    })());
  };
  const calculateScore = (hand) => {
    let score = 0;
    const aces = hand.filter(card => card.display === 'A');
    const others = hand.filter(card => card.display !== 'A');
    others.forEach(card => { score += card.value; });
    aces.forEach(card => {
      if (score < 21 && score + card.value < 21) {
        score += card.value;
      } else {
        score += 1;
      }
    });
    return score;
  };
  const clearHandsAndUpdateScore = () => {
    setDealerTotal(0);
    setUserTotal(0);
    setUserHand([]);
    setDealerHand([]);
    if (hasUserWon) {
      setUserGameTotal(userGameTotal + 1);
    } else {
      setDealerGameTotal(dealerGameTotal + 1);
    }
    setHasUserWon(null);
  };
  return {
    deck,
    userHand,
    userTotal,
    hasUserWon,
    dealerHand,
    dealerTotal,
    userGameTotal,
    dealerGameTotal,
    reveal,
    resetGame,
    drawAtRandom,
    clearHandsAndUpdateScore,
  };
};

export const Context = React.createContext();

export const Provider = (props) => {
  const value = useGame();
  return (
    <Context.Provider value={value} {...props} />
  );
};
