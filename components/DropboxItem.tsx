// Your React Native component file

import React, { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles } from '../features/dropboxSlice';
import { RootState } from '../store';

const DropboxItem: React.FC = () => {
  const dispatch = useDispatch();
  const dropboxFiles = useSelector((state: RootState) => state.dropbox.files);

  useEffect(() => {
    dispatch(fetchFiles() as any); 
  }, [dispatch]);

  return (
    <View>
      <Text>Number of Files in Dropbox: {dropboxFiles.length}</Text>
    </View>
  );
};

export default DropboxItem;
