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
import LoginPage from "./components/BodyPage/LoginPage";
import NewMember from "./components/BodyPage/NewMember";
import ChangePw from "./components/BodyPage/ChangePw";


const MainTitleText = styled.header`
    font-size: 3rem;
    text-align: center;
    font-family: "KOTRAHOPE";
    margin: 9px 0px;
    color: #463f3a;
`;

const LittleTitle = styled.div`
    font-size: 1.25rem;
    text-align: center;
    font-family: "KOTRAHOPE";
    color: #463f3a;
    // margin-bottom: 9px;
`;

// <i class="fa fa-clone" aria-hidden="true"></i>
// 이건 copy 아이콘
function App(props) {

  return (
    <BrowserRouter>
      <MainTitleText>
        <Link to="/" style={{ textDecoration: "none", color:"#463f3a"}}>
          온라인 메모장 <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
          <LittleTitle>OnlineMemo.kr</LittleTitle>
        </Link>
      </MainTitleText>
      <NoLoginNav />
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="member" element={<NewMember />} />
        <Route path="pw" element={<ChangePw />} />
        {/* <Route path="post-write" element={<PostWritePage />} />
        <Route path="post/:postId" element={<PostViewPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;