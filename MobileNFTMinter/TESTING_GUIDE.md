# 📱 Mobile NFT Minter - Testing Guide

## 🚀 Quick Start for Testing

### Prerequisites
Before testing the Mobile NFT Minter with the new camera and photo editing features, ensure you have:

1. **Android Development Environment**
   - Android Studio installed
   - Android SDK and build tools
   - Java Development Kit (JDK 11 or higher)
   - An Android device or emulator

2. **React Native Development Setup**
   - Node.js (v16 or higher)
   - npm or yarn package manager
   - React Native CLI

3. **Device Requirements**
   - Android device with camera capability
   - Android 6.0 (API level 23) or higher
   - Minimum 2GB RAM for optimal performance

## 🔧 Setup Instructions

### 1. Install Dependencies
```bash
# Navigate to project directory
cd MobileNFTMinter

# Install dependencies
npm install

# For iOS (if testing on iOS later)
cd ios && pod install && cd ..
```

### 2. Start Metro Bundler
```bash
# Start the React Native metro bundler
npm start
```

### 3. Connect Device or Start Emulator
**Option A: Physical Android Device**
- Enable Developer Options on your Android device
- Enable USB Debugging
- Connect device via USB
- Verify connection: `adb devices`

**Option B: Android Emulator**
- Open Android Studio
- Start an Android Virtual Device (AVD)
- Ensure it has camera support enabled

### 4. Build and Run
```bash
# Build and run on Android
npm run android
```

## 📋 Testing Scenarios

### 🔍 Basic Functionality Tests

#### 1. App Launch Test
- [ ] App launches successfully
- [ ] Main screen displays correctly
- [ ] Connect wallet button is visible
- [ ] No crash or error messages

#### 2. Wallet Connection Test
- [ ] Tap "Connect wallet" button
- [ ] Wallet selection modal appears
- [ ] Can connect to Phantom or other Solana wallets
- [ ] Connection status updates correctly

### 📷 Camera Integration Tests

#### 3. Image Source Selection
- [ ] Tap "📷 Take/Select Photo" button
- [ ] Image source modal appears with two options
- [ ] "📷 Take Photo" option is visible
- [ ] "🖼️ Choose from Gallery" option is visible
- [ ] "Cancel" button works correctly

#### 4. Camera Functionality
- [ ] Tap "📷 Take Photo"
- [ ] Camera permission request appears (first time)
- [ ] Grant camera permission
- [ ] Camera interface opens
- [ ] Can capture photo successfully
- [ ] Photo is saved and preview appears

#### 5. Gallery Selection
- [ ] Tap "🖼️ Choose from Gallery"
- [ ] Storage permission request appears (first time)
- [ ] Grant storage permission
- [ ] Gallery/photo picker opens
- [ ] Can select existing photo
- [ ] Selected photo displays correctly

### ✏️ Photo Editing Tests

#### 6. Photo Editor Interface
- [ ] Photo editor opens automatically after photo selection
- [ ] Image displays correctly in editor
- [ ] Header shows "Edit Photo" title
- [ ] "Cancel" and "Save" buttons are visible
- [ ] Control panel shows editing tools

#### 7. Crop Functionality
- [ ] Tap "Crop Square" button
- [ ] Image is cropped to center square
- [ ] Cropped result displays immediately
- [ ] No crashes or errors during cropping

#### 8. Rotation Functionality
- [ ] Tap "Rotate" button
- [ ] Image rotates 90 degrees clockwise
- [ ] Multiple rotations work correctly
- [ ] UI remains responsive during rotation

#### 9. Brightness Control
- [ ] Brightness slider is visible and functional
- [ ] Dragging slider changes image brightness
- [ ] Brightness value displays correctly (0.3 to 2.0)
- [ ] Changes are visible in real-time
- [ ] Reset to original brightness works

#### 10. Contrast Control
- [ ] Contrast slider is visible and functional
- [ ] Dragging slider changes image contrast
- [ ] Contrast value displays correctly (0.5 to 2.0)
- [ ] Changes are visible in real-time
- [ ] Reset to original contrast works

#### 11. Reset Functionality
- [ ] Tap "Reset" button
- [ ] Image returns to original state
- [ ] All adjustments are cleared
- [ ] Sliders return to default values

#### 12. Save and Continue
- [ ] Tap "Save" button in editor
- [ ] Edited image is applied
- [ ] Editor closes automatically
- [ ] Main screen shows edited image
- [ ] "✏️ Edit Photo" button appears below image

### 🎨 NFT Minting Integration Tests

#### 13. Post-Edit Workflow
- [ ] After editing, image appears on main screen
- [ ] Can tap "✏️ Edit Photo" to re-edit
- [ ] "Mint NFT" button becomes enabled
- [ ] Edited image is used for minting process

#### 14. NFT Metadata Input
- [ ] Tap "Mint NFT" button
- [ ] Metadata input modal appears
- [ ] Can enter NFT name
- [ ] Can enter NFT description
- [ ] "Mint NFT!" button is functional

#### 15. IPFS Upload Test
- [ ] Start minting process
- [ ] "Uploading to IPFS..." message appears
- [ ] Progress indicator shows
- [ ] Upload completes successfully (or shows error)

### 🐛 Error Handling Tests

#### 16. Permission Denial
- [ ] Deny camera permission
- [ ] App handles gracefully with error message
- [ ] Can retry permission request
- [ ] App doesn't crash

#### 17. Network Issues
- [ ] Test with poor network connection
- [ ] IPFS upload shows appropriate error
- [ ] App remains stable during network issues

#### 18. Invalid Image Handling
- [ ] Test with corrupted image files
- [ ] App handles errors gracefully
- [ ] Error messages are user-friendly

### 📱 Device-Specific Tests

#### 19. Different Screen Sizes
- [ ] Test on various Android screen sizes
- [ ] UI elements scale appropriately
- [ ] Touch targets are accessible
- [ ] Text remains readable

#### 20. Performance Tests
- [ ] Test with high-resolution images
- [ ] Editing operations complete in reasonable time
- [ ] App remains responsive during processing
- [ ] Memory usage stays within limits

## 🔍 Detailed Testing Checklist

### Pre-Test Setup
- [ ] Device has sufficient storage space
- [ ] Camera is functional
- [ ] Network connection is stable
- [ ] Required permissions can be granted

### During Testing
- [ ] Take screenshots of key functionality
- [ ] Note any performance issues
- [ ] Document any error messages
- [ ] Test edge cases (very bright/dark images, etc.)

### Post-Test Validation
- [ ] All images save correctly
- [ ] No memory leaks or crashes
- [ ] App state is preserved correctly
- [ ] Can successfully mint NFT with edited photo

## 🚨 Known Limitations & Notes

1. **Image Quality**: Large images may take longer to process
2. **Storage**: Edited images are temporarily stored locally
3. **Network**: IPFS upload requires stable internet connection
4. **Permissions**: Camera and storage permissions required for full functionality

## 📞 Troubleshooting

### Common Issues:
1. **Camera not working**: Check permissions in device settings
2. **Build failures**: Ensure Android SDK is properly configured
3. **Metro bundler issues**: Try `npm start --reset-cache`
4. **Permission errors**: Uninstall and reinstall app to reset permissions

### Debug Commands:
```bash
# View device logs
adb logcat

# Reset Metro cache
npm start --reset-cache

# Clean Android build
cd android && ./gradlew clean && cd ..

# Reinstall app
npm run android --reset-cache
```

## ✅ Success Criteria

The app is ready for production when:
- [ ] All camera functionality works smoothly
- [ ] Photo editing tools respond quickly
- [ ] Image quality is maintained through editing
- [ ] NFT minting process completes successfully
- [ ] No crashes or major bugs
- [ ] Performance is acceptable on target devices

---

**Testing Status**: ✅ Ready for Testing
**Last Updated**: $(date)
**Version**: 0.0.1 with Camera Integration