import axios from "axios";
const AuthStr = "Bearer ".concat(
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1ODk5OTQ2MDQsImV4cCI6MTYyMTUzMDYwNCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.iiMMWhNwVSqKz4FuraSGxlRL2l5hPGaUGWvXfFsRuUc"
);

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Origin": "*",
  Authorization: AuthStr,
};

//SEND TRANSMISSION
const OUTRAS_SEGURADORAS =
  "https://pubsub-transmissao-dot-bidu-digital-dev.appspot.com";
const SEGURADORA_HDI =
  "https://teste-hdi-ii-dot-bidu-digital-dev.appspot.com/transmissao";

export const sendTransmission = (quote) =>
  axios
    .post(quote.susep === 6572 ? SEGURADORA_HDI : OUTRAS_SEGURADORAS, {
      method: "POST",
      headers,
      body: quote,
    })
    .then((res) => res.data);

//GET TRANSMISSION RESPONSE
const apiTransmissionResponse = axios.create({
  baseURL: "https://api-auto-dot-bidu-digital-dev.appspot.com/transmissao",
});
export const getTransmission = async (quote) =>
  await apiTransmissionResponse
    .get(
      `/${quote}/${localStorage.getItem("@bidu2/newDate")}`,
      {
        method: "GET",
        headers,
      },      
    )
    .then((res) => res.data);   
