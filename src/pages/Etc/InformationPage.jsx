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

    ul {
        margin: 12.8px 0px;
        padding-left: 32px;
    }

    strong {
        font-size: 1.78rem;
    }

    span {
        display: flex;
        flex-direction: row;
        align-items: center;

        font-size: 1.8rem;
        font-weight: 680;
    }

    .fa-mobile {
        font-size: 2.3rem;
    }

    .fa-angle-down {
        font-size: 1.9rem;
        font-weight: 840;
    }

    .contacts {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        
        & > i {
            font-weight: bolder;
            font-size: 18px;
        }

        & > a {
            text-decoration: none;
            font-weight: bolder;
            font-size: 19px;
            color: #322d2a;
        }
    }

    .device {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        font-size: 1.83rem;
    }
`;

const Inform = () => {
    return (
        <div>
            <div style={{ lineHeight: "150%" }}><br></br></div>
            <h5>&lt;&nbsp;개발자 정보&nbsp;&nbsp;<i className="fa fa-id-badge" aria-hidden="true"></i>&nbsp;&gt;</h5>
            <ul>
                <li><strong>이름 :</strong>&nbsp;&nbsp;사현진 (SAHYUNJIN)</li>
                <li><strong>정보 :</strong>&nbsp;&nbsp;상명대학교 소프트웨어학과 19학번</li>
                <li><strong>역할 :</strong>&nbsp;&nbsp;프론트엔드, 백엔드 개발, 웹 디자인</li>
                <div style={{ lineHeight: "17%" }}><br></br></div>
                <span>&nbsp;&nbsp;<i className="fa fa-arrow-right" aria-hidden="true"></i>&nbsp;Full Stack Developer</span>
            </ul>
            <div style={{ lineHeight: "145%" }}><br></br></div>

            <h5>&lt;&nbsp;개발 기술&nbsp;&nbsp;<i className="fa fa-wrench" aria-hidden="true"></i>&nbsp;&gt;</h5>
            <div style={{ lineHeight: "12.8px" }}><br></br></div>
            <span className="device"><i className="fa fa-angle-down" aria-hidden="true"></i>&nbsp;WEB&nbsp;&nbsp;<i className="fa fa-desktop" aria-hidden="true"></i></span>
            <ul style={{ marginTop: "0px", marginBottom: "0px" }}>
                <div style={{ lineHeight: "30%" }}><br></br></div>
                <li><strong>프론트엔드 :</strong>&nbsp;&nbsp;React, JavaScript</li>
                <li><strong>백엔드 :</strong>&nbsp;&nbsp;Spring Boot, Java</li>
                <li><strong>데이터베이스 :</strong>&nbsp;&nbsp;MySQL</li>
                <li><strong>보안 :</strong>&nbsp;&nbsp;Spring Security, JSON Web Token</li>
                <li><strong>기타 :</strong>&nbsp;&nbsp;Amazon AWS</li>
                <div style={{ lineHeight: "17%" }}><br></br></div>
                <span>&nbsp;&nbsp;<i className="fa fa-arrow-right" aria-hidden="true"></i>&nbsp;REST API, HTTPS</span>
                <div style={{ lineHeight: "10.5px" }}><br></br></div>
            </ul>
            <span className="device"><i className="fa fa-angle-down" aria-hidden="true"></i>&nbsp;APP&nbsp;&nbsp;<i className="fa fa-mobile" aria-hidden="true"></i></span>
            <div style={{ lineHeight: "30%" }}><br></br></div>
            <ul style={{ marginTop: "0px" }}>
                <li><strong>모바일 앱 :</strong>&nbsp;&nbsp;React Native + WebView</li>
            </ul>
            <div style={{ lineHeight: "145%" }}><br></br></div>

            <h5>&lt;&nbsp;Contact&nbsp;&nbsp;<i className="fa fa-handshake-o" aria-hidden="true"></i>&nbsp;&gt;</h5>
            <div style={{ lineHeight: "11.3px" }}><br></br></div>
            <span className="contacts">
                <a href="mailto:tkguswls1106@gmail.com?subject=OnlineMemo 문의제목: &body=%0D%0A%0D%0A%0D%0A%0D%0A  -----------------------------------------------------------%0D%0A문의 및 건의사항 및 보완할점 내용을 위에 적어주세요!"><i className="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
                <a href="https://www.instagram.com/sa.hyunjin/"><i className="fa fa-instagram" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
                <a href="https://github.com/tkguswls1106"><i className="fa fa-github" aria-hidden="true"></i></a>
            </span>
            <div style={{ lineHeight: "150%" }}><br></br></div>
        </div>
    );
}

function InformationPage(props) {
    const navigate = useNavigate();

    return (
        <MoreWrapper>
            <i className="fa fa-arrow-left" aria-hidden="true" onClick={() => { navigate(-1) }}></i>
            <DivWrapper className="flex-container">
                <Inform />
            </DivWrapper>
        </MoreWrapper>
    );
}

export default InformationPage;