import axios from 'axios';

// 로컬 스토리지에서 토큰 값을 가져오는 함수
const getAuthToken = () => {
  return localStorage.getItem('jwtToken');
};

export const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// header에 정보 추가하기 => [참고자료] https://leeseong010.tistory.com/133
client.interceptors.request.use((config) => {
  const token = getAuthToken();
  config.headers['Content-Type'] = 'application/json';
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
