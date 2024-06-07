import { createBrowserRouter } from "react-router-dom";
import Landing from "./common/landing";
import Login from "./sign/login";
import MainPage from "./Main/mainPage";
import AuthKakao from "./sign/AuthKakao";
import MyPage from "./mypage/myPage";
import MyLog from "./learningLog/myLog";
import SignOn from "./sign/signOn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-on",
    element: <SignOn />,
  },
  {
    path: "/kakao/callback",
    element: <AuthKakao />,
  },
  {
    path: "/main-page",
    element: <MainPage />,
  },
  {
    path: "/mypage",
    element: <MyPage />,
  },
  {
    path: "/mylog",
    element: <MyLog />,
  },
]);

export default router;
