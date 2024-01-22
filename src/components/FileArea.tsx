import React, { useEffect } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles } from '../features/dropboxSlice';
import { RootState } from '../store/store';
import { FileCard } from './FileCard';

const FileArea: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const dispatch = useDispatch();
  const dropboxFiles = useSelector((state: RootState) => state.dropbox.files);

  useEffect(() => {
    dispatch(fetchFiles() as any);
  }, [dispatch]);

  if (dropboxFiles === undefined || dropboxFiles.length === 0) {
    return <View style={styles.container}></View>;
  }

  console.log(dropboxFiles);

  const files = dropboxFiles.filter((file) => file.type == FileType.FILE);
  const folders = dropboxFiles.filter((file) => file.type == FileType.FOLDER);

  return (
    <View style={{ ...styles.container, width: width }}>
      <Text style={styles.title}>Files</Text>
      <View style={styles.fileListContainer}>
        {files.map((file) => (
          <FileCard file={file} key={file.id} />
        ))}
      </View>
      <Text style={styles.title}>Folders</Text>
      <View style={styles.fileListContainer}>
        {folders.map((folder) => (
          <FileCard file={folder} key={folder.id} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  fileListContainer: {
    width: '100%',
  },
});

export default FileArea;