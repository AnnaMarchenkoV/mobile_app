import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";

import { userRegistrationRequest } from "../../src/store/actions/userActions";
import ERRORS from "../../src/store/errors.js";

import styles from "../../styles";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
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

  const register = () => {
    const payload = {
      user: {
      avatar: image,
      email: email,
      name: name,
      password: password,
      role: 'base',
      }
    };
    dispatch(userRegistrationRequest(payload));
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
    <View style={styles.container}>
      <Pressable onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image.uri }} style={styles.image} />
          ) : (
            <Image source={require('../../assets/images/avatar.jpg')} style={styles.image} />
          )}
        </Pressable>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Name"
          placeholderTextColor="#003f5c"
          onChangeText={(name) => setName(name)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      {error && <Text style={styles.error}>{ERRORS[error]}</Text>}

      <TouchableOpacity style={styles.loginBtn} onPress={register}>
        <Text>REGISTER</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('sign-in')}>
        <Text>Go back</Text>
      </TouchableOpacity>
    </View>
  );
}

