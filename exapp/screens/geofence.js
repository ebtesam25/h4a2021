import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';


export default function Geofence() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let backPerm = await Location.requestBackgroundPermissionsAsync();
      console.log(backPerm);
  
      let region = {identifier:1, latitude:36.004460, longitude: -78.940801, radius:10}
      Location.startGeofencingAsync("LOCATION_GEOFENCE", [region])

      TaskManager.defineTask("LOCATION_GEOFENCE", ({ data: { eventType, region }, error }) => {
          if (error) {
            // check `error.message` for more details.
            return;
          }
          if (eventType === Location.GeofencingEventType.Enter) {
            alert("enter in region!")
            console.log("You've entered region:", region);
          } else if (eventType === Location.GeofencingEventType.Exit) {
            console.log("You've left region:", region);
          }
        });

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});
