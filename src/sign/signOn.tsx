import React, { useState } from "react";
import { ChangeEvent } from "react";
import styled from "@emotion/styled";
import instance from "../common/apis/axiosInstance";
import { useNavigate } from "react-router-dom";

const SignOn: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const navigate = useNavigate();

  const onChangeNickName = (event: ChangeEvent<HTMLInputElement>) => {
    setNickName(event.target.value);
  };

  const onChangeUserName = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSignOn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await instance.post("/api/users/join", {
        userName,
        password,
        nickName,
      });
      if (res.data.code === 200) {
        navigate("/login"); // 회원가입 성공 시 로그인 페이지로 이동
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <StSignOnContainer>
      <StInputBox>
        <StLabel>아이디</StLabel>
        <StInput value={userName} onChange={onChangeUserName} />
      </StInputBox>
      <StInputBox>
        <StLabel>비밀번호</StLabel>
        <StInput type="password" value={password} onChange={onChangePassword} />
      </StInputBox>
      <StInputBox>
        <StLabel>닉네임</StLabel>
        <StInput value={nickName} onChange={onChangeNickName} />
      </StInputBox>
      <StSignOnBtn type="button" onClick={(e) => handleSignOn(e)}>
        회원가입
      </StSignOnBtn>
    </StSignOnContainer>
  );
};

export default SignOn;

const StSignOnContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StInputBox = styled.div`
  margin-bottom: 1rem;
`;

const StLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const StInput = styled.input`
  width: 20rem;
  padding: 0.5rem;
  font-size: 1rem;
`;

const StSignOnBtn = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
`;
