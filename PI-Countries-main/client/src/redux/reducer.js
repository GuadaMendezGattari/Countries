import { 
    GET_ALL_COUNTRIES, 
    GET_COUNTRY_DETAIL, 
    GET_ALL_ACTIVITIES, 
    GET_COUNTRY_BY_NAME,
    FILTER_BY_CONTINENT,
    FILTER_BY_ACTIVITY,
    ORDER_BY_ALF,
    ORDER_BY_POPULATION
} from "./actions"

const initialState = {
    countries: [],
    copyCountries: [],
    activities: [],
    copyActivities: [],
    countryDetail: {}
}

export default function rootReducer(state=initialState, action) {
    switch(action.type) {
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                copyCountries: action.payload
            };
        case GET_COUNTRY_DETAIL:
            return {
                ...state,
                countryDetail: action.payload
            };
        case GET_ALL_ACTIVITIES:
            return {
                ...state,
                activities: action.payload,
                copyActivities: action.payload
            };
        case GET_COUNTRY_BY_NAME:
            return {
                ...state,
                countries: action.payload
            };
        case FILTER_BY_CONTINENT:
            return {
                ...state,
                countries: state.copyCountries.filter(el => el.region.toString() === action.payload.toString())
            };
        case FILTER_BY_ACTIVITY:
            const coun = state.activities.find(el => el.name === action.payload).countries;
            return {
                ...state,
                countries: coun
            };
        case ORDER_BY_ALF:
            const order = state.copyCountries.sort(function (a, b) {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
              });
            return {
                ...state,
                countries: action.payload === 'asc' ? order : order.reverse()
            };
        case ORDER_BY_POPULATION:
            const population = state.copyCountries.sort((a, b) => Number(a.population) - Number(b.population))
            return {
                ...state,
                countries: action.payload === 'asc' ? population : population.reverse()
            };
        default: 
            return {...state};
    }
}