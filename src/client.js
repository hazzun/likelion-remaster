import { useNavigate } from "react-router-dom";
import axios from "axios";

export const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const auth = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// header에 정보 추가하기 => [참고자료] https://leeseong010.tistory.com/133
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken");
  // token은 30분이면 만료됨
  // -> 만료됐을때의 에러처리?? api작동시킬 때 에러메세지 띄워서 사용자가 알아서 다시 로그인할 수 있도록 인도 ㄱㄱ
  // localStorage.clear(); 사용해서 토큰값 사라지게 한 뒤 로그인 ㄱㄱ
  config.headers["Content-Type"] = "application/json";
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export async function signUp(data) {
  try {
    // console.log("회원가입 성공");
    const res = await auth.post("registration/", data);
    if (res.data.ERROR.includes("username")) {
      alert("이미 존재하는 아이디입니다.");
    }
    if (res.data.ERROR.includes("nickname")) {
      alert("이미 존재하는 닉네임입니다.");
    }
    // // console.log(res);
    return res.data;
    // console.log(res);
  } catch (err) {
    alert("회원가입을 실패하였습니다. 오류 내용: " + err.message);
    console.log(err);
  }
}

export async function loginAuth({ id, pw }) {
  try {
    const res = await auth.post("accounts/login/", {
      username: id,
      password: pw,
    });
    console.log("로그인 성공");
    const token = res.data.access_token;
    localStorage.setItem("jwtToken", token);
    return res.data.type;
  } catch (err) {
    alert("로그인에 실패하였습니다. 오류 내용: " + err.message);
    console.log(err);
  }
}
