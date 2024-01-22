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
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { deleteFile, fetchFiles } from '../features/dropboxSlice';
import BottomSheet from '@gorhom/bottom-sheet';
import { useMemo, useRef } from 'react';

export function FileCard({ file }: { file: DropboxFile }) {
  const dispatch: AppDispatch = useDispatch();
  const handlePress = () => {
      dispatch(deleteFile(file.path));
      console.log(`deleted: ${file.path}`);
      dispatch(fetchFiles() as any);
  };
        
  return (
    <Pressable
      style={({ pressed }) => [
        {
          ...styles.pressable,
          backgroundColor: pressed ? '#eee' : '#fff',
        },
      ]}
      onPress={handlePress}
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
