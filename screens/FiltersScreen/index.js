import React, {useEffect, useState} from 'react'
import {ScrollView, TouchableOpacity} from "react-native";
import {CheckBox} from 'react-native-elements'
import styled from "styled-components/native";
import {useSelector, useDispatch} from 'react-redux'

import {
    addDrinkList,
    checkedDrinkAction,
    getDrinksAction,
    incrementCurrentDrinkAction
} from "../../actions/drinks";

import {Button} from "../../components/button";


export const FiltersScreen = ({navigation}) => {

    const filterList = useSelector(state => state.drinksReducer.filterList);
    const checkedDrink = useSelector(state => state.drinksReducer.checkedDrink);

    const [drinksChecked, setDrinksChecked] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        setDrinksChecked(checkedDrink)
    }, []);

    const toggleDrink = (item) => {
        if (!(JSON.stringify(drinksChecked).indexOf(item.strCategory) > -1)) {
            setDrinksChecked((drinksChecked.concat(item)))
        } else {
            setDrinksChecked((drinksChecked.filter(i => i !== item)))
        }
    };

    const getCheckedDrink = (name) => {
        if (JSON.stringify(drinksChecked).indexOf(name.strCategory) > -1) {
            return true;
        }
    };


    const applyDrinks = () => {
        dispatch(checkedDrinkAction(drinksChecked))
        dispatch(incrementCurrentDrinkAction(0))
        dispatch(addDrinkList({}));
        if (drinksChecked.length) {
            dispatch(getDrinksAction(drinksChecked[0].strCategory));
        }
        navigation.navigate('Drinks')
    };

    return (
        <Container>
            <ScrollView style={{flex: 1, height: 300}}>
                {filterList && filterList.drinks.map((item) => {
                    return (
                        <BlockFilter onPress={() => toggleDrink(item)} key={item.strCategory}>
                            <DrinkTitle key={item.strCategory}>{item.strCategory}</DrinkTitle>
                            <CheckBox
                                wrapperStyle={{margin: 0}}
                                iconRight
                                containerStyle={{margin: 0, padding: 0}}
                                checkedIcon={<TickImage source={require('../../assets/tick.svg')}/>}
                                uncheckedIcon={null}
                                checked={getCheckedDrink(item)}
                                onPress={() => toggleDrink(item)}
                            />
                        </BlockFilter>
                    )
                })}
            </ScrollView>
            <Button color='#272727' onPress={() => applyDrinks()}>APPLY</Button>

        </Container>
    )
};

const TickImage = styled.Image`
    width: 20px;
    height: 20px; 
`;

const Container = styled.View`
    flex:1;
    background:#fff;
    padding:0 35px 30px 35px;
`;

const DrinkTitle = styled.Text`
    font-family: 'Roboto, sans-serif';
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #7E7E7E;
`;

const BlockFilter = styled.TouchableOpacity`
    margin: 30px 0;
    min-height:20px;
    display: flex;
    justify-content: space-between; 
    flex-direction: row;
    align-items: center; 
`;

const ImageHeaderLeft = styled.Image`
    width:20px;
    height:20px;
    margin-left:20px; 
`;

const headerLeft = (navigation) => {
    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate('Drinks')
        }}>
            <ImageHeaderLeft
                source={require('../../assets/Icon.svg')}
            />
        </TouchableOpacity>
    )
};


FiltersScreen.navigationOptions = ({navigation}) => {
    return {
        title: 'Filters',
        headerLeft: () => headerLeft(navigation),
        headerStyle: {
            borderBottomWidth: 'none',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
        },
        headerTintColor: '#2a86ff',
        headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24,
            color: '#000000',
            fontFamily: 'Roboto, sans-serif'
        },
    }
};
