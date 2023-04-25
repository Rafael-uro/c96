import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";

export default class Register extends React.Component {
  constructor() {
    super(),
    this.state = ({
        nome: "",
        sobrenome: "",
        email: "",
        senha: "",
        confirme: "",
      });
  }

  RegistroUSER(nome, sobrenome, email, senha, confirme) {
    if (senha === confirme) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, senha)
        .then((userCredential) => {
          Alert.alert("Usuario registrado");
          console.log(userCredential.user.uid);
          this.props.navigation.replace("login");
          firebase
            .database()
            .ref("/users/" + userCredential.user.uid)
            .set({
              email: userCredential.user.email,
              nome: nome,
              sobrenome: sobrenome,
            })
            .catch((error) => {
              Alert.alert(error.message);
            });
        });
    } else {
      Alert.alert("as senhas não estão identicas");
    }
  }
  render() {
    const {nome, sobrenome, email, senha, confirme} = this.state;
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: "#59008D", width:440, marginBottom:130 }}>
          <Text style={styles.appTitleText}>registro</Text>
        </View>
        <View>
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({ nome: text })}
            placeholderTextColor={"white"}
            placeholder="nome"
          ></TextInput>
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({ sobrenome: text })}
            placeholderTextColor={"white"}
            placeholder="sobrenome"
          ></TextInput>
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({ email: text })}
            placeholderTextColor={"white"}
            placeholder="email"
          ></TextInput>
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({ senha: text })}
            placeholderTextColor={"white"}
            placeholder="senha"
          ></TextInput>
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({ confirme: text })}
            placeholderTextColor={"white"}
            placeholder="confime a senha"
          ></TextInput>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.RegistroUSER(nome, sobrenome, email, senha, confirme);
            }}
          >
            <Text style={styles.buttonText}>registre-se</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.replace("login");
            }}
          >
            <Text style={styles.buttonTextNewUser}>login</Text>
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
    marginBottom: RFValue(20),
  },
  appTitleText: {
    color: "white",
    textAlign: "center",
    fontSize: RFValue(40),
    
    marginBottom: RFValue(20),
  },
  textinput: {
    width: RFValue(250),
    height: RFValue(40),
    padding: RFValue(10),
    marginTop: RFValue(10),
    borderColor: "#FFFFFF",
    borderWidth: RFValue(4),
    borderRadius: RFValue(10),
    fontSize: RFValue(15),
    color: "#FFFFFF",
    backgroundColor: "#15193c",
    
  },
  button: {
    width: RFValue(250),
    height: RFValue(50),
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: RFValue(30),
    backgroundColor: "white",
    marginBottom: RFValue(20),
  },
  buttonText: {
    fontSize: RFValue(24),
    color: "#15193c",
    
  },
  buttonTextNewUser: {
    fontSize: RFValue(12),
    color: "#FFFFFF",
    
    textDecorationLine: "underline",
  },
});
//#59008D
//#1C1C1C
