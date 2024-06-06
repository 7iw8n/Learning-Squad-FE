import styled from "@emotion/styled";
// import Lottie from "./components/Lottie";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const LoginTitleTop = "AI 학습 튜터,\n";
  const LoginTitleBottom = "Learning Squad";

  const handleStartBtn = () => {
    navigate("/login");
  };

  return (
    <StLoginContainer>
      <StLoginTitleTop>{LoginTitleTop}</StLoginTitleTop>
      <StLoginTitleBottom>{LoginTitleBottom}</StLoginTitleBottom>
      {/* <Lottie /> */}
      <StStartBtn onClick={handleStartBtn}>시작하기</StStartBtn>
    </StLoginContainer>
  );
};

export default Landing;

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
  color: #000;
  font-size: 4rem;
  font-weight: 600;
`;

const StStartBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  height: 3rem;
  margin-top: 25rem;
  border-radius: 20px;
  background-color: #e6efff;
  color: #81a1e1;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
`;
