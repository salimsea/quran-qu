import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Quran from '../Quran';
import {useNetInfo} from "@react-native-community/netinfo";
import { Penanda } from '..';

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row', backgroundColor:'#fefefe', height:50,alignItems:'center', borderTopWidth:2, borderTopColor:'#E8E9ED' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems:'center' }}
          >
              {
                  label === 'Home' ? (<Image style={{width: 26, height: 26}} source={require('../../assets/icon/home.png')} />) 
                  : label === 'Settings' ? (<Image style={{width: 26, height: 26}} source={require('../../assets/icon/love.png')} />) 
                  : null
              }
            
            {/* <Text style={{ color: isFocused ? '#673ab7' : '#222'}}>
              {label}
            </Text> */}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

const YourComponent = () => {
  const netInfo = useNetInfo();
  return (
    <View style={{alignItems:'center', backgroundColor:'red'}}>
      <View style={{margin:10}}>
      <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>Tidak ada koneksi internet</Text>
      </View>
      
    </View>
  );
};

export default function Dashboard() {
  const netInfo = useNetInfo();
  return (
    <>
    {
      netInfo.isConnected.toString() === "false" ? (<YourComponent />) : null
    }
      
      <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen name="Home" component={Quran} />
        <Tab.Screen name="Settings" component={Penanda} />
      </Tab.Navigator>
    </>
  );
}
