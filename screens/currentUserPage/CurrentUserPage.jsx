import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { getCurrentUserData } from "../../src/store/actions/userActions";
import ERRORS from "../../src/store/errors.js";
import { UserPosts } from "../UserPosts";

import styles from "../../styles";

export default function CurrentUserPage({ navigation }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    dispatch(getCurrentUserData("currentUser"));
  }, [dispatch]);

  return (
    <>
      <View style={styles.containerUser}>
      <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.goBack()}
        >
          <Text>Back</Text>
        </TouchableOpacity>

        <View style={styles.userData}>
          <Image source={{ uri: currentUser?.avatar }} style={styles.image} />
          <Text>User name: {currentUser?.name}</Text>
          <Text>User email: {currentUser?.email}</Text>
        </View>

        {error && <Text style={styles.error}>{ERRORS[error]}</Text>}

      </View>
      <UserPosts/>
    </>
  );
}

