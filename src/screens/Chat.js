import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

const Chat = () => {
  return (
    <WebView
      source={{
        uri: "https://tawk.to/chat/613f3cc3d326717cb6812ca3/1fffgangi",
      }}
    />
  );
};

export default Chat;

const styles = StyleSheet.create({});
