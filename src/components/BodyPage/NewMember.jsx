import React from "react";
import styled from "styled-components";
import '../../App.css';
import HelloWrapper from "../Styled/HelloWrapper"

const MoreWrapper = styled(HelloWrapper)`
    .flex-container {
        line-height: 130%;
    }
`;

function NewMember(props) {


    return (
        <MoreWrapper>
            <h2>환영합니다!&nbsp;&nbsp;<i class="fa fa-smile-o" aria-hidden="true"></i></h2>
            <h2>
                <i class="fa fa-user-circle" aria-hidden="true"></i><br></br>
                회원가입<br></br>
                <hr></hr>
                <form onSubmit={null}>
                    <div class="flex-container">
                        &nbsp;&nbsp;id:&nbsp;&nbsp;<input type="text" value={null} />
                    </div>
                    <div class="flex-container">
                        pw:&nbsp;&nbsp;<input type="text" value={null} />
                    </div>
                    <div class="flex-container">
                        pw 확인:&nbsp;&nbsp;<input type="text" value={null} size="15"/>
                    </div>
                    <div class="flex-container">
                        본인확인용 2차 pw:&nbsp;&nbsp;<input type="text" value={null} />
                    </div>
                    <div class="flex-container">
                        <button type="submit">가입 완료</button>
                    </div>
                </form>
            </h2>
        </MoreWrapper>
    );
}

export default NewMember;