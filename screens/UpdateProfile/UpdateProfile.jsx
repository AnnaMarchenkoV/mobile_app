import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";

import { updateUser } from "../../src/store/actions/userActions";
import ERRORS from "../../src/store/errors.js";

import styles from "../../styles";

export default function UpdateProfile({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const { userData } = useSelector((state) => state.user);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const save = () => {
    const payload = {
      user: {
        avatar: image || userData.avatar,
        email: email || userData.email,
        name: name || userData.name,
        role: "user",
      },
    };
    return dispatch(updateUser(payload));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage({
        uri: result.uri,
        type: result.type,
        filename: result.uri.split("/").slice(-1)[0],
      });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image.uri }} style={styles.image} />
          ) : (
            <Image source={{ uri: userData?.avatar }} style={styles.image} />
          )}
        </Pressable>
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder={userData?.email}
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder={userData.name}
            placeholderTextColor="#003f5c"
            onChangeText={(name) => setName(name)}
          />
        </View>

        {error && <Text style={styles.errorText}>{ERRORS[error]}</Text>}

        <TouchableOpacity style={styles.loginBtn} onPress={save}>
          <Text>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.goBack()}
        >
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
