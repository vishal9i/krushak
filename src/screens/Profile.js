import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, TextInput } from "react-native-paper";
import { BASE_URL } from "../../Config.json";

const Profile = () => {
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [phone, setphone] = useState();
  const [address, setaddress] = useState();
  const [pincode, setpincode] = useState();
  const [family, setfamily] = useState();
  const [userdata, setuserdata] = useState();
  const getuserdata = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch(BASE_URL + "user-data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        userid: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) {
          setuserdata(data.data);
          setname(data.data.name);
          setemail(data.data.email);
          setphone(data.data.phone);
          setaddress(data.data.address);
          setpincode(data.data.pincode);
          setfamily(data.data.family_members);
        } else {
          alert(data.message);
        }
      });
  };

  const editprofile = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch(BASE_URL + "profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        userid: token,
      },
      body: JSON.stringify({
        name: name,
        email: email,
        address: address,
        pincode: pincode,
        family_members: family,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) {
          alert(data.message);
        } else {
          alert(data.message);
        }
      });
  };
  useEffect(() => {
    getuserdata();
  }, []);
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <ImageBackground
        style={styles.logo}
        source={require("./../assets/Logo.png")}
      >
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, .5)",
          }}
        >
          <ScrollView style={{ marginTop: "10%", marginHorizontal: 10 }}>
            <TextInput
              label="Name"
              mode="outlined"
              value={name}
              onChangeText={(text) => setname(text)}
            />
            <TextInput
              label="Email"
              mode="outlined"
              value={email}
              onChangeText={(text) => setemail(text)}
            />
            <TextInput
              label="Phone"
              mode="outlined"
              value={phone}
              disabled={true}
              onChangeText={(text) => setphone(text)}
            />
            <TextInput
              label="Address"
              mode="outlined"
              multiline={true}
              style={{ height: 100 }}
              numberOfLines={5}
              value={address}
              onChangeText={(text) => setaddress(text)}
            />
            <TextInput
              label="Pincode"
              mode="outlined"
              value={pincode}
              onChangeText={(text) => setpincode(text)}
            />
            <TextInput
              label="Total Family members"
              mode="outlined"
              keyboardType="numeric"
              value={family ? family.toString() : null}
              onChangeText={(text) => setfamily(text)}
            />
            <Button
              mode="contained"
              color="#fc8403"
              style={{
                marginVertical: 20,
                width: "90%",
                alignSelf: "center",
              }}
              onPress={() => editprofile()}
            >
              submit
            </Button>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  logo: {
    width: 350,
    height: "100%",
  },
});
