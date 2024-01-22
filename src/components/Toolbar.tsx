import React from 'react';
 import {
   View,
   StyleSheet,
   TouchableOpacity,
   Text,
   Alert,
   FlatList,
 } from 'react-native';

 const ToolbarButton: React.FC<{ text: string }> = ({ text }) => {
   if (text.length === 0) {
     return <></>;
   }

   const showAlert = () => {
     Alert.alert(
       'Still in Development',
       `${text} feature is still in development.`
     );
   };

   return (
     <TouchableOpacity
       onPress={showAlert}
       style={styles.button}
       activeOpacity={0.4}
     >
       <Text style={styles.buttonText}>{text}</Text>
     </TouchableOpacity>
   );
 };

 const buttons = ['Share', 'Upload', 'Folder', 'Scan'];

 const Toolbar: React.FC = () => {
   return (
     <FlatList
       //style={styles.buttonList}
       contentContainerStyle={styles.buttonList}
       data={buttons}
       renderItem={({ item }) => <ToolbarButton text={item} />}
       keyExtractor={(item) => item}
       ItemSeparatorComponent={() => <View style={{ width: 8 }}></View>}
       horizontal={true}
     ></FlatList>
     /*<View style={styles.container}>
       {buttons.map((buttonText) => (
         <TouchableOpacity style={styles.button} onPress={showAlert}>
           <Text style={styles.buttonText}>buttonText</Text>
         </TouchableOpacity>
       ))}
     </View>*/
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
     backgroundColor: '#FFFFFF',
     paddingHorizontal: 16,
     paddingVertical: 12,
     borderRadius: 4,
   },
   buttonText: {
     fontSize: 18,
     lineHeight: 20,
     fontWeight: 'bold',
     color: '#007EE5',
   },
   buttonList: {
     paddingHorizontal: 16,
     paddingVertical: 8,
     height: 'auto',
     alignItems: 'flex-start',
   },
 });

 export default Toolbar;