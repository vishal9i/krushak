import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { DataTable } from "react-native-paper";
import * as Location from "expo-location";
import RNLocation from "react-native-location";

import { Ionicons } from "@expo/vector-icons";

const MyMandi = () => {
  const [pricedata, setpricedata] = useState();
  const getmarketprice = (state) => {
    console.log(state);
    fetch(
      "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001161936a09aeb40874e1ee540098d02ca&format=json&offset=0&limit=10000",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.records) {
          setpricedata(
            data.records.filter(
              (x) => x.state.toLowerCase() == state.toLowerCase()
            )
          );
        }
      });
  };
  //   console.log(pricedata && pricedata.map((i) => i.commodity).sort());
  RNLocation.configure({
    distanceFilter: 100, // Meters
    desiredAccuracy: {
      android: "balancedPowerAccuracy",
    },
    // androidProvider: "auto",
    // interval: 5000, // Milliseconds
    // fastestInterval: 10000, // Milliseconds
    // maxWaitTime: 5000, // Milliseconds
  });
  const getlocation = () => {
    RNLocation.requestPermission({
      android: {
        detail: "fine",
      },
    }).then((granted) => {
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
          //   setcity(address[0].city);
          //   setcountry(address[0].country);
          //   getweather(address[0].city);
          //   console.log(city);
          getmarketprice(address[0].region);
        });
      }
    });
  };

  //   if (city != "Waiting...") {
  //     getweather();
  //   }

  useEffect(() => {
    getlocation();
    // setTimeout(() => {
    //   getweather();
    // }, 10000);
  }, []);
  return (
    <View style={styles.container}>
      {/* <Ionicons name="arrow-back" size={24} color="black" /> */}
      {/* <View style={styles.center}>
        <Image style={styles.logo} source={require("./../assets/Logo.png")} />
      </View> */}
      <Text style={styles.titleText}>My MANADI</Text>
      <View>
        <DataTable style={{ paddingBottom: "80%" }}>
          <DataTable.Header style={{ backgroundColor: "#ffd098" }}>
            <DataTable.Title>Items</DataTable.Title>
            <DataTable.Title>Market</DataTable.Title>
            <DataTable.Title numeric>Max Price</DataTable.Title>
            <DataTable.Title numeric>Min Price</DataTable.Title>
            <DataTable.Title numeric>Avg. Price</DataTable.Title>
          </DataTable.Header>
          <ScrollView>
            {pricedata &&
              pricedata.map((item, index) => (
                <DataTable.Row
                  style={{ backgroundColor: "#f1f1f1", fontSize: 10 }}
                >
                  <DataTable.Title style={{ fontSize: 9 }}>
                    {item.commodity}
                  </DataTable.Title>
                  <DataTable.Title co>{item.market}</DataTable.Title>

                  <DataTable.Title numeric>{item.max_price}</DataTable.Title>
                  <DataTable.Title numeric>{item.min_price}</DataTable.Title>
                  <DataTable.Title numeric>{item.modal_price}</DataTable.Title>
                </DataTable.Row>
              ))}
          </ScrollView>
        </DataTable>
      </View>
    </View>
  );
};

export default MyMandi;

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    marginHorizontal: 12,
  },
  titleText: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 24,
  },
  logo: {
    width: 160,
    height: 160,
    resizeMode: "cover",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
  },
});
