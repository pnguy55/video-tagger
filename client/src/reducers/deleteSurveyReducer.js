import { DELETE_TAGLIST } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case DELETE_TAGLIST:
            return action.payload;
        default:
            return state;
    }
}