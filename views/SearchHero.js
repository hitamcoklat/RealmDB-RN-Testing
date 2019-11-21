import React, { Component } from 'react'
import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import {getHeroByName} from '../controllers/HeroController';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

export default class SearchHero extends Component {

    constructor(props) {
        super(props);
        this.state = {
          heroName: '',
          listHero: []
        };
    }

    searchHero = () => {
        let heroName = this.state.heroName;
        let resultHero = getHeroByName(heroName)
        this.setState({listHero: resultHero.result});
    }

    renderRow = ({item, index}) => {
      return (
        <View>
          <View style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#CCC', paddingVertical: 5}}>
            <View style={{flexDirection: 'row'}}>
              <IconMaterialCommunityIcons
                style={{marginHorizontal: 5}}
                color="red"
                name="delete-circle"
                size={30}
              />
              <IconFontAwesome
                style={{marginHorizontal: 5}}
                name="edit"
                color="green"
                size={30}
              />
            </View>
            <View>
              <Text style={{fontSize: 17}}>
                {item.heroName}
              </Text>
            </View>
          </View>
        </View>
      );
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
            <View style={{marginTop: 20}}>
              <Text style={{fontWeight: 'bold'}}>Result:</Text>
            </View>
            <View style={{marginBottom: 10}}>
              <FlatList
                data={this.state.listHero}
                renderItem={this.renderRow}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        );
    }
}
