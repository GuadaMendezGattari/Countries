import axios from 'axios';

export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES';
export const GET_COUNTRY_DETAIL = 'GET_COUNTRY_DETAIL';
export const GET_ALL_ACTIVITIES = 'GET_ALL_ACTIVITIES';
export const GET_COUNTRY_BY_NAME = 'GET_COUNTRY_BY_NAME';
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT';
export const FILTER_BY_ACTIVITY = 'FILTER_BY_ACTIVITY';
export const ORDER_BY_ALF = 'ORDER_BY_ALF';
export const ORDER_BY_POPULATION = 'ORDER_BY_POPULATION';
export const BACK = 'BACK';

export function getAllCountries() {
    return function(dispatch) {
        return fetch(`http://localhost:3001/countries`)
        .then(r => r.json())
        .then(countries => dispatch({type: GET_ALL_COUNTRIES, payload: countries}));
    }
}

export function getCountryByName(name) {
    return async function(dispatch){
        return fetch(`http://localhost:3001/countries?name=${name}`)
        .then(r => r.json())
        .then(countries => dispatch({type: GET_COUNTRY_BY_NAME, payload: countries}));
    }
}

export function getCountryDetail(id) {
    return function(dispatch) {
        return fetch(`http://localhost:3001/countries/${id}`)
        .then(r => r.json())
        .then(country => dispatch({type: GET_COUNTRY_DETAIL, payload: country/* es un objeto */}));
    }
}

export function getAllActivities() {
    return function(dispatch) {
        return fetch('http://localhost:3001/activities')
        .then(r => r.json())
        .then(activities => dispatch({type: GET_ALL_ACTIVITIES, payload: activities}));
    }
}

export function filterByContinent(payload) {
    return {type: FILTER_BY_CONTINENT, payload};
}

export function filterByActivity(payload) {
    return {type: FILTER_BY_ACTIVITY, payload};
}

export function orderByAlf(payload) {
    return {type: ORDER_BY_ALF, payload}
}

export function orderByPopulation(payload) {
    return {type: ORDER_BY_POPULATION, payload}
}

export function createActivity(payload) {
    return async function () {
        const createChar = await axios.post('http://localhost:3001/activities', payload);
        return createChar;
    }
}

export function back() {
    return {type: BACK}
}