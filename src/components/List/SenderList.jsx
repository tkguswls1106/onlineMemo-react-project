import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios'

const SendersWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > * {  // &는 현재 태그인 Wrapper 태그를 의미하고, *는 전체를 의미하므로, & > * 는 Wrapper 태그에 한단계 밑부분 전체의 자식 선택자 태그들을 범위로 지정한것이다.
        :not(:last-child) {  // Wrapper 태그에 한단계 밑부분 전체의 자식 선택자 태그들중에서 가장 마지막 자식 선택자를 제외한 모든 자식 태그들을 범위로 지정한것이다.
            margin-bottom: 6px;
        }
    }
`;

const SenderItemsWrapper = styled.div`
    width: calc(100% - 36px);
    padding: 12.5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    background: #e8e6e0;
    border: 2px solid #463f3a;
    border-radius: 9px;

    .fa-user {
        font-size: 1.7rem;
        color: #7d3d15;
    }
`;

const NameIdWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    height: 37px;
    flex-wrap: nowrap;
    justify-content: space-between;

    .nameDiv {
        font-size: 1.8rem;

        height: 18.6px;
        overflow: hidden;
    }

    .idDiv {
        font-size: 1.18rem;

        height: 13.1px;
    }
`;

function SenderList(props) {
    const { userId } = props;

    // const baseUrl = "http://localhost:8080";

    const [senders, setSenders] = useState();

    async function getSenders() {  // 해당 사용자의 모든 친구요청발신자 리스트 조회
        await axios
            .get(`/users/${userId}/senders`)
            .then((response) => {
                setSenders(response.data.data);
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getSenders();
    }, []);

    return (
        <SendersWrapper>
            {senders && senders.map((sender) => {
                return (
                    <SenderItemsWrapper key={sender.id}>
                        <i className="fa fa-user" aria-hidden="true"></i>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <NameIdWrapper style={{ flexGrow: "8" }}>
                            <div className="nameDiv">이름:&nbsp;{sender && sender.username}</div>
                            <div className="idDiv">id:&nbsp;{sender && sender.loginId}</div>
                        </NameIdWrapper>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button className="acceptButton">수락</button>&nbsp;&nbsp;<button className="refuseButton">거절</button>
                    </SenderItemsWrapper>
                );
            })}
        </SendersWrapper>
    );
}

export default SenderList;