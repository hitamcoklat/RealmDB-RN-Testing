import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, Button, ScrollView } from 'react-native';
import {
  getHeroByName,
  getAllHeroesDB,
  deleteHeroById,
  createHeroDB,
  getHeroById,
  updateHero
} from '../controllers/HeroController';
import { HeaderBackButton } from 'react-navigation';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

export default class HomeView extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'List Hero App',
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTintColor: 'black',
      headerTitleStyle: {
        fontWeight: 'normal',
      }
    }
  };  

  constructor(props) {
    super(props);
    this.state = {
      idHero: '',
      heroName: '',
      listHero: [],
      editButton: false
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  searchHero = () => {
    if (this.state.heroName == '') {
      return this._fetchData()
    }
    let heroName = this.state.heroName;
    let resultHero = getHeroByName(heroName)
    this.setState({ listHero: resultHero.result });
  }

  createHero = () => {
    // console.log(this.state.heroName);
    let createHero = createHeroDB(this.state.heroName)
    this._fetchData();
    this.setState({ heroName: '' })
  }
  
  editHero = (id) => {
    let dataHero = getHeroById(id).result;
    this.setState({ idHero: dataHero.id, heroName: dataHero.heroName, editButton: true })
    console.log(dataHero)
  }

  editHeroProses = () => {
    var hero = {
      id: this.state.idHero,
      heroName: this.state.heroName
    };
    let prosesUpdate = updateHero(hero);
    this._fetchData()
    console.log(prosesUpdate)
  }
  
  cancelEditHero = () => {
    this.setState({ editButton: false, idHero: '', heroName: '' })
  }
  
  deleteHero = (id, heroName) => {
    Alert.alert(
      'Info',
      'Apakah anda yakin ingin menghapus hero ini?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => {
          deleteHeroById(id)
          this._fetchData()
        } },
      ],
      { cancelable: true }
      )
  }

  _fetchData = () => {
    let resultHero = getAllHeroesDB();
    this.setState({ listHero: Array.from(resultHero.result) });
  }

  renderButton = (editStatus) => {
    console.log('status edit = ' + editStatus)
    return (
      <View>
        {editStatus == false ? <View style={{ marginTop: 20 }}>
          <Button
            style={{ marginTop: 10 }}
            onPress={this.createHero}
            color="#32a7fb"
            title="Tambah Hero"
          />
        </View> : <View style={{ marginTop: 20, flexDirection: 'row', alignContent: 'stretch' }}>
            <Button
              style={{ marginTop: 10}}
              color="red"
              onPress={() => this.cancelEditHero()}
              title="Cancel"
            />
            <Button
              onPress={() => this.editHeroProses()}
              style={{ marginTop: 10 }}
              color="#32a7fb"
              title="Edit Hero"
            />            
          </View>}
      </View>
    )
  }

  renderRow = ({ item, index }) => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#CCC',
            paddingVertical: 5,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => this.deleteHero(item.id)}>
              <IconMaterialCommunityIcons
                style={{ marginHorizontal: 5 }}
                color="red"
                name="delete-circle"
                size={30}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.editHero(item.id)}>
              <IconFontAwesome
                style={{ marginHorizontal: 5 }}
                name="edit"
                color="green"
                size={30}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{ fontSize: 17 }}>{item.heroName}</Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{ marginHorizontal: 20, marginTop: 10 }}>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>Pencarian: </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={{
              borderColor: '#000',
              borderWidth: 1,
              paddingHorizontal: 10,
              width: '80%',
            }}
            value={this.state.heroName}
            placeholder="Enter name..."
            onChangeText={text => this.setState({ heroName: text })}
          />
          <TouchableOpacity
            onPress={() => this.searchHero()}
            style={{
              flex: 1,
              backgroundColor: 'green',
              justifyContent: 'center',
              alignItems: 'center',
              borderTopWidth: 1,
              borderRightWidth: 1,
              borderBottomWidth: 1,
              borderColor: 'black'
            }}>
            <Text style={{fontWeight: 'bold', color: 'white'}}>Cari</Text>
          </TouchableOpacity>
        </View>
        {this.renderButton(this.state.editButton)}
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>Hasil:</Text>
        </View>
        <View style={{ marginBottom: 10, height: 350 }}>
          <FlatList
            style={{ backgroundColor: 'white', borderWidth: 1, borderColor: '#DEDEDE', marginHorizontal: 3, marginTop: 15, padding: 15, borderRadius: 12, flex: 1 }}          
            data={this.state.listHero}
            renderItem={this.renderRow}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}
