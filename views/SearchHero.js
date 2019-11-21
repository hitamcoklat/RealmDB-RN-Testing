import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import {getHeroByName} from '../controllers/HeroController';

export default class SearchHero extends Component {

    constructor(props) {
        super(props);
        this.state = {
          heroName: '',
        };
    }

    searchHero = () => {
        let heroName = this.state.heroName;
        let resultHero = getHeroByName(heroName)
        console.log(resultHero);
    }

    render() {
        return (
          <View style={{marginHorizontal: 20, marginTop: 10}}>
            <View style={{marginBottom: 10}}>
              <Text style={{fontWeight: 'bold'}}>Search Hero By Name: </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={{
                  borderColor: '#000',
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  width: '80%',
                }}
                placeholder="Enter name..."
                onChangeText={text => this.setState({heroName: text})}
              />
              <TouchableOpacity
                onPress={() => this.searchHero()}
                style={{
                  flex: 1,
                  backgroundColor: 'pink',
                  height: '100%',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <Text>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
    }
}
