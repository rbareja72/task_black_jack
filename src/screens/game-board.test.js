import 'react-native';
import React from 'react';
import { GameBoard } from './game-board';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { GameProvider, UserProvider } from '../providers';

describe('GameBoard', () => {

  const wrapper = shallow(
    <UserProvider.Provider>
      <GameProvider.Provider>
        <GameBoard />
      </GameProvider.Provider>
    </UserProvider.Provider>
  );

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

});

