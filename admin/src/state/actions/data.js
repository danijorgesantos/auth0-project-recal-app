// import api from '../utils/api';
import axios from 'axios';
import {
  GET_QRCODE_RETURN,
  GET_QRCODE_COLLECT
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


