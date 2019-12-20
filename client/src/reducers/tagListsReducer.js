import { FETCH_TAGLISTS } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_TAGLISTS:
            return action.payload;
        default:
            return state;
    }
}