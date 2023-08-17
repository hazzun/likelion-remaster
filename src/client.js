import axios from "axios";

// 로컬 스토리지에서 토큰 값을 가져오는 함수
const getAuthToken = () => {
  return localStorage.getItem("jwtToken");
};

export const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

client.interceptors.request.use((config) => {
  const token = getAuthToken();
  config.headers["Content-Type"] = "application/json";
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export async function signUp(data) {
  try {
    console.log(process.env.REACT_APP_BASE_URL + "registration/");
    const res = await client.post("registration/", data);
    console.log(res);
  } catch (err) {
    alert("로그인에 실패하였습니다. 오류 내용: " + err.message);
    console.log(err);
  }
}
