import React, { useEffect } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles } from '../features/dropboxSlice';
import { RootState } from '../store/store';
import { FileCard } from './FileCard';
import { DropboxFile, FileType } from '../types';

const SectionView: React.FC<{ text: string; files: DropboxFile[] }> = ({
  text,
  files,
}) => {
  return (
    <View style={styles.sectionView}>
      <Text style={styles.title}>{text}</Text>
      <View style={styles.fileListContainer}>
        {files.map((file) => (
          <FileCard file={file} key={file.id} />
        ))}
      </View>
    </View>
  );
};

const FileArea: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const dispatch = useDispatch();
  const dropboxFiles: DropboxFile[] | undefined = useSelector(
    (state: RootState) => state.dropbox.files
  );

  useEffect(() => {
    dispatch(fetchFiles() as any);
  }, [dispatch]);

  if (dropboxFiles === undefined || dropboxFiles.length === 0) {
    return (
      <View style={styles.empty}>
        <Text>No files found. Care to add one?</Text>
      </View>
    );
  }

  const files =
    dropboxFiles?.filter((file) => file.type == FileType.FILE) ?? [];
  const folders =
    dropboxFiles?.filter((file) => file.type == FileType.FOLDER) ?? [];

  return (
    <View style={{ ...styles.container, width: width }}>
      <SectionView text='Folders' files={folders} />
      <SectionView text='Files' files={files} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    color: '#0d0d0d',
    fontWeight: 'bold',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  fileListContainer: {
    width: '100%',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionView: { marginTop: 16 },
});

export default FileArea;