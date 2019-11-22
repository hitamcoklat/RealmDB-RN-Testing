import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeView from '../views/HomeView';
import ListHero from '../views/ListHero';
import SearchHero from '../views/SearchHero';

const StackHero = createStackNavigator({
  Home: { screen: HomeView},
  ListHero: {screen: ListHero},
  SearchHero: {screen: SearchHero},
});

const StackHeroContainer = createAppContainer(StackHero);

export default class App extends Component {
  render() {
    return <StackHeroContainer />;
  }
}