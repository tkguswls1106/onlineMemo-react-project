import React from "react";
import styled from "styled-components";
import '../../App.css';

const Wrapper = styled.article`
    // text-align:center;
    background-color: #bcb8b1;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 12px;
    font-family: "jua";

    border-bottom: solid #463f3a 1px;
    border-left: solid #463f3a 1px;
    border-right: solid #463f3a 1px;

    // header = 49.5 + 18 px = 67.5px
    // nav = 55.5 + 1 px = 56.5px
    // footer = 64.5 + 18 px = 82.5px
    // article padding & border = 25px
    // => 231.5px
    // height: calc(100vh - 231.5px);

    @media(max-height: 500.18px) {
        height: 100%;
    }

    @media(min-height: 500.19px) {
        height: calc(100vh - 231.5px);
    }

    & > h2 {
        text-align: center;
        font-size: 2rem;
        color: #463f3a;

        :not(:first-child) {
            border: solid;
            border-radius: 5px;
            padding: 20px;
            margin: 16.6px 13vw;

            @media(min-width: 1000px) {
                margin-left: calc(50% - 349px);
                margin-right: calc(50% - 349px);
            }
        }
    }

    .flex-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 5px;
    }

    hr {
        width: 19vw;
        background-color: #463f3a;
        height: 1.4px;
    }

    a {
        margin-top:4px;
        text-decoration: none;
        color: #ffffff;
        font-size: 14px;
        text-shadow:1px 1px 1px #000;
    }

    button {
        background-color: #463f3a;
        color: white;
        border-radius: 5px;
        font-family: "jua";
    }
`;

const DivWrapper = styled.div`
    font-size: 1.5rem;
    color: #463f3a;
    margin-top: 17px;
    line-height: 135%;

    width: 479px;
    margin: 0 auto;
    @media(max-width: 530px) {
        width: 346px;
    }

    ol {
        padding-right: 40px;
    }

    br {
        @media(min-width: 531px) {
            display: none;
        }
    }
`;

function MainPage(props) {

    return (
        <Wrapper>
            <h2>나만의 메모 보관함으로 접속&nbsp;&nbsp;<i class="fa fa-mouse-pointer" aria-hidden="true"></i></h2>
            <h2>
                <i class="fa fa-user-circle" aria-hidden="true"></i><br></br>
                Login<br></br>
                <hr></hr>
                <form onSubmit={null}>
                    <div class="flex-container">
                        &nbsp;&nbsp;id:&nbsp;&nbsp;<input type="text" value={null} />
                    </div>
                    <div class="flex-container">
                        pw:&nbsp;&nbsp;<input type="text" value={null} />
                    </div>
                    <div class="flex-container">
                        <a onClick={null}>pw 변경</a>
                        &nbsp;&nbsp;&nbsp;
                        <a onClick={null}>회원가입</a>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="submit">로그인</button>
                    </div>
                </form>
            </h2>

            <DivWrapper>
                <ol>
                    <li>간단하고 직관적인 UX/UI 디자인!</li>
                    <li>개인정보 필요없는 10초 회원가입 절차!&nbsp;<br></br>(생성할 id, pw 만 입력하면 끝!)</li>
                    <li>어느 기기에서든지 쉽고 빠르게 로그인 후&nbsp;<br></br>나만의 메모 관리!</li>
                    <li>친구들끼리 그룹을 만들어 공동 메모도 작성 가능!</li>
                </ol>
            </DivWrapper>
        </Wrapper>
    );
}

export default MainPage;