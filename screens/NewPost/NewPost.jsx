import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";

import { sendPost } from "../../src/store/actions/postActions";
import ERRORS from "../../src/store/errors.js";

import styles from "../../styles";

export default function NewPost({ navigation }) {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
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

  const save = () => {
    const payload = {
      description: description,
      image: image,
      tags: tags.split(" "),
      title: title,
      username: userData.name,
    };
    dispatch(sendPost(payload));
  };

  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image.uri }} style={styles.image} />
          ) : (
            <Image
            source={require('../../assets/images/avatar.jpg')}
              style={styles.image}
            />
          )}
        </Pressable>

        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Title"
            placeholderTextColor="grey"
            onChangeText={(title) => setTitle(title)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Description"
            placeholderTextColor="grey"
            onChangeText={(description) => setDescription(description)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Tags"
            placeholderTextColor="grey"
            onChangeText={(tags) => setTags(tags)}
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

        {error && <Text style={styles.errorText}>{ERRORS[error]}</Text>}
      </View>
    </>
  );
}
