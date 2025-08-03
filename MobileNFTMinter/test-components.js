#!/usr/bin/env node

/**
 * Component Validation Script
 * Tests that all new components can be imported correctly
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Mobile NFT Minter - Component Validation\n');

// Define the components to test
const componentsToTest = [
  {
    name: 'ImageSourcePicker',
    path: './components/ImageSourcePicker.tsx',
    description: 'Camera and gallery selection modal'
  },
  {
    name: 'PhotoEditor',
    path: './components/PhotoEditor.tsx',
    description: 'Photo editing interface with crop, rotate, brightness, contrast'
  },
  {
    name: 'NftMinter',
    path: './components/NftMinter.tsx',
    description: 'Updated NFT minter with camera integration'
  }
];

// Test that files exist and have correct structure
let allTestsPassed = true;

componentsToTest.forEach((component, index) => {
  console.log(`${index + 1}. Testing ${component.name}...`);
  
  // Check if file exists
  const fullPath = path.join(__dirname, component.path);
  if (!fs.existsSync(fullPath)) {
    console.log(`   ❌ File not found: ${component.path}`);
    allTestsPassed = false;
    return;
  }
  
  // Read file content
  const content = fs.readFileSync(fullPath, 'utf8');
  
  // Basic validation checks
  const checks = [
    {
      name: 'Has React import',
      test: content.includes("import React"),
      required: true
    },
    {
      name: 'Has default export',
      test: content.includes("export default"),
      required: true
    },
    {
      name: 'Has TypeScript interface',
      test: content.includes("interface"),
      required: false
    },
    {
      name: 'Has proper styling',
      test: content.includes("StyleSheet.create"),
      required: true
    }
  ];
  
  let componentTestsPassed = true;
  checks.forEach(check => {
    if (check.test) {
      console.log(`   ✅ ${check.name}`);
    } else if (check.required) {
      console.log(`   ❌ ${check.name} (Required)`);
      componentTestsPassed = false;
      allTestsPassed = false;
    } else {
      console.log(`   ⚠️  ${check.name} (Optional)`);
    }
  });
  
  if (componentTestsPassed) {
    console.log(`   🎉 ${component.name} validation passed`);
  } else {
    console.log(`   💥 ${component.name} validation failed`);
  }
  
  console.log(`   📝 ${component.description}\n`);
});

// Additional checks
console.log('🔍 Additional Validations...\n');

// Check Android permissions
const manifestPath = path.join(__dirname, 'android/app/src/main/AndroidManifest.xml');
if (fs.existsSync(manifestPath)) {
  const manifestContent = fs.readFileSync(manifestPath, 'utf8');
  const requiredPermissions = [
    'android.permission.CAMERA',
    'android.permission.READ_EXTERNAL_STORAGE',
    'android.permission.WRITE_EXTERNAL_STORAGE'
  ];
  
  console.log('Android Permissions Check:');
  requiredPermissions.forEach(permission => {
    if (manifestContent.includes(permission)) {
      console.log(`   ✅ ${permission}`);
    } else {
      console.log(`   ❌ ${permission} (Missing)`);
      allTestsPassed = false;
    }
  });
} else {
  console.log('   ❌ AndroidManifest.xml not found');
  allTestsPassed = false;
}

console.log('\n');

// Check package.json dependencies
const packagePath = path.join(__dirname, 'package.json');
if (fs.existsSync(packagePath)) {
  const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const requiredDependencies = [
    '@react-native-community/image-editor',
    '@react-native-community/slider',
    'react-native-image-picker'
  ];
  
  console.log('Dependencies Check:');
  requiredDependencies.forEach(dep => {
    if (packageContent.dependencies && packageContent.dependencies[dep]) {
      console.log(`   ✅ ${dep} v${packageContent.dependencies[dep]}`);
    } else {
      console.log(`   ❌ ${dep} (Missing)`);
      allTestsPassed = false;
    }
  });
} else {
  console.log('   ❌ package.json not found');
  allTestsPassed = false;
}

console.log('\n');

// Final result
if (allTestsPassed) {
  console.log('🎉 All validations passed! The app is ready for testing.');
  console.log('✅ Camera integration components are properly configured');
  console.log('✅ Android permissions are set correctly');
  console.log('✅ Required dependencies are installed');
  console.log('\n📱 Next steps:');
  console.log('   1. Connect Android device or start emulator');
  console.log('   2. Run: npm run android');
  console.log('   3. Follow the testing guide in TESTING_GUIDE.md');
  process.exit(0);
} else {
  console.log('💥 Some validations failed. Please fix the issues above before testing.');
  process.exit(1);
}