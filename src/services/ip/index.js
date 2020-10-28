import axios from "axios";
const apiIP = axios.create({
  baseURL: "https://api.ipify.org"
});
export default apiIP;
