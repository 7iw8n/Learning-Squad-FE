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
      <StFileLogoBox>
        <StFileTitleTop>
          <StFileTitleBold>L</StFileTitleBold>earning
        </StFileTitleTop>
        <StFileTitleBottom>
          <StFileTitleBold>S</StFileTitleBold>quad
        </StFileTitleBottom>
      </StFileLogoBox>
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
  gap: 1rem;
`;

const StFileLogoBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  margin-bottom: 5rem;
`;

const StFileTitleTop = styled.span`
  display: block;
  padding-left: 1rem;
  color: #b5b5b5;
  font-size: 2rem;
  font-weight: 700;
`;

const StFileTitleBottom = styled.span`
  display: block;
  margin-right: 3rem;
  color: #b5b5b5;
  font-size: 2rem;
  font-weight: 700;
`;

const StFileTitleBold = styled.span`
  color: #7d7d86;
  font-size: 2rem;
  font-weight: 700;
`;

const StInputBox = styled.div`
  min-width: 20rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  background: #dee7fb;
  font-weight: 600;
  gap: 2rem;
`;

const StLabel = styled.label`
  width: 4rem;
`;

const StInput = styled.input`
  font-size: 1rem;
`;

const StSignOnBtn = styled.button`
  background: #d9dee2;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
`;
