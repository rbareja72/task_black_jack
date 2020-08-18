export const shuffle = (arr) => {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

export const prepareDeck = () => {
  const cardValues = [
    {
      value: 11,
      display: 'A',
    },
    {
      value: 2,
      display: '2',
    },
    {
      value: 3,
      display: '3',
    },
    {
      value: 4,
      display: '4',
    },
    {
      value: 5,
      display: '5',
    },
    {
      value: 6,
      display: '6',
    },
    {
      value: 7,
      display: '7',
    },
    {
      value: 8,
      display: '8',
    },
    {
      value: 9,
      display: '9',
    },
    {
      value: 10,
      display: '10',
    },
    {
      value: 10,
      display: 'J',
    },
    {
      value: 10,
      display: 'Q',
    },
    {
      value: 10,
      display: 'K',
    },
  ];
  const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
  const deck = [];
  suits.forEach((suit) => {
    cardValues.forEach((card) => {
      deck.push({
        title: card.display + ' of ' + suit,
        suit,
        ...card,
      });
    });
  });
  return deck;
};

export const multiply = (array, multiplier) => {
  const newArray = [];
  array.forEach(item => {
    for (let i = 0; i < multiplier; i++) {
      newArray.push(item);
    }
  });
  return newArray;
};
