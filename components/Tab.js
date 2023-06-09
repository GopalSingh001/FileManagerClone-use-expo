import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Music from '../screens/Music';
import Videos from '../screens/Videos';
import Images from '../screens/Images';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const Tabs=createMaterialBottomTabNavigator();


const Tab = () => {
  return (
    <Tabs.Navigator
    initialRouteName='Music'
    barStyle={{ backgroundColor: '#f9f9f9'}}
    activeColor='black'
    shifting='true'
    inactiveColor='red'>
        <Tabs.Screen 
        name='Music' 
        component={Music}
        options={{
            tabBarLabel: 'Music',
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="music" color={color} size={26} />
            ),
        }}
        />
        <Tabs.Screen 
        
        name='Videos' 
        component={Videos}
        options={{
            tabBarLabel: 'Videos',
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="video" color={color} size={26} />
            ),
        }}/>
        <Tabs.Screen
        
        name='Images' 
        component={Images}
        options={{
            tabBarLabel: 'Images',
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="file-image" color={color} size={26} />
            ),
        }}/>

     </Tabs.Navigator>
  );
}

export default Tab;
