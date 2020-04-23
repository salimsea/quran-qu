import React, {Component} from 'react';
import { RefreshControl, View, StyleSheet, Text, ScrollView } from 'react-native';
import { getDataAPI } from '../../services/';
import { CardSurah } from '../../components/';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';


const CardSurahLoader = () => {
    return(
        <View style={styles.card__riwayat}>
            <ContentLoader viewBox="0 0 380 70">
             <Circle cx="45" cy="35" r="20" />
             <Rect x="80" y="40" rx="3" ry="3" width="200" height="15" />
             <Rect x="80" y="17" rx="4" ry="4" width="250" height="20" />
            </ContentLoader>
        </View>
    )
}

class Quran extends Component {
    constructor (props) {
        super(props)
        this.array = [];
        this.state = {
            surah: [],
            refreshing: false,
            cardSurahLoader: false,
        };
    }  

    getDataSurah = async () =>{
        var root = 'https://api.salimseal.com/quran/?aksi=retrieveSurah';
        const res = await getDataAPI(root, null).catch(err => err);
        this.setState({
            surah: res,
            refreshing: false,
            cardSurahLoader: false
        })
    }

    async componentDidMount(){
        this.setState({cardSurahLoader: true});
        this.getDataSurah();
    }
    
    UNSAFE_componentWillMount() {
        for (var i = 1; i <= 10; i++) {
          this.array.push(i);
        }
    }

    _onRefresh() {
        this.setState({refreshing: true, cardSurahLoader: true});
        this.getDataSurah();
    }
    render(){     
        return(
            <View style={{flex:1}}>
                <View style={{backgroundColor:'#353839'}}>
                    <View style={{marginHorizontal: 20,flexDirection: 'row', paddingTop: 16, paddingBottom: 10}}>
                        <Text style={{fontSize:15,fontWeight:'bold', color: '#fff'}}>Quran Mobile</Text>
                    </View>
                </View>
                <View style={styles.card__body}>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)}/>
                      }
                    >
                   

                   
                    <View>
                        {
                            this.state.cardSurahLoader === true ? (
                                <>
                                {
                                    this.array.map((item, key) =>
                                    (
                                      <CardSurahLoader key={key}  />
                                    ))
                                }
                                </>
                                
                            ) : 
                            (this.state.surah).length >= 30 ? (
                                <>
                                {
                                        this.state.surah.map((v,i) => {
                                            return (
                                                <CardSurah key1={i} key2={i} nomor={v.id_surah} nama_surah={v.nama_surah} jenis_surah={v.jenis_surah} jumlah_ayat={v.jumlah_ayat} />
                                            )
                                        })
                                    }
                                </>
                            ) : (
                                <>
                                {
                                    this.array.map((item, key) =>
                                    (
                                      <CardSurahLoader key={key}  />
                                    ))
                                }
                                </>
                                
                            )
                        }       
                    </View>
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

export default Quran;