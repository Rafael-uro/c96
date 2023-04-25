import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";
import firebase from "firebase";


SplashScreen.preventAutoHideAsync();



export default class CardAtividade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      
      
         };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
  }

  
  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        
      });
  };

  render() {
      return (
        <View
          style={styles.container}
          
        >
          <SafeAreaView style={styles.droidSafeArea} />
          <View
            style={
               styles.cardContainer
            }
          >
            
            <View style={styles.titleContainer}>
              <View style={styles.titleTextContainer}>
                <Text
                  style={
                     styles.storyTitleText
                  }
                >
                  {tasks.task}
                </Text>
                <Text
                  style={
                     styles.storyAuthorText
                  }
                >
                  {story.author}
                </Text>
                <Text
                  style={
                    
                       styles.descriptionText
                  }
                >
                  {this.props.tasks.description}
                </Text>
              </View>
            </View>

            
            
          </View>
        </View>
      );
    }
  }


const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  
  
  
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center"
  },
  titleTextContainer: {
    flex: 0.8
  },
  
  storyTitleText: {
    
    fontSize: RFValue(25),
    color: "white"
  },
  storyAuthorText: {
  
    fontSize: RFValue(18),
    color: "white"
  },
  descriptionContainer: {
    marginTop: RFValue(5)
  },
  descriptionText: {
  
    fontSize: RFValue(13),
    color: "white"
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10)
  },
  
});