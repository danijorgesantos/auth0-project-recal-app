// import api from '../utils/api';
import axios from 'axios';
import {
  GET_QRCODE_RETURN,
  GET_QRCODE_COLLECT,
  GET_USERS_COUNT
} from './types';

// Get Qr Code number -->  collect 
export const getQrCodeCollect = () => async dispatch => {
  try {
    const res = await axios.get('https://recollect0.herokuapp.com/ccode');
    dispatch({
      type: GET_QRCODE_COLLECT,
      payload: res.data
    });
  } catch (err) {
      console.log(err)
  }
};


// Get Qr Code return number --> return
export const getQrCodeReturn = () => async dispatch => {
  try {
    const res = await axios.get('https://recollect0.herokuapp.com/rcode');
    dispatch({
      type: GET_QRCODE_RETURN,
      payload: res.data
    });
  } catch (err) {
      console.log(err)
  }
};

// Get Qr Code return number --> return
export const getUsersCount = () => async dispatch => {
  console.log('getUsersdata called action')
  try {
    const res = await axios.get('https://recollect0.herokuapp.com/users/');
    dispatch({
      type: GET_USERS_COUNT,
      payload: res.data.count
    });
  } catch (err) {
      console.log(err)
  }
};


