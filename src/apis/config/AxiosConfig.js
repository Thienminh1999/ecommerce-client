import axios from "axios";
import { BASE_URL } from "../../stores/variables";

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
});

export default axiosInstance;
