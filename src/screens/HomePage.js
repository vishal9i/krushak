import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Entypo, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { FAB } from "react-native-paper";
import * as Location from "expo-location";
import RNLocation from "react-native-location";
import { BASE_URL } from "../../Config.json";
import { useIsFocused } from "@react-navigation/native";

const HomePage = ({ navigation }) => {
  const [location, setLocation] = useState();
  const [errorMsg, setErrorMsg] = useState(null);
  const [city, setcity] = useState("Loading...");
  const [weatherdata, setweatherdata] = useState();
  const [country, setcountry] = useState();
  let isFocused = useIsFocused();
  const [newsdata, setnewsdata] = useState();
  //   let city = "Wating...";

  const getweather = (city1) => {
    // const encodedValue = encodeURIComponent(city1);
    console.log("this is weather", city1);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city1}&appid=874931517fd9d9e314c3f2630591c2f5&units=metric`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setweatherdata(data);
      });
  };
  RNLocation.configure({
    distanceFilter: 100, // Meters
    desiredAccuracy: {
      android: "balancedPowerAccuracy",
    },
    // androidProvider: "auto",
    interval: 5000, // Milliseconds
    fastestInterval: 10000, // Milliseconds
    maxWaitTime: 5000, // Milliseconds
  });

  const getlocation = () => {
    RNLocation.requestPermission({
      android: {
        detail: "fine",
      },
    }).then((granted) => {
      console.log(granted);
      if (granted) {
        RNLocation.subscribeToLocationUpdates(async (locations) => {
          /* Example location returned
                {
                  speed: -1,
                  longitude: -0.1337,
                  latitude: 51.50998,
                  accuracy: 5,
                  heading: -1,
                  altitude: 0,
                  altitudeAccuracy: -1
                  floor: 0
                  timestamp: 1446007304457.029,
                  fromMockProvider: false
                }
                */
          // console.log(locations);
          //   setLocation(locations);
          let address = await Location.reverseGeocodeAsync({
            latitude: locations[0].latitude,
            longitude: locations[0].longitude,
          });
          console.log(address);
          setcity(address[0].city);
          setcountry(address[0].country);
          getweather(address[0].city);
          //   console.log(city);
        });
      }
    });
  };

  const getnews = () => {
    fetch(BASE_URL + "all-articles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.success == true) {
          setnewsdata(data.data);
        }
      });
  };

  //   if (city != "Waiting...") {
  //     getweather();
  //   }

  useEffect(() => {
    if (isFocused) {
      getlocation();
      getnews();
    }
    // setTimeout(() => {
    //   getweather();
    // }, 10000);
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View>
          <View style={styles.cloudContainer}>
            <Entypo name="cloud" size={32} color="#bebdbd" />
            <Text style={styles.cloudText}>
              {weatherdata && weatherdata.main.temp}&deg; C
            </Text>
          </View>
          <Text style={{ marginTop: 10 }}>
            {weatherdata && weatherdata.weather[0].description}
          </Text>
        </View>

        <View style={styles.textContainer}>
          <TouchableOpacity
            onPress={() => getlocation()}
            style={{ alignSelf: "flex-end" }}
          >
            <Ionicons name="reload-outline" size={24} color="black" />
          </TouchableOpacity>
          <Text>Today {new Date().toDateString()}</Text>
          <Text style={{ fontSize: 32, fontWeight: "bold" }}>{city}</Text>
          <Text style={{ fontSize: 16 }}>{country}</Text>
        </View>
      </View>
      <Text style={{ paddingLeft: 20, marginVertical: 16, fontSize: 20 }}>
        NEWS
      </Text>
      <ScrollView>
        <View style={styles.boxContainer}>
          {newsdata &&
            newsdata.map((item, index) => (
              <TouchableOpacity
                style={styles.box}
                key={index}
                onPress={() =>
                  navigation.navigate("App", {
                    screen: "News",
                    params: {
                      img: item.articleImage,
                      heading: item.headLine,
                      body: item.desc,
                      id: item._id,
                    },
                  })
                }
              >
                <Image
                  style={styles.boxImage}
                  // source={require("./../assets/farmer11.jpg")}
                  source={{ uri: item.articleImage }}
                />
                <View style={{ width: "60%", margin: 3 }}>
                  <Text style={styles.boxTitle}>{item.headLine}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <View>
                      <Text style={styles.grayText}>
                        {new Date(item.createdAt).toLocaleString()}
                      </Text>
                      {/* <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      style={{ marginRight: 8 }}
                      name="eye"
                      size={24}
                      color="#c4c4c4"
                    />
                    <Text style={styles.grayText}>2.5K Reads</Text>
                  </View> */}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
      <FAB
        style={styles.fab}
        small
        icon={({ size, color }) => (
          <Entypo name="info" size={24} color="white" />
        )}
        onPress={() => console.log("Pressed")}
      />
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    height: "25%",
    width: "100%",
    backgroundColor: "#ffeed9",
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cloudContainer: {
    marginTop: 32,
    width: 100,
    height: 100,
    backgroundColor: "#8dd9e5",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  cloudText: {
    fontSize: 20,
    fontWeight: "200",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  boxContainer: {
    marginHorizontal: 12,
  },
  box: {
    backgroundColor: "#fafafa",
    margin: 5,
    flexDirection: "row",
    elevation: 5,
    padding: 3,
    borderRadius: 7,
  },
  boxImage: {
    width: 100,
    height: 100,
    borderRadius: 6,
  },
  boxTitle: {
    fontSize: 20,
  },
  boxText: {
    fontSize: 18,
  },
  readMore: {
    color: "#ffc27a",
    marginBottom: 12,
  },
  colorText: {
    color: "#ffc27a",
    fontStyle: "italic",
    fontSize: 16,
  },
  grayText: {
    color: "#c4c4c4",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 32,
    backgroundColor: "#ff8b00",
  },
});

// #ffeed9
// #8dd9e5
// #ffc27a

//
//#c4c4c4
