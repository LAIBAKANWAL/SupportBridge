import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from 'react-native-modal';

const ZoomableImageModal = ({ visible, imageUri, onClose }) => {
  const [index, setIndex] = useState(0);
  const images = [{ url: imageUri }];

  return (
    <View>
    <Modal visible={visible} transparent={true}>
      <ImageViewer
        imageUrls={images}
        // index={index}
        onSwipeDown={onClose}
        enableSwipeDown
        style={styles.imageViewer}
      />
      <TouchableOpacity
        style={styles.closeButton}
        onPress={onClose}
      />
    </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    
  imageViewer: {
    flex: 1,
    backgroundColor: 'black',
    margin: -18
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default ZoomableImageModal;
