import { SEND_QUOTE, SEND_QUOTE_SUCCESS, SEND_QUOTE_ERROR } from "./types";
import * as API from "../../services/quote/index";

const actionAddQuote = (quote) => ({
  type: SEND_QUOTE,
});

const getQuoteSuccess = (quote) => ({
  type: SEND_QUOTE_SUCCESS,
  quote,
});

const getQuoteError = () => ({
  type: SEND_QUOTE_ERROR,
});

export const sendQuote = (quote) => {
  return (dispatch) =>
    API.sendPostQuote(quote)
      //.then(quote => dispatch(actionAddQuote(quote)))
      .then(() => dispatch(getQuoteSuccess(quote)))
      .catch(() => dispatch(getQuoteError()));
};
