import React, { useState, useEffect, useRef } from 'react';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { StyleSheet, Text, View, Image, Button, ImageBackground, Switch, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line, Circle } from 'react-native-svg';
import { Icon } from 'react-native-elements'
import { useFonts } from 'expo-font';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DATA from '../DATA.json';
import MapView from 'react-native-maps';




export default function Parks() {
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

    const destinations = [{"name":"Parks","bg":require('../assets/parks.png')},{"name":"Restaurants","bg": require('../assets/restaurants.png')},{"name":"Shops","bg":require('../assets/shops.png')},{"name":"Attractions","bg":require('../assets/parks.png')}]


   
    return (
        <View style={styles.container}>
           
            <View style={{ alignSelf:'center', backgroundColor:"#1C2A6C", width:'100%', paddingTop:'5%', paddingBottom:'5%' }}>

            

              <View style={{alignSelf:'center',width:'80%', flexDirection:'row', paddingTop:'10%'}}>
                  <Icon name="chevron-left" type="entypo" color="#FFF"></Icon>
                <Text style={{ fontSize:20, color:'#FFFFFF', textAlign:'center', fontWeight:'bold'}}>Parks</Text>
              </View>
            </View>

            <View><MapView
                initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
                style={{width:450, height:400}}
            />
             </View>

             <Text style={{ fontSize:20, color:'#FFFFFF', textAlign:'left', fontWeight:'bold', marginHorizontal:'2.5%', marginTop:'5%'}}>Parks Nearby</Text>

             <TouchableOpacity onPress={()=>navigation.navigate('ParkDetails')}><View style={{backgroundColor:"#1C2A6C", paddingHorizontal:'10%', paddingVertical:'1.5%', flexDirection:'row', marginTop:'5%'}}>
                 <View style={{backgroundColor:"#27A745", borderRadius:100, width:30, height:30, marginTop:'5%'}}><Icon name="thumbs-up" type="entypo" color="#FFF"></Icon></View>
                 <View style={{marginTop:'2.5%', marginLeft:'2.5%'}}><Text style={{color:"#FFF", fontWeight:'bold'}}>{DATA.data.parks[0].name}</Text>
                 <Text style={{color:"#FFF", fontSize:12}}>{DATA.data.parks[0].address}</Text>
                 <Text style={{color:"#FFF", fontSize:10}}>{DATA.data.parks[0].distance} mi away</Text></View>
             </View></TouchableOpacity>
             <View style={{backgroundColor:"#1C2A6C", paddingHorizontal:'10%', paddingVertical:'1.5%', flexDirection:'row', marginTop:'1.5%'}}>
                 <View style={{backgroundColor:"#F16051", borderRadius:100, width:30, height:30, marginTop:'5%'}}><Icon name="thumbs-down" type="entypo" color="#FFF"></Icon></View>
                 <View style={{marginTop:'2.5%', marginLeft:'2.5%'}}><Text style={{color:"#FFF", fontWeight:'bold'}}>{DATA.data.parks[1].name}</Text>
                 <Text style={{color:"#FFF", fontSize:12}}>{DATA.data.parks[1].address}</Text>
                 <Text style={{color:"#FFF", fontSize:10}}>{DATA.data.parks[1].distance} mi away</Text></View>
             </View>



            <View style={{width:'100%', height:90, backgroundColor:'#FFF', bottom:0, position:'absolute'}}>
              <View style={{flexDirection:'row', justifyContent:'space-around', paddingVertical:'5%'}}>
                <View>
                <Icon name="explore" color="#353958" size={30}></Icon>
                <Text style={{color:"#353958", fontSize:10}}>Explore</Text>
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