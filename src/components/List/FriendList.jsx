import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios'
import ConfirmModal from "../Modal/ConfirmModal";
import { CheckToken } from "../../utils/CheckToken";

const FriendsWrapper = styled.div`
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

const FriendItemsWrapper = styled.div`
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

function FriendList(props) {
    const { userId } = props;

    // const baseUrl = "http://localhost:8080";

    const [friends, setFriends] = useState();
    const [modalOn, setModalOn] = useState(false);
    const [modalFriendId, setModalFriendId] = useState();

    const handleFirstModalClick = (friendId, event) => {
        setModalOn((modalOn) => !modalOn);
        setModalFriendId(friendId);
    }

    const handleDeleteClick = async (friendId) => {  // 화살표함수로 선언하여 이벤트 사용시 바인딩되도록 함.
        // e.preventDefault();  // 리프레쉬 방지 (spa로서)

        await axios
            .delete(`/users/${userId}/friends/${friendId}`)
            .then((response) => {
                console.log(response);

                setModalOn((modalOn) => !modalOn);
                getFriends();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    async function getFriends() {  // 해당 사용자의 모든 친구 리스트 조회
        await axios
            .get(`/users/${userId}/friends`)
            .then((response) => {
                setFriends(response.data.data);
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        CheckToken();

        getFriends();
    }, []);

    return (
        <FriendsWrapper>
            {friends && friends.map((friend) => {
                return (
                    <FriendItemsWrapper key={friend.id}>
                        <i className="fa fa-user" aria-hidden="true"></i>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <NameIdWrapper style={{ flexGrow: "8" }}>
                            <div className="nameDiv">이름:&nbsp;{friend && friend.username}</div>
                            <div className="idDiv">id:&nbsp;{friend && friend.loginId}</div>
                        </NameIdWrapper>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button className="deleteFriendButton" onClick={(event) => friend && handleFirstModalClick(friend.id, event)}>- 친구 삭제</button>
                    </FriendItemsWrapper>
                );
            })}
            {modalOn && (
                <ConfirmModal closeModal={() => setModalOn(!modalOn)}>
                    <br></br>
                    <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                    <h2 className="modalTitle">정말 삭제하시겠습니까?</h2>
                    <br></br>
                    <div style={{ float: "right" }}>
                        <button className="confirmDeleteButton" style={{ fontSize: "1.5rem" }} onClick={() => {handleDeleteClick(modalFriendId)}}>확인</button>&nbsp;&nbsp;
                        <button style={{ fontSize: "1.5rem" }} onClick={() => setModalOn(!modalOn)}>취소</button>
                    </div>
                </ConfirmModal>
            )}
        </FriendsWrapper>
    );
}

export default FriendList;