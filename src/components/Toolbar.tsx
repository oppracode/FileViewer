import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  FlatList,
} from 'react-native';
import { ToolbarButtonContent } from '../types';
import { FontAwesome6 } from '@expo/vector-icons';

const ToolbarButton: React.FC<ToolbarButtonContent> = ({ name, icon }) => {
  if (name.length === 0) {
    return <></>;
  }

  const showAlert = () => {
    Alert.alert(
      'Still in Development',
      `${name} feature is still in development.`
    );
  };

  return (
    <TouchableOpacity
      onPress={showAlert}
      style={styles.button}
      activeOpacity={0.6}
    >
      <FontAwesome6 name={icon} size={24}></FontAwesome6>
      <Text style={styles.buttonText}>{name}</Text>
    </TouchableOpacity>
  );
};

const buttons: ToolbarButtonContent[] = [
  { name: 'Upload', icon: 'image' },
  { name: 'Folder', icon: 'folder' },
  { name: 'Scan', icon: 'add' },
];

const Toolbar: React.FC = () => {
  return (
    <FlatList
      contentContainerStyle={styles.buttonList}
      data={buttons}
      renderItem={({ item }) => (
        <ToolbarButton name={item.name} icon={item.icon} />
      )}
      keyExtractor={(item) => item.name}
      ItemSeparatorComponent={() => <View style={{ width: 8 }}></View>}
      horizontal={true}
    ></FlatList>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ebebeb',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
    flexDirection: 'row',
    columnGap: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600',
    color: '#0d0d0d',
  },
  buttonList: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    height: 'auto',
    alignItems: 'flex-start',
  },
});

export default Toolbar;