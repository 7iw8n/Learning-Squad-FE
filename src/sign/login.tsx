import React, { useState, ChangeEvent } from "react";
import styled from "@emotion/styled";
import { signInInstance } from "../common/apis/axiosInstance";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onChangeUserName = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const activeEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    try {
      const res = await signInInstance.post("/api/users/login", {
        userName,
        password,
      });
      console.log(res);
      const token = res.data.data.token;
      localStorage.setItem("ACCESS_TOKEN", token);
      navigate("/main-page");
    } catch (error) {
      console.log(error);
    }
  };

  const Rest_api_key = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const redirect_uri = import.meta.env.VITE_REDIRECT_URI;

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <StLoginContainer>
      <StLoginTitleTop>AI 학습 튜터,</StLoginTitleTop>
      <StLoginTitleBottom>Learning Squad</StLoginTitleBottom>
      <StInputBox>
        <StLabel>아이디</StLabel>
        <StInput
          value={userName}
          placeholder="아이디를 입력해주세요"
          onChange={onChangeUserName}
        />
      </StInputBox>
      <StInputBox>
        <StLabel>비밀번호</StLabel>
        <StInput
          type="password"
          value={password}
          placeholder="비밀번호를 입력해주세요"
          onChange={onChangePassword}
          onKeyDown={activeEnter}
        />
      </StInputBox>
      <StLoginBtn onClick={handleLogin}>로그인</StLoginBtn>
      <StSignOnMent>아직 회원이 아니시라면?</StSignOnMent>
      <StSignOnBtn onClick={() => navigate("/sign-on")}>회원가입</StSignOnBtn>
      <p style={{ fontSize: "0.8rem", fontWeight: "600", marginTop: "2rem" }}>
        간편 로그인을 원하신다면?
      </p>
      <StKakaoLoginBtn onClick={handleKakaoLogin}>
        카카오톡으로 로그인하기
      </StKakaoLoginBtn>
    </StLoginContainer>
  );
};

export default Login;

const StLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  padding-top: 3rem;
`;

const StLoginTitleTop = styled.span`
  display: flex;
  justify-content: start;
  width: 40rem;
  height: 5rem;
  color: #000;
  font-size: 4rem;
  font-weight: 600;
`;

const StLoginTitleBottom = styled.span`
  display: flex;
  justify-content: end;
  width: 40rem;
  height: 5rem;
  margin-bottom: 5rem;
  color: #000;
  font-size: 4rem;
  font-weight: 600;
`;

const StInputBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 17rem;
  height: 3rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 20px;
  background-color: #e6efff;
  color: #81a1e1;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  gap: 1rem;
`;

const StLabel = styled.label`
  display: block;
  width: 5rem;
  padding-left: 1rem;
`;

const StInput = styled.input`
  width: 8rem;
  font-size: 0.8rem;
`;

const StLoginBtn = styled.button`
  display: block;
  width: 4rem;
  height: 2rem;
  margin-top: 0.5rem;
  color: #34221d;
  text-align: center;
  background: #e4e5e6;
  border-radius: 5px;
  font-weight: 700;
  cursor: pointer;
`;

const StKakaoLoginBtn = styled.button`
  bottom: 9rem;
  display: block;
  width: 15rem;
  height: 3.2rem;
  margin-top: 1rem;
  padding-left: 2rem;
  color: #34221d;
  text-align: center;
  background-color: #fae100;
  background-image: url("https://www.innergarm.com/design/rtx22/re_2022/kakao_login_icon.svg");
  background-repeat: no-repeat;
  background-attachment: initial;
  background-position-x: 1.2rem;
  background-position-y: center;
  background-clip: initial;
  background-origin: initial;
  background-size: 26px;
  border-radius: 5px;
  font-weight: 700;
  cursor: pointer;
`;

const StSignOnMent = styled.span`
  width: 10rem;
  margin-top: 2rem;
  color: #c7c8ca;
  text-align: center;
  font-size: 0.8rem;
`;

const StSignOnBtn = styled.button`
  cursor: pointer;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: underline;
`;
