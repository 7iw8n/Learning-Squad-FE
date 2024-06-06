import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import NavBar from "../common/components/NavBar";
import UploadBtn from "./components/UploadBtn";
import UploadInfo from "./components/UploadInfo";
import CreateInfo from "./components/CreateInfo";
import Learnings from "./components/Learning";

const MainPage = () => {
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const [questionSize, setQuestionSize] = useState(0);
  const [documentId, setDocumentId] = useState(0);
  const [questionId, setQuestionId] = useState(0);
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    const uploadedStatus = localStorage.getItem("uploaded") === "true";
    const createdStatus = localStorage.getItem("created") === "true";
    setUploaded(uploadedStatus);
    setCreated(createdStatus);
  }, []);

  useEffect(() => {
    localStorage.setItem("uploaded", String(uploaded));
  }, [uploaded]);

  useEffect(() => {
    localStorage.setItem("created", String(created));
  }, [created]);

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
        <StFileInfo>Upload your file</StFileInfo>
        <StUploadBox>
          <StUploadTitle>Drag and Drop files here</StUploadTitle>
          <StUploadSubtitle>Limit 200MB per file (PDF, DOCX)</StUploadSubtitle>
          <UploadBtn
            uploaded={uploaded}
            documentId={documentId}
            setLoading={setLoading}
            setUploaded={setUploaded}
            setCreated={setCreated}
            setQuestionSize={setQuestionSize}
            setDocumentId={setDocumentId}
          />
        </StUploadBox>
      </StFileWrapper>
      <StMainWrapper>
        {uploaded ? (
          created ? (
            <Learnings
              documentId={documentId}
              questionId={questionId}
              questionSize={questionSize}
              content={content}
            />
          ) : (
            <>
              <CreateInfo
                created={created}
                setCreated={setCreated}
                questionSize={questionSize}
                documentId={documentId}
                setQuestionId={setQuestionId}
                setContent={setContent}
              />
            </>
          )
        ) : (
          <>
            <UploadInfo loading={loading} />
          </>
        )}
      </StMainWrapper>
    </StMainContainer>
  );
};

export default MainPage;

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

const StFileWrapper = styled.div`
  width: 18rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  background-color: #f0f5fe;
`;

const StMainWrapper = styled.div`
  width: 100%;
  flex: 1;
  height: 100%;
  background-color: #ffffff;
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
  padding: 3rem 5rem 1rem 0rem;
`;

const StUploadBox = styled.div`
  width: 13rem;
  height: 7rem;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 10px;
`;

const StUploadTitle = styled.span`
  display: block;
  color: #6d6d6d;
  font-size: 0.75rem;
  font-weight: 700;
`;

const StUploadSubtitle = styled.span`
  color: #acafbb;
  font-size: 0.5rem;
  font-weight: 700;
`;

const StUploadMsg = styled.span`
  display: block;
`;
