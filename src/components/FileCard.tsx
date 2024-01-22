import React from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { DropboxFile, FileType } from '../types';
import { useState } from 'react';
import { FileModal } from './FileModal';

export function FileCard({ file }: { file: DropboxFile }) {
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => setModalVisible(false);

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          {
            ...styles.pressable,
            backgroundColor: pressed ? '#eee' : '#fff',
          },
        ]}
        onLongPress={() => setModalVisible(true)}
      >
        <View style={styles.content}>
          <View style={styles.fileIcon}>
            <FontAwesome6
              name={file.type == FileType.FILE ? 'file' : 'folder'}
              size={32}
            />
          </View>
          <View style={styles.descriptionContainer}>
            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.title}>
              {file.name}
            </Text>
            {file.clientModified != null && (
              <Text style={styles.description}>
                {new Date(file.clientModified!).toLocaleString()}
              </Text>
            )}
          </View>
        </View>
        <Pressable
          style={({ pressed }) => [
            {
              ...styles.button,
              backgroundColor: pressed ? '#eee' : 'transparent',
            },
          ]}
          onPress={() => setModalVisible(true)}
        >
          <FontAwesome6 name='ellipsis' size={24} color='#0d0d0d' />
        </Pressable>
      </Pressable>

      <FileModal isVisible={modalVisible} onClose={closeModal} file={file} />
    </>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 16,
    flex: 1,
  },
  button: {
    marginLeft: 8,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionContainer: {
    flexDirection: 'column',
    rowGap: 2,
    flex: 1,
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
  fileIcon: {
    width: 36,
    height: 36,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
