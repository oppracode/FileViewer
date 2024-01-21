import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';

const Toolbar: React.FC = () => {
  const showAlert = () => {
    Alert.alert('Still in Development', 'This feature is still in development.');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={showAlert}>
        <Text style={styles.buttonText}>Button 1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={showAlert}>
        <Text style={styles.buttonText}>Button 2</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={showAlert}>
        <Text style={styles.buttonText}>Button 3</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16, 
  },
  button: {
    flex: 1, 
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 8, 
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007EE5',
  },
});

export default Toolbar;
