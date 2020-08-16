import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { UserProvider, GameProvider } from '../providers';
import { en } from '../assets/locale';
import colors from './../assets/colors';

import { Button } from '../components/button';

import scaling from '../config/device/normalize';
const {
  normalize,
  widthScale,
  heightScale,
} = scaling;

export const NewGame = ({ navigation }) => {
  const user = React.useContext(UserProvider.Context);
  const game = React.useContext(GameProvider.Context);
  const onButtonPress = () => {
    if (user.user) {
      game.resetGame();
      navigation.replace('gameBoard');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{en.WELCOME}</Text>
      <Text style={styles.subTitle}>{en.NEW_GAME}</Text>
      <TextInput
        onChangeText={user.setUser}
        style={styles.textInput}
        placeholder={en.ENTER_NAME}
        onSubmitEditing={onButtonPress}
      />
      <View style={styles.buttonContainer}>
        <Button
          title={en.BEGIN}
          onPress={onButtonPress}
          isDisabled={!user.user}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: normalize(24),
    fontWeight: 'bold',
    paddingVertical: heightScale(24),
  },
  subTitle: {
    fontSize: normalize(18),
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
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
