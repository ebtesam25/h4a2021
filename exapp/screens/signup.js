import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line, Circle } from 'react-native-svg';
import { Icon } from 'react-native-elements'
import { useFonts } from 'expo-font';





export default function Signup() {
    const navigation = useNavigation();
  
    
   
    return (
        <View style={styles.container}>
            <View style={{ alignSelf:'center', marginTop:'50%' }}>
              <View style={{alignSelf:'center',width:'80%'}}>
                <Text style={{ fontSize:30, color:'#FFFFFF', textAlign:'center', fontWeight:'bold', marginTop:'10%'}}>Get Started</Text>
                <Text style={{ fontSize:15, color:'#FFFFFF', textAlign:'center', marginTop:'5%'}}>By continuing, I confirm I am at least 17 years old, and I agree to and accept the Handicare+ Terms and Privacy Policy.</Text>
              </View>

              <View style={{marginTop:'20%'}}></View>

              <View style={{paddingHorizontal:'5%', paddingVertical:'5%', width:300, backgroundColor:"#1C2A6C", marginBottom:'2.5%', elevation:2, borderRadius:15, flexDirection:'row', justifyContent:'space-evenly'}}>
                  <Image source={require('../assets/g.png')}></Image>
                <Text style={{fontSize:15, color:"#FFF", textAlignVertical:'center', textAlign:'center', fontWeight:'bold'}} onPress={()=>navigation.navigate('Explore')}>Continue with Google</Text>
              </View>

              <View style={{paddingHorizontal:'5%', paddingVertical:'5%', width:300, backgroundColor:'#1C2A6C', elevation:2, borderRadius:15, flexDirection:'row', justifyContent:'space-evenly'}}>
              <Image source={require('../assets/f.png')}></Image>
                <Text onPress={()=>navigation.navigate('Volunteer')} style={{fontSize:15, color:"#FFF", textAlignVertical:'center', textAlign:'center',fontWeight:'bold'}}>Continue with Facebook</Text>
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