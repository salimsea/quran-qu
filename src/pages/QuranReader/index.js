import React, { Component } from 'react';
import { Image, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import ContentLoader, { Rect, List  } from 'react-content-loader/native';
import { getDataAPI } from '../../services/';

export default class QuranReader extends Component {
  constructor (props) {
      super(props)
      this.array = [];
      this.state = {
          ayat: [],
      };
  }  

  getDataAyat = async () =>{
    var root = `https://api.salimseal.com/quran/?aksi=retrieveAyatById&id=${this.props.route.params.surahId}`;
    const res = await getDataAPI(root, null).catch(err => err);
    this.setState({
        ayat: res,
    })
  }

  async componentDidMount(){
     this.getDataAyat();
  }

  UNSAFE_componentWillMount() {
      for (var i = 1; i <= 5; i++) {
        this.array.push(i);
      }
  }
  render() {
    const { surahId, namaSurah, jenisSurah, jumlahAyat } = this.props.route.params;
    const back = () => {
      this.props.navigation.goBack()
    }
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'white', flex:1}}>
        
        <View style={{flexDirection:'row', height:50,elevation:5, backgroundColor:'#fefefe'}}>
          <View style={{justifyContent:'center', marginLeft:10, marginRight:10}}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image source={require('../../assets/icon/back.png')} style={{width:30, height:30}} />
            </TouchableOpacity>
          </View>
          <View style={{justifyContent:'center'}}>
            <Text style={{fontSize: 15}}>{namaSurah}</Text>
            <Text style={{fontSize: 10}}>{jenisSurah} - {jumlahAyat} Ayat</Text>
          </View>
        </View>
        
        <View style={{alignItems:'center'}}>
          {/* <Text style={{fontSize: 15, fontWeight:'bold',color:'#353839', fontFamily: 'LPMQ'}}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</Text> */}
        </View>
        <View style={{margin:5}}>
          {
             (this.state.ayat).length >= 3 ? (
                <>
                {
                      this.state.ayat.map(v => {
                          return (
                              <View key={v} style={{borderBottomColor: '#E8E9ED', borderBottomWidth: 1}}>
                                <View style={{flexDirection: 'row', paddingHorizontal: 16, marginTop:15, justifyContent:'space-between', top: 0, left: 0, width: '100%'}}>
                                  <View style={{width: 40, height: 40, backgroundColor: '#fefefe', borderRadius: 35, alignItems:'center', justifyContent:'center', borderColor: '#f0f0f0',borderWidth:2}}>
                                      <Text style={{fontSize:13, color:'#353839'}}>{v.nomor}</Text>
                                  </View>
                                    <View style={{ width: '80%'}}>
                                        <Text style={{fontSize: 20, fontWeight:'500',color:'#353839', fontFamily: 'LPMQ'}}>{v.ayat}</Text>
                                        <Text style={{fontSize: 15, fontWeight:'500',color:'#353839'}}>{v.terjemahan}</Text>
                                        <View style={{height:20}} />
                                    </View>
                                </View>
                              </View>
                          )
                      })
                    }
                </>
            ) : (
              <>
              {
                  this.array.map((item, key) =>
                  (
                    <View key={key} style={{margin: 20, alignItems:'flex-start'}}>
                    <List />
                    </View>
                  ))
              }
              </>
              
          )
          }
          
        </View>
      </ScrollView>
    );
  }
}
