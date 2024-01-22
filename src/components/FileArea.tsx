import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles } from '../features/dropboxSlice';
import { RootState } from '../store/store';

import FileCard from './ItemCard';

interface DropboxFile {
  name: string;
  id: string;
  '.tag': string;
}

const FileArea: React.FC = () => {
  const dispatch = useDispatch();
  const dropboxFiles = useSelector((state: RootState) => state.dropbox.files);

  useEffect(() => {
    dispatch(fetchFiles() as any);
  }, [dispatch]);

  if (dropboxFiles === undefined || dropboxFiles.length === 0) {
    return <View style={styles.container}></View>;
  }

  const files = dropboxFiles.filter((file) => file['.tag'] === 'file');
  const folders = dropboxFiles.filter((file) => file['.tag'] === 'folder');

  const renderItem = ({ item }) => <FileCard {...item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FILES: {files.length}</Text>
      <View style={styles.fileListContainer}>
        <FlatList
          data={files}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          numColumns={3}
        />
      </View>
      <Text style={styles.title}>FOLDERS: {folders.length}</Text>
      <View style={styles.fileListContainer}>
        <FlatList
          data={folders}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          numColumns={3}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fileListContainer: {
    padding: 16,
  },
});

export default FileArea;