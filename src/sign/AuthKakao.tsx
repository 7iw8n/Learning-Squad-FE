import { useEffect, useRef } from "react";
import { signInInstance } from "../common/apis/axiosInstance";
import { useNavigate } from "react-router-dom";

const AuthKakao = () => {
  const AUTHORIZE_CODE = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();
  const hasFetched = useRef(false);

  const handleKakaoSignIn = async () => {
    try {
      const res = await signInInstance.post("/api/users/login/oauth/kakao", {
        authorizationCode: AUTHORIZE_CODE,
      });

      console.log(AUTHORIZE_CODE);
      const accessToken = res.data.data.token;
      if (accessToken) {
        localStorage.setItem("ACCESS_TOKEN", accessToken);
        navigate("/main-page");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (AUTHORIZE_CODE && !hasFetched.current) {
      handleKakaoSignIn();
      hasFetched.current = true;
    }
  }, [AUTHORIZE_CODE]);

  return <div>카카오 로그인 하는 중</div>;
};

export default AuthKakao;
