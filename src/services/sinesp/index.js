import axios from "axios";
const apiPlaca = axios.create({
  baseURL: "http://localhost:3006/sinesp/placa/"
});
export default apiPlaca;
