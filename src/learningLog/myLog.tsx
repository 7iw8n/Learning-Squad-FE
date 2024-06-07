import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import instance from "../common/apis/axiosInstance";
import NavBar from "../common/components/NavBar";
import { Logowhite } from "../Main/assets/index";

interface Document {
  documentId: number;
  title: string;
  questions: Question[];
}

interface Question {
  questionId: number;
  questionNumber: number;
  content: string;
  correctAnswer: string;
  bestAnswer: string;
  score: number;
}

const MyLog: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );

  const handleLearningLog = async () => {
    try {
      const res = await instance.get("/api/documents/mydocs");

      console.log(res);
      if (res.data.data.documents) {
        setDocuments(res.data.data.documents);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleLearningLog();
  }, []);

  const uniqueDocuments = documents.filter(
    (document, index, self) =>
      index === self.findIndex((d) => d.title === document.title)
  );

  const handleClickDocument = (document: Document) => {
    setSelectedDocument(document);
  };

  return (
    <StMainContainer>
      <StNavWrapper>
        <NavBar />
      </StNavWrapper>
      <StFileWrapper>
        <StFileLogoBox>
          <StFileTitleTop>
            <StFileTitleBold>L</StFileTitleBold>earning
          </StFileTitleTop>
          <StFileTitleBottom>
            <StFileTitleBold>S</StFileTitleBold>quad
          </StFileTitleBottom>
        </StFileLogoBox>
        <StFileInfo>Documnet Overview</StFileInfo>
        <StDocumentList>
          {uniqueDocuments.map((document) => (
            <StDocumentTitle
              key={document.documentId}
              onClick={() => handleClickDocument(document)}
            >
              {document.title}
            </StDocumentTitle>
          ))}
        </StDocumentList>
      </StFileWrapper>
      <StMainWrapper>
        {selectedDocument ? (
          <StQuestionContainer>
            {selectedDocument.questions.map((question) => (
              <StQuestionWrapper key={question.questionId}>
                <StQuestionBox>
                  <Logowhite
                    style={{
                      width: "2rem",
                      height: "2rem",
                      background: "#c0d0f1",
                      padding: "0.3rem",
                      borderRadius: "5px",
                    }}
                  />
                  <StQuestionContent>{question.content}</StQuestionContent>
                </StQuestionBox>
                <StCorrectAnswer>{question.correctAnswer}</StCorrectAnswer>
              </StQuestionWrapper>
            ))}
          </StQuestionContainer>
        ) : (
          <>
            <StClickInfo>학습 로그를 조회할 문서를 클릭해주세요!</StClickInfo>
            <StClickInfo>
              각 문서마다 생성된 문제와 모범답안을 보여드려요.
            </StClickInfo>
          </>
        )}
      </StMainWrapper>
    </StMainContainer>
  );
};

export default MyLog;

const StMainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: start;
  background-color: #ffffff;
`;

const StNavWrapper = styled.div`
  width: 3rem;
  height: 100%;
`;

const StFileWrapper = styled.div`
  width: 18rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0rem;
  background-color: #f0f5fe;
  overflow-y: scroll;
`;

const StMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: #ffffff;
  gap: 1rem;
  overflow-y: scroll;
`;

const StFileLogoBox = styled.div`
  width: 100%;
  padding-left: 2.5rem;
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
  color: #b5b5b5;
  font-size: 2rem;
  font-weight: 700;
`;

const StFileTitleBold = styled.span`
  color: #7d7d86;
  font-size: 2rem;
  font-weight: 700;
`;

const StFileInfo = styled.span`
  color: #848486;
  font-size: 1rem;
  font-weight: 700;
  padding: 3rem 5rem 1rem 1.5rem;
`;

const StDocumentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StDocumentTitle = styled.button`
  padding: 1rem 2rem 1rem 1rem;
  text-align: start;
  color: #6d6d6d;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 10px;
  border: 2px solid #d5d8dc;
  background: #fff;
  cursor: pointer;
`;

const StQuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 60rem;
  overflow-y: scroll;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const StQuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  margin: 0rem 15rem;
  border-radius: 10px;
  background: #ecf3ff;
`;

const StQuestionBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  flex: 1;
  padding: 1rem 1rem;
  gap: 0.8rem;
  border-radius: 10px;
  background: #a2bae9;
`;

const StQuestionContent = styled.span`
  width: 90%;
  display: block;
  color: #f7f8fd;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
`;

const StCorrectAnswer = styled.p`
  padding: 1.5rem 1rem 0.5rem 1rem;
  color: #575859;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.7rem;
`;

const StClickInfo = styled.span`
  font-weight: 600;
`;
