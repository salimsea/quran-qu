import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, Platform, Animated, ScrollView, } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';

const HEADER_MIN_HEIGHT = 50;
const HEADER_MAX_HEIGHT = 200;

export default class QuranReader extends Component {

  constructor() {
    super();

    this.scrollYAnimatedValue = new Animated.Value(0);

    this.array = [];
  }
  state = {
    loading: true
  }
  
  componentDidMount(){
    setTimeout(() => {this.setState({
      loading: false
    });},3000)
  }

  componentWillMount() {
    for (var i = 1; i <= 3; i++) {
      this.array.push(i);
    }
  }

  render() {

    const headerHeight = this.scrollYAnimatedValue.interpolate(
      {
        inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp'
      });

    const headerBackgroundColor = this.scrollYAnimatedValue.interpolate(
      {
        inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
        outputRange: ['#353839', '#353839'],
        extrapolate: 'clamp'
      });

    const { surahId, namaSurah, jenisSurah } = this.props.route.params;

    return (
      <View style={styles.container} >
        <ScrollView
          contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }]
          )}>
           
          {
            this.array.map((item, key) =>
              (
                <View key={key} style={styles.item}>
                   <ContentLoader viewBox="0 0 380 70">
                     <Circle cx="30" cy="30" r="30" />
                    <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
                    <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
                  </ContentLoader>
                </View>
              ))
          }
            <SkeletonContent
                containerStyle={styles.skeleton}
                isLoading={this.state.loading}
                layout={[
                { key: "title" , width: 350, height: 100, margin: 20 },
                { key: "description", width: 350, height: 200, margin: 20 },
                ]}
                >

                <Text style={styles.text}>
                Cultivated who resolution connection motionless did occasional. Journey promise if it colonel.
                </Text>

                <Text style={styles.text}>
                Can all mirth abode nor hills added. Them men does for body pure. Far end not horses remain sister. Mr parish is to he answer roused piqued afford sussex.
                It abode words began enjoy years no do ﻿no. Tried spoil as heart visit blush or.
                </Text>

            </SkeletonContent>
            
        </ScrollView>

        <Animated.View style={[styles.animatedHeaderContainer, { height: headerHeight, backgroundColor: headerBackgroundColor }]}>
          <Text style={styles.headerText}>{namaSurah} - {jenisSurah}</Text>
        </Animated.View>

      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "white"
    },
    animatedHeaderContainer: {
      position: 'absolute',
      top: (Platform.OS == 'ios') ? 20 : 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center'
    },
    headerText: {
      color: 'white',
      fontSize: 15
    },
    item: {
      backgroundColor: '#fefefe',
      borderRadius: 20,
      elevation: 5,
      margin: 8,
      height: '100%',
      maxHeight: 100,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10
    },
    itemText: {
      margin: 20,
      color: 'black',
      fontSize: 14
    },
    skeleton:{
    flex: 1,
    width: '100%'
    },
    text: {
      fontSize: 18,
      margin: 20
    }
    
  });
  