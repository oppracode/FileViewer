import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles } from '../features/dropboxSlice';

import FileArea from './FileArea';

const DropboxItem: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFiles() as any);
  }, [dispatch]);

  return (
    <View>
      <FileArea />
    </View>
  );
};

export default DropboxItem;
