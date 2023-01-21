import React from "react";
import styled from "styled-components";
import '../../App.css';
import { useNavigate } from "react-router-dom";
import HelloWrapper from "../../components/Styled/HelloWrapper"

const MoreWrapper = styled(HelloWrapper)`
    .flex-container {
        line-height: 130%;
    }

    .fa-arrow-left {
        border: solid 2.3px;
        border-radius: 6px;
        padding: 1px 6.7px;
    }
`;

function NewMember(props) {
    const navigate = useNavigate();

    return (
        <MoreWrapper>
            <h2>
                <i className="fa fa-arrow-left" aria-hidden="true" onClick={() => { navigate('/') }}></i>&nbsp;&nbsp;
                환영합니다!&nbsp;&nbsp;<i className="fa fa-smile-o" aria-hidden="true"></i>
            </h2>
            <h2>
                <i className="fa fa-user-circle" aria-hidden="true"></i><br></br>
                회원가입<br></br>
                <hr></hr>
                <form onSubmit={null}>
                    <div className="flex-container">
                        &nbsp;&nbsp;id:&nbsp;&nbsp;<input type="text" value={null} />
                    </div>
                    <div className="flex-container">
                        pw:&nbsp;&nbsp;<input type="text" value={null} />
                    </div>
                    <div className="flex-container">
                        pw 확인:&nbsp;&nbsp;<input type="text" value={null} size="15"/>
                    </div>
                    <div className="flex-container">
                        본인확인용 2차 pw:&nbsp;&nbsp;<input type="text" value={null} />
                    </div>
                    <div className="flex-container">
                        <button type="submit">가입 완료</button>
                    </div>
                </form>
            </h2>
        </MoreWrapper>
    );
}

export default NewMember;