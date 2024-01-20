import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from 'react-redux';
import store from "../store";

import DropboxItem from "../components/DropboxItem";

const FileViewerScreen: React.FC = () => {
  return (
    <Provider store={store}>
  
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <DropboxItem/>
    </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FileViewerScreen;
