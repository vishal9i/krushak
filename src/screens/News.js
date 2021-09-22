import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";

import { BASE_URL } from "../../Config.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-paper";

const News = ({ route, navigation }) => {
  const { heading, img, body, id } = route.params;
  const [like, setlike] = useState(false);
  const [userlikes, setuserlikes] = useState();
  const [comment, setcomment] = useState();
  const [allcomments, setallcomments] = useState();
  // const [token, settoken] = useState();
  // console.log(heading, img, body);
  //get like
  const getuserlike = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch(BASE_URL + "user-likes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        userid: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.success == true) {
          setuserlikes(data.data);
          data.data.some((i) => i == id) ? setlike(true) : setlike(false);
        } else {
          alert(data.message);
        }
      });
  };
  //like
  const likearticle = async () => {
    console.log("like called");
    const token = await AsyncStorage.getItem("token");
    fetch(BASE_URL + "like-article", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        userid: token,
        articleid: id,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          getuserlike();
        } else {
          null;
        }
      });
  };
  //dislike article
  const dislikearticle = async () => {
    console.log("dislike called");
    const token = await AsyncStorage.getItem("token");
    fetch(BASE_URL + "dislike-article", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        userid: token,
        articleid: id,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          getuserlike();
        } else {
          null;
        }
      });
  };
  //handle like
  const handlelike = () => {
    like ? dislikearticle() : likearticle();
  };
  //get comments
  const getcomments = async () => {
    fetch(BASE_URL + "article-comment", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        articleid: id,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.success == true && data.data.length != 0) {
          setallcomments(data.data[0].comments);
        }
      });
  };

  //post comment
  const postcomment = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!comment) {
      alert("please enter something");
      return;
    }
    fetch(BASE_URL + "user-comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        userid: token,
        articleid: id,
      },
      body: JSON.stringify({
        comment: comment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) {
          setcomment(null);
          getcomments();
        } else {
          alert(data.message);
        }
      });
  };
  // console.log(allcomments);
  useEffect(() => {
    getuserlike();
    getcomments();
  }, []);
  return (
    <View style={{ margin: 10, padding: 5, justifyContent: "space-between" }}>
      <ScrollView>
        <Image
          style={styles.imag}
          source={{ uri: img }}
          // source={require("../assets/Logo.png")}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
          }}
        >
          <Text style={styles.head}>{heading}</Text>
          <View>
            {!like ? (
              <TouchableOpacity onPress={() => handlelike()}>
                <AntDesign name="hearto" size={30} color="black" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => handlelike()}>
                <AntDesign name="heart" size={30} color="#c90000" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <Text style={styles.body}>{body}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextInput
            label="comment"
            value={comment}
            onChangeText={(text) => setcomment(text)}
            style={{ width: "80%" }}
          />
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              margin: 5,
              padding: 10,
              backgroundColor: "#6f03fc",
              borderRadius: 70,
              paddingHorizontal: 15,
            }}
            onPress={() => postcomment()}
          >
            <Feather name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View>
          {allcomments &&
            allcomments.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    margin: 5,
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>{item.userId.name}</Text>
                  <Text style={{ fontSize: 12, marginHorizontal: 10 }}>
                    {item.comment}
                  </Text>
                </View>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

export default News;

const styles = StyleSheet.create({
  imag: {
    width: 300,
    height: 200,
    alignSelf: "center",
    margin: 10,
    borderRadius: 10,
  },
  head: {
    fontSize: 25,
    fontWeight: "bold",
    width: "90%",
  },
  body: {
    marginVertical: 10,
    fontSize: 18,
    marginBottom: "10%",
  },
});
