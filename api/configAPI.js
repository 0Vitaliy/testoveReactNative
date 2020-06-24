import axios from 'axios';

import {AppConfig} from './config';

const baseURL = AppConfig.apiURL;

const instance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getFilterList = () =>
    instance({
        url: `list.php?c=list`,
        method: 'GET',
    });

export const getDrinks = (drink) =>
    instance({
        url: `filter.php?c=${drink}`,
        method: 'GET',
    });

