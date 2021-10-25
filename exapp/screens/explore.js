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



export default function Explore() {
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


    const destTypes = () => {
        return destinations.map(function(dest, i){
          return(
            <View key = {i} style={{marginVertical:'5%', elevation:2}}>
                  <ImageBackground source={dest.bg} imageStyle={{resizeMode:'cover',width:245, height:75, opacity:0.3, borderRadius:20}} style={{borderColor:'#FFF', borderWidth:2, borderRadius:20, height:80}}>
                  <TouchableOpacity onPress={()=>navigation.navigate(dest.name)}><Text style={{fontWeight:'bold', textAlign:'center', textAlignVertical:'center', color:"#FFF", marginTop:'12%'}}>{dest.name}</Text></TouchableOpacity>
                  </ImageBackground>
              </View>
          );
        });
      }

      
    
    
    
   
    return (
        <View style={styles.container}>
            <View style={{marginTop:'10%', flexDirection:'row', marginHorizontal:'10%', justifyContent:'space-evenly'}}>
                <Icon name="location-pin" type="entypo" color="#FFF" size={35} 
               ></Icon>
                <View>
                    <Text style={{color:"#FFF"}}>Location</Text>
                    <Text style={{color:"#FFF", fontWeight:'bold'}}>Washington, D.C</Text>
                </View>

                <View style={{paddingHorizontal:'5%', paddingVertical:'4.5%', width:150, backgroundColor:"#1C2A6C", marginBottom:'2.5%', elevation:2, borderRadius:15, marginLeft:'15%'}}>
                <TouchableOpacity><Text style={{fontSize:12, color:"#FFF", textAlignVertical:'center', textAlign:'center', fontWeight:'bold'}} onPress={async () => {
          await schedulePushNotification();
        }}>Ask for help!</Text></TouchableOpacity>
              </View>
            </View>
            <View style={{ alignSelf:'center', marginTop:'5%' }}>
             

              <View style={{alignSelf:'center',width:'80%'}}>
                <Text style={{ fontSize:30, color:'#FFFFFF', textAlign:'center', fontWeight:'bold', marginTop:'10%'}}>Select Destination</Text>
              </View>

            <View>
                {destTypes()}
            </View>

            


              
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