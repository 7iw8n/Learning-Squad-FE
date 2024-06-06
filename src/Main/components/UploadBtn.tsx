import AWS from "aws-sdk";
import { useState } from "react";
import styled from "@emotion/styled";
import instance from "../../common/apis/axiosInstance";

interface UploadBtnProps {
  uploaded: boolean;
  documentId: number | null;
  setLoading: (loading: boolean) => void;
  setUploaded: (uploaded: boolean) => void;
  setCreated: (created: boolean) => void;
  setQuestionSize: (size: number) => void;
  setDocumentId: (id: number | null) => void;
}

const UploadBtn: React.FC<UploadBtnProps> = ({
  uploaded,
  documentId,
  setLoading,
  setUploaded,
  setCreated,
  setQuestionSize,
  setDocumentId,
}) => {
  const [, setSelectedFile] = useState<File | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("허거덩");
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      await handleUploadFile(file);
    }
  };

  const handleUploadS3 = (file: File) => {
    console.log("S3 업로드 시작");
    const REGION = import.meta.env.VITE_REGION;
    const ACCESS_KEY_ID = import.meta.env.VITE_ACCESS_KEY_ID;
    const SECRET_ACESS_KEY_ID = import.meta.env.VITE_SECRET_ACCESS_KEY_ID;

    AWS.config.update({
      region: REGION,
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACESS_KEY_ID,
    });

    const upload = new AWS.S3.ManagedUpload({
      params: {
        ACL: "public-read",
        Bucket: "server1-bucket",
        Key: `upload/${file.name}`,
        Body: file,
      },
    });

    console.log("S3 업로드 끝");
    return upload.promise();
  };

  const handleUploadFile = async (file: File) => {
    setLoading(true);
    try {
      const data = await handleUploadS3(file);
      const fileUrl = data.Location;
      const fileName = file.name;
      console.log(fileUrl);
      console.log(fileName);
      console.log(typeof fileUrl);
      console.log(typeof fileName);

      const res = await instance.post("/api/documents/upload", {
        documentUrl: fileUrl,
        title: fileName,
      });

      const questionSize: number = res.data.data.questionSize;
      const currentDocumentId = res.data.data.id;
      console.log(res);
      setUploaded(true);
      localStorage.setItem("uploaded", "true");
      setUploadedFileName(fileName);
      setQuestionSize(questionSize);
      setDocumentId(currentDocumentId);
      console.log(uploaded);

      console.log("pdf 업로드 api 연동 완료");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickBtn = () => {
    const inputFile = document.getElementById("fileInput");
    if (inputFile) {
      inputFile.click();
      console.log("드르렁");
    }

    setUploaded(false);
  };

  const handleClickXBtn = async () => {
    try {
      const res = await instance.delete("/api/documents/delete", {
        params: {
          id: documentId,
        },
      });

      setDocumentId(null);
      setUploaded(false);
      setCreated(false);

      console.log("삭제");
      console.log(res);
      console.log(documentId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StUploadBtn>
      {uploaded ? (
        <StUploadedBtn>
          <StBtnBox>{uploadedFileName}</StBtnBox>
          <StXBtn onClick={handleClickXBtn}>X</StXBtn>
        </StUploadedBtn>
      ) : (
        <label htmlFor="file">
          <StBtnBox onClick={handleClickBtn}>Brows files</StBtnBox>
        </label>
      )}
      <input
        id="fileInput"
        type="file"
        accept="pdf"
        onChange={handleFileChange}
      />
    </StUploadBtn>
  );
};

export default UploadBtn;

const StUploadBtn = styled.div`
  padding-top: 1.5rem;

  label {
    display: inline-block;
    line-height: normal;
    vertical-align: middle;
  }

  input[type="file"] {
    position: absolute;
    display: none;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

const StBtnBox = styled.div`
  padding: 0.3rem 0.6rem;
  border-radius: 10px;
  border: 2px solid #d5d8dc;
  background: #f8f9fa;
  color: #6d6d6d;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
`;

const StUploadedBtn = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

const StXBtn = styled.button`
  padding-left: 0.2rem;
  color: #6d6d6d;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
`;
