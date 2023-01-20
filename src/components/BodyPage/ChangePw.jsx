import React from "react";
import styled from "styled-components";
import '../../App.css';
import HelloWrapper from "../Styled/HelloWrapper"

const MoreWrapper = styled(HelloWrapper)`
    .flex-container {
        line-height: 130%;
    }

    .change {
        text-shadow: -1px 0px white, 0px 1px white, 1px 0px white, 0px -1px white;
    }
`;

function ChangePw(props) {

    return (
        <MoreWrapper>
            <h2>pw를 변경하세요!&nbsp;&nbsp;<i class="fa fa-unlock-alt" aria-hidden="true"></i></h2>
            <h2>
                <i class="fa fa-user-circle" aria-hidden="true"></i><br></br>
                비밀번호 변경<br></br>
                <hr></hr>
                <form onSubmit={null}>
                    <div class="flex-container">
                        &nbsp;&nbsp;현재 id:&nbsp;&nbsp;<input type="text" value={null} size="15" />
                    </div>
                    <div class="flex-container">
                        현재 pw:&nbsp;&nbsp;<input type="text" value={null} size="15" />
                    </div>
                    <div class="flex-container change">
                        바꿀 pw:&nbsp;&nbsp;<input type="text" value={null} size="15" />
                    </div>
                    <div class="flex-container change">
                        pw 확인:&nbsp;&nbsp;<input type="text" value={null} size="15" />
                    </div>
                    <div class="flex-container">
                        본인확인용 2차 pw:&nbsp;&nbsp;<input type="text" value={null} />
                    </div>
                    <div class="flex-container">
                        <button type="submit">변경 완료</button>
                    </div>
                </form>
            </h2>
        </MoreWrapper>
    );
}

export default ChangePw;