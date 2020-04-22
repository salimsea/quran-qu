import React, {Component} from 'react';
import { RefreshControl, View, StyleSheet, Dimensions, TextInput, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { getDataAPI } from '../../services/';
import MenuBar from '../../components/MenuBar';
import { useNavigation } from '@react-navigation/native';
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

const CardSurah = (props) => {
    const navigation = useNavigation();
    return(
        <View key={props.key} style={styles.card__riwayat}>
            <TouchableOpacity 
                onPress={() => navigation.navigate('QuranReader', {
                surahId: props.nomor,
                namaSurah: props.nama_surah,
                jenisSurah: props.jenis_surah
                })
                }>
                <View style={{margin: 25,flexDirection:'row', alignItems:'center'}}>
                    <View style={{width:'20%'}}>
                        <Text style={{fontSize: 26, fontWeight:'500'}}>{props.nomor}</Text>
                    </View>
                    <View style={{width:'80%'}}>
                        <Text style={{fontSize: 12}}>{props.nama_surah}</Text>
                        <Text style={{fontSize: 12, fontWeight:'500', color:'#014871'}}>{props.jenis_surah} - {props.jumlah_ayat} Ayat</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

class Quran extends Component {
    constructor() {
        super();
        this.array = [];
      }
    state = {
        surah: [],
        refreshing: false,
        cardSurahLoader: false,
    }

    getDataSurah = async () =>{
        var root = 'https://api.salimseal.com/quran/?aksi=retrieveAll';
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
        console.log("result => ",this.state.res);
    }
    
    componentWillMount() {
        for (var i = 1; i <= 8; i++) {
          this.array.push(i);
        }
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this.getDataSurah();
    }
    render(){       
        return(
            <View style={{flex:1}}>
                <View style={{backgroundColor:'#353839'}}>
                    <View style={{marginHorizontal: 20,flexDirection: 'row', paddingTop: 16, paddingBottom: 10}}>
                        <View style={{position: 'relative', flex: 1}}>
                            <TextInput style={{borderWidth: 1, borderColor: '#E8E8E8', borderRadius: 25, height: 40, fontSize: 14, paddingLeft: 45, paddingRight: 20, backgroundColor: 'white', marginRight: 18}} placeholder="Cari Surah..." />
                            <Image source={require('../../assets/icon/search.png')} style={{position: 'absolute', top: 10, left: 12, height: 20, width:20}}/>
                        </View>
                        <View style={{width: 35, alignItems: 'center', justifyContent: 'center'}}>
                            <Image source={require('../../assets/icon/setting.png')} style={{position:'absolute', width:25,height: 25}} />
                        </View>
                    </View>
                </View>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)}/>
                      }
                    >
                    <View style={styles.card__body} />
                    <View style={{marginTop: -290}}>
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
                            this.state.surah != null ? (
                                <>
                                {
                                        this.state.surah.map(note => {
                                            return (
                                                <CardSurah key={note} nomor={note.id_surah} nama_surah={note.nama_surah} jenis_surah={note.jenis_surah} jumlah_ayat={note.jumlah_ayat} />
                                                // <CardRiwayat key={note} aplikasi={note.Cr.ProjectTitle} permintaan={note.Cr.Description} />              
                                            )
                                        })
                                    }
                                </>
                            ) : null
                        }       
                    </View>
                </ScrollView>
                <MenuBar />
            </View>
        )    
    }
}

const styles = StyleSheet.create({
    card__body: {
        width:Dimensions.get('window').width, 
        height:300, 
        backgroundColor: '#353839', 
        borderBottomEndRadius: 150,
        elevation: 5
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