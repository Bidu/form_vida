import axios from "axios";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
};

/* const apiQuote = axios.create({
  //baseURL: "https://pubsub-dot-bidu-digital-prod.rj.r.appspot.com",
  baseURL: "https://pubsub-dot-bidu-digital-dev.appspot.com",
  //baseURL: "https://cors-anywhere.herokuapp.com/https://teste-hdi-dot-bidu-digital-dev.appspot.com/cotacao",
});

export const sendPostQuote = (quote) =>
  apiQuote
    .post("/", {
      method: "POST",
      headers,
      body: quote,
    })
    .then((res) => res.data); */

/* ============================================================ */

export const sendPostQuote = (quote) => {
  let URL1 = "https://pubsub-dot-bidu-digital-dev.appspot.com";
  let URL2 = "https://teste-hdi-ii-dot-bidu-digital-dev.appspot.com/cotacao";

  const fetchURL = (url) =>
    axios
      .post(url, {
        body: quote,
        headers,
      })
      .then((res) => res.data);

  const promiseArray = [URL1, URL2].map(fetchURL);

  Promise.all(promiseArray)
    .then((res) => res.data)
    .catch((err) => {});
};
