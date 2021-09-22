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
import { Button, TextInput, Title } from "react-native-paper";
import { BASE_URL } from "../../Config.json";

const Login = ({ navigation }) => {
  const [password, setpassword] = useState();

  const [email, setemail] = useState();

  const login = () => {
    if (!email || !password) {
      alert("please Enter all fields");
    } else {
      fetch(BASE_URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          console.log(data);
          if (data.success == true) {
            await AsyncStorage.setItem("token", data.userId);
            navigation.replace("Tab");
          } else {
            alert(data.message);
          }
        });
    }
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
              label="Email"
              mode="outlined"
              value={email}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(text) => setemail(text)}
            />
            <TextInput
              label="Password"
              mode="outlined"
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setpassword(text)}
            />

            <Button
              mode="contained"
              style={{ marginVertical: 10 }}
              onPress={() => login()}
              color="#fc8403"
            >
              Login
            </Button>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignItems: "flex-start",
              }}
            >
              <Text style={{ color: "#fff" }}>Don't have an account ? </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Auth", { screen: "signup" })
                }
              >
                <Text style={{ color: "black", fontWeight: "bold" }}>
                  Signup
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginVertical: 10,
                flexDirection: "row",
                alignItems: "center",
                alignItems: "flex-start",
              }}
            >
              <Text style={{ color: "#fff" }}>Forgot Password ? </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Auth", { screen: "forgot1" })
                }
              >
                <Text style={{ color: "black", fontWeight: "bold" }}>
                  Reset
                </Text>
              </TouchableOpacity>
            </View>
            {/* <Title style={{ alignSelf: "center", color: "#fff" }}>OR</Title>
            <View>
              <Button
                mode="contained"
                color="#fc8403"
                onPress={() => navigation.replace("Tab")}
              >
                Guest Login
              </Button>
            </View> */}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  form: {
    marginHorizontal: 20,
  },
});
