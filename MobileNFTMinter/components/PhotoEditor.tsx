import React, {useState, useCallback} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  Dimensions,
} from 'react-native';
import ImageEditor from '@react-native-community/image-editor';
import Slider from '@react-native-community/slider';

interface PhotoEditorProps {
  imageUri: string;
  visible: boolean;
  onClose: () => void;
  onSave: (editedImageUri: string) => void;
}

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const PhotoEditor: React.FC<PhotoEditorProps> = ({
  imageUri,
  visible,
  onClose,
  onSave,
}) => {
  const [editedImageUri, setEditedImageUri] = useState<string>(imageUri);
  const [rotation, setRotation] = useState(0);
  const [brightness, setBrightness] = useState(1);
  const [contrast, setContrast] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRotate = useCallback(async () => {
    setIsProcessing(true);
    try {
      const newRotation = (rotation + 90) % 360;
      setRotation(newRotation);
      
      // For rotation, we'll use a simple approach
      // In a production app, you might want to use a more sophisticated image processing library
      setEditedImageUri(imageUri); // For now, keep original until we implement actual rotation
    } catch (error) {
      Alert.alert('Error', 'Failed to rotate image');
    } finally {
      setIsProcessing(false);
    }
  }, [rotation, imageUri]);

  const handleCrop = useCallback(async () => {
    setIsProcessing(true);
    try {
      // Get image dimensions first
      Image.getSize(editedImageUri, async (width, height) => {
        try {
          // Crop to center square
          const size = Math.min(width, height);
          const offsetX = (width - size) / 2;
          const offsetY = (height - size) / 2;

          const croppedImageUri = await ImageEditor.cropImage(editedImageUri, {
            offset: {x: offsetX, y: offsetY},
            size: {width: size, height: size},
          });
          setEditedImageUri(croppedImageUri);
        } catch (error) {
          Alert.alert('Error', 'Failed to crop image');
        } finally {
          setIsProcessing(false);
        }
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to process image');
      setIsProcessing(false);
    }
  }, [editedImageUri]);

  const handleSave = useCallback(() => {
    onSave(editedImageUri);
    onClose();
  }, [editedImageUri, onSave, onClose]);

  const handleReset = useCallback(() => {
    setEditedImageUri(imageUri);
    setRotation(0);
    setBrightness(1);
    setContrast(1);
  }, [imageUri]);

  return (
    <Modal visible={visible} animationType="slide" style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Photo</Text>
          <TouchableOpacity onPress={handleSave} style={styles.headerButton}>
            <Text style={[styles.headerButtonText, styles.saveButton]}>Save</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{uri: editedImageUri}}
            style={[
              styles.image,
              {
                transform: [{rotate: `${rotation}deg`}],
                opacity: brightness,
              },
            ]}
            resizeMode="contain"
          />
        </View>

        <View style={styles.controlsContainer}>
          <Text style={styles.sectionTitle}>Tools</Text>
          <View style={styles.toolsRow}>
            <TouchableOpacity
              onPress={handleRotate}
              style={styles.toolButton}
              disabled={isProcessing}>
              <Text style={styles.toolButtonText}>Rotate</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCrop}
              style={styles.toolButton}
              disabled={isProcessing}>
              <Text style={styles.toolButtonText}>Crop Square</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleReset}
              style={styles.toolButton}
              disabled={isProcessing}>
              <Text style={styles.toolButtonText}>Reset</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Brightness</Text>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0.3}
              maximumValue={2}
              value={brightness}
              onValueChange={setBrightness}
              thumbStyle={styles.sliderThumb}
              trackStyle={styles.sliderTrack}
              minimumTrackTintColor="#007AFF"
              maximumTrackTintColor="#E5E5E5"
            />
            <Text style={styles.sliderValue}>{brightness.toFixed(1)}</Text>
          </View>

          <Text style={styles.sectionTitle}>Contrast</Text>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0.5}
              maximumValue={2}
              value={contrast}
              onValueChange={setContrast}
              thumbStyle={styles.sliderThumb}
              trackStyle={styles.sliderTrack}
              minimumTrackTintColor="#007AFF"
              maximumTrackTintColor="#E5E5E5"
            />
            <Text style={styles.sliderValue}>{contrast.toFixed(1)}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1a1a1a',
    paddingTop: 50,
  },
  headerButton: {
    padding: 8,
  },
  headerButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: screenWidth - 40,
    height: screenHeight * 0.4,
  },
  controlsContainer: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15,
  },
  toolsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  toolButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  toolButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  sliderThumb: {
    backgroundColor: '#007AFF',
    width: 20,
    height: 20,
  },
  sliderTrack: {
    height: 4,
    borderRadius: 2,
  },
  sliderValue: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 10,
    minWidth: 30,
    textAlign: 'center',
  },
});

export default PhotoEditor;