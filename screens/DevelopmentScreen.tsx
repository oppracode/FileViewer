import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from 'react-redux';

const DevelopmentScreen: React.FC = () => {
  return (
      <View style={styles.container}>
          <Text>Still in development...</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AED9E0",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DevelopmentScreen;
