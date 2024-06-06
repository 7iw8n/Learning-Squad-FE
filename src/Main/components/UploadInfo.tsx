import styled from "@emotion/styled";
import { Upload } from "../assets/index";

interface UploadInfoProps {
  loading: boolean;
}

const UploadInfo: React.FC<UploadInfoProps> = ({ loading }) => {
  return (
    <StUploadInfo>
      {loading ? (
        <StLoadingMsg>문제 생성 중..</StLoadingMsg>
      ) : (
        <>
          <Upload style={{ marginBottom: "1rem" }} />
          <StUploadMsg>학습하고자 하는</StUploadMsg>
          <StUploadMsg>파일을 업로드 해주세요.</StUploadMsg>
          <StTipBox>
            <StTipMsg>
              여러분이 학습하며 정리한 문서를 바탕으로 서술형 문제를 만들어요!
            </StTipMsg>
            <StTipMsg>
              생성 문제는 문서의 구체성과 상세함에 따라 달라질 수 있어요.
            </StTipMsg>
            <StTipMsg
              style={{
                marginTop: "1rem",
                fontSize: "0.9rem",
                fontWeight: "600",
              }}
            >
              <span style={{ color: "red" }}>TIP!</span> 암기 과목 혹은 문과
              계열의 문서, 줄글이 많은 문서일 수록 좋아요.
            </StTipMsg>
          </StTipBox>
        </>
      )}
    </StUploadInfo>
  );
};

export default UploadInfo;

const StLoadingMsg = styled.span`
  display: block;
  padding-top: 0.5rem;
  color: #282929;
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
`;

const StUploadInfo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StUploadMsg = styled.span`
  display: block;
  padding-top: 0.5rem;
  color: #282929;
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
`;

const StTipBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const StTipMsg = styled.span`
  display: block;
  font-size: 0.8rem;
  padding-top: 0.5rem;
`;
