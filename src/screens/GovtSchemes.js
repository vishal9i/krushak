import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import CheckBox from "react-native-check-box";
import { BASE_URL } from "../../Config.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GovtSchemes = ({ navigation }) => {
  const [centraldata, setcentraldata] = useState();
  const [statedata, setstatedata] = useState();

  const handlehelp = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      navigation.navigate("App", { screen: "chaupal" });
    } else {
      navigation.navigate("Auth", { screen: "login" });
    }
  };
  const getschemes = () => {
    fetch(BASE_URL + "farmer-schemes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success == true) {
          setcentraldata(data.centralData);
          setstatedata(data.stateData);
        }
      });
  };
  useEffect(() => {
    getschemes();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Ionicons name="arrow-back" size={24} color="black" /> */}
      <View style={styles.center}>
        <Image style={styles.logo} source={require("./../assets/Logo.png")} />
      </View>
      <Text style={styles.titleText}>GOVERNMENT YOJNA</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.title}>Central</Text>
          <View>
            {centraldata &&
              centraldata.map((item) => (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#fff",
                    marginVertical: 5,
                    padding: 5,
                    borderRadius: 7,
                    elevation: 5,
                  }}
                  onPress={() =>
                    navigation.navigate("App", {
                      screen: "Details",
                      params: { url: item.link },
                    })
                  }
                >
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {item.title}
                  </Text>
                  <Text>{item.description}</Text>
                </TouchableOpacity>
              ))}
          </View>
          <Text style={styles.title}>State</Text>
          <View>
            {statedata &&
              statedata.map((item) => (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#fff",
                    marginVertical: 5,
                    padding: 5,
                    borderRadius: 7,
                    elevation: 5,
                  }}
                  onPress={() =>
                    navigation.navigate("App", {
                      screen: "Details",
                      params: { url: item.link },
                    })
                  }
                >
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {item.title}
                  </Text>
                  <Text>{item.description}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
        <View style={styles.center}>
          <TouchableOpacity style={styles.button} onPress={() => handlehelp()}>
            <Text style={styles.btnText}>Help</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default GovtSchemes;

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
  container: {
    marginTop: 32,
    marginHorizontal: 10,
    paddingBottom: "50%",
  },
  titleText: {
    textAlign: "center",
    marginVertical: 12,
    marginHorizontal: 60,
    fontSize: 24,
    fontWeight: "500",
  },
  logo: {
    width: 160,
    height: 100,
    resizeMode: "cover",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    marginVertical: 10,
  },

  button: {
    marginVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fe8c00",
    width: "60%",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  btnText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
  colorText: {
    color: "#fe8c00",
  },
  checkbox: {
    alignSelf: "center",
  },
});
