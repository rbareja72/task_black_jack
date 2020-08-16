import React from 'react';
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Navigator from './screens';
import { GameProvider, UserProvider } from './providers';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.flex}>
        <UserProvider.Provider>
          <GameProvider.Provider>
            <Navigator />
          </GameProvider.Provider>
        </UserProvider.Provider>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
});

export default App;
