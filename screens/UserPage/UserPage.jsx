import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { getUserData } from "../../src/store/actions/userActions";
import ERRORS from "../../src/store/errors.js";
import UserPosts from "../UserPosts/UserPosts";

import styles from "../../styles";

export default function UserPage({ navigation }) {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    dispatch(getUserData("userData"));
  }, [dispatch]);

  return (
    <>
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Text>Back</Text>
      </TouchableOpacity>

      <View style={styles.userData}>
        <Image source={{ uri: userData?.avatar }} style={styles.image} />
        <Text>User name: {userData?.name}</Text>
        <Text>User email: {userData?.email}</Text>
      </View>

      {error && <Text style={styles.error}>{ERRORS[error]}</Text>}

      <TouchableOpacity
        style={styles.updateBtn}
        onPress={() => navigation.navigate("update-profile")}
      >
        <Text>Update</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.navigate("new-post")}
      >
        <Text>New Post</Text>
      </TouchableOpacity>

    </View>
    <UserPosts />
    </>
  );
}
