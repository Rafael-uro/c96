import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      senha: "",
    };
  }
  singIn = async (email, senha) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, senha)
      .then(() => {
        this.props.navigation.replace("Feed");
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
    
  };
  render() {
    const {email, senha} = this.state
    return (
      <View style={styles.container}>
        <View style = {{backgroundColor:"#59008D", marginBottom:150, width:440}}>
          <Text style = {styles.appTitleText}>Login</Text>
        </View>
        <View>
          <TextInput
          style = {styles.textinput}
            onChangeText={(text) => this.setState({ email: text })}
            placeholderTextColor={"white"}
            placeholder="Email"
          >
            {" "}
          </TextInput>
          <TextInput
          style = {styles.textinput}
            onChangeText={(text) => this.setState({ senha: text })}
            placeholderTextColor={"white"}
            placeholder="Senha"
            secureTextEntry
          ></TextInput>
          <TouchableOpacity style = {styles.button} onPress={() => this.singIn(email, senha)}>
            <Text style = {styles.buttonText}>entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity

            onPress={() => this.props.navigation.navigate("Register")}
          >
            <Text style = {styles.buttonTextNewUser}>registro</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1C",
    alignItems: "center",
    justifyContent: "center",
  },
  appIcon: {
    width: RFValue(200),
    height: RFValue(200),
    resizeMode: "contain",
    marginBottom: RFValue(20)
  },
  appTitleText: {
    color: "white",
    textAlign: "center",
    fontSize: RFValue(40),
   
    marginBottom: RFValue(20)
  },
  textinput: {
    width: RFValue(250),
    height: RFValue(50),
    padding: RFValue(10),
    borderColor: "#FFFFFF",
    borderWidth: RFValue(4),
    borderRadius: RFValue(10),
    fontSize: RFValue(20),
    color: "#FFFFFF",
    backgroundColor: "#15193c",
    marginTop:10,
    marginBottom:50
  },
  button: {
    width: RFValue(250),
    height: RFValue(50),
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: RFValue(30),
    backgroundColor: "white",
    marginBottom: RFValue(20)
  },
  buttonText: {
    fontSize: RFValue(24),
    color: "#15193c",
    
  },
  buttonTextNewUser: {
    fontSize: RFValue(12),
    color: "#FFFFFF",
   
    textDecorationLine: 'underline'
  }
});
