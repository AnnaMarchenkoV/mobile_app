import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  userLogin,
  userLogOut,
  getUserData,
} from "../../src/store/actions/userActions";
import ERRORS from "../../src/store/errors.js";

import styles from "../../styles";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const error = useSelector((state) => state.user.error);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    dispatch(getUserData('userData'));
  }, [dispatch]);

  const login = () => {
    const payload = {
      email: email,
      password: password,
    };
    dispatch(userLogin(payload));
  };

  const logout = () => {
    dispatch(userLogOut());
  };

  if (userData?.name) {
    return (
      <View>
        <Text style={styles.label}>Hello, {userData?.name}</Text>

        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text>LOGOUT</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => navigation.navigate("user-page")}
        >
          <Text>My Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.navigate("newsfeed")}>
          <Text>Newsfeed</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      {error && (
        <Text style={styles.error}>
          {ERRORS[error] || "Log in or register"}
        </Text>
      )}

      <TouchableOpacity style={styles.loginBtn} onPress={login}>
        <Text>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.navigate("sign-up")}
      >
        <Text>REGISTER</Text>
      </TouchableOpacity>
      <Text style={styles.error}>If you don't have an account</Text>
    </View>
  );
}
