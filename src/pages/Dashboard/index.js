import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import {View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, TextInput, KeyboardAvoidingView} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import MenuBar from '../../components/MenuBar';

export default class Dashboard extends React.Component{
    constructor() {
        super()
        this.state = {
          entries: [],
        }
      }

      componentDidMount(){
          this.setState({
            entries: [
                { title: 'https://www.wisatamurahindonesia.com/image/slider/big-sale2020-01-11.jpg' },
                { title: 'https://www.wisatamurahindonesia.com/image/slider/wisatamurah2019-08-26.jpg' },
                { title: 'https://www.wisatamurahindonesia.com/image/slider/big-sale2020-01-11.jpg' },
                { title: 'https://www.wisatamurahindonesia.com/image/slider/wisatamurah2019-08-26.jpg' },
              ]
          })
          console.log('sukses', this.state.entries)
      }

      _renderItem ({item, index}) {
        return (
          <View style={{flex: 1, elevation: 20}}>
              {/* <Text style={styles.title}>{ item.title }</Text> */}
              <Image style={{ height: 120, borderRadius:20, elevation: 20  }} source={{uri: item.title}} />
          </View>
      );}
    render(){
        return(
            <View style={{flex:1}}>
                <View style={{backgroundColor:'#353839'}}>
                    <View style={{marginHorizontal: 17,flexDirection: 'row', paddingTop: 16, paddingBottom: 10}}>
                        <View style={{position: 'relative', flex: 1}}>
                            <TextInput style={{borderWidth: 1, borderColor: '#E8E8E8', borderRadius: 25, height: 40, fontSize: 14, paddingLeft: 45, paddingRight: 20, backgroundColor: 'white', marginRight: 18}} placeholder="Cari Surah..." />
                            <Image source={require('../../assets/icon/search.png')} style={{position: 'absolute', top: 10, left: 12, height: 20, width:20}}/>
                        </View>
                        <View style={{width: 35, alignItems: 'center', justifyContent: 'center'}}>
                            <Image source={require('../../assets/icon/setting.png')} style={{position:'absolute', width:25,height: 25}} />
                        </View>
                    </View>
                </View>
                
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.card__body}>
                        <View>

                        </View>
                        <View style={{marginVertical: 10, height: 180, alignItems:'center'}}>
                            <View>
                                <Carousel
                                    layout={'stack'}
                                    autoplay
                                    autoplayInterval={5000}
                                    loop={true}
                                    ref={(c) => { this._carousel = c; }}
                                    data={this.state.entries}
                                    renderItem={this._renderItem}
                                    sliderWidth={Dimensions.get('window').width-10}
                                    itemWidth={Dimensions.get('window').width-100}
                                    style={{elevation: 20}}
                                />
                            </View>
                        </View>
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
});