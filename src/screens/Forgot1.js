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

const Forgot1 = ({ navigation }) => {
  const [phone, setphone] = useState();

  const sendotp = () => {
    fetch(BASE_URL + "forgot/sendotp", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        phone: phone,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success == true) {
          navigation.navigate("Auth", {
            screen: "forgot2",
            params: { phone: phone },
          });
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
              label="Phone"
              mode="outlined"
              value={phone}
              keyboardType="numeric"
              onChangeText={(text) => setphone(text)}
            />

            <Button
              mode="contained"
              style={{ marginVertical: 10 }}
              onPress={() => sendotp()}
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

export default Forgot1;

const styles = StyleSheet.create({
  form: {
    marginHorizontal: 20,
  },
});
