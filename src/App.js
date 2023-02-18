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
import MainPage from "./pages/Main/MainPage";
import InformationPage from "./pages/Etc/InformationPage";
import axios from 'axios'


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
      {/* <NoLoginNav /> */}
      <YesLoginNav />
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="member" element={<NewMember />} />
        <Route path="pw" element={<ChangePw />} />
        <Route path="information" element={<InformationPage />} />
        {/* <Route path="post-write" element={<PostWritePage />} />
        <Route path="post/:postId" element={<PostViewPage />} /> */}
        <Route path="main" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;