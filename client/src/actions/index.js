import axios from 'axios';
import { FETCH_USER, FETCH_TAGLISTS, DELETE_TAGLIST } from './types';

// these are our action creators
export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};


export const submitTagList = (values,title) => async dispatch => {
    console.log(values)
    const res = await axios.post('/api/tagLists', { title, tags: values});
    // pushing to history for redirect purposes
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchTagLists = () => async dispatch => {
    const res = await axios.get('/api/tagLists');

    dispatch({ type: FETCH_TAGLISTS, payload: res.data});
}

export const deleteTagList = (tagListId, history) => async dispatch => {
    const res = await axios.delete(`/api/tagLists/${tagListId}`);

    dispatch({ type: DELETE_TAGLIST, payload: res.data});
}