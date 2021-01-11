import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import favicon from "./assets/favicon.png";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const pickImageHandler = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("La permission d'ccès à la librairie média est nécessaire!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  const shareImageHandler = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(
        "La fonctionalité de partage n'est malheusement pas disponible sur votre plateforme :("
      );
      return;
    }
    await Sharing.shareAsync(selectedImage.localUri);
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={{ width: 300, height: 300, resizeMode: "contain" }}
        ></Image>
        <TouchableOpacity onPress={shareImageHandler} style={styles.miniButton}>
          <Text>Partager</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={favicon} style={styles.smallImage}></Image>
      <TouchableOpacity onPress={pickImageHandler}>
        <Image
          source={{
            uri: "http://darlyne1980.d.a.pic.centerblog.net/o/76019ab4.jpg",
          }}
          style={styles.mediumImage}
        ></Image>
      </TouchableOpacity>
      <Text style={styles.centralText}>Salut les FSD01 :p</Text>
      <StatusBar style="auto" />
      <Button title="Ok"></Button>
      <TouchableOpacity
        onPress={() => alert("Hello, tout le monde!")}
        style={styles.miniButton}
      >
        <Text>Click moi!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  smallImage: {
    width: 50,
    height: 50,
  },
  mediumImage: {
    width: 250,
    height: 250,
  },
  centralText: {
    fontWeight: "bold",
    color: "blue",
  },
  miniButton: {
    backgroundColor: "blue",
    margin: 8,
    borderRadius: 4,
  },
});
