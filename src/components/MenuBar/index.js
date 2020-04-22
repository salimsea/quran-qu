import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MenuBar = () => {
    const navigation = useNavigation();
    return(
        <View style={{height: 54, flexDirection: 'row', backgroundColor: 'white', borderTopColor: '#E8E9ED', borderTopWidth: 1}}>
            <TouchableOpacity style={{flex:1}} onPress={() => navigation.navigate('Dashboard')}>
                <View style={{flex: 1, alignItems:'center', justifyContent: 'center'}}>
                    <Image style={{width: 26, height: 26}} source={require('../../assets/icon/home.png')} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:1}} onPress={() => alert('ga ada')}>
                <View style={{flex: 1, alignItems:'center', justifyContent: 'center'}}>
                    <Image style={{width: 26, height: 26}} source={require('../../assets/icon/love.png')} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:1}} onPress={() => navigation.navigate('Quran')}>
                <View style={{flex: 1, alignItems:'center', justifyContent: 'center'}}>
                    <View style={{width: 70, height:70, alignItems:'center', justifyContent: 'center', borderRadius:50, backgroundColor: '#353839', elevation: 6}}>
                    <Image style={{width: 29, height: 29, marginBottom: 7}} source={require('../../assets/icon/book.png')} />
                    </View>
                    
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:1}} onPress={() => alert('ga ada')}>
                <View style={{flex: 1, alignItems:'center', justifyContent: 'center'}}>
                    <Image style={{width: 26, height: 26}} source={require('../../assets/icon/inbox.png')} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:1}} onPress={() => alert('ga ada')}>
                <View style={{flex: 1, alignItems:'center', justifyContent: 'center'}}>
                    <Image style={{width: 26, height: 26}} source={require('../../assets/icon/info.png')} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default MenuBar;