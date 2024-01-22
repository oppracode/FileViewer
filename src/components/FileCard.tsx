import React from '@react-navigation/native';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { DropboxFile, FileType } from '../types';

export function FileCard({ file }: { file: DropboxFile }) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          ...styles.pressable,
          backgroundColor: pressed ? '#eee' : '#fff',
        },
      ]}
    >
      <View style={styles.fileIcon}>
        <FontAwesome6
          name={file.type == FileType.FILE ? 'file' : 'folder'}
          size={32}
        />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.title}>{file.name}</Text>
        {file.clientModified != null && (
          <Text style={styles.description}>
            {new Date(file.clientModified!).toLocaleString()}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    padding: 8,
  },
  descriptionContainer: {
    flexDirection: 'column',
    rowGap: 2,
  },
  title: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
    color: '#0d0d0dFF',
  },
  description: {
    fontSize: 12,
    lineHeight: 16,
    color: '#0d0d0d50',
  },
  pressable: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  fileIcon: {
    width: 36,
    height: 36,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});