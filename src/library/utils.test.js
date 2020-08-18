import {
  shuffle,
  multiply,
  prepareDeck,
} from './utils';

describe('Utils test', () => {
  it('should prepare a deck of 52 cards', () => {
    const deck = prepareDeck();
    expect(deck.length).toBe(52);
    expect(deck.filter(card => card.suit === 'Hearts').length).toBe(13);
    expect(deck.filter(card => card.suit === 'Spades').length).toBe(13);
    expect(deck.filter(card => card.suit === 'Clubs').length).toBe(13);
    expect(deck.filter(card => card.suit === 'Diamonds').length).toBe(13);
  });
  it('should multiply occurrence of each element by the multiplier passed', () => {
    const array = [1, 2];
    const newArray = multiply(array, 2);
    expect(newArray.length).toBe(array.length * 2);
    expect(JSON.stringify(newArray)).toBe(JSON.stringify([1, 1, 2, 2]));
  });
  it('should shuffle element properly', () => {
    const array = [1, 2, 3, 4, 5];
    const newArray = shuffle(array);
    expect(JSON.stringify(newArray)).not.toBe(JSON.stringify(array));
  });
});
