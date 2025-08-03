import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
  MediaType,
} from 'react-native-image-picker';

interface ImageSourcePickerProps {
  visible: boolean;
  onClose: () => void;
  onImageSelected: (imageUri: string) => void;
}

const ImageSourcePicker: React.FC<ImageSourcePickerProps> = ({
  visible,
  onClose,
  onImageSelected,
}) => {
  const handleCameraPress = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      quality: 0.8,
      maxWidth: 1920,
      maxHeight: 1920,
    };

    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.didCancel || response.errorMessage) {
        if (response.errorMessage) {
          Alert.alert('Camera Error', response.errorMessage);
        }
        return;
      }

      const asset = response.assets?.[0];
      if (asset?.uri) {
        onImageSelected(asset.uri);
        onClose();
      }
    });
  };

  const handleGalleryPress = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      quality: 0.8,
      maxWidth: 1920,
      maxHeight: 1920,
      selectionLimit: 1,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel || response.errorMessage) {
        if (response.errorMessage) {
          Alert.alert('Gallery Error', response.errorMessage);
        }
        return;
      }

      const asset = response.assets?.[0];
      if (asset?.uri) {
        onImageSelected(asset.uri);
        onClose();
      }
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Select Image Source</Text>
          
          <TouchableOpacity
            style={styles.option}
            onPress={handleCameraPress}>
            <Text style={styles.optionText}>📷 Take Photo</Text>
            <Text style={styles.optionDescription}>
              Use your camera to take a new photo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={handleGalleryPress}>
            <Text style={styles.optionText}>🖼️ Choose from Gallery</Text>
            <Text style={styles.optionDescription}>
              Select an existing photo from your gallery
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 350,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  option: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#6c757d',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
    alignItems: 'center',
  },
  cancelText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ImageSourcePicker;