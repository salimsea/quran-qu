import React, {useEffect} from 'react';
import {View, Text ,Image} from 'react-native';

const Splash = ({navigation}) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Dashboard')
        }, 3000)
    },)
    return(
        <View style={styles.wrapper.page}>
            <Image source={require('../../assets/logo/quran.png')} style={styles.wrapper.illustration}/>
            
             <Text style={styles.text.welcome}>
                QuranQU
            </Text>
            <Image 
                source={require('../../assets/logo/load.gif')}  
                style={{width: 50, height:50, paddingTop: 55 }} 
            />
        </View>
    )
}

const styles= {
    wrapper: {
        page: {
            alignItems: 'center', 
            justifyContent: 'center', 
            flex: 1, 
            backgroundColor: '#f4f4f4'
        },
        illustration: {
            width: 130, 
            height: 130, 
            marginBottom: 10
        },
    },
    text: {
        welcome: {
            fontSize: 15, 
            // fontWeight: 'bold', 
            color: '#353839',
            marginBottom: 76
        }
    }

}

export default Splash;