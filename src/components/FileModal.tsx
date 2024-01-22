import React from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { DropboxFile } from '../types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { deleteFile, fetchFiles } from '../features/dropboxSlice';

import Modal from 'react-native-modal';
import { setLoading } from '../features/loadingSlice';

export function FileModal({
  isVisible,
  onClose,
  file,
}: {
  isVisible: boolean;
  onClose: () => void;
  file: DropboxFile;
}) {
  const dispatch: AppDispatch = useDispatch();

  const deleteSelectedFile = () => {
    dispatch(deleteFile(file.path));
    onClose();
    //dispatch(setLoading(true));
    dispatch(fetchFiles() as any);
  };

  return (
    <>
      <Modal
        testID={'modal'}
        isVisible={isVisible}
        onSwipeComplete={onClose}
        onBackdropPress={onClose}
        onBackButtonPress={onClose}
        backdropOpacity={0.45}
        swipeDirection={['down']}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            paddingVertical: 16,
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderRadius: 4,
            borderColor: 'rgba(0, 0, 0, 0.1)',
          }}
        >
          <FileModalAction
            icon='trash-can'
            iconColor='red'
            title='Delete'
            onPress={deleteSelectedFile}
          />
          <View style={styles.actionSeparator} />
          <FileModalAction
            icon=''
            iconColor='#0d0d0d'
            title='Close'
            onPress={onClose}
            useIcon={false}
          />
        </View>
      </Modal>
    </>
  );
}

function FileModalAction({
  title,
  icon,
  useIcon = true,
  iconColor,
  onPress,
}: {
  title: string;
  icon: string;
  useIcon?: boolean;
  iconColor: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          ...styles.actionView,
          backgroundColor: pressed ? '#eee' : '#fff',
        },
      ]}
      onPress={onPress}
    >
      <View style={styles.pressableContentView}>
        {useIcon && (
          <View style={styles.actionIcon}>
            <FontAwesome6 name={icon} size={24} color={iconColor} />
          </View>
        )}
        <Text style={styles.actionTitle}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  actionView: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 24,
    minHeight: 40,
  },
  actionSeparator: {
    width: '100%',
    height: 1.25,
    backgroundColor: '#eee',
  },
  pressableContentView: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
    color: '#0d0d0dFF',
  },
  actionIcon: {
    width: 36,
    height: 36,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
