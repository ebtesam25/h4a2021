import React, { useState, useEffect, useRef } from 'react';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { StyleSheet, Text, View, Image, Button, ImageBackground, Switch, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line, Circle } from 'react-native-svg';
import { Icon } from 'react-native-elements'
import { useFonts } from 'expo-font';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });





export default function Volunteer() {
    const navigation = useNavigation();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
        });

        return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);
  
    
   
    return (
        <View style={styles.container}>
            <View style={{marginTop:'10%', flexDirection:'row', marginHorizontal:'10%'}}>
                <Icon name="location-pin" type="entypo" color="#FFF" size={35} 
                onPress={async () => {
          await schedulePushNotification();
        }}></Icon>
                <View>
                    <Text style={{color:"#FFF"}}>Location</Text>
                    <Text style={{color:"#FFF", fontWeight:'bold'}}>Washington, D.C</Text>
                </View>
            </View>
            <View style={{ alignSelf:'center', marginTop:'40%' }}>
                
              <View style={{alignSelf:'center',width:'80%'}}>
                <Text style={{ fontSize:30, color:'#FFFFFF', textAlign:'center', fontWeight:'bold', marginTop:'10%'}}>Volunteer</Text>
              </View>

              <View style={{marginTop:'20%'}}></View>
                <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                    <Text style={{fontWeight:'bold', color:"#FFF", textAlignVertical:'center'}}>Volunteer Mode</Text>
              <Switch
                    trackColor={{ false: "#1C2A6C", true: "#1C2A6C" }}
                    thumbColor={isEnabled ? "#27A745" : "#F16051"}
                    ios_backgroundColor="#1C2A6C"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    style={{}}
                />
                </View>
                <View style={{width:'60%'}}>
                <Text style={{ fontSize:10, color:'#FFFFFF', textAlign:'center', marginTop:'5%'}}>*By turning on volunteer mode, you agree to receive push notifications whenever you enter a zone with handicapped users nearby.</Text>
                </View>


              
            </View>
            <View style={{width:'100%', height:90, backgroundColor:'#FFF', bottom:0, position:'absolute'}}>
              <View style={{flexDirection:'row', justifyContent:'space-around', paddingVertical:'5%'}}>
                <View>
                <Icon name="explore" color="#9A9A9A" size={30}></Icon>
                <Text style={{color:"#9A9A9A", fontSize:10}}>Explore</Text>
                </View>
                <View>
                <Icon name="calendar-check" type="material-community" color="#9A9A9A" size={30}></Icon>
                <Text style={{color:'#9A9A9A', fontSize:10}}>Activity</Text>
                </View>
                <View>
                <Icon name="user" type="feather" color="#9A9A9A" size={30}></Icon>
                <Text style={{color:'#9A9A9A', fontSize:10}}>Profile</Text>
                </View>
                
              </View>
            </View>
        </View>
    );

}
async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Handicare ♿",
        body: 'A handicapped individual is within a 0.3 mile radius. They could really use your help!',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
  }
  
  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

const styles = StyleSheet.create({
    container: {
        height: '100%',
        position: 'relative',
        backgroundColor: '#3348A7'
    },
    header: {
        height: '55%',
        width: '100%',
        marginTop: '-5%',
        resizeMode: 'contain',
        alignSelf: 'center'
    },

});