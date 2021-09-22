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

const Forgot3 = ({ route, navigation }) => {
  const { token } = route.params;
  const [password, setpassword] = useState();
  const [cpass, setcpass] = useState();

  const changepass = () => {
    if (password != cpass) {
      alert("Password not matched");
    } else {
      fetch(BASE_URL + "forgot/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
          password: password,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          //   console.log(data);
          if (data.success == true) {
            navigation.replace("Auth", {
              screen: "login",
            });
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
              label="Password"
              mode="outlined"
              value={password}
              onChangeText={(text) => setpassword(text)}
            />
            <TextInput
              label="Confirm Password"
              mode="outlined"
              value={cpass}
              onChangeText={(text) => setcpass(text)}
            />

            <Button
              mode="contained"
              style={{ marginVertical: 10 }}
              onPress={() => changepass()}
              color="#fc8403"
            >
              submit
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
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Forgot3;

const styles = StyleSheet.create({
  form: {
    marginHorizontal: 20,
  },
});
