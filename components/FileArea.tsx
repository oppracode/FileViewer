import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles } from '../features/dropboxSlice';
import { RootState } from '../store/store';

import FileCard from './ItemCard';

const { width, height } = Dimensions.get('window');
interface DropboxFile {
  name: string;
  id: string;
  ".tag": string;
}

const FileArea: React.FC = () => {
  const dispatch = useDispatch();
  const dropboxFiles = useSelector((state: RootState) => state.dropbox.files);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchFiles() as any)
      .then(() => {
        setLoading(false);
      })
      .catch((error: Error) => {
        console.error('API call error:', error);
        setLoading(false);
      });
  }, [dispatch]);
  

  const renderItem = ({ item }: { item: DropboxFile }) => <FileCard {...item} />;
  const files = dropboxFiles.filter((file) => file[".tag"] === 'file');
  const folders = dropboxFiles.filter((file) => file[".tag"] === 'folder');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FILES: {files.length}</Text>
      <View style={styles.fileListContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={files}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
            numColumns={3}
          />
        )}
      </View>
      <Text style={styles.title}>FOLDERS: {folders.length}</Text>
      <View style={styles.fileListContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={folders}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
            numColumns={3}
          />
        )}
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
    width: width,
    padding: 16,
    height: '40%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default FileArea;
