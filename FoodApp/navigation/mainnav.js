import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Product from '../screens/Product'
import ProductDetail from '../screens/ProductDetail'
import BottomTabs from './BottomTabs'

const Stack = createStackNavigator();
const stackNavigatorOptions = {
  headerShown: false
}

function mainnav () {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={stackNavigatorOptions}>
                <Stack.Screen name="Product" component={Product} />
                <Stack.Screen name="ProductDetail" component={ProductDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default mainnav

const styles = StyleSheet.create({})
