import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Modal, FlatList } from 'react-native';
import { UserProvider, GameProvider } from '../providers';
import { Button } from '../components/button';
import { en } from '../assets/locale';
import colors from './../assets/colors';

import scaling from '../config/device/normalize';
const {
  normalize,
  widthScale,
  heightScale,
  moderateScale,
} = scaling;

export const GameBoard = () => {
  const [showModal, setShowModal] = React.useState(false);
  const user = React.useContext(UserProvider.Context);
  const game = React.useContext(GameProvider.Context);
  const {
    deck,
    userHand,
    drawAtRandom,
    reveal,
    hasUserWon,
    dealerHand,
    userTotal,
    dealerTotal,
    resetGame,
    clearHandsAndUpdateScore,
    userGameTotal,
    dealerGameTotal,
  } = game;
  useEffect(() => {
    if (hasUserWon || hasUserWon === false) {
      setShowModal(true);
    }
  }, [hasUserWon]);
  const onDraw = () => drawAtRandom('user');
  const onReveal = () => { reveal(); };
  const onRequestClose = () => setShowModal(false);
  const renderListItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.paragraph}>
        {item.title}
      </Text>
    </View>
  );
  const onNewPress = () => {
    onRequestClose();
    resetGame();
  };
  const onContinuePress = () => {
    onRequestClose();
    clearHandsAndUpdateScore();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{en.WELCOME + ', ' + user.user}</Text>
      <Text style={styles.subTitle}>{en.TOTAL_CARDS + ': ' + deck.length}</Text>
      <Text style={styles.subTitle}>{en.YOUR_HAND + ': ' + userHand.length}</Text>
      <Text style={styles.paragraph}>{en.RULES}</Text>
      {
        userGameTotal || dealerGameTotal
          ?
          <>
            <Text style={styles.subTitle}>
              {en.WON + ': ' + userGameTotal}
            </Text>
            <Text style={styles.subTitle}>
              {en.LOST + ': ' + dealerGameTotal}
            </Text>
          </>
          : null
      }
      <Button
        testID={'draw'}
        isDisabled={userHand.length > 20 || deck.length < 21}
        title={en.DRAW}
        onPress={onDraw}
        buttonStyle={styles.drawButton}
      />
      <Button
        testID={'reveal'}
        isDisabled={!userHand.length}
        title={en.REVEAL}
        onPress={onReveal}
        buttonStyle={styles.drawButton}
      />
      <Modal testID={'modal'} transparent visible={showModal} onRequestClose={onRequestClose} animated animationType={'slide'}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{hasUserWon ? en.YOU_WIN : en.YOU_LOSE}</Text>
          <Text style={styles.subTitle}>{en.YOUR_HAND + ': ' + userTotal}</Text>
          <FlatList
            testID={'userHand'}
            style={styles.listStyle}
            data={userHand}
            keyExtractor={(item, index) => item.title + index}
            renderItem={renderListItem}
            bounces={false}
          />
          <Text style={styles.subTitle}>{en.DEALER_HAND + ': ' + dealerTotal}</Text>
          <FlatList
            testID={'dealerHand'}
            style={styles.listStyle}
            data={dealerHand}
            keyExtractor={(item, index) => item.title + index}
            renderItem={renderListItem}
            bounces={false}
          />
          <View style={styles.row}>
            <Button
              title={en.NEW_GAME}
              onPress={onNewPress}
              buttonContainer={styles.modalButton}
            />
            <Button
              isDisabled={deck.length < 21}
              title={en.CONTINUE}
              onPress={onContinuePress}
              buttonContainer={styles.modalButton}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: moderateScale(8),
  },
  title: {
    fontSize: normalize(24),
    fontWeight: 'bold',
    paddingVertical: heightScale(20),
  },
  subTitle: {
    fontSize: normalize(18),
    paddingVertical: heightScale(12),
  },
  textInput: {
    height: heightScale(24),
    padding: 0,
    marginVertical: heightScale(24),
    borderBottomWidth: heightScale(1.5),
    borderColor: colors.blue,
    width: '80%',
    marginHorizontal: widthScale(12),
  },
  drawButton: {
    marginTop: heightScale(20),
  },
  paragraph: {
    fontSize: normalize(14),
  },
  modalContainer: {
    padding: moderateScale(16),
    margin: moderateScale(16),
    marginTop: heightScale(26),
    backgroundColor: colors.white,
    borderColor: colors.grey,
    borderWidth: moderateScale(1),
  },
  listStyle: {
    height: heightScale(150),
    borderWidth: moderateScale(1),
    borderColor: colors.grey,
  },
  listItem: {
    borderBottomColor: colors.grey,
    borderBottomWidth: heightScale(1),
    padding: heightScale(8),
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: heightScale(8),
  },
  modalButton: {
    width: '49%',
  },
});
