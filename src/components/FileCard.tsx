import React from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export function FileCard({ file }: { file: DropboxFile }) {
  return (
    <View style={styles.container}>
      <AntDesign
        name={file.type == FileType.FILE ? 'file1' : 'folder1'}
        size={48}
      />
      <View>
        <Text style={styles.title}>{file.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    padding: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#888888',
  },
});