import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '../store/store';

import DropboxItem from '../components/DropboxItem';
import DropboxButtons from '../components/Toolbar';

const FileViewerScreen: React.FC = () => {
  return (
    <Provider store={store}>
      <StatusBar style='auto' />
      <ScrollView style={styles.container}>
        <DropboxButtons />
        <View style={styles.content}>
          <DropboxItem />
        </View>
      </ScrollView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FileViewerScreen;