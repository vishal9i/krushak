import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../Config.json";

const placeholder = {
  label: "-- select the issue here--",
  value: null,
};
const Complaint = ({ navigation }) => {
  const [issue, setissue] = useState();
  const [description, setdescription] = useState();

  const submit = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch(BASE_URL + "complain", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        userid: token,
      },
      body: JSON.stringify({
        issue_type: issue,
        description: description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success == true) {
          setissue(null);
          setdescription(null);
        } else {
          alert(data.message);
        }
      });
  };
  return (
    <View style={styles.container}>
      {/* <View style={styles.row}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </View> */}
      <View style={styles.center}>
        <Image style={styles.logo} source={require("./../assets/Logo.png")} />
      </View>
      <Text style={styles.titleText}>COMPLAINT</Text>
      <View>
        <Text style={styles.title}>I am facing issues with</Text>
        <View style={styles.my12}>
          <RNPickerSelect
            placeholder={placeholder}
            onValueChange={(value) => setissue(value)}
            value={issue}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                right: 12,
              },
            }}
            items={[
              { label: "Issues with Mandi", value: "Issues with Mandi" },
              {
                label: "Issue with Government Scheme",
                value: "Issue with Government Scheme",
              },
              {
                label: "Issues with Bank Loan",
                value: "Issues with Bank Loan",
              },
              {
                label: "Issues with Loan Waiver",
                value: "Issues with Loan Waiver",
              },
              {
                label: "Issues with Fertilizer Procurement",
                value: "Issues with Fertilizer Procurement",
              },
              {
                label: "Issue with Cattle Registration ",
                value: "Issue with Cattle Registration ",
              },
              {
                label: "Issues getting Farm Insurance",
                value: "Issues getting Farm Insurance",
              },
              {
                label: "Issues getting Cattle Insurance",
                value: "Issues getting Cattle Insurance",
              },
            ]}
            Icon={() => {
              return <Ionicons name="md-arrow-down" size={24} color="gray" />;
            }}
          />
        </View>
        <Text style={styles.title}>Description</Text>

        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="Write your description here"
            placeholderTextColor="grey"
            numberOfLines={10}
            value={description}
            onChangeText={(text) => setdescription(text)}
            multiline={true}
          />
        </View>
        <View style={styles.center}>
          <TouchableOpacity style={styles.button} onPress={() => submit()}>
            <Text style={styles.btnText}>Post Complaint</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("App", { screen: "Chats" })}
          >
            <Text>press here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Complaint;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  container: {
    marginTop: 32,
    marginHorizontal: 28,
  },
  titleText: {
    textAlign: "center",
    marginVertical: 12,
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
  },
  title: {
    fontSize: 20,
  },
  textAreaContainer: {
    marginVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    padding: 5,
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start",
  },
  button: {
    marginVertical: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fe8c00",
    width: "60%",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },
  btnText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
  pickerInput: {
    fontSize: 16,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  my12: {
    marginVertical: 12,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
