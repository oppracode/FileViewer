import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Provider } from 'react-redux';
import store from "../store/store";

import DropboxItem from "../components/DropboxItem";
import DropboxButtons from "../components/Toolbar";

const FileViewerScreen: React.FC = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <DropboxButtons />
        <View style={styles.content}>
          <DropboxItem />
        </View>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AED9E0",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FileViewerScreen;
