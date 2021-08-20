import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Animated } from 'react-native'
import { icons, COLORS, SIZES, FONTS } from '../constants'

const ProductDetail = ({ route, navigation }) => {
    const scrollX = new Animated.Value(0);
    const [data, setData] = React.useState([]);
    const [orderItems, setOrderItems] = React.useState([]);
    React.useEffect(() => {
        let { data } = route.params;
        setData(data)
    }, [data])
    function editOrder(action, menuId, price) {
        let orderList = orderItems.slice()
        let item = orderList.filter(a => a.menuId == menuId)

        if (action == "+") {
            if (item.length > 0) {
                let newQty = item[0].qty + 1
                item[0].qty = newQty
                item[0].total = item[0].qty * price
            } else {
                const newItem = {
                    menuId: menuId,
                    qty: 1,
                    price: price,
                    total: price
                }
                orderList.push(newItem)
            }

            setOrderItems(orderList)
        } else {
            if (item.length > 0) {
                if (item[0]?.qty > 0) {
                    let newQty = item[0].qty - 1
                    item[0].qty = newQty
                    item[0].total = newQty * price
                }
            }

            setOrderItems(orderList)
        }
    }
    function getOrderQty(menuId) {
        let orderItem = orderItems.filter(a => a.menuId == menuId)

        if (orderItem.length > 0) {
            return orderItem[0].qty
        }

        return 0
    }

    function getBasketItemCount() {
        let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0)

        return itemCount
    }

    function sumOrder() {
        let total = orderItems.reduce((a, b) => a + (b.total || 0), 0)

        return total.toFixed(2)
    }
    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.back}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>

                {/* Restaurant Name Section */}
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <View
                        style={{
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: SIZES.padding * 3,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.lightGray3
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>{data.nameProduct}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingRight: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        source={icons.list}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
    function renderFoodInfo() {
        return (
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: scrollX } } }
                ], { useNativeDriver: false })}
            >
                <View
                    style={{ alignItems: 'center' }}
                >
                    <View style={{ height: SIZES.height * 0.35 }}>
                        {/* Food Image */}
                        <Image
                            source={{ uri: "http://10.0.2.2:3001/images/" + data.img }}
                            resizeMode="cover"
                            style={{
                                width: SIZES.width,
                                height: "100%"
                            }}
                        />

                        {/* Quantity */}
                        <View
                            style={{
                                position: 'absolute',
                                bottom: - 20,
                                width: SIZES.width,
                                height: 50,
                                justifyContent: 'center',
                                flexDirection: 'row'
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    width: 50,
                                    backgroundColor: COLORS.white,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderTopLeftRadius: 25,
                                    borderBottomLeftRadius: 25
                                }}
                                onPress={() => editOrder("-", data.menuId, data.price)}
                            >
                                <Text style={{ ...FONTS.body1 }}>-</Text>
                            </TouchableOpacity>

                            <View
                                style={{
                                    width: 50,
                                    backgroundColor: COLORS.white,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Text style={{ ...FONTS.h2 }}>{getOrderQty(data.menuId)}</Text>
                            </View>

                            <TouchableOpacity
                                style={{
                                    width: 50,
                                    backgroundColor: COLORS.white,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderTopRightRadius: 25,
                                    borderBottomRightRadius: 25
                                }}
                                onPress={() => editOrder("+", data.menuId, data.price)}
                            >
                                <Text style={{ ...FONTS.body1 }}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Name & Description */}
                    <View
                        style={{
                            width: SIZES.width,
                            alignItems: 'center',
                            marginTop: 15,
                            paddingHorizontal: SIZES.padding * 2
                        }}
                    >
                        <Text style={{ marginVertical: 10, textAlign: 'center', ...FONTS.h2 }}>{data.nameProduct} - {data.price}đ</Text>
                        <Text style={{ ...FONTS.body3 }}>{data.description}</Text>
                    </View>
                </View>
            </Animated.ScrollView>
        )
    }
    function renderOrder() {
        return (
            <View>
                <View
                    style={{
                        backgroundColor: COLORS.white,
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: SIZES.padding * 2,
                            paddingHorizontal: SIZES.padding * 3,
                            borderBottomColor: COLORS.lightGray2,
                            borderBottomWidth: 1
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>{getBasketItemCount()} items in Cart</Text>
                        <Text style={{ ...FONTS.h3 }}>{sumOrder()}đ</Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: SIZES.padding * 2,
                            paddingHorizontal: SIZES.padding * 3
                        }}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                source={icons.pin}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.darkgray
                                }}
                            />
                            <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>Location</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                source={icons.master_card}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.darkgray
                                }}
                            />
                            <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>8888</Text>
                        </View>
                    </View>

                    {/* Order Button */}
                    <View
                        style={{
                            padding: SIZES.padding * 2,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.9,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.primary,
                                alignItems: 'center',
                                borderRadius: SIZES.radius
                            }}
                            onPress={() => console.log('Order')}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }
    //     return (
    //         <View style={{ flex: 1 }}>
    //             <View style={{ 
    //                     flexDirection: 'row',
    //                     paddingHorizontal: 12,
    //                     height: 80,
    //                     alignItems: 'flex-end'
    //                 }}>
    //                     <TouchableOpacity
    //                         style={{ marginLeft: 8 }}
    //                         onPress={() => navigation.goBack()}
    //                     >
    //                         <Image
    //                             source={require('../icons/back_arrow_icon.png')}
    //                             resizeMode="contain"
    //                             style={{ 
    //                                 width: 25,
    //                                 height: 25,
    //                                 tintColor: '#000'
    //                             }}
    //                         />
    //                     </TouchableOpacity>

    //                     <View style={{ 
    //                         flex: 1,
    //                         alignItems: 'center',
    //                         justifyContent: 'center'
    //                     }}>
    //                         <Text style={{fontSize: 18, lineHeight: 22}}>Detail</Text>
    //                     </View>

    //                     <TouchableOpacity
    //                         style={{ marginRight: 8 }}
    //                         onPress={() => console.log("Click More")}
    //                     >
    //                         <Image
    //                             source={require('../icons/more_icon.png')}
    //                             resizeMode="contain"
    //                             style={{
    //                                 width: 30,
    //                                 height: 30,
    //                                 tintColor: '#000',
    //                                 alignSelf: 'flex-end'
    //                             }}
    //                         />
    //                     </TouchableOpacity>

    //                 </View>
    //             <View style={{
    //                 flex: 5, 
    //                 paddingTop: 36,
    //                 alignItems: 'center',
    //             }}
    //             >
    //                 <Image
    //                     source={{ uri: "http://10.0.2.2:3001/images/" + data.img }}
    //                     resize="cover"
    //                     style={{
    //                         width: 150,
    //                         height: 150,
    //                     }}
    //                 ></Image>
    //             </View>
    //             <View
    //                 style={{ 
    //                     flex: 10,
    //                     alignItems: 'center',
    //                 }}
    //             >
    //                 <Text>{data.nameProduct}</Text>
    //             </View>
    //         </View>
    //     )
    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderFoodInfo()}
            {renderOrder()}
        </SafeAreaView>
    )
}

export default ProductDetail
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray2
    }
})
