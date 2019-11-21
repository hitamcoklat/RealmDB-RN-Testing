import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity
} from 'react-native';
import {createHeroDB, getAllHeroesDB} from '../controllers/HeroController';

export default class HomeView extends Component {

    constructor(props) {
        super(props);
        this.state = {
          heroName: '',
          statusRealm: '',
        };
    } 

    createHero = () => {
        // console.log(this.state.heroName);
        let createHero = createHeroDB(this.state.heroName)
        console.log(createHero)
    }

    lihatListHero = () => {
        let getAllHeroes = getAllHeroesDB()
        console.log(Array.from(getAllHeroes.result));
    }

    render() {
        return (
          <View style={{marginHorizontal: 20, marginTop: 10}}>
            <View style={{marginBottom: 10}}>
              <Text style={{fontWeight: 'bold'}}>Hero Name: </Text>
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
                style={{
                  flex: 1,
                  backgroundColor: 'pink',
                  height: '100%',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}
                onPress={this.createHero}>
                <Text>Create</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 20}}>
              <Button
                style={{ marginTop: 10 }}
                onPress={() => this.props.navigation.navigate('SearchHero')}
                color="#32a7fb"
                title="List / Search Hero"
              />
            </View>
          </View>
        );
    }
}
