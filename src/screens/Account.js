import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { BASE_URL } from "../../Config.json";
import { useIsFocused } from "@react-navigation/native";

const Account = ({ navigation }) => {
  const [token, settoken] = useState();
  const [userdata, setuserdata] = useState();
  let isFocused = useIsFocused();
  const gettoken = async () => {
    const tok = await AsyncStorage.getItem("token");
    settoken(tok);
  };

  const handlelogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.replace("Auth", { screen: "login" });
  };
  const getuserdata = async () => {
    const tkn = await AsyncStorage.getItem("token");
    fetch(BASE_URL + "user-data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        userid: tkn,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) {
          setuserdata(data.data);
        } else {
          alert(data.message);
        }
      });
  };
  //Upload Image Starts from here

  const updateimage = async (image) => {
    const token = await AsyncStorage.getItem("token");
    // const cleanurl = image.replace('file://', '');
    // console.log(image, token);
    const imagedata = new FormData();
    imagedata.append("profilePic", {
      type: "image/jpg",
      uri: image,
      name: "profile.jpg",
    });

    fetch(BASE_URL + "upload-image", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        userid: token,
      },
      body: imagedata,
    })
      .then((res) => res.json())
      .then((data) => {
        data.success == true ? null : alert("image not uploaded try again !");
        getuserdata();
      })
      .catch((e) => console.log(e));
  };

  // const getimage = async () => {
  //   const proimage = await AsyncStorage.getItem("image");
  //   setproimage(proimage);
  // };

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
  // getimage();
  // getbalace();
  // console.log(image);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      updateimage(result.uri);
    }
  };
  //update image ends here
  useEffect(() => {
    if (isFocused) {
      getuserdata();
      gettoken();
    }
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.logo}
        source={require("./../assets/Logo.png")}
      >
        {/* <Ionicons name="arrow-back" size={24} color="black" /> */}

        <View style={styles.center}>
          <TouchableOpacity
            style={{
              borderRadius: 50,
            }}
            onPress={() => pickImage()}
          >
            <ImageBackground
              source={require("../assets/avatar.png")}
              style={styles.avater}
            >
              <Image
                source={userdata ? { uri: userdata.avatar } : null}
                style={{
                  height: 100,
                  width: 100,
                  overflow: "hidden",
                  borderRadius: 50,
                }}
              />
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              token
                ? navigation.navigate("App", { screen: "Complaints" })
                : navigation.navigate("Auth", { screen: "login" })
            }
          >
            <Text style={styles.btnText}>Register Complaint</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              token
                ? navigation.navigate("App", { screen: "Profile" })
                : navigation.navigate("Auth", { screen: "login" })
            }
          >
            <Text style={styles.btnText}>Update Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("App", { screen: "Privacy Policy" })
            }
          >
            <Text style={styles.btnText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("App", { screen: "Terms & Conditions" })
            }
          >
            <Text style={styles.btnText}>Terms and Conditions</Text>
          </TouchableOpacity>
          {token ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => handlelogout()}
            >
              <Text style={styles.btnText}>Logout</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Auth", { screen: "login" })}
              >
                <Text style={styles.btnText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate("Auth", { screen: "signup" })
                }
              >
                <Text style={styles.btnText}>Signup</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  spaceAround: {
    justifyContent: "space-around",
  },
  my12: {
    marginVertical: 12,
  },
  mx20: {
    marginHorizontal: 20,
  },
  defaultText: {
    fontSize: 16,
  },
  container: {},
  titleText: {
    textAlign: "center",
    marginVertical: 12,
    marginHorizontal: 60,
    fontSize: 24,
    fontWeight: "500",
  },
  logo: {
    width: 350,
    height: 500,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, .5)",
    height: "100%",
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    marginVertical: 12,
  },
  title: {
    fontSize: 20,
  },
  button: {
    marginVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fe8c00",
    width: "70%",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  btnText: {
    color: "white",
    fontSize: 20,
  },
  colorText: {
    color: "#fe8c00",
  },
  checkbox: {
    alignSelf: "center",
  },
  avater: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#b0b6c1",
    overflow: "hidden",
  },
});
