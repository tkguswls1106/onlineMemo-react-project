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

    padding-bottom: 24px;

    & > h2 {
        text-align: center;
        font-size: 2rem;
        color: #463f3a;

        :not(:first-child) {
            border: solid;
            border-radius: 5px;
            padding: 20px;
            margin: 16.6px 13vw;
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

function MainPage(props) {

    return (
        <Wrapper>
            <h2>나만의 메모 보관함으로 접속&nbsp;&nbsp;<i class="fa fa-mouse-pointer" aria-hidden="true"></i></h2>
            <h2>
                <i class="fa fa-user-circle" aria-hidden="true"></i><br></br>
                Login<br></br><hr></hr>
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
        </Wrapper>
    );
}

export default MainPage;