import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { postDataAPI } from '../../../services';

const CardSurah = (props) => {
    const navigation = useNavigation();
    const handleNavigation = () => {
        navigation.navigate('QuranReader', {
            surahId: props.nomor,
            namaSurah: props.nama_surah,
            jenisSurah: props.jenis_surah,
            jumlahAyat: props.jumlah_ayat
        })
        
        AsyncStorage.getItem('token', (error, result) => {
            var root = 'https://api.salimseal.com/quran/?aksi=addHistory';
            var bodyFormData = new FormData();
                bodyFormData.append('device_id', result);
                bodyFormData.append('surah_id', props.nomor);
            const res = postDataAPI(root, bodyFormData).catch(err => err);
        });
    }
    return(
        <View key={props.key1} style={styles.card__riwayat}>
            <TouchableOpacity 
                onPress={() => handleNavigation()}>
                <View key={props.key2} style={{margin: 15,flexDirection:'row', alignItems:'center'}}>
                    <View style={{width: 40, height: 40, backgroundColor: '#fefefe', borderRadius: 35, alignItems:'center', justifyContent:'center', borderColor: '#f0f0f0',borderWidth:2, marginRight:20}}>
                        <Text style={{fontSize:13, color:'#353839'}}>{props.nomor}</Text>
                    </View>
                    <View style={{width:'75%'}}>
                        <Text style={{fontSize: 12}}>{props.nama_surah}</Text>
                        {
                            props.date != null ? (<Text style={{fontSize: 12, fontWeight:'500', color:'#014871'}}>{props.date} dilihat </Text>)
                            :(<Text style={{fontSize: 12, fontWeight:'500', color:'#014871'}}>{props.jenis_surah} - {props.jumlah_ayat} Ayat</Text>)
                        }
                        
                    </View>
                    <View style={{alignItems:'center', justifyContent:'center'}}>
                       <Image source={require('../../../assets/icon/arrow-right.png')} style={{width:10,height:10}} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    card__riwayat: {
        height: 70, 
        backgroundColor: 'white', 
        flexDirection:'row', 
        alignItems:'center', 
        elevation: 5, 
        borderRadius: 5, 
        marginTop: 5,
        marginHorizontal: 20
    }
});

export default CardSurah;