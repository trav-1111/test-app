# Camera Integration & Photo Editing Features

## Overview
The Mobile NFT Minter now includes direct camera integration and photo editing capabilities, allowing users to:

1. **Take photos directly with the camera**
2. **Select photos from gallery** 
3. **Edit photos** with basic tools before minting

## New Features Added

### 📷 Camera Integration
- Direct camera access through `ImageSourcePicker` component
- Choice between camera and gallery selection
- High-quality photo capture (1920x1920 max resolution)

### ✏️ Photo Editing
- **Crop to Square**: Perfect for NFT display format
- **Rotate**: 90-degree rotation steps
- **Brightness Control**: Adjust image brightness (0.3x to 2x)
- **Contrast Control**: Enhance image contrast (0.5x to 2x)
- **Real-time Preview**: See changes as you make them
- **Reset Function**: Return to original image

### 🔄 Improved Workflow
1. Tap "📷 Take/Select Photo" button
2. Choose between camera or gallery
3. Photo automatically opens in editor
4. Make desired edits
5. Save edited photo
6. Continue with NFT minting process

## Technical Implementation

### New Components
- **`ImageSourcePicker.tsx`**: Modal for choosing camera vs gallery
- **`PhotoEditor.tsx`**: Full-featured photo editing interface
- **Updated `NftMinter.tsx`**: Integrated camera and editing workflow

### Dependencies Added
- `@react-native-community/image-editor`: For image cropping
- `@react-native-community/slider`: For brightness/contrast controls

### Android Permissions
Added to `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

## Usage Instructions

### For Development
1. Ensure Android development environment is set up
2. Connect Android device or start emulator
3. Run `npm run android`
4. Grant camera and storage permissions when prompted

### User Experience
1. **Taking Photos**: Tap the camera button and use your device camera
2. **Editing**: Photos automatically open in editor after selection
3. **Adjustments**: Use sliders for brightness/contrast, tap buttons for crop/rotate
4. **Preview**: Changes are visible in real-time
5. **Save**: Tap "Save" to apply edits and continue to NFT minting

## Features Overview

| Feature | Description | Status |
|---------|-------------|--------|
| Camera Access | Direct photo capture | ✅ Complete |
| Gallery Selection | Choose existing photos | ✅ Complete |
| Crop to Square | Perfect NFT format | ✅ Complete |
| Rotation | 90° increments | ✅ Complete |
| Brightness | 0.3x to 2x adjustment | ✅ Complete |
| Contrast | 0.5x to 2x adjustment | ✅ Complete |
| Real-time Preview | Live editing feedback | ✅ Complete |
| Reset Function | Return to original | ✅ Complete |

## Future Enhancements
- Additional filters (sepia, black & white, etc.)
- Advanced cropping (custom aspect ratios)
- Image rotation in arbitrary angles
- Saturation and hue adjustments
- Multiple undo/redo functionality

## Notes
- All editing is non-destructive until saved
- Original image is preserved for reset functionality
- Optimized for mobile performance
- Works on both Android and iOS (when properly configured)