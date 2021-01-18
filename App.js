import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import Logo from './assets/logo.png';

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Camera access necessary!')
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri })
  }

  let openShareDialougeAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert('Uh oh sharing isn\'t enabled on your platform')
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri)
  }

  let content;
  if (selectedImage !== null) {
    content = (
      <View styles={styles.container}>
        <Image source={{ uri: selectedImage.localUri}} style={styles.thumbnail} />
        <TouchableOpacity onPress={openShareDialougeAsync} style={styles.button}>
          <Text style={styles.buttonText}>Share this photo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedImage(null)} style={styles.button}>
          <Text style={styles.buttonText}>Clear Photo</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.image}/>

      <Text style={styles.instructions}>To share a photo from your phone to your friend, just tap the button below!</Text>
      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text styles={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
      {content}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15
  },
  image: {
    width: 305,
    height: 159,
    marginBottom: 10
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 20
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: 'contain'
  }
});
