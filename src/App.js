import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import styled from "styled-components";
import './App.css';
import NoLoginNav from "./components/Navigation/NoLoginNav";
import MainPage from "./components/BodyPage/MainPage";


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
    //margin-bottom: 9px;
`;

// <i class="fa fa-clone" aria-hidden="true"></i>
// 이건 copy 아이콘
function App(props) {
  return (
    <BrowserRouter>
      <MainTitleText>
        온라인 메모장 <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
        <LittleTitle>OnlineMemo.kr</LittleTitle>
      </MainTitleText>
      <NoLoginNav />
      <Routes>
        <Route index element={<MainPage />} />
        {/* <Route index element={<MainPage />} />
        <Route path="post-write" element={<PostWritePage />} />
        <Route path="post/:postId" element={<PostViewPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;