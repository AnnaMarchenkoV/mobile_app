import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  containerUser: {
    flex: 0.7,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 50,

  },

  image: {
    height: 70,
    width: 70,
    marginBottom: 20,
  },

  inputView: {
    backgroundColor: "#87CEFA",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },

  userData: {
    marginTop: 50,
    borderRadius: 30,
    width: "70%",
    height: 45,
    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#87CEFA",
  },

  updateBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
    backgroundColor: "#87CEFA",
    marginBottom: -20,
  },

  logoutBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginLeft: 40,
    marginBottom: 20,
    backgroundColor: "#87CEFA",
  },

  backBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
    backgroundColor: "#87CEFA",
    marginBottom: -20,
  },

  label: {
    marginTop: 50,
    marginLeft: 50,
    alignItems: "center",
  },

  postImage: {
    padding: 10,
    height: 350,
    width: 370,
  },

  userName: {
    color: "blue",
  }

});

export default styles;
