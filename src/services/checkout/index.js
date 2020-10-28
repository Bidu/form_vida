import axios from "axios";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
};

const apiCheckout = axios.create({
  baseURL:
    "https://cors-anywhere.herokuapp.com/https://pubsub-transmissao-dot-bidu-digital-dev.appspot.com/",
});

export const sendCheckout = (quote) =>
  apiCheckout
    .post("/", {
      method: "POST",
      headers,
      body: quote,
    })
    .then((res) => res.data);
