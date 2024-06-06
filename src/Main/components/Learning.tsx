import React, { useState, ChangeEvent } from "react";
import styled from "@emotion/styled";
import instance from "../../common/apis/axiosInstance";
import { Logowhite, Send } from "../assets/index";

interface LearningProps {
  documentId: number | null;
  questionId: number | null;
  questionSize: number | null;
  content: string | null;
}

const Learning: React.FC<LearningProps> = ({
  documentId,
  questionId,
  questionSize,
  content,
}) => {
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [userAnswers, setUserAnswers] = useState<
    {
      questionId: number | null;
      answers: {
        answer: string;
        serverResponse: { response: string; feedbackMessage: string };
      }[];
    }[]
  >([]);
  const [newScore, setNewScore] = useState<number | null>(null);
  const [questions, setQuestions] = useState<
    { content: string | null; questionId: number | null }[]
  >([{ content, questionId }]);
  const [currentQuestionNum, setCurrentQuestionNum] = useState<number>(1);

  const onChangeAnswer = (event: ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(event.target.value);
  };

  const handleQuestion = async () => {
    if (questionSize !== null && currentQuestionNum > questionSize) {
      alert("모든 문제를 다 풀었습니다.");
      return;
    }

    try {
      const res = await instance.get("/api/questions", {
        params: {
          documentId: documentId,
          questionNum: currentQuestionNum + 1,
        },
      });

      console.log(res);
      setQuestions((prevQuestions) => [
        ...prevQuestions,
        {
          content: res.data.data.content,
          questionId: res.data.data.id,
        },
      ]);
      setUserAnswer("");
      setNewScore(null);
      setCurrentQuestionNum((prevNum) => prevNum + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickSendBtn = async () => {
    const currentQuestion = questions[questions.length - 1];
    console.log(currentQuestion.questionId);
    try {
      const res = await instance.post("/api/answers", {
        questionId: currentQuestion.questionId,
        userAnswer: userAnswer,
      });

      console.log(res);

      const { newScore, correctAnswer } = res.data.data;

      setNewScore(newScore);
      setUserAnswers((prevAnswers) => {
        const questionIndex = prevAnswers.findIndex(
          (answer) => answer.questionId === currentQuestion.questionId
        );
        if (questionIndex !== -1) {
          const updatedAnswers = [...prevAnswers];
          updatedAnswers[questionIndex].answers = [
            ...updatedAnswers[questionIndex].answers,
            {
              answer: userAnswer,
              serverResponse: {
                response: correctAnswer,
                feedbackMessage:
                  newScore < 50
                    ? `해당 답변에 대한 점수는 ${newScore}점입니다. 답변을 다시 입력해주세요.`
                    : `해당 답변에 대한 점수는 ${newScore}점입니다. \n[모범 답안]\n${correctAnswer}`,
              },
            },
          ];
          return updatedAnswers;
        }
        return [
          ...prevAnswers,
          {
            questionId: currentQuestion.questionId,
            answers: [
              {
                answer: userAnswer,
                serverResponse: {
                  response: correctAnswer,
                  feedbackMessage:
                    newScore < 50
                      ? `해당 답변에 대한 점수는 ${newScore}점입니다. 답변을 다시 입력해주세요.`
                      : `해당 답변에 대한 점수는 ${newScore}점입니다. \n[모범 답안]\n${correctAnswer}`,
                },
              },
            ],
          },
        ];
      });

      setUserAnswer("");
      console.log(newScore);
      console.log(userAnswer);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StLearningContainer>
      {questions.map((question, index) => (
        <React.Fragment key={index}>
          <StLearningWrapper>
            <Logowhite
              style={{
                width: "2rem",
                height: "2rem",
                background: "#c0d0f1",
                padding: "0.3rem",
                borderRadius: "5px",
              }}
            />
            <StLearningBox style={{ lineHeight: "1rem" }}>
              {question.content || "No question available"}
            </StLearningBox>
          </StLearningWrapper>
          {userAnswers
            .find((answers) => answers.questionId === question.questionId)
            ?.answers.map((answer, answerIndex) => (
              <React.Fragment key={answerIndex}>
                <StAnswerWrapper>
                  <StAnswerBox>{answer.answer}</StAnswerBox>
                </StAnswerWrapper>
                <StLearningWrapper style={{ marginBottom: "2rem" }}>
                  <Logowhite
                    style={{
                      width: "3rem",
                      height: "2rem",
                      background: "#c0d0f1",
                      padding: "0.3rem",
                      borderRadius: "5px",
                    }}
                  />
                  <StLearningBox style={{ lineHeight: "1.8rem" }}>
                    {answer.serverResponse.feedbackMessage}
                  </StLearningBox>
                </StLearningWrapper>
              </React.Fragment>
            ))}
        </React.Fragment>
      ))}
      {newScore !== null && newScore >= 50 && (
        <StNextQuestionBtn onClick={handleQuestion}>
          다음 문제 풀기
        </StNextQuestionBtn>
      )}
      <StSendAnswerWrapper>
        <StSendAnswerBox
          value={userAnswer}
          placeholder="답변을 입력해주세요"
          onChange={onChangeAnswer}
        />
        <StSendAnswerBtn onClick={handleClickSendBtn}>
          <Send style={{ width: "1.5rem" }} />
        </StSendAnswerBtn>
      </StSendAnswerWrapper>
    </StLearningContainer>
  );
};

export default Learning;

const StLearningContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 1rem;
  padding: 10rem 5rem 15rem 5rem;
  overflow-y: auto;
`;

const StLearningWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 100%;
  flex: 1;
  margin-left: 10rem;
  gap: 0.6rem;
`;

const StLearningBox = styled.span`
  display: block;
  color: #575859;
  font-size: 1rem;
  font-weight: 600;
`;

const StAnswerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  width: 100%;
  margin-left: 10rem;
`;

const StAnswerBox = styled.p`
  padding: 0.5rem 1rem;
  color: #575859;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.7rem;
  background: #eff0f5;
  border-radius: 20px 0px 20px 20px;
`;

const StSendAnswerWrapper = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
  width: 30rem;
  margin-bottom: 3rem;
  background: #eff0f5;
  border-radius: 10px;
  gap: 8rem;
`;

const StSendAnswerBox = styled.input`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: start;
  padding: 0.3rem 1.5rem;
  color: #999ba3;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 2.5rem;
`;

const StSendAnswerBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 1rem;
  padding-bottom: 0.8rem;
  cursor: pointer;
`;

const StNextQuestionBtn = styled.button`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  margin-bottom: 8rem;
  border-radius: 20px;
  background: #dbdde5;
  color: #575859;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
`;
