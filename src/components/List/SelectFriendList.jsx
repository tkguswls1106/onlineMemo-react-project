import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios'
import Checkbox from "../UI/Checkbox";
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

    cursor: pointer;
    :hover {
        background: lightgray;
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
        overflow: hidden;
    }
`;

function SelectFriendList(props) {
    const { userId, checkedList ,setCheckedList } = props;

    const [friends, setFriends] = useState();
    const [isChecked, setIsChecked] = useState(false);

    const checkedItemHandler = (value, isChecked) => {  // 체크한것 핸들러
        if (isChecked) {  // check 되어있는경우
            setCheckedList((prev) => [...prev, value]);  // checkList 리스트에 해당 체크한걸 추가 시킴.
            return;
        }

        if (!isChecked && checkedList.includes(value)) {  // check 되어있지 않으며, checkList 리스트 안에 해당것이 이미 포함되어있는경우
            setCheckedList(checkedList.filter((item) => item !== value));  // checkList 리스트 안에서 해당것을 삭제시킴.
            return;
        }
    };

    const checkHandler = (value, e) => {  // 체크 핸들러
        setIsChecked(!isChecked);  // isChecked 토글 시킴.
        checkedItemHandler(value, e.target.checked);  // 토글 시킨 값으로 파라미터에 들어감.
    };

    const handleClick = (nameCssId) => {
        const clickElement = document.getElementById(`friend${nameCssId}`);
        clickElement.click();
    }

    async function getFriends() {  // 해당 사용자의 모든 친구 리스트 조회
        await axios
            .get(process.env.REACT_APP_DB_HOST + `/users/${userId}/friends`)
            .then((response) => {
                setFriends(response.data.data);
                //console.log(response);
            })
            .catch((error) => {
                //console.log(error);
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
                    <FriendItemsWrapper key={friend.id} onClick={() => handleClick(friend.id)}>
                        <Checkbox friend={friend} friendId={friend.id} checked={isChecked} onChange={(e) => checkHandler(friend, e)} checkedList={checkedList} checkHandler={checkHandler}></Checkbox>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <NameIdWrapper style={{ flexGrow: "8" }}>
                            <div className="nameDiv">이름:&nbsp;{friend && friend.username}</div>
                            <div className="idDiv">id:&nbsp;{friend && friend.loginId}</div>
                        </NameIdWrapper>
                    </FriendItemsWrapper>
                );
            })}
        </FriendsWrapper>
    );
}

export default SelectFriendList;