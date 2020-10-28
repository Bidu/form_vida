import axios from "axios";
const apiModel = axios.create({
  baseURL: "https://edison-ppu-staging.thinkseg.com/api/v1/generali/brands"
});
export default apiModel;
