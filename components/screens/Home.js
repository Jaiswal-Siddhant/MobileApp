import { View, Text, StatusBar, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOURS, Items } from '../database/database'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Home = ({ navigation }) => {

    const [products, setProducts] = useState([])
    const [accessory, setAccessory] = useState([])
    const [sofa, setSofa] = useState([])


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDataFromDB();
        });
        return unsubscribe;
    }, [navigation])

    //getting data from database
    const getDataFromDB = () => {
        let productList = []
        let accessoryList = []
        let sofaList = []

        for (let index = 0; index < Items.length; index++) {
            if (Items[index].category == 'product') {
                productList.push(Items[index])
            } else if (Items[index].category == 'accessory') {
                accessoryList.push(Items[index])
            } else if (Items[index].category == 'sofa') {
                sofaList.push(Items[index])
            }
        }

        setProducts(productList)
        setAccessory(accessoryList)
        setSofa(sofaList)
        console.log(sofaList);
    }

    //Product card =>DRY
    const ProductCard = ({ data }) => {
        return (
            <TouchableOpacity
                style={{
                    width: '45%',
                    marginVertical: 15,
                }}>

                <View
                    style={{
                        width: '100%',
                        height: 250,
                        borderRadius: 30,
                        backgroundColor: COLOURS.backgroundLight,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 10
                    }}>
                    {
                        data.isOff ? (
                            <View
                                style={{
                                    position: 'absolute',
                                    width: '15%',
                                    height: '15%',
                                    backgroundColor: COLOURS.red,
                                    top: 0,
                                    left: 0,
                                    borderTopLeftRadius: 20,
                                    borderBottomRightRadius: 20,
                                    justifyContent: 'center',
                                    alignItems: 'center'

                                }}>

                                < Text
                                    style={{
                                        fontSize: 15,
                                        color: COLOURS.blue,
                                        fontWeight: '400',

                                    }}>

                                    {data.offPercentage}
                                </Text>

                            </View>
                        ) : null
                    }

                    {/*rendering product Image*/}
                    <Image
                        source={data.productImage}
                        style={{ width: '100%', height: '80%', resizeMode: 'contain' }}
                    />

                </View>

                {/*rendering product name*/}
                <Text
                    style={{
                        color: COLOURS.black,
                        fontWeight: '500',
                        textAlign: 'center',
                        marginBottom: 4,
                    }}
                >
                    {data.productName}
                </Text>


                {/*rendering product price*/}

                <Text
                    style={{
                        color: COLOURS.black,
                        fontWeight: '500',
                        textAlign: 'center',
                        marginBottom: 4,
                    }}>
                    &#8377; {data.productPrice}
                </Text>
            </TouchableOpacity >
        )
    }


    return (
        <View style={{
            width: '100%',
            height: '100%',
            backgroundColor: COLOURS.white,

        }} >
            <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 16
                    }}>
                    <TouchableOpacity>
                        <Entypo name='shopping-bag' style={{
                            fontSize: 18,
                            color: COLOURS.backgroundMedium,
                            padding: 12,
                            borderRadius: 10,
                            backgroundColor: COLOURS.backgroundLight,
                        }}></Entypo>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name='cart' style={{
                            fontSize: 18,
                            color: COLOURS.backgroundMedium,
                            padding: 12,
                            borderRadius: 10,
                            backgroundColor: COLOURS.backgroundLight,
                        }}></MaterialCommunityIcons>
                    </TouchableOpacity>
                </View  >
                <View
                    style={{
                        marginBottom: 10,
                        padding: 16,

                    }}>
                    <Text
                        style={{
                            fontSize: 14,
                            color: COLOURS.black,
                            fontWeight: '500',
                            letterSpacing: 1,
                            marginBottom: 10,
                        }}
                    >Furniture Shop & Services</Text>
                    <Text
                        style={{
                            fontSize: 14,
                            color: COLOURS.black,
                            fontWeight: '400',
                            letterSpacing: 1,
                            marginBottom: 10,
                        }}>
                        Looking for furniture{'\n'}
                        We offer best services and products at best price.
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 10,
                        justifyContent: 'space-between'

                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{
                            fontSize: 19,
                            color: COLOURS.black,
                            fontWeight: '600',
                            letterSpacing: 1,

                        }}>
                            Products
                        </Text>
                        <Text style={{
                            fontSize: 15,
                            color: COLOURS.black,
                            fontWeight: '500',
                            opacity: 0.4,
                            marginLeft: 15,
                            marginTop: 5,

                        }}>
                            20
                        </Text>
                    </View>
                    <View>
                        <Text
                            style={{
                                fontSize: 15,
                                color: COLOURS.black,
                                marginTop: 6,
                                paddingLeft: 130,
                            }}>
                            EXPLORE
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between'
                    }}>
                    {
                        sofa.map((data) => {
                            return <ProductCard data={data} key={data.id} />
                        })
                    }
                </View>

            </ScrollView>
        </View>
    )
}

export default Home