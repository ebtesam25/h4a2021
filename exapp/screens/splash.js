import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line, Circle } from 'react-native-svg';
import { Icon } from 'react-native-elements'
import { useFonts } from 'expo-font';
import * as Speech from 'expo-speech';






export default function Splash() {
    const navigation = useNavigation();
    const speak = () => {
      const thingToSay = 'Welcome to Handicare';
      Speech.speak(thingToSay);
    };
  
    
   
    return (
        <View style={styles.container}>
            <View style={{ alignSelf:'center', marginTop:'50%' }}>
              <View style={{alignSelf:'center'}}>
                <Text style={{ fontSize:30, color:'#FFFFFF', textAlign:'center', fontWeight:'bold', marginTop:'10%'}} onPress={speak}>Welcome to Handicare!</Text>
                <Text style={{ fontSize:15, color:'#FFFFFF', textAlign:'center', marginTop:'5%'}}>Login as</Text>
              </View>

              <View style={{marginTop:'20%'}}></View>

              <View style={{paddingHorizontal:'5%', paddingVertical:'5%', width:300, backgroundColor:"#1C2A6C", marginBottom:'2.5%', elevation:2, borderRadius:15}}>
                <Text style={{fontSize:15, color:"#FFF", textAlignVertical:'center', textAlign:'center', fontWeight:'bold'}} onPress={()=>navigation.navigate('Signup')}>User</Text>
              </View>

              <View style={{paddingHorizontal:'5%', paddingVertical:'5%', width:300, backgroundColor:'#1C2A6C', elevation:2, borderRadius:15}}>
                <Text onPress={()=>navigation.navigate('Signup')} style={{fontSize:15, color:"#FFF", textAlignVertical:'center', textAlign:'center',fontWeight:'bold'}}>Volunteer</Text>
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
                <Text style={{color:'#9A9A9A', fontSize:10}}>Explore</Text>
                </View>
                <View>
                <Icon name="user" type="feather" color="#9A9A9A" size={30}></Icon>
                <Text style={{color:'#9A9A9A', fontSize:10}}>Explore</Text>
                </View>
                
              </View>
            </View>
        </View>
    );

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