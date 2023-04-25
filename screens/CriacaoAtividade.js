import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  Button,
  Alert,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import DropDownPicker from "react-native-dropdown-picker";
import firebase from "firebase";

import * as Font from "expo-font";


SplashScreen.preventAutoHideAsync();

export default class CriAtividade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      
      dropdownHeight: 40,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  async addStory() {
    if (
      this.state.task &&
      this.state.description 
    ) {
      var d = new Date();
      let TaskData = {
        
        task: this.state.task,
        description: this.state.description,

       
      };
      console.log(TaskData);
      await firebase
        .database()
        .ref("/posts/" + Math.random().toString(36).slice(2))
        .set(TaskData)
        .then(function (snapshot) {});
      this.props.setUpdateToTrue();
      this.props.navigation.navigate("Feed");
    } else {
      Alert.alert(
        "Error",
        "All fields are required!",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        
            <TextInput
              style={styles.inputFont}
              onChangeText={(task) => this.setState({ task })}
              placeholder={"Tarefa"}
              placeholderTextColor="white"
            />

            <TextInput
              style={[
                styles.inputFont,
                styles.inputFontExtra,
                styles.inputTextBig,
              ]}
              onChangeText={(description) => this.setState({ description })}
              placeholder={"descrição"}
              multiline={true}
              numberOfLines={4}
              placeholderTextColor="white"
            />

            <View style={styles.submitButton}>
              <Button
                onPress={() => this.addStory()}
                title="Submit"
                color="#841584"
              />
            </View>
         
        
        <View style={{ flex: 0.08 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020202",
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  
  inputFont: {
    height: RFValue(40),
    marginTop: RFValue(40),
    borderColor: "white",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "white",
  },
  inputFontExtra: {
    marginTop: RFValue(15),
  },
  inputTextBig: {
    textAlignVertical: "top",
    padding: RFValue(5),
  },
  submitButton: {
    marginTop: RFValue(20),
    alignItems: "center",
    justifyContent: "center",
  },
});
