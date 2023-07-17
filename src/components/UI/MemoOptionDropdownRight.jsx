import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import '../../App.css';
import useDetectDropdown from "../../hooks/useDetectDropdown";
import axios from 'axios'
import FriendGroupModal from "../Modal/FriendGroupModal";
import InviteFriendList from "../List/InviteFriendList";
import ConfirmModal from "../Modal/ConfirmModal";
import { CheckToken } from "../../utils/CheckToken";

const DropdownContainer = styled.div`
    position: relative;

    button {
        background-color: #463f3a;
        color: white;
        border-radius: 5px;
        font-family: "jua";

        &:hover {
            cursor: pointer;
            background-color: #463f3aa4;
        }
    }
`;

const DropMenu = styled.div`
    background: #463f3a;
    position: absolute;
    top: 44.3px;
    left: -17px;
    width: 92px;
    text-align: left;
    border-radius: 7px;
    transform: translate(-50%, -20px);
    z-index: 990;  // 페이지위에 겹친 요소들중 가장 위에있는 정도. 숫자가 클수록 위에 있다.

    @media(max-width: 565px) {
        // left: 145%;
    }

    &:after {  // 세모화살표만들기
        content: "";
        height: 0;
        width: 0;
        position: absolute;
        top: -2px;
        left: 70%;
        transform: translate(-50%, -50%);
        border: 12px solid transparent;
        border-top-width: 0;
        border-bottom-color: #463f3a;
    }

    #dropUl {
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    #dropLi {
        border: solid white 2px;
        border-top: #463f3a;
        border-left: #463f3a;
        border-right: #463f3a;

        :last-child {
            border-bottom: #463f3a;
        }

        & > a {
            font-size: 1.5rem;
            border: #463f3a;
        }
    }
`;

const FriendsWrapper = styled.div`
    height: calc(50vh - 105px);
    overflow: auto;

    border: 1.8px solid #463f3a;
    border-radius: 5px;
    padding: 15.5px;

    &::-webkit-scrollbar {
        width: 5px;
        background-color: #bcb8b1;
        border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #5e5c58;
        border-radius: 4px;
    }
`;

function MemoOptionDropdownRight(props) {
    const navigate = useNavigate();

    const [ddIsOpen, ddRef, ddHandler] = useDetectDropdown(false);  // props를 받아오는게 아닌 훅 종류를 사용하였으므로, {}가 아닌, []로 받아야한다.
    // useDetectDropdown(initialValue)의 initialValue를 false로 넣어주었다. 그러므로, IsOpen이 false가 되어 ddIsOpen도 false가 된다.
    // 참고로 dd는 dropdown을 줄여서 적어본것이다.

    const { dropMain, dropItems, userId, memoId, rerendering } = props;

    const [inviteModalOn, setInviteModalOn] = useState(false);
    const [checkedList, setCheckedList] = useState([]);

    const [allFriends, setAllFriends] = useState([]);
    const [users, setUsers] = useState([]);
    const [invitableFriends, setInvitableFriends] = useState([]);

    const [deleteModalOn, setDeleteModalOn] = useState(false);
    const [modalText, setModalText] = useState();

    const handleFirstModalClick = (textValue, event) => {
        setDeleteModalOn((deleteModalOn) => !deleteModalOn);

        if (textValue == "그룹 탈퇴") {
            setModalText("그룹을 탈퇴");
        }
        else {  // textValue == "메모 삭제" 일때
            setModalText("삭제");
        }
    }

    const handleInviteGroupMemo = async (e) => {  // 화살표함수로 선언하여 이벤트 사용시 바인딩되도록 함.
        // e.preventDefault();  // 리프레쉬 방지 (spa로서)

        await axios
            .post(`${process.env.REACT_APP_DB_HOST}/memos/${memoId}`, {
                userRequestDtos: checkedList
            })
            .then((response) => {
                //console.log(response);

                navigate(`/memos/${memoId}`, { state: { userId: userId } });
            })
            .catch((error) => {
                //console.log(error);
            })
    }

    const handleDeleteClick = async (e) => {  // 화살표함수로 선언하여 이벤트 사용시 바인딩되도록 함.
        // e.preventDefault();  // 리프레쉬 방지 (spa로서)

        await axios
            .delete(`${process.env.REACT_APP_DB_HOST}/users/${userId}/memos/${memoId}`)
            .then((response) => {
                //console.log(response);

                rerendering();
            })
            .catch((error) => {
                //console.log(error);
            })
    }

    async function getFriends() {  // 해당 사용자의 모든 친구 리스트 조회
        await axios
            .get(`${process.env.REACT_APP_DB_HOST}/users/${userId}/friends`)
            .then((response) => {
                setAllFriends(response.data.data);
                //console.log(response);
            })
            .catch((error) => {
                //console.log(error);
            })
    }

    async function getMemoHasUsers() {  // 해당 메모의 모든 사용자 리스트 조회 (메모 조회)
        await axios
            .get(`${process.env.REACT_APP_DB_HOST}/memos/${memoId}`)
            .then((response) => {
                setUsers(response.data.data.userResponseDtos);
                //console.log(response);
            })
            .catch((error) => {
                //console.log(error);
            })
    }

    useEffect(() => {
        CheckToken();

        getFriends();
        getMemoHasUsers();
        const invitableFriendList = allFriends.filter(obj => !users.map(x => JSON.stringify(x)).includes(JSON.stringify(obj)));
        // 초대할수있는 친구목록 = 친구전체목록 - 원래메모사용자들 차집합
        setInvitableFriends(invitableFriendList);
    }, [rerendering]);

    return (
        <DropdownContainer>
            <span onClick={ddHandler} ref={ddRef}>
                {dropMain}
            </span>
            {ddIsOpen &&
                <DropMenu>
                    <ul id="dropUl">
                        {dropItems.map((drop, index) => {
                            return (
                                <li id="dropLi" key={index}>
                                    {index == 0  // 친구초대 부분의 인덱스번호
                                        ? <Link style={{ textDecoration: "none" }} onClick={() => setInviteModalOn(!inviteModalOn)}>{drop.name}</Link> // 친구초대 클릭하면
                                        : <Link style={{ textDecoration: "none" }} onClick={(event) => handleFirstModalClick(`${drop.name}`, event)}>{drop.name}</Link>  // 메모삭제 클릭하면
                                    }
                                </li>
                            );
                        }
                        )}
                    </ul>
                </DropMenu>
            }
            {inviteModalOn && (
                <FriendGroupModal closeModal={() => setInviteModalOn(!inviteModalOn)}>
                    <h2 style={{ fontSize: "2rem", color: "#463f3a", marginTop: "1.5px", marginBottom: "15px" }}>-&nbsp;초대할 친구들 선택&nbsp;-</h2>
                    <FriendsWrapper>
                        <InviteFriendList userId={userId} checkedList={checkedList} setCheckedList={setCheckedList} friends={invitableFriends} />
                    </FriendsWrapper>
                    <button style={{ float: "right", fontSize: "1.5rem", marginTop: "10px", padding: "1px 6px 1px 6px", borderTop: "2px solid #767676", borderLeft: "2px solid #767676", borderBottom: "2px solid #212121", borderRight: "2px solid #212121" }} onClick={handleInviteGroupMemo}>선택 완료</button>
                </FriendGroupModal>
            )}
            {deleteModalOn && (
                <ConfirmModal closeModal={() => setDeleteModalOn(!deleteModalOn)}>
                    <br></br>
                    <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                    <h2 className="modalTitle" style={{ fontSize: "1.8rem" }}>정말&nbsp;{modalText}하시겠습니까?</h2>
                    <br></br>
                    <div style={{ float: "right" }}>
                        <button className="confirmDeleteButton" onClick={handleDeleteClick}>확인</button>&nbsp;&nbsp;
                        <button className="cancelButton" onClick={() => setDeleteModalOn(!deleteModalOn)}>취소</button>
                    </div>
                </ConfirmModal>
            )}
        </DropdownContainer>
    );
}

export default MemoOptionDropdownRight;