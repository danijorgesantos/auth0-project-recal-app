import {
    GET_TOTAL_ITEMS,
    GET_RETURNED,
    GET_ALREADY_TOOK,
    GET_PERCENTAGE_RETURNED,
    GET_USERS_COUNT,
    GET_RETURNED_TODAY
} from '../actions/types';

const initialState = {
    v: '5',
    totalItems: '0',
    returned: '0',
    alreadyTook: '0',
    perReturned: '0',
    numberOfUsers: '0',
    returnedToday: '0',
    loading: false,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_TOTAL_ITEMS:
            return {
                ...state,
                totalItems: payload,
            };
        case GET_RETURNED:
            return {
                ...state,
                returned: payload,
            };
        case GET_ALREADY_TOOK:
            return {
                ...state,
                alreadyTook: payload,
            };
        case GET_PERCENTAGE_RETURNED:
            return {
                ...state,
                perReturned: payload,
            };
        case GET_USERS_COUNT:
            return {
                ...state,
                numberOfUsers: payload,
            };
        case GET_RETURNED_TODAY:
            return {
                ...state,
                returnedToday: payload,
            };
        default:
            return state;
    }
}
