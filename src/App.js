import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import styled from "styled-components";
import './App.css';
import NoLoginNav from "./components/Navigation/NoLoginNav";
import LoginPage from "./pages/User/LoginPage";
import NewMember from "./pages/User/NewMember";
import ChangePw from "./pages/User/ChangePw";
import YesLoginNav from "./components/Navigation/YesLoginNav";
import MemoListPage from "./pages/Memo/MemoListPage";
import InformationPage from "./pages/Etc/InformationPage";
import axios from 'axios'
import ReadAndEditMemoPage from "./pages/Memo/ReadAndEditMemoPage";
import NewMemoPage from "./pages/Memo/NewMemoPage";
import UserProfilePage from "./pages/User/UserProfilePage";
import FriendListPage from "./pages/Friend/FriendListPage";
import SenderListPage from "./pages/Friend/SenderListPage";
import NoticePage from "./pages/Etc/NoticePage";

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
      <Routes>
        <Route index element={<NoLoginNav />} />
        <Route path="member" element={<NoLoginNav />} />
        <Route path="pw" element={<NoLoginNav />} />
        <Route path="/users/:userId/memos" element={<YesLoginNav />} />
        <Route path="/users/:userId" element={<YesLoginNav />} />
        {/* <Route path="/memos/:memoId" element={<OneMemoNav />} /> */}
        <Route path="information" element={<NoLoginNav />} />  {/*이거 나중에 로그인여부에 따라 교체하는걸로 바꾸도록하자*/}
        <Route path="notice" element={<NoLoginNav />} />  {/*이거 나중에 로그인여부에 따라 교체하는걸로 바꾸도록하자*/}

        <Route path="/users/:userId/friends" element={<YesLoginNav />} />
        <Route path="/users/:userId/senders" element={<YesLoginNav />} />
      </Routes>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="member" element={<NewMember />} />
        <Route path="pw" element={<ChangePw />} />
        <Route path="information" element={<InformationPage />} />
        <Route path="notice" element={<NoticePage />} />

        <Route path="/users/:userId/memos" element={<MemoListPage />} />
        <Route path="/memos/:memoId" element={<ReadAndEditMemoPage />} />

        <Route path="/users/:userId/memo" element={<NewMemoPage />} />

        <Route path="/users/:userId" element={<UserProfilePage />} />

        <Route path="/users/:userId/friends" element={<FriendListPage />} />
        <Route path="/users/:userId/senders" element={<SenderListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;