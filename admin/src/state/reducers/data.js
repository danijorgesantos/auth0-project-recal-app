import {
  GET_QRCODE_RETURN,
  GET_QRCODE_COLLECT
} from '../actions/types';

const initialState = {
  numberQrCodeCollect: '0',
  numberQrCodeReturn: '0',
  loadedCollect: false,
  loadedReturn: false,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_QRCODE_RETURN:
      return {
        ...state,
        numberQrCodeReturn: payload,
        loading: false
      };
    case GET_QRCODE_COLLECT:
      return {
        ...state,
        numberQrCodeCollect: payload,
        loadedCollect: true
      };
    default:
      return state;
  }
}
