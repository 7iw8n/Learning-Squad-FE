import styled from "@emotion/styled";
import { useState, useEffect, ChangeEvent } from "react";
import instance from "../common/apis/axiosInstance";
import NavBar from "../common/components/NavBar";
import { Profile } from "./assets/index";

const MyPage = () => {
  const [nickName, setNickName] = useState<string>("");
  const [editNickName, setEditNickName] = useState<boolean>(false);

  const handleProfileData = async () => {
    try {
      const res = await instance.get("/api/users/info");

      console.log(res);
      const nickName = res.data.data.nickName;
      console.log(nickName);
      setNickName(nickName);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleProfileData();
  }, []);

  const onChangeNickname = (event: ChangeEvent<HTMLInputElement>) => {
    setNickName(event.target.value);
  };

  const handleClickFinishBtn = async () => {
    console.log(nickName);
    try {
      const res = await instance.put("/api/users/updateNickName", {
        params: {
          nickName: nickName,
        },
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StMainContainer>
      <StNavWrapper>
        <NavBar />
      </StNavWrapper>
      <StMainWrapper>
        <StFileLogoBox>
          <StFileTitleTop>
            <StFileTitleBold>L</StFileTitleBold>earning
          </StFileTitleTop>
          <StFileTitleBottom>
            <StFileTitleBold>S</StFileTitleBold>quad
          </StFileTitleBottom>
        </StFileLogoBox>
        {editNickName ? (
          <>
            <p style={{ margin: "10rem 0rem 1.5rem 0rem" }}>
              변경하실 닉네임을 입력해주세요.
            </p>
            <input
              value={nickName}
              placeholder="닉네임을 입력해주세요."
              onChange={onChangeNickname}
              style={{
                padding: "1rem 2rem",
                background: "#d5e0f7",
                textAlign: "center",
                fontWeight: "700",
              }}
            />
            <button
              onClick={handleClickFinishBtn}
              style={{
                marginTop: "1.2rem",
                padding: "0.5rem 0.5rem",
                background: "#e0e1e2",
                borderRadius: "10px",
                fontSize: "0.6rem",
                fontWeight: "500",
              }}
            >
              입력 완료
            </button>
          </>
        ) : (
          <>
            <Profile style={{ marginTop: "10rem" }} />
            <p
              style={{
                marginTop: "2rem",
                color: "#575859",
                fontSize: "1.3rem",
                fontWeight: "600",
              }}
            >
              {nickName}
            </p>
            <StEditBtn onClick={() => setEditNickName(true)}>edit</StEditBtn>
          </>
        )}
      </StMainWrapper>
    </StMainContainer>
  );
};

export default MyPage;

const StMainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  background-color: #ffffff;
`;

const StNavWrapper = styled.div`
  width: 3rem;
  height: 100%;
`;

const StMainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding-top: 5rem;
  background-color: #ffffff;
`;

const StFileLogoBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
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

const StEditBtn = styled.button`
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  color: #575859;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 20px;
  background: #dbdde5;
  cursor: pointer;
`;
