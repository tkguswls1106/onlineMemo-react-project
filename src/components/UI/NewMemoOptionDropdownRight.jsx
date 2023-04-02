import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import '../../App.css';
import useDetectDropdown from "../../hooks/useDetectDropdown";
import axios from 'axios'
import NewGroupModal from "../Modal/NewGroupModal";
import SelectFriendList from "../List/SelectFriendList";

const DropdownContainer = styled.div`
    position: relative;
`;

const DropMenu = styled.div`
    background: #463f3a;
    position: absolute;
    top: 54.7px;
    left: 50%;
    width: 94px;
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
        left: 50%;
        transform: translate(-50%, -50%);
        border: 12px solid transparent;
        border-top-width: 0;
        border-bottom-color: #463f3a;

        @media(max-width: 565px) {
            left: 70%;
        }
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
        // background-color: #b4a8a1;
        background-color: #5e5c58;
        border-radius: 4px;
    }
`;

function NewMemoOptionDropdownRight(props) {
    const [ddIsOpen, ddRef, ddHandler] = useDetectDropdown(false);  // props를 받아오는게 아닌 훅 종류를 사용하였으므로, {}가 아닌, []로 받아야한다.
    // useDetectDropdown(initialValue)의 initialValue를 false로 넣어주었다. 그러므로, IsOpen이 false가 되어 ddIsOpen도 false가 된다.
    // 참고로 dd는 dropdown을 줄여서 적어본것이다.

    const { dropMain, dropItems, userId } = props;

    const [modalOn, setModalOn] = useState(false);
    const [checkedList, setCheckedList] = useState([]);

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
                                    {index == 1  // 새 공동메모 부분의 인덱스번호
                                        ? <Link style={{ textDecoration: "none" }} onClick={() => setModalOn(!modalOn)}>{drop.name}</Link>  // 새 공동메모 클릭하면
                                        : <Link to={drop.link} style={{ textDecoration: "none" }}>{drop.name}</Link>  // 새 개인메모 클릭하면
                                    }
                                </li>
                            );
                        }
                        )}
                    </ul>
                </DropMenu>
            }
            {modalOn && (
                <NewGroupModal closeModal={() => setModalOn(!modalOn)}>
                    <h2 style={{ fontSize: "2rem", color: "#463f3a", marginTop: "1.5px", marginBottom: "15px" }}>-&nbsp;공동 작성할 친구들 선택&nbsp;-</h2>
                    <FriendsWrapper>
                        <SelectFriendList userId={userId} checkedList={checkedList} setCheckedList={setCheckedList} />
                    </FriendsWrapper>
                    <button style={{ float: "right", fontSize: "1.5rem", marginTop: "10px" }} onClick={null}>선택 완료</button>
                    {/* 다음에 만들 과정은, navigate으로 개인메모 입력폼으로 이동하면서 state로 checkedList를 함께주는 작업 코드를 작성해주면 된다. */}
                </NewGroupModal>
            )}
        </DropdownContainer>
    );
}

export default NewMemoOptionDropdownRight;