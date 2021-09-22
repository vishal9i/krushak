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

const Signup = ({ navigation }) => {
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [cpass, setcpass] = useState();
  const [phone, setphone] = useState();

  const sendotp = () => {
    if (!name || !email || !password || !cpass || !phone) {
      alert("all fields are required !");
    } else {
      if (password != cpass) {
        alert("Password not matched !");
      } else {
        if (phone.length < 10) {
          alert("phone number not valid !");
        } else {
          fetch(BASE_URL + "/sendotp", {
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
                  screen: "otpverify",
                  params: { name, email, password, phone },
                });
              } else {
                alert(data.message);
              }
            });
        }
      }
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
              label="Name"
              mode="outlined"
              value={name}
              onChangeText={(text) => setname(text)}
            />
            <TextInput
              label="Phone"
              mode="outlined"
              value={phone}
              keyboardType="numeric"
              onChangeText={(text) => setphone(text)}
            />
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
            <TextInput
              label="Comfirm Password"
              mode="outlined"
              value={cpass}
              secureTextEntry={true}
              onChangeText={(text) => setcpass(text)}
            />

            <Button
              mode="contained"
              style={{ marginVertical: 10 }}
              onPress={() => sendotp()}
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
              <TouchableOpacity
                onPress={() => navigation.navigate("Auth", { screen: "login" })}
              >
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

export default Signup;

const styles = StyleSheet.create({
  form: {
    marginHorizontal: 20,
  },
});
