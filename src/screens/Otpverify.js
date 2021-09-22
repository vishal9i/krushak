import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { BASE_URL } from "../../Config.json";

const Otpverify = ({ route, navigation }) => {
  const [code, setcode] = useState();
  const { name, email, password, phone } = route.params;
  console.log(name, email, password, phone);
  const register = () => {
    fetch(BASE_URL + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        phone: phone,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data);
        if (data.success == true) {
          await AsyncStorage.setItem("token", data.data._id);
          navigation.replace("Tab");
        } else {
          alert(data.message);
        }
      });
  };

  const verify = () => {
    fetch(BASE_URL + "/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        phone: phone,
        code: code,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success == true) {
          //   console.log("call register");
          register();
        } else {
          alert(data.message);
        }
      });
  };

  return (
    <View>
      <ImageBackground
        source={require("../assets/bg.jpeg")}
        style={{ height: "100%" }}
        blurRadius={5}
      >
        <ScrollView>
          <Image
            source={require("../assets/Logo.png")}
            style={{ height: 200, width: 200, alignSelf: "center" }}
          />
          <View style={styles.form}>
            <TextInput
              label="OTP"
              mode="outlined"
              value={code}
              keyboardType="numeric"
              onChangeText={(text) => setcode(text)}
            />

            <Button
              mode="contained"
              style={{ marginVertical: 10 }}
              onPress={() => verify()}
              color="#fc8403"
            >
              SUbmit
            </Button>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignItems: "flex-start",
              }}
            >
              <Text style={{ color: "#fff" }}>already have an account ? </Text>
              <TouchableOpacity>
                <Text style={{ color: "black", fontWeight: "bold" }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Otpverify;

const styles = StyleSheet.create({
  form: {
    marginHorizontal: 20,
  },
});
