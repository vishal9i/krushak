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

const Forgot2 = ({ route, navigation }) => {
  const [code, setcode] = useState();
  const { phone } = route.params;

  const verify = () => {
    fetch(BASE_URL + "forgot/verify", {
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
          navigation.navigate("Auth", {
            screen: "forgot3",
            params: { token: data.token },
          });
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

export default Forgot2;

const styles = StyleSheet.create({
  form: {
    marginHorizontal: 20,
  },
});
