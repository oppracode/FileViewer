import React from 'react';
 import { StyleSheet, Text, View } from 'react-native';

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
     backgroundColor: '#AED9E0',
     alignItems: 'center',
     justifyContent: 'center',
   },
 });