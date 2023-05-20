import React from "react";
import styled from "styled-components";
import '../../App.css';
import { useNavigate } from "react-router-dom";
import BasicWrapper from "../../components/Styled/BasicWrapper";

const MoreWrapper = styled(BasicWrapper)`
    display: flex;
    flex-direction: column;
    justify-content: center;

    position: relative;

    @media(max-height: 767.1px) {
        height: 100%;
    }

    @media(min-height: 767.2px) {
        height: calc(100vh - 271px);
    }

    @media(min-height: 767.2px) and (max-width: 1364.9px) {
        height: calc(100vh - 271px + 43.5px);
    }

    .fa-arrow-left {
        font-size: 2rem;
        color: #463f3a;

        border: solid 2.3px;
        border-radius: 6px;
        padding: 1px 6.7px;

        position: absolute;
        top: 11.5px;
        left: 16px;
        z-index: 10;

        &:hover {
            cursor:pointer;
            background-color: #463f3a;
            color: #bcb8b1;
            border-color: #463f3a;
        }
    }

    a {
        text-decoration: none;
        color: #0059ff;

        &:hover {
            cursor:pointer;
            color: blue;
        }
    }
`;

const DivWrapper = styled.div`

    display: flex;
    justify-content: center;

    font-size: 1.8rem;
    color: #322d2a;

    line-height: 130%;

    h5 {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        font-size: 2.1rem;
        margin: 0px;
        text-align: center;
    }

    ol {
        margin: 12.8px 0px;
        padding-left: 32px;
    }

    strong {
        font-size: 1.78rem;
    }
`;

const Notice = () => {
    return (
        <div>
            <div style={{ lineHeight: "140%" }}><br></br></div>
            <h5>&lt;&nbsp;공지사항&nbsp;&nbsp;<i className="fa fa-bullhorn" aria-hidden="true"></i>&nbsp;&gt;</h5>
            <div style={{ lineHeight: "20%" }}><br></br></div>
            <ol>
                <strong><li>&nbsp;공동메모 동시 수정 주의할 것</li></strong>
                공동메모는 팀원중 한 명만 접속해서 수정하시길 권장드립니다.<br></br>
                만약 동시접속하여 수정하실 경우, 가장 마지막으로 저장을 누른 팀원의 메모로 수정됩니다.
                <div style={{ lineHeight: "60%" }}><br></br></div>

                <strong><li>&nbsp;로그인 유지 시간은 6시간</li></strong>
                보안을 위해 로그인 유지 시간을 제한합니다.<br></br>
                로그인 이후 6시간 경과시, 자동으로 로그아웃되어 재로그인해야 합니다.<br></br>
                만약 장기 대기시간이 우려될 경우, 중간에 한번 로그아웃 후 재로그인을 권장드립니다.
                <div style={{ lineHeight: "60%" }}><br></br></div>

                <strong><li>&nbsp;사이트 주소 및 앱 다운로드</li></strong>
                - 웹사이트 링크:&nbsp;<a href="https://www.OnlineMemo.kr">www.OnlineMemo.kr</a><br></br>
                - Android 앱 다운로드: ~링크~
                <div style={{ lineHeight: "60%" }}><br></br></div>

                <strong><li>&nbsp;전달사항은 메일과 DM으로</li></strong>
                문의, 건의사항, 보완할점, 오류 등등 전달 사항이 있다면, '개발 정보' 탭 하단의 메일과 인스타 DM을 통해 말씀해주세요.
                <div style={{ lineHeight: "60%" }}><br></br></div>

                <strong><li style={{ color: "#dd2b2b" }}>&nbsp;본 사이트는 개인정보 취득 및 수익창출이 전혀 없음을 알립니다.</li></strong>
            </ol>
            <div style={{ lineHeight: "140%" }}><br></br></div>
        </div>
    );
}

function NoticePage(props) {
    const navigate = useNavigate();

    return (
        <MoreWrapper>
            <i className="fa fa-arrow-left" aria-hidden="true" onClick={() => { navigate(-1) }}></i>
            <DivWrapper className="flex-container">
                <Notice />
            </DivWrapper>
        </MoreWrapper>
    );
}

export default NoticePage;