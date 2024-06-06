import styled from "@emotion/styled";
import { useState } from "react";
import instance from "../../common/apis/axiosInstance";

interface CreateInfoProps {
  created: boolean;
  questionSize: number;
  documentId: number | null;
  setCreated: (created: boolean) => void;
  setQuestionId: (id: number) => void;
  setContent: (content: string) => void;
}

const CreateInfo: React.FC<CreateInfoProps> = ({
  created,
  questionSize,
  documentId,
  setCreated,
  setQuestionId,
  setContent,
}) => {
  const [currentQuestionNum] = useState<number>(1);

  const handleClickBtn = async () => {
    if (questionSize !== null && currentQuestionNum > questionSize) {
      alert("모든 문제를 다 풀었습니다.");
      return;
    }

    try {
      const res = await instance.get("/api/questions", {
        params: {
          documentId: documentId,
          questionNum: currentQuestionNum,
        },
      });

      console.log(res);
      setCreated(true);
      localStorage.setItem("created", String(created));
      const content = res.data.data.content;
      const questionId = res.data.data.id;
      setQuestionId(questionId);
      setContent(content);
      console.log(created);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StInfoContainer>
      <StInfoMsg>{questionSize}개의 문제가 생성 되었습니다.</StInfoMsg>
      <StLearningBtn onClick={handleClickBtn}>문제 풀기</StLearningBtn>
    </StInfoContainer>
  );
};

export default CreateInfo;

const StInfoContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StInfoMsg = styled.span`
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  background: #f0f5fe;
  color: #575859;
  font-size: 1rem;
  font-weight: 600;
`;

const StLearningBtn = styled.button`
  border-radius: 20px;
  background: #dbdde5;
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  color: #575859;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
`;
