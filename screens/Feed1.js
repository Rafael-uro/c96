import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import CardAtividade from "./CartaoAtividade";

import * as Font from "expo-font";
import { FlatList } from "react-native-gesture-handler";
import firebase from "firebase";


SplashScreen.preventAutoHideAsync();



export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme: true,
      tasks: []
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchTasks();
    this.fetchUser();
  }

  fetchTasks = () => {
    firebase
      .database()
      .ref("/posts/")
      .on(
        "value",
        snapshot => {
          let tasks = [];
          if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach(function (key) {
              tasks.push({
                key: key,
                value: snapshot.val()[key]
              });
            });
          }
          this.setState({ tasks: tasks });
          this.props.setUpdateToFalse();
        },
        function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        }
      );
  };

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      });
  };

  renderItem = ({ item: task }) => {
    return <CardAtividade tasks={task} navigation={this.props.navigation} />;
  };

  keyExtractor = (item, index) => index.toString();

  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      return (
        <View
          style={
             styles.container
          }
        >
          <SafeAreaView style={styles.droidSafeArea} />
          
            
          
          {!this.state.tasks[0] ? (
            <View style={styles.noTask}>
              <Text
                style={
                   styles.noTaskText
                }
              >
                No Task Available
              </Text>
            </View>
          ) : (
            <View style={styles.cardContainer}>
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.tasks}
                renderItem={this.renderItem}
              />
            </View>
          )}
          <View style={{ flex: 0.08 }} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020202"
  },
  containerLight: {
    flex: 1,
    backgroundColor: "white"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    
  },
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
  
  },
  cardContainer: {
    flex: 0.85
  },
  noTask: {
    flex: 0.85,
    justifyContent: "center",
    alignItems: "center"
  },
  noTaskTextLight: {
    fontSize: RFValue(40),
   
  },
  noTaskText: {
    color: "white",
    fontSize: RFValue(40),
  
  }
});
