import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios'
import '../../App.css';
import { useNavigate } from "react-router-dom";
import HelloWrapper from "../../components/Styled/HelloWrapper"

const MoreWrapper = styled(HelloWrapper)`
    .flex-container {
        line-height: 130%;
    }

    .fa-arrow-left {
        border: solid 2.3px ;
        border-radius: 6px;
        padding: 1px 6.7px;

        &:hover {
            cursor:pointer;
            background-color: #463f3a;
            color: #bcb8b1;
            border-color: #463f3a;
        }
    }

    .change {
        text-shadow: -1px 0px white, 0px 1px white, 1px 0px white, 0px -1px white;
    }
`;

function ChangePwPage(props) {
    const navigate = useNavigate();

    return (
        <MoreWrapper>
            <h2>
                <i className="fa fa-arrow-left" aria-hidden="true" onClick={() => { navigate(-1) }}></i>&nbsp;&nbsp;
                pw를 변경하세요!&nbsp;&nbsp;<i className="fa fa-unlock-alt" aria-hidden="true"></i>
            </h2>
            <h2>
                <i className="fa fa-user-circle" aria-hidden="true"></i><br></br>
                비밀번호 변경<br></br>
                <hr></hr>
                <form onSubmit={null}>
                    <div className="flex-container">
                        &nbsp;&nbsp;현재 id:&nbsp;&nbsp;<input type="text" value={null} size="15" />
                    </div>
                    <div className="flex-container">
                        현재 pw:&nbsp;&nbsp;<input type="text" value={null} size="15" />
                    </div>
                    <div className="flex-container change">
                        바꿀 pw:&nbsp;&nbsp;<input type="text" value={null} size="15" />
                    </div>
                    <div className="flex-container change">
                        pw 확인:&nbsp;&nbsp;<input type="text" value={null} size="15" />
                    </div>
                    <div className="flex-container">
                        <button type="submit">변경 완료</button>
                        {/* 변경 완료했으면 홈화면으로 리다이렉트 시키자 */}
                    </div>
                </form>
            </h2>
        </MoreWrapper>
    );
}

export default ChangePwPage;