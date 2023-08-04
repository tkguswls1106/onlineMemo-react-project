import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import styled from "styled-components";
import './App.css';
import LoadingNav from "./components/Navigation/LoadingNav";
import BasicWrapper from "./components/Styled/BasicWrapper";
import { retryLazy } from "./utils/lazyUtil.js"
// import NoLoginNav from "./components/Navigation/NoLoginNav";
// import LoginPage from "./pages/User/LoginPage";
// import SignupPage from "./pages/User/SignupPage";
// import ChangePwPage from "./pages/User/ChangePwPage";
// import YesLoginNav from "./components/Navigation/YesLoginNav";
// import MemoListPage from "./pages/Memo/MemoListPage";
// import InformationPage from "./pages/Etc/InformationPage";
// import ReadAndEditMemoPage from "./pages/Memo/ReadAndEditMemoPage";
// import NewMemoPage from "./pages/Memo/NewMemoPage";
// import UserProfilePage from "./pages/User/UserProfilePage";
// import FriendListPage from "./pages/Friend/FriendListPage";
// import SenderListPage from "./pages/Friend/SenderListPage";
// import NoticePage from "./pages/Etc/NoticePage";
// import DownloadPage from "./pages/Etc/DownloadPage";
const NoLoginNav = retryLazy(() => import('./components/Navigation/NoLoginNav'));
const LoginPage = retryLazy(() => import('./pages/User/LoginPage'));
const SignupPage = retryLazy(() => import('./pages/User/SignupPage'));
const ChangePwPage = retryLazy(() => import('./pages/User/ChangePwPage'));
const YesLoginNav = retryLazy(() => import('./components/Navigation/YesLoginNav'));
const MemoListPage = retryLazy(() => import('./pages/Memo/MemoListPage'));
const InformationPage = retryLazy(() => import('./pages/Etc/InformationPage'));
const ReadAndEditMemoPage = retryLazy(() => import('./pages/Memo/ReadAndEditMemoPage'));
const NewMemoPage = retryLazy(() => import('./pages/Memo/NewMemoPage'));
const UserProfilePage = retryLazy(() => import('./pages/User/UserProfilePage'));
const FriendListPage = retryLazy(() => import('./pages/Friend/FriendListPage'));
const SenderListPage = retryLazy(() => import('./pages/Friend/SenderListPage'));
const NoticePage = retryLazy(() => import('./pages/Etc/NoticePage'));
const DownloadPage = retryLazy(() => import('./pages/Etc/DownloadPage'));


const MainTitleText = styled.header`
    font-size: 3rem;
    text-align: center;
    font-family: "KOTRAHOPE";
    margin: 9px 0px;
    color: #463f3a;

    @media(min-width: 1365px) {
        font-size: 3.3rem;
        margin: 18px 0px;
    }
`;

const LittleTitle = styled.div`
    font-size: 1.25rem;
    text-align: center;
    font-family: "KOTRAHOPE";
    color: #463f3a;

    @media(min-width: 1365px) {
        font-size: 1.7rem;
    }
`;

function App(props) {

  return (
    <BrowserRouter>
      <MainTitleText>
        <Link to="/" style={{textDecoration: "none", color:"#463f3a"}}>
          온라인 메모장 <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
          <LittleTitle>OnlineMemo.kr</LittleTitle>
        </Link>
      </MainTitleText>
      <React.Suspense fallback={<div><LoadingNav></LoadingNav><BasicWrapper><div style={{textAlign: "center", fontSize: "16px"}}>loading...</div></BasicWrapper></div>}>
        <Routes>
          <Route index element={<NoLoginNav />} />
          <Route path="login" element={<NoLoginNav />} />
          <Route path="signup" element={<NoLoginNav />} />
          <Route path="password" element={<NoLoginNav />} />
          <Route path="information" element={<NoLoginNav />} />
          <Route path="notice" element={<NoLoginNav />} />
          <Route path="download" element={<NoLoginNav />} />

          <Route path="/users/:userId/memos" element={<YesLoginNav />} />
          <Route path="/users/:userId" element={<YesLoginNav />} />
          <Route path="/users/:userId/friends" element={<YesLoginNav />} />
          <Route path="/users/:userId/senders" element={<YesLoginNav />} />
        </Routes>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="password" element={<ChangePwPage />} />
          <Route path="information" element={<InformationPage />} />
          <Route path="notice" element={<NoticePage />} />
          <Route path="download" element={<DownloadPage />} />

          <Route path="/users/:userId/memos" element={<MemoListPage />} />
          <Route path="/users/:userId" element={<UserProfilePage />} />
          <Route path="/users/:userId/friends" element={<FriendListPage />} />
          <Route path="/users/:userId/senders" element={<SenderListPage />} />

          <Route path="/memos/:memoId" element={<ReadAndEditMemoPage />} />
          <Route path="/users/:userId/memo" element={<NewMemoPage />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;