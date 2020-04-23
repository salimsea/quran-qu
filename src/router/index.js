import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Dashboard, Splash, Quran, QuranReader } from '../pages';

const Stack = createStackNavigator();

const Router = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Splash" 
                component={Splash}
                options={{
                    headerShown: false,
                }} 
            />
            <Stack.Screen 
                name="Dashboard" 
                component={Dashboard}
                options={{
                    headerShown: false,
                }} 
            />
            <Stack.Screen 
                name="Quran" 
                component={Quran}
                options={{
                    headerShown: false,
                }} 
            />
            <Stack.Screen 
                name="QuranReader" 
                component={QuranReader}
                options={{
                    title: 'Kembali',
                    headerShown: false,
                }} 
            />
        </Stack.Navigator>
    )
}

export default Router;