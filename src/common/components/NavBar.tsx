import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { Logo, Learning, Log, MyPage } from "../../Main/assets/index";

const NavBar = () => {
  const navigate = useNavigate();

  const handleClickNavBtn = (btn: string) => {
    if (btn === "learning") {
      navigate("/main-page");
    } else if (btn === "log") {
      navigate("/mylog");
    } else if (btn === "mypage") {
      navigate("/mypage");
    }
  };

  return (
    <StNavContainer>
      <Logo
        style={{
          width: "2rem",
          height: "2rem",
          background: "#ffffff",
          padding: "0.1rem",
          border: "3px solid #EFF0F5",
          borderRadius: "5px",
        }}
      />
      <StNavBottomBox>
        <StNavBtn onClick={() => handleClickNavBtn("learning")}>
          <Learning style={{ width: "2rem", height: "2rem" }} />
        </StNavBtn>
        <StNavBtn onClick={() => handleClickNavBtn("log")}>
          <Log style={{ width: "2rem", height: "2rem" }} />
        </StNavBtn>
        <StNavBtn onClick={() => handleClickNavBtn("mypage")}>
          <MyPage style={{ width: "2rem", height: "2rem" }} />
        </StNavBtn>
      </StNavBottomBox>
    </StNavContainer>
  );
};

export default NavBar;

const StNavContainer = styled.div`
  width: 3rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #a2bae9;
  padding-top: 1rem;
  gap: 33rem;
`;

const StNavBottomBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StNavBtn = styled.button`
  cursor: pointer;
`;
