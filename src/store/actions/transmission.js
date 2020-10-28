import {
  SEND_TRANSMISSION,
  SEND_TRANSMISSION_SUCCESS,
  SEND_TRANSMISSION_ERROR,
  GET_TRANSMISSION_RESPONSE,
  GET_TRANSMISSION_LOADING,
  REDIRECT_TRANSMISSION_SUCCESS,
  GET_TRANSMISSION_LOADING_ERROR,
} from "./types";
import * as API from "../../services/transmission/index";

const actionAddQuote = (quote) => ({
  type: SEND_TRANSMISSION,
});

const getTransmissionSuccess = (quote) => ({
  type: SEND_TRANSMISSION_SUCCESS,
  quote,
});

const getTransmissionResponse = (quote) => ({
  type: GET_TRANSMISSION_RESPONSE,
  quote,
});

export const getTransmissionLoading = () => ({
  type: GET_TRANSMISSION_LOADING,
});

export const getTransmissionLoadingError = () => ({
  type: GET_TRANSMISSION_LOADING_ERROR,
});

export const transmissionRedirect = () => ({
  type: REDIRECT_TRANSMISSION_SUCCESS,
});

const getTransmissionError = (quote) => ({
  type: SEND_TRANSMISSION_ERROR,
  quote,
});

export const sendTransmission = (quote) => {
  const cotacao = quote;
  const id_cotacao = localStorage.getItem("@bidu2/idcotacao");
  return (dispatch) => {
    dispatch(getTransmissionLoading());
    API.sendTransmission(quote)
      .then(() => dispatch(getTransmissionSuccess(cotacao)))
      .then(async () => {
        let result; 
        do {
          result = await API.getTransmission(id_cotacao);
        } while (result.body.length < 1);      
        dispatch(getTransmissionResponse(result.body));
        if (result.body[0].statusComunicacao === "ERRO_NO_SERVICO") {
          dispatch(getTransmissionLoadingError());
        }
      })
      .catch(() => dispatch(getTransmissionError()));
  };
};
