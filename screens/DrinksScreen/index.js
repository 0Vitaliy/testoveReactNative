import React, {useEffect} from 'react'
import {ScrollView, TouchableOpacity, FlatList} from "react-native";
import styled from "styled-components/native";
import {getDrinksAction, getFilterDrinksAction} from "../../actions/drinks";
import {View} from "react-native-web";
import {useDispatch, useSelector} from "react-redux";


export const DrinksScreen = ({}) => {

    const checkedDrink = useSelector(state => state.drinksReducer.checkedDrink);
    const currentDrink = useSelector(state => state.drinksReducer.currentDrink);
    const listDrinksObj = useSelector(state => state.drinksReducer.listDrinksObj);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFilterDrinksAction)
    }, [])

    useEffect(() => {
        checkedDrink.length && dispatch(getDrinksAction(checkedDrink[0].strCategory))
    }, [checkedDrink])

    const handleEnd = () => {
        if (currentDrink <= checkedDrink.length - 1) {
            dispatch(getDrinksAction(checkedDrink[currentDrink].strCategory))
        }
    };

    const BlockDrinkItem = (item) => {
        return (
            <BlockDrink>
                <ImageDrink source={{uri: item.strDrinkThumb,}}/>
                <TitleDrinkItem>{item.strDrink}</TitleDrinkItem>
            </BlockDrink>
        )
    }


    return (
        <Container>
            <ScrollView style={{flex: 1, padding: 20}}>
                {Object.keys(listDrinksObj).map(function (key) {
                    return (<View key={key} style={{flex: 1, height: '100vh'}}>
                        {<FlatList
                            style={{marginTop: 20}}
                            ListHeaderComponent={() => <TitleDrink>{key}</TitleDrink>}
                            onEndReachedThreshold={0.5}
                            onEndReached={() => handleEnd()}
                            data={listDrinksObj[key]}
                            renderItem={({item}) => BlockDrinkItem(item)}
                            keyExtractor={(item, index) => item.idDrink}
                        />}
                    </View>)
                })}
            </ScrollView>
        </Container>
    )
};

const Container = styled.View`
     background:white;
     flex:1;
`;

const BlockDrink = styled.View`
    display: flex;
    align-items: center;
    flex-direction: row;
    margin: 20px 0; 
`;

const ImageDrink = styled.Image`
    width:100px;
    height:100px;
    margin-right:20px;
`;

const TitleDrinkItem = styled.Text`
    color: #7E7E7E;
    font-family: 'Roboto, sans-serif';
    font-size: 16px;
    line-height: 19px;
`;

const TitleDrink = styled.Text`
    color: #7E7E7E;
    font-family: 'Roboto, sans-serif';
    font-size: 14px;
    line-height: 17px;
`;

const ImageHeaderRight = styled.Image`
    width:20px;
    height:20px;
    margin-right:20px; 
`;


const headerRight = (navigation) => {
    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate('Filters')
        }}>
            <ImageHeaderRight
                source={require('../../assets/Group.svg')}
            />
        </TouchableOpacity>
    )
}

DrinksScreen.navigationOptions = ({navigation}) => {

    return {
        title: 'Drinks',
        headerTintColor: '#2a86ff',
        headerRight: () => headerRight(navigation),
        headerStyle: {
            borderBottomWidth: 'none',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
        },
        headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24,
            color: '#000000',
            fontFamily: 'Roboto, sans-serif'
        },
    }
};