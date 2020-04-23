import React, {Component} from 'react';
import { RefreshControl, View, StyleSheet, Text, ScrollView, AsyncStorage, Image, TouchableOpacity } from 'react-native';
import { getDataAPI } from '../../services';
import { CardSurah } from '../../components';

class Penanda extends Component {
    constructor (props) {
        super(props)
        this.array = [];
        this.state = {
            cekSurah: false,
            surah: [],
            refreshing: false
        };
    }  
    getDataSurah = async () =>{
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
              // We have data!!
              var root = `https://api.salimseal.com/quran/?aksi=retrieveHistory&device_id=${value}`;
              const res = await getDataAPI(root, null).catch(err => err);
              if((res).length >= 1){
                this.setState({
                    surah: res
                })
              } else {
                this.setState({
                    surah: 'null'
                })
              }
              
            }
          } catch (error) {
            // Error retrieving data
            console.log('errror')
          }
    }

    async componentDidMount(){
        this.setState({cardSurahLoader: true});
        this.getDataSurah();
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this.getDataSurah();
    }
    render(){
        const test = () => {
            console.log("cek> ",this.state.surah)
        }
        this.getDataSurah();
        return(
            <View style={{flex:1, backgroundColor:'white'}}>
                <View style={{backgroundColor:'#353839'}}>
                    <View style={{marginHorizontal: 20,flexDirection: 'row', paddingTop: 16, paddingBottom: 10}}>
                        <TouchableOpacity onPress={() => test()}>
                        <Text style={{fontSize:15,fontWeight:'bold', color: '#fff'}}>Penanda</Text>

                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.card__body}>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)}/>
                      }
                    >
                    {
                        (this.state.surah).length >= 1 ?  (
                            <>
                            {
                                    this.state.surah.map((v,i) => {
                                        return (
                                            <View key={i} style={{flex:1}}>
                                            <CardSurah key1={i} key2={i} nomor={v.id_surah} nama_surah={v.nama_surah} jenis_surah={v.jenis_surah} jumlah_ayat={v.jumlah_ayat} date={v.date} />
                                            </View>
                                        )
                                    })
                                }
                            </>
                        ) : (
                            <View style={{ alignItems:'center', justifyContent:'center', backgroundColor:'white', alignContent: 'center'}}>
                                <Image source={require('../../assets/illustration/not-found.png')} style={{width:200, height: 200}} />
                            </View>
                        ) 
                            
                        }       
                   
                    <View style={{height:10}} />
                </ScrollView>
                
                </View>
            </View>
        )    
    }
}

const styles = StyleSheet.create({
    card__body: {
        flex:1,
    },
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

export default Penanda;