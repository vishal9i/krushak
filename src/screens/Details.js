import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

const Details = ({ route, navigation }) => {
  const { url } = route.params;
  //   console.log(url);
  return <WebView source={{ uri: `${url}` }} />;
};

export default Details;

const styles = StyleSheet.create({});
